<?php
session_start();
$auth_user = 'plaintalk';
$auth_pass = 'patriots';

if (isset($_POST['auth_user']) && isset($_POST['auth_pass'])) {
    if ($_POST['auth_user'] === $auth_user && $_POST['auth_pass'] === $auth_pass) {
        $_SESSION['authenticated'] = true;
        header('Location: ' . $_SERVER['REQUEST_URI']);
        exit;
    } else {
        $auth_error = true;
    }
}

if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plain Talk Financial Planning</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f7f7; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .login { background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); width: 100%; max-width: 380px; text-align: center; }
        .login img { max-width: 200px; margin-bottom: 24px; }
        .login h2 { color: #2C7178; font-size: 1.3em; margin-bottom: 24px; }
        .login input { width: 100%; padding: 12px 16px; border: 1px solid #ddd; border-radius: 8px; font-size: 1em; margin-bottom: 14px; background: #fafafa; }
        .login input:focus { outline: none; border-color: #2C7178; background: #fff; }
        .login button { width: 100%; padding: 12px; background: #2C7178; color: #fff; border: none; border-radius: 8px; font-size: 1em; font-weight: 600; cursor: pointer; }
        .login button:hover { background: #1a4f54; }
        .login .error { color: #B0413E; font-size: 0.9em; margin-bottom: 14px; }
    </style>
</head>
<body>
    <div class="login">
        <img src="/images/logo.png" alt="Plain Talk Financial Planning">
        <h2>Site Preview</h2>
        <?php if (isset($auth_error)) { ?><p class="error">Invalid credentials. Please try again.</p><?php } ?>
        <form method="POST">
            <input type="text" name="auth_user" placeholder="Username" required autofocus>
            <input type="password" name="auth_pass" placeholder="Password" required>
            <button type="submit">Sign In</button>
        </form>
    </div>
</body>
</html>
<?php
    exit;
}
?>
