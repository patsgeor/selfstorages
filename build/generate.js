#!/usr/bin/env node
/* ============================================================================
   GENERATOR — παράγει ΟΛΟ τον στατικό ιστότοπο
   ----------------------------------------------------------------------------
   ΧΡΗΣΗ:   node build/generate.js

   Τι κάνει:
     1. Παράγει όλες τις σελίδες HTML από τα templates + js/data.js
     2. Δημιουργεί placeholder εικόνες (αν λείπουν)
     3. Δημιουργεί favicon package
     4. Δημιουργεί robots.txt, sitemap.xml, sitemap-images.xml,
        manifest.json, browserconfig.xml
     5. Ελέγχει μοναδικότητα title/description και εγκυρότητα JSON-LD

   ΣΗΜΑΝΤΙΚΟ: ο ιστότοπος ΔΕΝ χρειάζεται αυτό το script για να λειτουργήσει.
   Τα παραγόμενα .html είναι πλήρη στατικά αρχεία. Το script χρειάζεται μόνο
   όταν αλλάζετε δεδομένα ή κοινά στοιχεία (navbar/footer).
   ========================================================================= */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const { layout, D, SITE } = require('./templates/layout.js');
const main = require('./pages-main.js');
const secondary = require('./pages-secondary.js');
const locations = require('./pages-locations.js');
const blog = require('./pages-blog.js');

const log = [];
function say(msg) { log.push(msg); console.log(msg); }
let problemsEarly = 0;   // προβλήματα που εντοπίζονται πριν τους τελικούς ελέγχους

/* ==========================================================================
   1. ΣΥΓΚΕΝΤΡΩΣΗ ΣΕΛΙΔΩΝ
   ========================================================================== */
const pages = [
  main.home(), main.about(), main.services(), main.storage(), main.taxOffice(), main.moving(),
  secondary.prices(), secondary.areas(), secondary.faq(), secondary.contact(),
  secondary.privacy(), secondary.cookies(), secondary.terms(), secondary.notFound()
].concat(locations.all()).concat(blog.all());

/* ==========================================================================
   2. ΕΓΓΡΑΦΗ HTML
   ========================================================================== */
let written = 0;
pages.forEach(function (p) {
  const html = layout(p);
  const out = path.join(ROOT, p.slug);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, 'utf8');
  written++;
});
say('✓ Γράφτηκαν ' + written + ' σελίδες HTML');

/* ==========================================================================
   3. PLACEHOLDER ΕΙΚΟΝΕΣ
   Δημιουργούνται μόνο αν λείπει το αρχείο, ώστε να μην αντικαταστήσουν
   ποτέ πραγματικές φωτογραφίες που έχει ανεβάσει ο χρήστης.
   ========================================================================== */
function placeholderSVG(w, h, label, hint, hue) {
  const c1 = 'hsl(' + hue + ',45%,26%)';
  const c2 = 'hsl(' + hue + ',40%,42%)';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" role="img" aria-label="' + label + '">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient>' +
    '<pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">' +
    '<path d="M0 0h40v40H0z" fill="none"/><path d="M0 0h40M0 0v40" stroke="rgba(255,255,255,.07)" stroke-width="1"/>' +
    '</pattern></defs>' +
    '<rect width="' + w + '" height="' + h + '" fill="url(#g)"/>' +
    '<rect width="' + w + '" height="' + h + '" fill="url(#p)"/>' +
    '<g fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3">' +
    '<rect x="' + (w / 2 - 60) + '" y="' + (h / 2 - 78) + '" width="120" height="86" rx="6"/>' +
    '<path d="M' + (w / 2 - 60) + ' ' + (h / 2 - 50) + 'h120M' + (w / 2) + ' ' + (h / 2 - 78) + 'v28"/>' +
    '</g>' +
    '<text x="50%" y="' + (h / 2 + 34) + '" text-anchor="middle" font-family="system-ui,sans-serif" ' +
    'font-size="' + Math.max(13, Math.round(w / 34)) + '" font-weight="700" fill="#fff">' + label + '</text>' +
    '<text x="50%" y="' + (h / 2 + 34 + Math.max(20, Math.round(w / 26))) + '" text-anchor="middle" ' +
    'font-family="system-ui,sans-serif" font-size="' + Math.max(11, Math.round(w / 52)) + '" fill="rgba(255,255,255,.75)">' + hint + '</text>' +
    '</svg>';
}

/* Οι προδιαγραφές αντλούνται από το js/data.js — placeholder φτιάχνεται ΜΟΝΟ
   αν λείπει το αρχείο που δηλώνεται εκεί. Έτσι, μόλις βάλετε πραγματικές
   φωτογραφίες, τα placeholders δεν ξαναδημιουργούνται σε κάθε build.       */
const IMAGE_SPECS = {
  hero:       [1600, 900, 'ΦΩΤΟΓΡΑΦΙΑ HERO', 'Διάδρομος με αποθήκες — 1600×900', 215],
  about:      [900, 600, 'ΦΩΤΟΓΡΑΦΙΑ «ΠΟΙΟΙ ΕΙΜΑΣΤΕ»', 'Ράφια με κιβώτια — 900×600', 200],
  security:   [800, 600, 'ΦΩΤΟΓΡΑΦΙΑ ΑΣΦΑΛΕΙΑΣ', 'Πόρτες αποθηκών — 800×600', 40],
  moving:     [800, 600, 'ΦΩΤΟΓΡΑΦΙΑ ΜΕΤΑΚΟΜΙΣΗΣ', 'Φόρτωση κιβωτίων — 800×600', 170],
  calculator: [500, 380, 'ΕΙΚΟΝΑ ΥΠΟΛΟΓΙΣΤΗ', 'Αποθήκη με έπιπλα — 500×380', 260],
  ogDefault:  [1200, 630, 'OPEN GRAPH', 'Εικόνα κοινοποίησης — 1200×630', 215]
};

fs.mkdirSync(path.join(ROOT, 'images'), { recursive: true });
let imgCreated = 0, imgReal = 0;
const imgMissing = [];

Object.keys(D.images).forEach(function (key) {
  const src = D.images[key].src;                  // π.χ. images/hero.jpg
  const file = path.join(ROOT, src);
  if (fs.existsSync(file)) { imgReal++; return; }

  const spec = IMAGE_SPECS[key];
  if (!spec) { imgMissing.push(src + ' (άγνωστο κλειδί «' + key + '»)'); return; }

  // Placeholder μόνο για .svg — δεν παράγουμε ψεύτικο .jpg/.webp
  if (!/\.svg$/i.test(src)) { imgMissing.push(src); return; }

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, placeholderSVG(spec[0], spec[1], spec[2], spec[3], spec[4]), 'utf8');
  imgCreated++;
});

say('✓ Εικόνες: ' + imgReal + ' πραγματικές' +
    (imgCreated ? ', ' + imgCreated + ' placeholders' : '') +
    (imgMissing.length ? ', ⚠ ' + imgMissing.length + ' ΛΕΙΠΟΥΝ' : ''));
imgMissing.forEach(function (m) { say('  ✗ Λείπει η εικόνα: ' + m); problemsEarly++; });

/* ==========================================================================
   4. FAVICON PACKAGE
   ----------------------------------------------------------------------------
   Το πραγματικό πακέτο (favicon.ico + PNG σε όλα τα μεγέθη) παράγεται από
   το πραγματικό λογότυπο μέσω «node build/make-favicons.js» — ΔΕΝ ξαναγράφεται
   εδώ ώστε να μην αντικατασταθεί κατά λάθος. Αν λείπει εντελώς (π.χ. πρώτο
   build σε νέο μηχάνημα, πριν τρέξει κανείς το make-favicons.js), φτιάχνουμε
   ένα προσωρινό SVG generic ώστε να μη σπάει το site.
   ========================================================================== */
fs.mkdirSync(path.join(ROOT, 'favicon'), { recursive: true });
const REAL_FAVICON = fs.existsSync(path.join(ROOT, 'favicon', 'favicon.ico'));

if (!REAL_FAVICON) {
  const faviconSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">' +
    '<defs><linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#0B5ED7"/><stop offset="1" stop-color="#1E40AF"/></linearGradient></defs>' +
    '<rect width="64" height="64" rx="14" fill="url(#fg)"/>' +
    '<g fill="none" stroke="#fff" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round">' +
    '<path d="M14 24l18-8 18 8-18 8z"/><path d="M14 24v16l18 8 18-8V24"/><path d="M32 32v16"/>' +
    '</g></svg>';
  fs.writeFileSync(path.join(ROOT, 'favicon', 'favicon.svg'), faviconSVG, 'utf8');
  fs.writeFileSync(path.join(ROOT, 'favicon', 'apple-touch-icon.svg'), faviconSVG, 'utf8');
  say('⚠ Favicon: προσωρινό SVG (τρέξτε node build/make-favicons.js για το πραγματικό)');
} else {
  say('✓ Favicon: πραγματικό πακέτο από το λογότυπο selfstorages.gr');
}

/* ==========================================================================
   5. SEO ΑΡΧΕΙΑ
   ========================================================================== */
const today = new Date().toISOString().slice(0, 10);

/* --- Προτεραιότητες: αρχική > υπηρεσίες/τιμές > τοποθεσίες > υπόλοιπα --- */
function priorityFor(slug) {
  if (slug === 'index.html') return '1.0';
  if (/^pages\/(times|enoikiasi-apothikon|forologiki-edra)/.test(slug)) return '0.9';
  if (/^perioches\//.test(slug)) return '0.8';
  if (/^pages\/(ypiresies|perioches|epikoinonia)/.test(slug)) return '0.8';
  if (/^blog\//.test(slug)) return '0.6';
  return '0.5';
}

const indexable = pages.filter(function (p) { return !p.noindex; });

const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  indexable.map(function (p) {
    const loc = SITE + '/' + (p.slug === 'index.html' ? '' : p.slug);
    return '  <url>\n' +
      '    <loc>' + loc + '</loc>\n' +
      '    <lastmod>' + today + '</lastmod>\n' +
      '    <changefreq>' + (/^blog\//.test(p.slug) ? 'monthly' : 'weekly') + '</changefreq>\n' +
      '    <priority>' + priorityFor(p.slug) + '</priority>\n' +
      '  </url>';
  }).join('\n') + '\n</urlset>\n';
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

/* --- sitemap εικόνων --- */
const imageEntries = [
  { page: 'index.html', img: D.images.hero },
  { page: 'pages/sxetika.html', img: D.images.about },
  { page: 'pages/asfaleia-placeholder', img: null }
].filter(function (e) { return e.img; });

D.locations.forEach(function (l) {
  imageEntries.push({ page: 'perioches/' + l.slug + '.html', img: D.images.security });
});
blog.POSTS.forEach(function (p) {
  imageEntries.push({ page: 'blog/' + p.slug + '.html', img: D.images[p.image] });
});

const byPage = {};
imageEntries.forEach(function (e) {
  if (!byPage[e.page]) byPage[e.page] = [];
  byPage[e.page].push(e.img);
});

const sitemapImages = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ' +
  'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
  Object.keys(byPage).map(function (page) {
    const loc = SITE + '/' + (page === 'index.html' ? '' : page);
    return '  <url>\n    <loc>' + loc + '</loc>\n' +
      byPage[page].map(function (img) {
        return '    <image:image>\n' +
          '      <image:loc>' + SITE + '/' + img.src + '</image:loc>\n' +
          '      <image:title>' + img.alt.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</image:title>\n' +
          '    </image:image>';
      }).join('\n') + '\n  </url>';
  }).join('\n') + '\n</urlset>\n';
fs.writeFileSync(path.join(ROOT, 'sitemap-images.xml'), sitemapImages, 'utf8');

/* --- robots.txt --- */
const robots =
'# robots.txt — Self Storages\n' +
'User-agent: *\n' +
'Allow: /\n' +
'\n' +
'# Δεν υπάρχει περιεχόμενο προς απόκρυψη· τα build αρχεία δεν ανεβαίνουν στο production.\n' +
'Disallow: /build/\n' +
'\n' +
'Sitemap: ' + SITE + '/sitemap.xml\n' +
'Sitemap: ' + SITE + '/sitemap-images.xml\n';
fs.writeFileSync(path.join(ROOT, 'robots.txt'), robots, 'utf8');

/* --- manifest.json --- */
const manifest = {
  name: D.business.name + ' — Ενοικίαση Αποθηκών & Φορολογικής Έδρας',
  short_name: D.business.name,
  description: D.business.description,
  lang: 'el',
  dir: 'ltr',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#F8FAFC',
  theme_color: '#0B5ED7',
  icons: REAL_FAVICON ? [
    { src: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png', purpose: 'any' },
    { src: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' }
  ] : [
    { src: '/favicon/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    { src: '/favicon/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml', purpose: 'maskable' }
  ]
};
fs.writeFileSync(path.join(ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

/* --- browserconfig.xml --- */
const browserconfig = '<?xml version="1.0" encoding="utf-8"?>\n' +
'<browserconfig>\n  <msapplication>\n    <tile>\n' +
'      <square150x150logo src="/favicon/' + (REAL_FAVICON ? 'mstile-150x150.png' : 'apple-touch-icon.svg') + '"/>\n' +
'      <TileColor>#0B5ED7</TileColor>\n' +
'    </tile>\n  </msapplication>\n</browserconfig>\n';
fs.writeFileSync(path.join(ROOT, 'browserconfig.xml'), browserconfig, 'utf8');

say('✓ SEO αρχεία: sitemap.xml (' + indexable.length + ' URLs), sitemap-images.xml, robots.txt, manifest.json, browserconfig.xml');

/* ==========================================================================
   6. ΕΛΕΓΧΟΙ ΠΟΙΟΤΗΤΑΣ
   ========================================================================== */
let problems = problemsEarly;

/* Μοναδικά titles */
const titles = {};
pages.forEach(function (p) {
  if (titles[p.title]) { say('  ✗ Διπλό title: "' + p.title + '" (' + p.slug + ' & ' + titles[p.title] + ')'); problems++; }
  titles[p.title] = p.slug;
});

/* Μοναδικές descriptions */
const descs = {};
pages.forEach(function (p) {
  if (descs[p.description]) { say('  ✗ Διπλή description: ' + p.slug + ' & ' + descs[p.description]); problems++; }
  descs[p.description] = p.slug;
});

/* Μήκη */
pages.forEach(function (p) {
  if (p.title.length > 70) { say('  ⚠ Μεγάλο title (' + p.title.length + ' χαρ.): ' + p.slug); }
  if (p.description.length > 165) { say('  ⚠ Μεγάλη description (' + p.description.length + ' χαρ.): ' + p.slug); }
  if (p.description.length < 70) { say('  ⚠ Μικρή description (' + p.description.length + ' χαρ.): ' + p.slug); }
});

/* Εγκυρότητα JSON-LD στο τελικό HTML */
let ldCount = 0;
pages.forEach(function (p) {
  const html = fs.readFileSync(path.join(ROOT, p.slug), 'utf8');
  const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  blocks.forEach(function (blk) {
    const json = blk.replace(/^<script type="application\/ld\+json">/, '').replace(/<\/script>$/, '');
    try { JSON.parse(json); ldCount++; }
    catch (e) { say('  ✗ Άκυρο JSON-LD στο ' + p.slug + ': ' + e.message); problems++; }
  });
  /* Ένα και μοναδικό <h1> ανά σελίδα */
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) { say('  ✗ ' + p.slug + ' έχει ' + h1s + ' <h1> (πρέπει να είναι ακριβώς 1)'); problems++; }
});

say('✓ JSON-LD: ' + ldCount + ' blocks, όλα έγκυρα');
say(problems === 0 ? '\n✅ Ολοκληρώθηκε χωρίς σφάλματα.' : '\n⚠️  Ολοκληρώθηκε με ' + problems + ' πρόβλημα/τα (δείτε παραπάνω).');

process.exit(problems === 0 ? 0 : 1);
