<?php
/**
 * ONE-TIME DATABASE INSTALLER
 * Visit: http://localhost/projects/dar-essaaf-shop/api/install.php
 * Delete or restrict this file after running it.
 */
ini_set('display_errors', 0);

$host    = 'localhost';
$user    = 'root';
$pass    = '';
$dbname  = 'djerba_palms';
$charset = 'utf8mb4';

$steps = [];
$ok    = true;

function step(string $label, callable $fn, array &$steps, bool &$ok): void {
    try {
        $fn();
        $steps[] = ['ok' => true,  'label' => $label];
    } catch (Throwable $e) {
        $steps[] = ['ok' => false, 'label' => $label, 'error' => $e->getMessage()];
        $ok = false;
    }
}

// 1. Connect without selecting a DB (so we can create it)
$pdo = null;
step('Connect to MySQL', function() use ($host, $user, $pass, $charset, &$pdo) {
    $pdo = new PDO(
        "mysql:host=$host;charset=$charset",
        $user, $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
}, $steps, $ok);

if (!$pdo) goto render;

// 2. Create database
step("Create database `$dbname`", function() use ($pdo, $dbname) {
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE `$dbname`");
}, $steps, $ok);

// 3. Read and split the schema file
$sqlFile = __DIR__ . '/schema.sql';
step('Read schema.sql', function() use ($sqlFile, &$sql) {
    if (!file_exists($sqlFile)) throw new RuntimeException('schema.sql not found');
    $sql = file_get_contents($sqlFile);
}, $steps, $ok);

// 4. Execute all statements
step('Run schema (tables + seed data)', function() use ($pdo, $dbname, &$sql) {
    // Switch to the DB first
    $pdo->exec("USE `$dbname`");

    // Split on semicolons (skip blank / comment-only chunks)
    $statements = array_filter(
        array_map('trim', explode(';', $sql)),
        fn($s) => $s !== '' && !preg_match('/^--/', $s)
    );

    foreach ($statements as $stmt) {
        // Skip CREATE DATABASE / USE - already handled
        if (preg_match('/^\s*(CREATE DATABASE|USE\s)/i', $stmt)) continue;
        $pdo->exec($stmt);
    }
}, $steps, $ok);

render:
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>dar-essaaf-shop - DB Installer</title>
  <style>
    body { font-family: sans-serif; max-width: 640px; margin: 60px auto; color: #1a1a1a; }
    h1   { font-size: 1.4rem; margin-bottom: 24px; }
    ul   { list-style: none; padding: 0; }
    li   { padding: 10px 14px; margin-bottom: 8px; border-radius: 6px; font-size: 0.9rem; }
    .ok  { background: #d4edda; color: #155724; }
    .err { background: #f8d7da; color: #721c24; }
    .err small { display: block; margin-top: 4px; font-size: 0.8rem; opacity: 0.85; }
    .done { margin-top: 28px; padding: 16px; background: #cce5ff; border-radius: 6px; color: #004085; }
    .fail { margin-top: 28px; padding: 16px; background: #f8d7da; border-radius: 6px; color: #721c24; }
    a    { color: #0055a4; }
  </style>
</head>
<body>
  <h1>🌴 dar-essaaf-shop - Database Installer</h1>
  <ul>
    <?php foreach ($steps as $s): ?>
      <li class="<?= $s['ok'] ? 'ok' : 'err' ?>">
        <?= $s['ok'] ? '✔' : '✘' ?> <?= htmlspecialchars($s['label']) ?>
        <?php if (!$s['ok']): ?>
          <small><?= htmlspecialchars($s['error']) ?></small>
        <?php endif ?>
      </li>
    <?php endforeach ?>
  </ul>

  <?php if ($ok): ?>
    <div class="done">
      <strong>✔ Database installed successfully!</strong><br><br>
      All tables and seed data have been created.<br><br>
      <strong>⚠ Security:</strong> Please delete <code>api/install.php</code> now that setup is done.<br><br>
      <a href="../admin/">→ Go to Admin Panel</a>
    </div>
  <?php else: ?>
    <div class="fail">
      <strong>✘ Installation failed.</strong> Fix the errors above and try again.<br><br>
      Common causes:
      <ul style="margin-top:8px">
        <li>MySQL not running - start it in XAMPP Control Panel</li>
        <li>Wrong credentials in <code>api/config.php</code></li>
      </ul>
    </div>
  <?php endif ?>
</body>
</html>




