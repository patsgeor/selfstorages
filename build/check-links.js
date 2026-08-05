#!/usr/bin/env node
/* ============================================================================
   ΕΛΕΓΚΤΗΣ ΣΥΝΔΕΣΜΩΝ — node build/check-links.js
   Σαρώνει κάθε .html και επιβεβαιώνει ότι κάθε εσωτερικός σύνδεσμος,
   εικόνα, CSS και JS που αναφέρεται υπάρχει πραγματικά στον δίσκο.
   Ελέγχει επίσης τα anchors (#id) ότι δείχνουν σε υπαρκτό στοιχείο.
   ========================================================================= */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP_DIRS = new Set(['build', 'node_modules', '.claude', '.git', 'dist']);

function walk(dir, acc) {
  acc = acc || [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (e) {
    if (SKIP_DIRS.has(e.name)) return;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.html')) acc.push(p);
  });
  return acc;
}

const files = walk(ROOT);
const refMap = {};      // target -> Set(pages)
const anchorProblems = [];
let externalCount = 0;

files.forEach(function (file) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const dir = path.posix.dirname(rel);
  const html = fs.readFileSync(file, 'utf8');

  // Όλα τα ids που υπάρχουν στη σελίδα (για έλεγχο anchors)
  const ids = new Set((html.match(/\sid="([^"]+)"/g) || []).map(function (m) {
    return m.match(/id="([^"]+)"/)[1];
  }));

  const refs = [];
  const re = /(?:href|src)="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) refs.push(m[1]);

  refs.forEach(function (raw) {
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(raw)) { externalCount++; return; }

    // Καθαρός anchor στην ίδια σελίδα
    if (raw.startsWith('#')) {
      const id = raw.slice(1);
      if (id && id !== '' && !ids.has(id)) anchorProblems.push(rel + '  ->  ' + raw);
      return;
    }

    const hashIdx = raw.indexOf('#');
    const filePart = (hashIdx >= 0 ? raw.slice(0, hashIdx) : raw).split('?')[0];
    const hashPart = hashIdx >= 0 ? raw.slice(hashIdx + 1) : '';
    if (!filePart) return;

    const target = filePart.startsWith('/')
      ? filePart.slice(1)
      : path.posix.normalize(path.posix.join(dir === '.' ? '' : dir, filePart));

    if (!refMap[target]) refMap[target] = new Set();
    refMap[target].add(rel);

    // Anchor σε ΑΛΛΗ σελίδα
    if (hashPart) {
      const tgtFile = path.join(ROOT, target);
      if (fs.existsSync(tgtFile) && tgtFile.endsWith('.html')) {
        const tgtHtml = fs.readFileSync(tgtFile, 'utf8');
        if (!new RegExp('\\sid="' + hashPart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"').test(tgtHtml)) {
          anchorProblems.push(rel + '  ->  ' + raw + '  (το #' + hashPart + ' δεν υπάρχει στο ' + target + ')');
        }
      }
    }
  });
});

const targets = Object.keys(refMap).sort();
const missing = targets.filter(function (t) { return !fs.existsSync(path.join(ROOT, t)); });

console.log('Σελίδες HTML:            ' + files.length);
console.log('Μοναδικοί εσωτερικοί:    ' + targets.length);
console.log('Εξωτερικοί σύνδεσμοι:    ' + externalCount);
console.log('');

if (missing.length) {
  console.log('❌ ΣΠΑΣΜΕΝΑ (' + missing.length + '):');
  missing.forEach(function (t) {
    console.log('   ✗ ' + t + '\n     αναφέρεται από: ' + Array.from(refMap[t]).slice(0, 4).join(', '));
  });
} else {
  console.log('✅ Κανένας σπασμένος εσωτερικός σύνδεσμος ή asset.');
}

if (anchorProblems.length) {
  console.log('\n⚠️  Anchors που δεν βρέθηκαν (' + anchorProblems.length + '):');
  anchorProblems.forEach(function (a) { console.log('   ' + a); });
} else {
  console.log('✅ Όλα τα anchors (#) δείχνουν σε υπαρκτά στοιχεία.');
}

process.exit(missing.length || anchorProblems.length ? 1 : 0);
