#!/usr/bin/env node
/* ============================================================================
   OPTIMIZE — παράγει τα production assets
   ----------------------------------------------------------------------------
   ΧΡΗΣΗ:  node build/optimize.js   (τρέξτε το ΜΕΤΑ το generate.js)

   Τι κάνει:
     1. Κόβει από το Bootstrap ό,τι δεν χρησιμοποιείται πουθενά στο site
        (PurgeCSS σαρώνει όλα τα .html και .js)
     2. Ενώνει bootstrap-subset + style.css σε ΕΝΑ αρχείο, ώστε να υπάρχει
        ένα μόνο render-blocking request αντί για δύο
     3. Ελαχιστοποιεί CSS και JavaScript

   Παράγει:  css/app.min.css  ·  js/*.min.js
   ========================================================================= */
'use strict';

const fs = require('fs');
const path = require('path');
const { PurgeCSS } = require('purgecss');
const CleanCSS = require('clean-css');
const { minify } = require('terser');

const ROOT = path.join(__dirname, '..');
const kb = function (n) { return (n / 1024).toFixed(1) + ' KB'; };

(async function () {

  /* --- 1. PURGE BOOTSTRAP ------------------------------------------------
     Το πλήρες Bootstrap είναι ~227 KB και χρησιμοποιούμε κάτω από το 5%.
     Κρατάμε μόνο τους κανόνες που ταιριάζουν σε κλάσεις που υπάρχουν
     πραγματικά στο παραγόμενο HTML.                                       */
  const bootstrapPath = path.join(ROOT, 'css', 'bootstrap.min.css');
  const bootstrapRaw = fs.readFileSync(bootstrapPath, 'utf8');

  // Το PurgeCSS χρησιμοποιεί glob: χρειάζεται σχετικές διαδρομές με «/»
  // (τα Windows paths με κενά, όπως «claude workpress», δεν ταιριάζουν).
  process.chdir(ROOT);

  const htmlFiles = [];
  (function collect(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(function (e) {
      if (['build', 'node_modules', '.claude', '.git'].indexOf(e.name) !== -1) return;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) collect(p);
      else if (e.name.endsWith('.html')) htmlFiles.push(path.relative(ROOT, p).split(path.sep).join('/'));
    });
  })(ROOT);

  if (!htmlFiles.length) { console.error('Δεν βρέθηκαν αρχεία HTML — τρέξτε πρώτα node build/generate.js'); process.exit(1); }

  const purged = await new PurgeCSS().purge({
    content: htmlFiles.concat(['js/main.js', 'js/nav.js', 'js/calculator.js', 'js/cookie-consent.js']),
    css: ['css/bootstrap.min.css'],
    // Κλάσεις που προστίθενται δυναμικά από JS και δεν εμφανίζονται στο HTML
    safelist: {
      standard: [
        'show', 'showing', 'collapsing', 'collapse', 'fade', 'active',
        'dropdown-menu', 'dropdown-toggle', 'is-invalid', 'was-validated'
      ],
      deep: [/^dropdown/, /^collapse/, /^navbar/, /^offcanvas/],
      greedy: [/data-bs/]
    },
    variables: true,
    keyframes: true,
    fontFace: false   // τα @font-face μας είναι στο style.css
  });

  const bootstrapSubset = purged[0].css;

  /* --- 2. ΕΝΩΣΗ + MINIFY CSS -------------------------------------------- */
  const styleRaw = fs.readFileSync(path.join(ROOT, 'css', 'style.css'), 'utf8');
  // Το style.css πρέπει να έρθει ΔΕΥΤΕΡΟ ώστε να υπερισχύει του Bootstrap
  const combined = '@charset "UTF-8";\n' +
    bootstrapSubset.replace(/@charset[^;]+;/g, '') + '\n' +
    styleRaw.replace(/@charset[^;]+;/g, '');

  const minified = new CleanCSS({ level: 2, rebase: false }).minify(combined);
  if (minified.errors.length) {
    console.error('Σφάλμα CSS:', minified.errors);
    process.exit(1);
  }
  fs.writeFileSync(path.join(ROOT, 'css', 'app.min.css'), minified.styles, 'utf8');

  console.log('CSS');
  console.log('  bootstrap.min.css   ' + kb(bootstrapRaw.length) + '  →  υποσύνολο ' + kb(bootstrapSubset.length));
  console.log('  style.css           ' + kb(styleRaw.length));
  console.log('  ➜ css/app.min.css   ' + kb(minified.styles.length) +
              '   (εξοικονόμηση ' + kb(bootstrapRaw.length + styleRaw.length - minified.styles.length) + ')');

  /* --- 3. MINIFY JAVASCRIPT --------------------------------------------- */
  const jsFiles = ['nav.js', 'data.js', 'main.js', 'calculator.js', 'cookie-consent.js'];
  console.log('\nJavaScript');
  let jsBefore = 0, jsAfter = 0;

  for (const file of jsFiles) {
    const src = fs.readFileSync(path.join(ROOT, 'js', file), 'utf8');
    const result = await minify(src, {
      compress: { drop_console: false },
      mangle: true,
      format: { comments: false }
    });
    if (result.error) { console.error('Σφάλμα στο ' + file + ':', result.error); process.exit(1); }
    const out = file.replace(/\.js$/, '.min.js');
    fs.writeFileSync(path.join(ROOT, 'js', out), result.code, 'utf8');
    jsBefore += src.length; jsAfter += result.code.length;
    console.log('  ' + file.padEnd(20) + kb(src.length).padStart(9) + '  →  ' + out.padEnd(24) + kb(result.code.length));
  }
  console.log('  ➜ σύνολο JS         ' + kb(jsBefore) + '  →  ' + kb(jsAfter));

  /* --- 4. ΠΡΟ-ΣΥΜΠΙΕΣΗ (gzip + brotli) — ΠΡΟΑΙΡΕΤΙΚΗ -------------------
     ΔΕΝ τη χρειάζεστε σε Hostinger, cPanel ή οποιονδήποτε πάροχο με
     LiteSpeed/Apache: συμπιέζουν αυτόματα. Θα δημιουργούσε απλώς 110
     επιπλέον αχρησιμοποίητα αρχεία.

     Χρησιμεύει μόνο σε nginx με gzip_static/brotli_static, ή σε
     Netlify/Cloudflare Pages. Ενεργοποιήστε τη ρητά:
         node build/optimize.js --precompress                          */
  if (process.argv.indexOf('--precompress') === -1) {
    console.log('\n(Προ-συμπίεση: παραλείφθηκε — δεν χρειάζεται σε Hostinger/LiteSpeed.');
    console.log(' Αν τη θέλετε: node build/optimize.js --precompress)');
    console.log('\n✅ Τα production assets είναι έτοιμα.');
    return;
  }

  const zlib = require('zlib');
  const toCompress = [];
  (function collect(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(function (e) {
      if (['build', 'node_modules', '.claude', '.git', 'fonts'].indexOf(e.name) !== -1) return;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) collect(p);
      else if (/\.(html|css|js|json|xml|svg|txt)$/.test(e.name) && !/\.(gz|br)$/.test(e.name)) toCompress.push(p);
    });
  })(ROOT);

  let rawTotal = 0, gzTotal = 0, brTotal = 0;
  toCompress.forEach(function (file) {
    const buf = fs.readFileSync(file);
    rawTotal += buf.length;
    const gz = zlib.gzipSync(buf, { level: 9 });
    fs.writeFileSync(file + '.gz', gz); gzTotal += gz.length;
    const br = zlib.brotliCompressSync(buf, {
      params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 }
    });
    fs.writeFileSync(file + '.br', br); brTotal += br.length;
  });

  console.log('\nΠρο-συμπίεση (' + toCompress.length + ' αρχεία)');
  console.log('  αρχικό  ' + kb(rawTotal));
  console.log('  gzip    ' + kb(gzTotal) + '  (-' + Math.round((1 - gzTotal / rawTotal) * 100) + '%)');
  console.log('  brotli  ' + kb(brTotal) + '  (-' + Math.round((1 - brTotal / rawTotal) * 100) + '%)');

  console.log('\n✅ Τα production assets είναι έτοιμα.');
})();
