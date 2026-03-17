<?php
// GET  /api/admin_orders.php  — fetch orders + stats
// POST /api/admin_orders.php  — update order status

require_once 'config.php';

// Simple admin check — replace with session/auth in production
// Example: if (!isset($_SESSION['admin'])) { http_response_code(403); exit; }

$db = getDB();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Summary stats
    $stats = $db->query("
        SELECT
            COUNT(*)                                          AS total_orders,
            COALESCE(SUM(total), 0)                          AS total_revenue,
            (SELECT COUNT(*) FROM products WHERE stock_status != 'out') AS total_products,
            (SELECT COUNT(*) FROM newsletter_subscribers)    AS total_subscribers
        FROM orders
    ")->fetch();

    // Recent orders
    $orders = $db->query("
        SELECT id, email,
               CONCAT(first_name, ' ', last_name) AS customer_name,
               country, total, status, payment_method, created_at
        FROM orders
        ORDER BY created_at DESC
        LIMIT 50
    ")->fetchAll();

    echo json_encode([
        'success'           => true,
        'total_orders'      => (int)$stats['total_orders'],
        'total_revenue'     => (float)$stats['total_revenue'],
        'total_products'    => (int)$stats['total_products'],
        'total_subscribers' => (int)$stats['total_subscribers'],
        'orders'            => $orders,
    ]);

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $body = json_decode(file_get_contents('php://input'), true);

    $orderId = (int)($body['order_id'] ?? 0);
    $status  = $body['status'] ?? '';

    $allowed = ['pending','confirmed','shipped','delivered','cancelled','refunded'];
    if (!$orderId || !in_array($status, $allowed)) {
        http_response_code(422);
        echo json_encode(['success' => false, 'error' => 'Invalid data']);
        exit;
    }

    $db->prepare("UPDATE orders SET status = :status WHERE id = :id")
       ->execute([':status' => $status, ':id' => $orderId]);

    echo json_encode(['success' => true, 'message' => "Order #$orderId updated to $status"]);
}
