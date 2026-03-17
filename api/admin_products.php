<?php
// GET  - list all products (admin view, full fields)
// POST - create a new product
// PUT  - update an existing product

// Prevent HTML error output from breaking the JSON response
ini_set('display_errors', 0);
error_reporting(E_ALL);
set_error_handler(function($errno, $errstr) {
    throw new ErrorException($errstr, 0, $errno);
});

require_once 'config.php';
header('Content-Type: application/json');

try {

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// ---- GET ----
if ($method === 'GET') {
    $stmt = $db->query("
        SELECT p.id, p.name, p.slug, p.price, p.old_price, p.emoji,
               p.stock_quantity, p.stock_status, p.badge, p.rating,
               p.description, p.category_id, p.artisan_id,
               p.is_bestseller, p.is_featured,
               c.name AS category_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        ORDER BY p.id ASC
    ");
    echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
    exit;
}

// ---- Parse JSON body for POST / PUT ----
$body = json_decode(file_get_contents('php://input'), true) ?? [];

// ---- Shared field extraction helper ----
function extractFields(array $body): array {
    return [
        'name'           => trim($body['name'] ?? ''),
        'description'    => trim($body['description'] ?? ''),
        'price'          => (float)($body['price'] ?? 0),
        'old_price'      => (isset($body['old_price']) && $body['old_price'] !== '')
                                ? (float)$body['old_price'] : null,
        'emoji'          => !empty($body['emoji']) ? trim($body['emoji']) : '🧺',
        'category_id'    => (int)($body['category_id'] ?? 1),
        'artisan_id'     => !empty($body['artisan_id']) ? (int)$body['artisan_id'] : null,
        'stock_quantity' => isset($body['stock_quantity']) ? (int)$body['stock_quantity'] : 100,
        'stock_status'   => in_array($body['stock_status'] ?? '', ['in', 'low', 'out'])
                                ? $body['stock_status'] : 'in',
        'badge'          => in_array($body['badge'] ?? '', ['best', 'new', 'sale'])
                                ? $body['badge'] : null,
        'is_bestseller'  => empty($body['is_bestseller']) ? 0 : 1,
        'is_featured'    => empty($body['is_featured'])   ? 0 : 1,
    ];
}

// ---- POST (create) ----
if ($method === 'POST') {
    foreach (['name', 'price', 'category_id'] as $f) {
        if (empty($body[$f])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => "Missing required field: $f"]);
            exit;
        }
    }

    $f    = extractFields($body);
    $slug = generateSlug($f['name'], $db);

    $stmt = $db->prepare("
        INSERT INTO products
          (name, slug, description, price, old_price, emoji,
           category_id, artisan_id, stock_quantity, stock_status,
           badge, is_bestseller, is_featured)
        VALUES
          (:name, :slug, :description, :price, :old_price, :emoji,
           :category_id, :artisan_id, :stock_quantity, :stock_status,
           :badge, :is_bestseller, :is_featured)
    ");
    $stmt->execute([
        ':name'           => $f['name'],
        ':slug'           => $slug,
        ':description'    => $f['description'],
        ':price'          => $f['price'],
        ':old_price'      => $f['old_price'],
        ':emoji'          => $f['emoji'],
        ':category_id'    => $f['category_id'],
        ':artisan_id'     => $f['artisan_id'],
        ':stock_quantity' => $f['stock_quantity'],
        ':stock_status'   => $f['stock_status'],
        ':badge'          => $f['badge'],
        ':is_bestseller'  => $f['is_bestseller'],
        ':is_featured'    => $f['is_featured'],
    ]);

    echo json_encode(['success' => true, 'id' => (int)$db->lastInsertId()]);
    exit;
}

// ---- PUT (update) ----
if ($method === 'PUT') {
    if (empty($body['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing product id']);
        exit;
    }

    $id = (int)$body['id'];
    $f  = extractFields($body);

    $stmt = $db->prepare("
        UPDATE products SET
          name           = :name,
          description    = :description,
          price          = :price,
          old_price      = :old_price,
          emoji          = :emoji,
          category_id    = :category_id,
          artisan_id     = :artisan_id,
          stock_quantity = :stock_quantity,
          stock_status   = :stock_status,
          badge          = :badge,
          is_bestseller  = :is_bestseller,
          is_featured    = :is_featured
        WHERE id = :id
    ");
    $stmt->execute([
        ':id'             => $id,
        ':name'           => $f['name'],
        ':description'    => $f['description'],
        ':price'          => $f['price'],
        ':old_price'      => $f['old_price'],
        ':emoji'          => $f['emoji'],
        ':category_id'    => $f['category_id'],
        ':artisan_id'     => $f['artisan_id'],
        ':stock_quantity' => $f['stock_quantity'],
        ':stock_status'   => $f['stock_status'],
        ':badge'          => $f['badge'],
        ':is_bestseller'  => $f['is_bestseller'],
        ':is_featured'    => $f['is_featured'],
    ]);

    echo json_encode(['success' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

// ---- Generate a unique slug ----
function generateSlug(string $name, PDO $db): string {
    $base = strtolower(trim(preg_replace('/[^A-Za-z0-9]+/', '-', $name), '-'));
    $slug = $base;
    $i    = 1;
    while (true) {
        $s = $db->prepare('SELECT id FROM products WHERE slug = :slug');
        $s->execute([':slug' => $slug]);
        if (!$s->fetch()) break;
        $slug = "$base-$i";
        $i++;
    }
    return $slug;
}


