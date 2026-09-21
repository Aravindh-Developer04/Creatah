<?php
/**
 * Leads & Applications Visual Dashboard
 * Creatah Software Technologies
 */

require_once __DIR__ . '/config.php';

// Determine active tab
$tab = $_GET['tab'] ?? 'leads';
$search = trim($_GET['q'] ?? '');

// Handle CSV Export
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    $filename = $tab . '_' . date('Y-m-d_His') . '.csv';
    header('Content-Type: text/csv; charset=utf-8');
    header("Content-Disposition: attachment; filename={$filename}");
    $output = fopen('php://output', 'w');

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
    fclose($output);
    exit;
}

// Stats
$stats = [
    'total_leads'     => $pdo->query("SELECT COUNT(*) FROM leads")->fetchColumn(),
    'contact_leads'   => $pdo->query("SELECT COUNT(*) FROM leads WHERE form_type = 'contact_form'")->fetchColumn(),
    'proposal_leads'  => $pdo->query("SELECT COUNT(*) FROM leads WHERE form_type = 'proposal_request'")->fetchColumn(),
    'estimate_leads'  => $pdo->query("SELECT COUNT(*) FROM leads WHERE form_type = 'estimate_modal'")->fetchColumn(),
    'applications'    => $pdo->query("SELECT COUNT(*) FROM job_applications")->fetchColumn(),
    'users'           => $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn(),
];

// Fetch active records with optional search
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
    $records = $stmt->fetchAll();
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
    $records = $stmt->fetchAll();
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
    $records = $stmt->fetchAll();
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
  <!-- Top Navigation -->
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
      <div class="flex items-center gap-3">
        <a href="?tab=<?= htmlspecialchars($tab); ?>&export=csv" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition">
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Export CSV
        </a>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Stat Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
        <span class="text-[11px] text-slate-400 uppercase font-semibold">Total Leads</span>
        <div class="text-2xl font-black text-white mt-1"><?= number_format($stats['total_leads']); ?></div>
      </div>
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
        <span class="text-[11px] text-slate-400 uppercase font-semibold">Contact Forms</span>
        <div class="text-2xl font-black text-cyan-400 mt-1"><?= number_format($stats['contact_leads']); ?></div>
      </div>
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
        <span class="text-[11px] text-slate-400 uppercase font-semibold">Proposals</span>
        <div class="text-2xl font-black text-indigo-400 mt-1"><?= number_format($stats['proposal_leads']); ?></div>
      </div>
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
        <span class="text-[11px] text-slate-400 uppercase font-semibold">Estimates</span>
        <div class="text-2xl font-black text-amber-400 mt-1"><?= number_format($stats['estimate_leads']); ?></div>
      </div>
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
        <span class="text-[11px] text-slate-400 uppercase font-semibold">Job Applies</span>
        <div class="text-2xl font-black text-emerald-400 mt-1"><?= number_format($stats['applications']); ?></div>
      </div>
      <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
        <span class="text-[11px] text-slate-400 uppercase font-semibold">Registered Users</span>
        <div class="text-2xl font-black text-pink-400 mt-1"><?= number_format($stats['users']); ?></div>
      </div>
    </div>

    <!-- Filters & Search -->
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
        <button type="submit" class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded-xl border border-slate-700">Search</button>
      </form>
    </div>

    <!-- Data Table -->
    <div class="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <?php if (empty($records)): ?>
        <div class="p-12 text-center text-slate-400">
          <p class="text-base font-semibold">No records found</p>
          <p class="text-xs text-slate-500 mt-1">Submit a form or user payload to see it appear here instantly!</p>
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
                        <?= htmlspecialchars($r['job_title']); ?>
                      </span>
                    </td>
                    <td class="p-4">
                      <div class="font-bold text-white"><?= htmlspecialchars($r['applicant_name']); ?></div>
                      <?php if (!empty($r['experience_years'])): ?>
                        <div class="text-[10px] text-slate-400 mt-0.5">Exp: <?= htmlspecialchars($r['experience_years']); ?></div>
                      <?php endif; ?>
                    </td>
                    <td class="p-4 space-y-1">
                      <a href="mailto:<?= htmlspecialchars($r['applicant_email']); ?>" class="text-cyan-400 hover:underline block"><?= htmlspecialchars($r['applicant_email']); ?></a>
                      <a href="tel:<?= htmlspecialchars($r['applicant_phone']); ?>" class="text-slate-300 hover:underline block"><?= htmlspecialchars($r['applicant_phone']); ?></a>
                    </td>
                    <td class="p-4 space-y-1">
                      <?php if (!empty($r['portfolio_url'])): ?>
                        <a href="<?= htmlspecialchars($r['portfolio_url']); ?>" target="_blank" class="text-blue-400 hover:underline text-[11px] block">Portfolio Link &rarr;</a>
                      <?php endif; ?>
                      <?php if (!empty($r['linkedin_url'])): ?>
                        <a href="<?= htmlspecialchars($r['linkedin_url']); ?>" target="_blank" class="text-cyan-400 hover:underline text-[11px] block">LinkedIn Profile &rarr;</a>
                      <?php endif; ?>
                    </td>
                    <td class="p-4 max-w-xs text-slate-300 truncate" title="<?= htmlspecialchars($r['cover_note']); ?>">
                      <?= htmlspecialchars($r['cover_note']); ?>
                    </td>

                  <?php elseif ($tab === 'users'): ?>
                    <td class="p-4 font-bold text-white">
                      <?= htmlspecialchars($r['name']); ?>
                    </td>
                    <td class="p-4">
                      <a href="mailto:<?= htmlspecialchars($r['email']); ?>" class="text-cyan-400 hover:underline"><?= htmlspecialchars($r['email']); ?></a>
                    </td>
                    <td class="p-4">
                      <span class="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                        <?= htmlspecialchars($r['gender'] ?: 'Not Specified'); ?>
                      </span>
                    </td>
                    <td class="p-4 font-semibold text-slate-300">
                      <?= htmlspecialchars($r['country'] ?: 'Not Specified'); ?>
                    </td>

                  <?php else: ?>
                    <td class="p-4 whitespace-nowrap">
                      <?php 
                        $badgeClasses = [
                          'contact_form'     => 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                          'proposal_request' => 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
                          'estimate_modal'   => 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                        ][$r['form_type']] ?? 'bg-slate-700 text-slate-300';
                      ?>
                      <span class="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border <?= $badgeClasses; ?>">
                        <?= str_replace('_', ' ', htmlspecialchars($r['form_type'])); ?>
                      </span>
                    </td>
                    <td class="p-4">
                      <div class="font-bold text-white"><?= htmlspecialchars($r['name']); ?></div>
                      <?php if (!empty($r['company'])): ?>
                        <div class="text-[11px] text-slate-400"><?= htmlspecialchars($r['company']); ?></div>
                      <?php endif; ?>
                    </td>
                    <td class="p-4 space-y-1">
                      <a href="mailto:<?= htmlspecialchars($r['email']); ?>" class="text-cyan-400 hover:underline block"><?= htmlspecialchars($r['email']); ?></a>
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
                      <div class="line-clamp-2" title="<?= htmlspecialchars($r['message']); ?>">
                        <?= htmlspecialchars($r['message']); ?>
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
