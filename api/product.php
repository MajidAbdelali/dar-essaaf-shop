<?php
// GET /api/product.php?id=1  OR  ?slug=midoun-market-basket

require_once 'config.php';

$db = getDB();

$id   = isset($_GET['id'])   ? (int)$_GET['id']          : null;
$slug = isset($_GET['slug']) ? trim($_GET['slug'])         : null;

if (!$id && !$slug) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Provide id or slug']);
    exit;
}

$condition = $id ? 'p.id = :val' : 'p.slug = :val';
$value     = $id ?? $slug;

$stmt = $db->prepare("
    SELECT
        p.id, p.name, p.slug, p.description, p.price, p.old_price,
        p.emoji, p.rating, p.review_count, p.stock_quantity,
        p.stock_status, p.badge, p.is_bestseller,
        c.name AS category, c.slug AS category_slug,
        a.id AS artisan_id, a.name AS artisan_name,
        a.village AS artisan_village, a.bio AS artisan_bio, a.specialty AS artisan_specialty
    FROM products p
    JOIN categories c ON p.category_id = c.id
    LEFT JOIN artisans a ON p.artisan_id = a.id
    WHERE $condition
    LIMIT 1
");
$stmt->execute([':val' => $value]);
$product = $stmt->fetch();

if (!$product) {
    http_response_code(404);
    echo json_encode(['success' => false, 'error' => 'Product not found']);
    exit;
}

// Fetch reviews
$revStmt = $db->prepare("
    SELECT name, location, rating, body, created_at
    FROM reviews
    WHERE product_id = :pid AND is_approved = 1
    ORDER BY created_at DESC
    LIMIT 6
");
$revStmt->execute([':pid' => $product['id']]);
$product['reviews_data'] = $revStmt->fetchAll();

// Fetch images
$imgStmt = $db->prepare("SELECT url, alt_text FROM product_images WHERE product_id = :pid ORDER BY sort_order");
$imgStmt->execute([':pid' => $product['id']]);
$product['images'] = $imgStmt->fetchAll();

echo json_encode(['success' => true, 'data' => $product]);
