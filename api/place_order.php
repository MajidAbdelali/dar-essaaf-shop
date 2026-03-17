<?php
// POST /api/place_order.php
// Body: JSON with order details

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

if (!$body) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON body']);
    exit;
}

// Basic validation
$required = ['email', 'firstName', 'address', 'city', 'country', 'items'];
foreach ($required as $field) {
    if (empty($body[$field])) {
        http_response_code(422);
        echo json_encode(['success' => false, 'error' => "Missing field: $field"]);
        exit;
    }
}

if (!filter_var($body['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

if (empty($body['items']) || !is_array($body['items'])) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Cart is empty']);
    exit;
}

$db = getDB();

try {
    $db->beginTransaction();

    // Recalculate total server-side for security
    $itemIds   = array_map(fn($i) => (int)$i['id'], $body['items']);
    $placeholders = implode(',', array_fill(0, count($itemIds), '?'));

    $priceStmt = $db->prepare("SELECT id, price FROM products WHERE id IN ($placeholders)");
    $priceStmt->execute($itemIds);
    $dbPrices = array_column($priceStmt->fetchAll(), 'price', 'id');

    $subtotal = 0;
    foreach ($body['items'] as $item) {
        $itemPrice = (float)($dbPrices[$item['id']] ?? 0);
        $subtotal += $itemPrice * (int)($item['qty'] ?? 1);
    }

    $shippingCost = in_array($body['shipping'] ?? '', ['express']) ? 28.00 : 12.00;
    $total = $subtotal + $shippingCost;

    // Insert order
    $orderStmt = $db->prepare("
        INSERT INTO orders
            (email, first_name, last_name, address, address2, city, postal, country, phone, subtotal, shipping_cost, total, status, created_at)
        VALUES
            (:email, :first_name, :last_name, :address, :address2, :city, :postal, :country, :phone, :subtotal, :shipping_cost, :total, 'pending', NOW())
    ");

    $orderStmt->execute([
        ':email'         => $body['email'],
        ':first_name'    => $body['firstName'],
        ':last_name'     => $body['lastName'] ?? '',
        ':address'       => $body['address'],
        ':address2'      => $body['address2'] ?? '',
        ':city'          => $body['city'],
        ':postal'        => $body['postal'] ?? '',
        ':country'       => $body['country'],
        ':phone'         => $body['phone'] ?? '',
        ':subtotal'      => $subtotal,
        ':shipping_cost' => $shippingCost,
        ':total'         => $total,
    ]);

    $orderId = $db->lastInsertId();

    // Insert order items
    $itemStmt = $db->prepare("
        INSERT INTO order_items (order_id, product_id, quantity, unit_price)
        VALUES (:order_id, :product_id, :qty, :price)
    ");

    foreach ($body['items'] as $item) {
        $itemStmt->execute([
            ':order_id'   => $orderId,
            ':product_id' => (int)$item['id'],
            ':qty'        => (int)($item['qty'] ?? 1),
            ':price'      => (float)($dbPrices[$item['id']] ?? 0),
        ]);

        // Decrease stock
        $db->prepare("UPDATE products SET stock_quantity = GREATEST(stock_quantity - ?, 0) WHERE id = ?")
           ->execute([(int)($item['qty'] ?? 1), (int)$item['id']]);
    }

    $db->commit();

    // Optional: send confirmation email here (use PHPMailer / Mailer)
    // sendOrderConfirmationEmail($body['email'], $orderId, $total);

    echo json_encode([
        'success' => true,
        'orderId' => $orderId,
        'total'   => $total,
        'message' => 'Order placed successfully',
    ]);

} catch (Exception $e) {
    $db->rollBack();
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Failed to place order. Please try again.',
        // 'debug' => $e->getMessage(), // Uncomment only during dev
    ]);
}
