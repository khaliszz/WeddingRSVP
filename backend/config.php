<?php
header('Content-Type: application/json');

function loadEnv(string $path): array {
    if (!is_readable($path)) {
        return [];
    }

    $vars = [];
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') {
            continue;
        }

        $parts = explode('=', $line, 2);
        if (count($parts) !== 2) {
            continue;
        }

        [$key, $value] = $parts;
        $vars[trim($key)] = trim($value, " \t\n\r\0\x0B\"'");
    }

    return $vars;
}

$env = loadEnv(dirname(__DIR__) . '/.env');

echo json_encode([
    'supabaseUrl' => $env['SUPABASE_URL'] ?? '',
    'supabaseKey' => $env['SUPABASE_ANON_KEY'] ?? '',
]);
