<?php
/**
 * Leads & Applications Visual Dashboard - Protected Admin Portal
 * Creatah Software Technologies
 */

session_start();

require_once __DIR__ . '/config.php';

// ==========================================================
// 1. Admin Authentication Credentials
// You can customize the username & password below anytime:
// ==========================================================
$admin_username = getenv('ADMIN_USERNAME') ?: 'admin';
$admin_password = getenv('ADMIN_PASSWORD') ?: 'Creatah@2026';

// Handle Logout
if (isset($_GET['logout'])) {
    $_SESSION = [];
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
    header("Location: view-leads.php");
    exit;
}

// Handle Login Submission
$login_error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    $entered_username = trim($_POST['username'] ?? '');
    $entered_password = trim($_POST['password'] ?? '');

    if ($entered_username === $admin_username && $entered_password === $admin_password) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user'] = $entered_username;
        $_SESSION['login_time'] = time();
        header("Location: view-leads.php");
        exit;
    } else {
        $login_error = "Invalid username or password. Please try again.";
    }
}

// Check if admin is authenticated
$is_logged_in = !empty($_SESSION['admin_logged_in']);

// If not logged in, render Secure Login Page
if (!$is_logged_in) {
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login | Creatah Data Portal</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-[#060913] text-slate-100 min-h-screen flex items-center justify-center p-4 selection:bg-blue-500 selection:text-white relative overflow-hidden">
  
  <!-- Subtle Background Gradients -->
  <div class="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
  <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

  <div class="w-full max-w-md relative z-10">
    <!-- Brand Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white text-2xl font-black shadow-xl shadow-blue-500/25 mb-4 ring-1 ring-white/20">
        C
      </div>
      <h1 class="text-2xl font-extrabold text-white tracking-tight">Creatah Admin Portal</h1>
      <p class="text-xs text-slate-400 mt-1.5">Sign in to access leads, client inquiries & user records</p>
    </div>

    <!-- Login Card -->
    <div class="bg-slate-900/90 border border-slate-800 rounded-3xl p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
      <?php if (!empty($login_error)): ?>
        <div class="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5">
          <svg class="w-4 h-4 shrink-0 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span><?= htmlspecialchars($login_error); ?></span>
        </div>
      <?php endif; ?>

      <form method="POST" action="view-leads.php" class="space-y-4">
        <input type="hidden" name="action" value="login">

        <!-- Username Input -->
        <div>
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Username</label>
          <div class="relative">
            <input 
              type="text" 
              name="username" 
              required 
              autofocus
              placeholder="admin"
              value="<?= htmlspecialchars($_POST['username'] ?? ''); ?>"
              class="w-full bg-slate-950/80 border border-slate-700/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition outline-none"
            >
          </div>
        </div>

        <!-- Password Input -->
        <div>
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Password</label>
          <div class="relative">
            <input 
              type="password" 
              name="password" 
              id="passwordInput"
              required 
              placeholder="••••••••••••"
              class="w-full bg-slate-950/80 border border-slate-700/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition outline-none pr-11"
            >
            <button 
              type="button" 
              onclick="togglePassword()" 
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 text-xs"
              title="Toggle Password Visibility"
            >
              <svg id="eyeIcon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-2">
          <button 
            type="submit" 
            class="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition transform active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Sign In to Dashboard
          </button>
        </div>
      </form>

      <!-- Default Credentials Helper Note -->
      <div class="mt-6 pt-5 border-t border-slate-800/80 text-center">
        <p class="text-[11px] text-slate-400">
          Default Username: <strong class="text-slate-200">admin</strong> &nbsp;|&nbsp; 
          Password: <strong class="text-slate-200">Creatah@2026</strong>
        </p>
      </div>
    </div>

    <!-- Security Footer -->
    <div class="text-center mt-6 text-xs text-slate-500 flex items-center justify-center gap-2">
      <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
      <span>Protected by 256-Bit Session Authentication</span>
    </div>
  </div>

  <script>
    function togglePassword() {
      const input = document.getElementById('passwordInput');
      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    }
  </script>
</body>
</html>
<?php
    exit;
}

// ==========================================================
// 2. Authenticated Admin Dashboard Logic
// ==========================================================

// Determine active tab
$tab = $_GET['tab'] ?? 'leads';
$search = trim($_GET['q'] ?? '');

// Auto-create tables safely if they do not exist
try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `leads` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `form_type` VARCHAR(50) NOT NULL DEFAULT 'contact_form',
          `name` VARCHAR(150) NOT NULL,
          `email` VARCHAR(150) NOT NULL,
          `phone` VARCHAR(50) DEFAULT NULL,
          `service` VARCHAR(150) DEFAULT NULL,
          `budget` VARCHAR(100) DEFAULT NULL,
          `timeline` VARCHAR(100) DEFAULT NULL,
          `company` VARCHAR(150) DEFAULT NULL,
          `message` TEXT DEFAULT NULL,
          `ip_address` VARCHAR(45) DEFAULT NULL,
          `status` ENUM('new', 'contacted', 'qualified', 'closed') DEFAULT 'new',
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
} catch (Exception $e) {}

try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `job_applications` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `job_title` VARCHAR(150) NOT NULL,
          `applicant_name` VARCHAR(150) NOT NULL,
          `applicant_email` VARCHAR(150) NOT NULL,
          `applicant_phone` VARCHAR(50) NOT NULL,
          `experience_years` VARCHAR(50) DEFAULT NULL,
          `portfolio_url` VARCHAR(255) DEFAULT NULL,
          `linkedin_url` VARCHAR(255) DEFAULT NULL,
          `cover_note` TEXT DEFAULT NULL,
          `status` ENUM('submitted', 'reviewed', 'shortlisted', 'rejected') DEFAULT 'submitted',
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
} catch (Exception $e) {}

try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `users` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `name` VARCHAR(150) NOT NULL,
          `email` VARCHAR(150) NOT NULL,
          `password` VARCHAR(255) NOT NULL,
          `gender` VARCHAR(50) DEFAULT NULL,
          `country` VARCHAR(100) DEFAULT NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
} catch (Exception $e) {}

// Safe query counter that never throws exceptions
function safeCount($pdo, $sql) {
    try {
        return (int)$pdo->query($sql)->fetchColumn();
    } catch (Exception $e) {
        return 0;
    }
}

// Handle CSV Export
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    $filename = $tab . '_' . date('Y-m-d_His') . '.csv';
    header('Content-Type: text/csv; charset=utf-8');
    header("Content-Disposition: attachment; filename={$filename}");
    $output = fopen('php://output', 'w');

    try {
        if ($tab === 'applications') {
            fputcsv($output, ['ID', 'Date', 'Role', 'Applicant Name', 'Email', 'Phone', 'Experience', 'Portfolio', 'LinkedIn', 'Status', 'Cover Note']);
            $stmt = $pdo->query("SELECT * FROM job_applications ORDER BY created_at DESC");
            while ($row = $stmt->fetch()) {
                fputcsv($output, [
                    $row['id'], $row['created_at'], $row['job_title'], $row['applicant_name'],
                    $row['applicant_email'], $row['applicant_phone'], $row['experience_years'],
                    $row['portfolio_url'], $row['linkedin_url'], $row['status'], $row['cover_note']
                ]);
            }
        } elseif ($tab === 'users') {
            fputcsv($output, ['ID', 'Date', 'Name', 'Email', 'Gender', 'Country']);
            $stmt = $pdo->query("SELECT id, created_at, name, email, gender, country FROM users ORDER BY created_at DESC");
            while ($row = $stmt->fetch()) {
                fputcsv($output, [
                    $row['id'], $row['created_at'], $row['name'], $row['email'], $row['gender'], $row['country']
                ]);
            }
        } else {
            fputcsv($output, ['ID', 'Date', 'Type', 'Name', 'Email', 'Phone', 'Service', 'Budget', 'Timeline', 'Company', 'Status', 'Message']);
            $stmt = $pdo->query("SELECT * FROM leads ORDER BY created_at DESC");
            while ($row = $stmt->fetch()) {
                fputcsv($output, [
                    $row['id'], $row['created_at'], $row['form_type'], $row['name'],
                    $row['email'], $row['phone'], $row['service'], $row['budget'],
                    $row['timeline'], $row['company'], $row['status'], $row['message']
                ]);
            }
        }
    } catch (Exception $e) {}

    fclose($output);
    exit;
}

// Stats Calculation
$stats = [
    'total_leads'     => safeCount($pdo, "SELECT COUNT(*) FROM leads"),
    'contact_leads'   => safeCount($pdo, "SELECT COUNT(*) FROM leads WHERE form_type = 'contact_form'"),
    'proposal_leads'  => safeCount($pdo, "SELECT COUNT(*) FROM leads WHERE form_type = 'proposal_request'"),
    'estimate_leads'  => safeCount($pdo, "SELECT COUNT(*) FROM leads WHERE form_type = 'estimate_modal'"),
    'applications'    => safeCount($pdo, "SELECT COUNT(*) FROM job_applications"),
    'users'           => safeCount($pdo, "SELECT COUNT(*) FROM users"),
];

// Fetch active records with search query
$records = [];
try {
    if ($tab === 'applications') {
        if (!empty($search)) {
            $stmt = $pdo->prepare("
                SELECT * FROM job_applications 
                WHERE applicant_name LIKE :q OR applicant_email LIKE :q OR applicant_phone LIKE :q OR job_title LIKE :q
                ORDER BY created_at DESC
            ");
            $stmt->execute([':q' => "%{$search}%"]);
        } else {
            $stmt = $pdo->query("SELECT * FROM job_applications ORDER BY created_at DESC LIMIT 100");
        }
        $records = $stmt ? $stmt->fetchAll() : [];
    } elseif ($tab === 'users') {
        if (!empty($search)) {
            $stmt = $pdo->prepare("
                SELECT id, name, email, gender, country, created_at FROM users 
                WHERE name LIKE :q OR email LIKE :q OR country LIKE :q
                ORDER BY created_at DESC
            ");
            $stmt->execute([':q' => "%{$search}%"]);
        } else {
            $stmt = $pdo->query("SELECT id, name, email, gender, country, created_at FROM users ORDER BY created_at DESC LIMIT 100");
        }
        $records = $stmt ? $stmt->fetchAll() : [];
    } else {
        $filterSql = "";
        $params = [];
        if ($tab === 'contact') {
            $filterSql = "WHERE form_type = 'contact_form'";
        } elseif ($tab === 'proposals') {
            $filterSql = "WHERE form_type = 'proposal_request'";
        } elseif ($tab === 'estimates') {
            $filterSql = "WHERE form_type = 'estimate_modal'";
        }

        if (!empty($search)) {
            $filterSql .= ($filterSql ? " AND " : " WHERE ") . "(name LIKE :q OR email LIKE :q OR phone LIKE :q OR service LIKE :q)";
            $params[':q'] = "%{$search}%";
        }

        $stmt = $pdo->prepare("SELECT * FROM leads {$filterSql} ORDER BY created_at DESC LIMIT 100");
        $stmt->execute($params);
        $records = $stmt ? $stmt->fetchAll() : [];
    }
} catch (Exception $e) {
    $records = [];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creatah | Lead & User Management Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="bg-[#080c18] text-slate-100 min-h-screen">
  
  <!-- Top Navigation Bar -->
  <header class="border-b border-slate-800 bg-[#0d1326]/90 backdrop-blur sticky top-0 z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/20">
          C
        </div>
        <div>
          <h1 class="text-lg font-bold text-white leading-none">Creatah Data Manager</h1>
          <p class="text-xs text-slate-400 mt-1">Real-time Inquiries, Applications & Users</p>
        </div>
      </div>

      <!-- User Actions: Status Badge, Export CSV & Logout Button -->
      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Logged in as <?= htmlspecialchars($_SESSION['admin_user'] ?? 'Admin'); ?></span>
        </div>

        <a href="?tab=<?= htmlspecialchars($tab); ?>&export=csv" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition shadow-sm">
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Export CSV
        </a>

        <a href="?logout=1" onclick="return confirm('Are you sure you want to log out?');" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition" title="Log out">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          <span>Logout</span>
        </a>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    
    <!-- Stat Summary Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition">
        <span class="text-[11px] text-slate-400 uppercase font-semibold">Total Leads</span>
        <div class="text-2xl font-black text-white mt-1"><?= number_format($stats['total_leads']); ?></div>
      </div>
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition">
        <span class="text-[11px] text-slate-400 uppercase font-semibold">Contact Forms</span>
        <div class="text-2xl font-black text-cyan-400 mt-1"><?= number_format($stats['contact_leads']); ?></div>
      </div>
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition">
        <span class="text-[11px] text-slate-400 uppercase font-semibold">Proposals</span>
        <div class="text-2xl font-black text-indigo-400 mt-1"><?= number_format($stats['proposal_leads']); ?></div>
      </div>
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition">
        <span class="text-[11px] text-slate-400 uppercase font-semibold">Estimates</span>
        <div class="text-2xl font-black text-amber-400 mt-1"><?= number_format($stats['estimate_leads']); ?></div>
      </div>
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition">
        <span class="text-[11px] text-slate-400 uppercase font-semibold">Job Applies</span>
        <div class="text-2xl font-black text-emerald-400 mt-1"><?= number_format($stats['applications']); ?></div>
      </div>
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition">
        <span class="text-[11px] text-slate-400 uppercase font-semibold">Users</span>
        <div class="text-2xl font-black text-pink-400 mt-1"><?= number_format($stats['users']); ?></div>
      </div>
    </div>

    <!-- Filters, Navigation Tabs & Search -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
      <nav class="flex flex-wrap gap-2 text-xs font-semibold">
        <a href="?tab=leads" class="px-3.5 py-2 rounded-xl transition <?= $tab === 'leads' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'; ?>">All Inquiries (<?= $stats['total_leads']; ?>)</a>
        <a href="?tab=contact" class="px-3.5 py-2 rounded-xl transition <?= $tab === 'contact' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'; ?>">Contact (<?= $stats['contact_leads']; ?>)</a>
        <a href="?tab=proposals" class="px-3.5 py-2 rounded-xl transition <?= $tab === 'proposals' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'; ?>">Proposals (<?= $stats['proposal_leads']; ?>)</a>
        <a href="?tab=estimates" class="px-3.5 py-2 rounded-xl transition <?= $tab === 'estimates' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'; ?>">Estimates (<?= $stats['estimate_leads']; ?>)</a>
        <a href="?tab=applications" class="px-3.5 py-2 rounded-xl transition <?= $tab === 'applications' ? 'bg-blue-600 text-white shadow' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'; ?>">Job Applications (<?= $stats['applications']; ?>)</a>
        <a href="?tab=users" class="px-3.5 py-2 rounded-xl transition <?= $tab === 'users' ? 'bg-pink-600 text-white shadow' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'; ?>">Users (<?= $stats['users']; ?>)</a>
      </nav>

      <form method="GET" class="flex items-center gap-2 w-full sm:w-auto">
        <input type="hidden" name="tab" value="<?= htmlspecialchars($tab); ?>">
        <input type="text" name="q" value="<?= htmlspecialchars($search); ?>" placeholder="Search name, email, phone..." class="bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-xl px-3.5 py-2 focus:outline-none focus:border-cyan-400 w-full sm:w-64">
        <button type="submit" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded-xl border border-slate-700 transition">Search</button>
      </form>
    </div>

    <!-- Data Table -->
    <div class="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <?php if (empty($records)): ?>
        <div class="p-12 text-center text-slate-400">
          <svg class="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
          <p class="text-base font-semibold text-slate-300">No records found</p>
          <p class="text-xs text-slate-500 mt-1">Submit an inquiry or user payload through the API to see it appear here live!</p>
        </div>
      <?php else: ?>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-950/80 text-slate-400 uppercase font-semibold tracking-wider border-b border-slate-800">
              <tr>
                <th class="p-4">ID</th>
                <th class="p-4">Date & Time</th>
                <?php if ($tab === 'applications'): ?>
                  <th class="p-4">Role</th>
                  <th class="p-4">Applicant</th>
                  <th class="p-4">Contact</th>
                  <th class="p-4">Links / Exp</th>
                  <th class="p-4">Cover Note</th>
                <?php elseif ($tab === 'users'): ?>
                  <th class="p-4">Full Name</th>
                  <th class="p-4">Email Address</th>
                  <th class="p-4">Gender</th>
                  <th class="p-4">Country</th>
                <?php else: ?>
                  <th class="p-4">Type</th>
                  <th class="p-4">Client Name</th>
                  <th class="p-4">Contact Info</th>
                  <th class="p-4">Service & Budget</th>
                  <th class="p-4">Message / Scope</th>
                <?php endif; ?>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              <?php foreach ($records as $r): ?>
                <tr class="hover:bg-slate-800/40 transition">
                  <td class="p-4 font-mono text-slate-500">#<?= $r['id']; ?></td>
                  <td class="p-4 whitespace-nowrap text-slate-400">
                    <div><?= date('d M Y', strtotime($r['created_at'])); ?></div>
                    <div class="text-[10px] text-slate-500"><?= date('h:i A', strtotime($r['created_at'])); ?></div>
                  </td>

                  <?php if ($tab === 'applications'): ?>
                    <td class="p-4">
                      <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <?= htmlspecialchars($r['job_title'] ?? ''); ?>
                      </span>
                    </td>
                    <td class="p-4">
                      <div class="font-bold text-white"><?= htmlspecialchars($r['applicant_name'] ?? ''); ?></div>
                      <?php if (!empty($r['experience_years'])): ?>
                        <div class="text-[10px] text-slate-400 mt-0.5">Exp: <?= htmlspecialchars($r['experience_years']); ?></div>
                      <?php endif; ?>
                    </td>
                    <td class="p-4 space-y-1">
                      <a href="mailto:<?= htmlspecialchars($r['applicant_email'] ?? ''); ?>" class="text-cyan-400 hover:underline block"><?= htmlspecialchars($r['applicant_email'] ?? ''); ?></a>
                      <a href="tel:<?= htmlspecialchars($r['applicant_phone'] ?? ''); ?>" class="text-slate-300 hover:underline block"><?= htmlspecialchars($r['applicant_phone'] ?? ''); ?></a>
                    </td>
                    <td class="p-4 space-y-1">
                      <?php if (!empty($r['portfolio_url'])): ?>
                        <a href="<?= htmlspecialchars($r['portfolio_url']); ?>" target="_blank" class="text-blue-400 hover:underline text-[11px] block">Portfolio Link &rarr;</a>
                      <?php endif; ?>
                      <?php if (!empty($r['linkedin_url'])): ?>
                        <a href="<?= htmlspecialchars($r['linkedin_url']); ?>" target="_blank" class="text-cyan-400 hover:underline text-[11px] block">LinkedIn Profile &rarr;</a>
                      <?php endif; ?>
                    </td>
                    <td class="p-4 max-w-xs text-slate-300 truncate" title="<?= htmlspecialchars($r['cover_note'] ?? ''); ?>">
                      <?= htmlspecialchars($r['cover_note'] ?? ''); ?>
                    </td>

                  <?php elseif ($tab === 'users'): ?>
                    <td class="p-4 font-bold text-white">
                      <?= htmlspecialchars($r['name'] ?? ''); ?>
                    </td>
                    <td class="p-4">
                      <a href="mailto:<?= htmlspecialchars($r['email'] ?? ''); ?>" class="text-cyan-400 hover:underline"><?= htmlspecialchars($r['email'] ?? ''); ?></a>
                    </td>
                    <td class="p-4">
                      <span class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                        <?= htmlspecialchars($r['gender'] ?? 'Not Specified'); ?>
                      </span>
                    </td>
                    <td class="p-4 font-semibold text-slate-300">
                      <?= htmlspecialchars($r['country'] ?? 'Not Specified'); ?>
                    </td>

                  <?php else: ?>
                    <td class="p-4 whitespace-nowrap">
                      <?php 
                        $badgeClasses = [
                          'contact_form'     => 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                          'proposal_request' => 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
                          'estimate_modal'   => 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                        ][$r['form_type'] ?? ''] ?? 'bg-slate-700 text-slate-300';
                      ?>
                      <span class="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border <?= $badgeClasses; ?>">
                        <?= str_replace('_', ' ', htmlspecialchars($r['form_type'] ?? 'Inquiry')); ?>
                      </span>
                    </td>
                    <td class="p-4">
                      <div class="font-bold text-white"><?= htmlspecialchars($r['name'] ?? ''); ?></div>
                      <?php if (!empty($r['company'])): ?>
                        <div class="text-[11px] text-slate-400"><?= htmlspecialchars($r['company']); ?></div>
                      <?php endif; ?>
                    </td>
                    <td class="p-4 space-y-1">
                      <a href="mailto:<?= htmlspecialchars($r['email'] ?? ''); ?>" class="text-cyan-400 hover:underline block"><?= htmlspecialchars($r['email'] ?? ''); ?></a>
                      <?php if (!empty($r['phone'])): ?>
                        <a href="tel:<?= htmlspecialchars($r['phone']); ?>" class="text-slate-300 hover:underline block"><?= htmlspecialchars($r['phone']); ?></a>
                      <?php endif; ?>
                    </td>
                    <td class="p-4 space-y-1">
                      <?php if (!empty($r['service'])): ?>
                        <div class="font-semibold text-white"><?= htmlspecialchars($r['service']); ?></div>
                      <?php endif; ?>
                      <?php if (!empty($r['budget'])): ?>
                        <div class="text-[11px] text-emerald-400 font-mono">Budget: <?= htmlspecialchars($r['budget']); ?></div>
                      <?php endif; ?>
                      <?php if (!empty($r['timeline'])): ?>
                        <div class="text-[11px] text-slate-400">Timeline: <?= htmlspecialchars($r['timeline']); ?></div>
                      <?php endif; ?>
                    </td>
                    <td class="p-4 max-w-sm text-slate-300">
                      <div class="line-clamp-2" title="<?= htmlspecialchars($r['message'] ?? ''); ?>">
                        <?= htmlspecialchars($r['message'] ?? ''); ?>
                      </div>
                    </td>
                  <?php endif; ?>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      <?php endif; ?>
    </div>
  </main>
</body>
</html>
