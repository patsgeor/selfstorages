#!/usr/bin/env node
/* ============================================================================
   DIST — φτιάχνει τον φάκελο που ανεβάζετε στο hosting
   ----------------------------------------------------------------------------
   ΧΡΗΣΗ:
     node build/dist.js              → για Hostinger / LiteSpeed / cPanel
                                        (ΧΩΡΙΣ προ-συμπιεσμένα αρχεία)
     node build/dist.js --precompress → για nginx με gzip_static/brotli_static
                                        ή Netlify/Cloudflare Pages

   Δημιουργεί τον φάκελο /dist με ΜΟΝΟ τα αρχεία που χρειάζεται ο ιστότοπος.
   Ανεβάζετε το ΠΕΡΙΕΧΟΜΕΝΟ του dist/ στο public_html του hosting σας.

   ΔΕΝ αντιγράφονται: build/, node_modules/, package.json, package-lock.json,
   .claude/, README.md, τα μη ελαχιστοποιημένα css/js και τα άδεια directories.
   ========================================================================= */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PRECOMPRESS = process.argv.indexOf('--precompress') !== -1;

/* --- Τι ΔΕΝ πάει ποτέ στο production ----------------------------------- */
const EXCLUDE_DIRS = new Set(['build', 'node_modules', '.claude', '.git', 'dist', 'assets']);
const EXCLUDE_FILES = new Set([
  'package.json', 'package-lock.json', 'README.md', '.gitignore'
]);

/* Τα μη ελαχιστοποιημένα assets: το production HTML δείχνει στα .min
   και στο app.min.css, οπότε αυτά είναι περιττά στον διακομιστή.        */
const EXCLUDE_EXACT = new Set([
  'css/bootstrap.min.css',   // ενσωματώθηκε στο app.min.css
  'css/style.css',           // ενσωματώθηκε στο app.min.css
  'js/data.js', 'js/main.js', 'js/nav.js',
  'js/calculator.js', 'js/cookie-consent.js'
]);

function kb(n) { return (n / 1024).toFixed(1) + ' KB'; }

/* --- Καθαρισμός προηγούμενου dist -------------------------------------- */
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

/* --- Αντιγραφή ---------------------------------------------------------- */
let copied = 0, skipped = 0, bytes = 0;
const byType = {};

(function copyDir(srcDir, relBase) {
  fs.readdirSync(srcDir, { withFileTypes: true }).forEach(function (entry) {
    const rel = relBase ? relBase + '/' + entry.name : entry.name;
    const src = path.join(srcDir, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) return;
      copyDir(src, rel);
      return;
    }

    if (EXCLUDE_FILES.has(entry.name)) { skipped++; return; }
    if (EXCLUDE_EXACT.has(rel)) { skipped++; return; }

    // Προ-συμπιεσμένα: μόνο αν ζητηθούν ρητά
    if (/\.(gz|br)$/.test(entry.name)) {
      if (!PRECOMPRESS) { skipped++; return; }
    }

    const dest = path.join(DIST, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);

    const size = fs.statSync(src).size;
    bytes += size; copied++;
    const ext = path.extname(entry.name).slice(1) || 'other';
    byType[ext] = (byType[ext] || { n: 0, b: 0 });
    byType[ext].n++; byType[ext].b += size;
  });
})(ROOT, '');

/* --- Έλεγχος: υπάρχουν τα κρίσιμα αρχεία; ------------------------------ */
const required = ['index.html', '404.html', 'css/app.min.css', 'js/main.min.js',
                  'robots.txt', 'sitemap.xml', 'manifest.json'];
const missing = required.filter(function (f) { return !fs.existsSync(path.join(DIST, f)); });

/* --- Έλεγχος: δείχνει το HTML στα σωστά (minified) assets; ------------- */
const indexHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const usesProd = indexHtml.indexOf('css/app.min.css') !== -1 &&
                 indexHtml.indexOf('js/main.min.js') !== -1;

/* --- Αναφορά ------------------------------------------------------------ */
console.log('📦 Φάκελος dist/ έτοιμος\n');
console.log('   Αρχεία:      ' + copied);
console.log('   Μέγεθος:     ' + kb(bytes));
console.log('   Παραλείφθηκαν: ' + skipped + (PRECOMPRESS ? '' : ' (μαζί με τα .gz/.br)'));
console.log('');
Object.keys(byType).sort().forEach(function (ext) {
  console.log('   .' + ext.padEnd(6) + String(byType[ext].n).padStart(3) + ' αρχεία   ' + kb(byType[ext].b).padStart(10));
});

console.log('');
if (missing.length) {
  console.log('❌ ΛΕΙΠΟΥΝ κρίσιμα αρχεία: ' + missing.join(', '));
  console.log('   Τρέξτε πρώτα: node build/generate.js --prod && node build/optimize.js');
  process.exit(1);
}
if (!usesProd) {
  console.log('❌ Το HTML δεν δείχνει στα ελαχιστοποιημένα assets.');
  console.log('   Τρέξτε: node build/generate.js --prod && node build/optimize.js && node build/dist.js');
  process.exit(1);
}

console.log('✅ Όλα τα κρίσιμα αρχεία υπάρχουν και το HTML δείχνει στα σωστά assets.');
console.log('');
console.log('👉 Ανεβάστε το ΠΕΡΙΕΧΟΜΕΝΟ του φακέλου dist/ στο public_html του hosting.');
if (!PRECOMPRESS) {
  console.log('   (Χωρίς .gz/.br — η Hostinger/LiteSpeed συμπιέζει αυτόματα.)');
}
