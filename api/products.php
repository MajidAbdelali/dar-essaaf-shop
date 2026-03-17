<?php
// GET /api/products.php
// Query params: ?cat=baskets&sort=price-asc&max_price=500&limit=12&page=1

require_once 'config.php';

$db = getDB();

$cat      = $_GET['cat']       ?? '';
$sort     = $_GET['sort']      ?? 'default';
$maxPrice = (int)($_GET['max_price'] ?? 9999);
$limit    = min((int)($_GET['limit']  ?? 12), 50);
$page     = max((int)($_GET['page']   ?? 1), 1);
$offset   = ($page - 1) * $limit;

$where = ['p.price <= :max_price'];
$params = [':max_price' => $maxPrice];

if ($cat) {
    $where[] = 'c.slug = :cat';
    $params[':cat'] = $cat;
}

$whereSQL = 'WHERE ' . implode(' AND ', $where);

$orderMap = [
    'price-asc'  => 'p.price ASC',
    'price-desc' => 'p.price DESC',
    'newest'     => 'p.created_at DESC',
    'default'    => 'p.is_bestseller DESC, p.review_count DESC',
];
$orderSQL = 'ORDER BY ' . ($orderMap[$sort] ?? $orderMap['default']);

$stmt = $db->prepare("
    SELECT
        p.id,
        p.name,
        p.slug,
        p.price,
        p.old_price,
        p.emoji,
        p.rating,
        p.review_count,
        p.stock_status,
        p.badge,
        c.name    AS category,
        c.slug    AS category_slug,
        a.name    AS artisan_name,
        a.village AS artisan_village
    FROM products p
    JOIN categories c ON p.category_id = c.id
    LEFT JOIN artisans a ON p.artisan_id = a.id
    $whereSQL
    $orderSQL
    LIMIT :limit OFFSET :offset
");

foreach ($params as $k => $v) $stmt->bindValue($k, $v);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$products = $stmt->fetchAll();

// Count
$countStmt = $db->prepare("
    SELECT COUNT(*) FROM products p
    JOIN categories c ON p.category_id = c.id
    $whereSQL
");
foreach ($params as $k => $v) $countStmt->bindValue($k, $v);
$countStmt->execute();
$total = (int)$countStmt->fetchColumn();

echo json_encode([
    'success' => true,
    'data'    => $products,
    'meta'    => [
        'total'    => $total,
        'page'     => $page,
        'limit'    => $limit,
        'pages'    => ceil($total / $limit),
    ]
]);
