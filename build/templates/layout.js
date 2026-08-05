/* ============================================================================
   LAYOUT — το κοινό «κέλυφος» κάθε σελίδας
   ----------------------------------------------------------------------------
   Εδώ ορίζονται μία φορά: <head>, navbar, footer, cookie banner, floating
   buttons και τα scripts. Αλλαγή εδώ → ισχύει σε ΟΛΕΣ τις σελίδες μετά από
   «node build/generate.js».
   ========================================================================= */
'use strict';

const fs = require('fs');
const path = require('path');
const D = require('../../js/data.js');

const ROOT = path.join(__dirname, '..', '..');
const SPRITE = fs.readFileSync(path.join(ROOT, 'icons', 'sprite.svg'), 'utf8');

/* --- Βοηθητικά ---------------------------------------------------------- */

/** Escape για ασφαλή τοποθέτηση σε HTML attribute/κείμενο. */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Εικονίδιο από το inline sprite. */
function icon(name, cls) {
  return '<svg class="bi ' + (cls || '') + '" width="1em" height="1em" aria-hidden="true" focusable="false">' +
         '<use href="#i-' + name + '"></use></svg>';
}

/** Πρόθεμα διαδρομής ανάλογα με το βάθος της σελίδας (0 = ρίζα). */
function base(depth) { return depth === 0 ? '' : '../'; }

const SITE = D.business.domain;

/* Production mode: «node build/generate.js --prod» χρησιμοποιεί τα
   ελαχιστοποιημένα, ενωμένα assets που παράγει το build/optimize.js. */
const PROD = process.argv.indexOf('--prod') !== -1;

/* Αν έχει τρέξει το build/make-favicons.js, υπάρχει το πραγματικό
   favicon.ico (από το λογότυπο) — αλλιώς πέφτουμε πίσω στο γενόσημο SVG. */
const REAL_FAVICON = fs.existsSync(path.join(ROOT, 'favicon', 'favicon.ico'));

/* --- Δομή πλοήγησης -----------------------------------------------------
   Ένα σημείο αλήθειας: χρησιμοποιείται και στη navbar και στο footer.     */
const NAV = [
  { id: 'home', label: 'Αρχική', href: 'index.html' },
  {
    id: 'company', label: 'Εταιρεία', children: [
      { id: 'about', label: 'Σχετικά με εμάς', href: 'pages/sxetika.html' },
      { id: 'faq', label: 'Συχνές Ερωτήσεις', href: 'pages/faq.html' },
      { id: 'blog', label: 'Άρθρα & Οδηγοί', href: 'blog/index.html' }
    ]
  },
  {
    id: 'services', label: 'Υπηρεσίες', href: 'pages/ypiresies.html', children: [
      { id: 'services', label: 'Όλες οι υπηρεσίες', href: 'pages/ypiresies.html' },
      { id: 'storage', label: 'Ενοικίαση Αποθηκών', href: 'pages/enoikiasi-apothikon.html' },
      { id: 'tax', label: 'Φορολογική Έδρα & Virtual Office', href: 'pages/forologiki-edra-virtual-office.html' },
      { id: 'moving', label: 'Μετακομίσεις & Μεταφορές', href: 'pages/metakomiseis.html' }
    ]
  },
  {
    id: 'areas', label: 'Περιοχές', href: 'pages/perioches.html', children:
      [{ id: 'areas', label: 'Όλες οι περιοχές', href: 'pages/perioches.html' }]
        .concat(D.locations.map(function (l) {
          return { id: l.slug, label: l.name, href: 'perioches/' + l.slug + '.html' };
        }))
  },
  { id: 'prices', label: 'Τιμές', href: 'pages/times.html' },
  { id: 'contact', label: 'Επικοινωνία', href: 'pages/epikoinonia.html' }
];

/* --- Navbar -------------------------------------------------------------- */
function renderNav(active, b) {
  const items = NAV.map(function (item) {
    // Ενεργό αν είναι η ίδια σελίδα ή αν περιέχει την ενεργή σελίδα
    const selfActive = item.id === active;
    const childActive = item.children && item.children.some(function (c) { return c.id === active; });
    const isActive = selfActive || childActive;

    if (item.children) {
      const menu = item.children.map(function (c) {
        return '<li><a class="dropdown-item' + (c.id === active ? ' active' : '') + '" href="' +
               b + c.href + '"' + (c.id === active ? ' aria-current="page"' : '') + '>' + esc(c.label) + '</a></li>';
      }).join('');
      return '<li class="nav-item dropdown">' +
        '<a class="nav-link dropdown-toggle' + (isActive ? ' active' : '') + '" href="' +
        (item.href ? b + item.href : '#') + '" role="button" data-bs-toggle="dropdown" aria-expanded="false">' +
        esc(item.label) + '</a>' +
        '<ul class="dropdown-menu">' + menu + '</ul></li>';
    }
    return '<li class="nav-item"><a class="nav-link' + (isActive ? ' active' : '') + '" href="' +
      b + item.href + '"' + (isActive ? ' aria-current="page"' : '') + '>' + esc(item.label) + '</a></li>';
  }).join('');

  return '' +
  '<header class="site-header">' +
    '<nav class="navbar navbar-expand-lg container" aria-label="Κύρια πλοήγηση">' +
      '<a class="navbar-brand" href="' + b + 'index.html">' +
        '<img class="brand-logo" src="' + b + 'images/logo.png" alt="Self Storages — Αποθήκες &amp; Φορολογικές Έδρες" width="340" height="110">' +
      '</a>' +
      '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" ' +
        'aria-controls="mainNav" aria-expanded="false" aria-label="Άνοιγμα μενού πλοήγησης">' +
        '<span class="navbar-toggler-icon"></span></button>' +
      '<div class="collapse navbar-collapse" id="mainNav">' +
        '<ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">' + items + '</ul>' +
        '<a class="nav-phone ms-lg-3" href="tel:+30' + D.contact.phonePrimary + '">' +
          icon('telephone-fill') + '<span>' + D.contact.phonePrimaryDisplay + '</span></a>' +
      '</div>' +
    '</nav>' +
  '</header>';
}

/* --- Breadcrumbs (ορατά + Schema) --------------------------------------- */
function renderBreadcrumbs(crumbs, b) {
  if (!crumbs || !crumbs.length) return '';
  const items = crumbs.map(function (c, i) {
    const isLast = i === crumbs.length - 1;
    if (isLast) {
      return '<li class="breadcrumb-item active" aria-current="page">' + esc(c.name) + '</li>';
    }
    return '<li class="breadcrumb-item"><a href="' + b + c.href + '">' + esc(c.name) + '</a></li>';
  }).join('');
  return '<div class="breadcrumb-bar"><div class="container">' +
    '<nav aria-label="Διαδρομή πλοήγησης"><ol class="breadcrumb">' + items + '</ol></nav>' +
    '</div></div>';
}

function breadcrumbSchema(crumbs) {
  if (!crumbs || crumbs.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(function (c, i) {
      return {
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: SITE + '/' + (c.href === 'index.html' ? '' : c.href)
      };
    })
  };
}

/* --- Footer -------------------------------------------------------------- */
function renderFooter(b) {
  const areaLinks = D.locations.map(function (l) {
    return '<li><a href="' + b + 'perioches/' + l.slug + '.html">Αποθήκες ' + esc(l.name) + '</a></li>';
  }).join('');

  const social = [];
  if (D.social.facebook) social.push('<a href="' + esc(D.social.facebook) + '" aria-label="Facebook" rel="noopener" target="_blank">' + icon('facebook') + '</a>');
  if (D.social.instagram) social.push('<a href="' + esc(D.social.instagram) + '" aria-label="Instagram" rel="noopener" target="_blank">' + icon('instagram') + '</a>');
  if (D.social.linkedin) social.push('<a href="' + esc(D.social.linkedin) + '" aria-label="LinkedIn" rel="noopener" target="_blank">' + icon('linkedin') + '</a>');
  const socialRow = social.length ? '<div class="social-row">' + social.join('') + '</div>' : '';

  return '' +
  '<footer class="site-footer">' +
    '<div class="container">' +
      '<div class="row g-4 g-lg-5">' +

        '<div class="col-lg-4 col-md-6">' +
          '<a class="footer-brand" href="' + b + 'index.html">' +
            '<img class="brand-logo brand-logo-footer" src="' + b + 'images/logo.png" alt="Self Storages" width="340" height="110">' +
          '</a>' +
          '<p>Οικογενειακή επιχείρηση από το ' + D.business.foundedYear + '. Ενοικίαση αποθηκών, ' +
            'παταριών και φορολογικής έδρας σε ' + D.locations.length + ' σημεία της Αττικής.</p>' +
          socialRow +
        '</div>' +

        '<div class="col-lg-2 col-md-6 col-6">' +
          '<h3 class="footer-h">Υπηρεσίες</h3><ul>' +
            '<li><a href="' + b + 'pages/enoikiasi-apothikon.html">Ενοικίαση Αποθηκών</a></li>' +
            '<li><a href="' + b + 'pages/forologiki-edra-virtual-office.html">Φορολογική Έδρα</a></li>' +
            '<li><a href="' + b + 'pages/metakomiseis.html">Μετακομίσεις</a></li>' +
            '<li><a href="' + b + 'pages/times.html">Τιμές</a></li>' +
          '</ul>' +
        '</div>' +

        '<div class="col-lg-2 col-md-6 col-6">' +
          '<h3 class="footer-h">Περιοχές</h3><ul>' + areaLinks +
            '<li><a href="' + b + 'pages/perioches.html">Όλες οι περιοχές</a></li>' +
          '</ul>' +
        '</div>' +

        '<div class="col-lg-2 col-md-6 col-6">' +
          '<h3 class="footer-h">Εταιρεία</h3><ul>' +
            '<li><a href="' + b + 'pages/sxetika.html">Σχετικά με εμάς</a></li>' +
            '<li><a href="' + b + 'pages/faq.html">Συχνές Ερωτήσεις</a></li>' +
            '<li><a href="' + b + 'blog/index.html">Άρθρα &amp; Οδηγοί</a></li>' +
            '<li><a href="' + b + 'pages/epikoinonia.html">Επικοινωνία</a></li>' +
          '</ul>' +
        '</div>' +

        '<div class="col-lg-2 col-md-6">' +
          '<h3 class="footer-h">Επικοινωνία</h3>' +
          '<div class="footer-contact-line"><span class="fc-ico" aria-hidden="true">' + icon('telephone-fill') + '</span>' +
            '<span><a href="tel:+30' + D.contact.phonePrimary + '">' + D.contact.phonePrimaryDisplay + '</a><br>' +
            D.contact.phonesMobile.map(function (p) {
              return '<a href="tel:+30' + p + '">' + p + '</a>';
            }).join('<br>') + '</span></div>' +
          '<div class="footer-contact-line"><span class="fc-ico" aria-hidden="true">' + icon('envelope-fill') + '</span>' +
            '<span><a href="mailto:' + D.contact.email + '">' + D.contact.email + '</a></span></div>' +
          '<div class="footer-contact-line"><span class="fc-ico" aria-hidden="true">' + icon('clock-fill') + '</span>' +
            '<span>Δευ–Παρ<br>' + esc(D.contact.hoursText) + '</span></div>' +
        '</div>' +

      '</div>' +

      '<div class="footer-bottom">' +
        '<div>&copy; ' + new Date().getFullYear() + ' Self Storages. Με επιφύλαξη παντός δικαιώματος.</div>' +
        '<div class="footer-legal">' +
          '<a href="' + b + 'pages/privacy-policy.html">Πολιτική Απορρήτου</a>' +
          '<a href="' + b + 'pages/cookies.html">Cookies</a>' +
          '<a href="' + b + 'pages/oroi-xrisis.html">Όροι Χρήσης</a>' +
          '<a href="#" data-cookie-settings>Ρυθμίσεις Cookies</a>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</footer>';
}

/* --- Floating actions (κλήση / WhatsApp / πάνω) -------------------------- */
function renderFloatingActions() {
  return '' +
  '<div class="float-actions">' +
    // WCAG 2.5.3: το accessible name ΠΡΕΠΕΙ να περιέχει το ορατό κείμενο («Κλήση»)
    '<a class="fab fab-call" href="tel:+30' + D.contact.phonePrimary + '" aria-label="Κλήση στο ' + D.contact.phonePrimaryDisplay + '">' +
      icon('telephone-fill') + '<span class="d-sm-none">Κλήση</span></a>' +
    '<a class="fab fab-wa" href="https://wa.me/' + D.contact.whatsapp + '" target="_blank" rel="noopener" aria-label="Επικοινωνία μέσω WhatsApp">' +
      icon('whatsapp') + '<span class="d-sm-none">WhatsApp</span></a>' +
    '<button class="fab fab-top" type="button" aria-label="Επιστροφή στην κορυφή">' + icon('arrow-up') + '</button>' +
  '</div>';
}

/* --- Cookie banner ------------------------------------------------------- */
function renderCookieBanner(b) {
  return '' +
  '<div class="cookie-banner" id="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-hidden="true">' +
    '<h2 id="cookie-title">Χρησιμοποιούμε cookies</h2>' +
    '<p>Τα απαραίτητα cookies κρατούν τον ιστότοπο λειτουργικό. Με τη συγκατάθεσή σας ' +
      'χρησιμοποιούμε επιπλέον cookies στατιστικών και marketing. ' +
      'Δείτε την <a href="' + b + 'pages/cookies.html">Πολιτική Cookies</a>.</p>' +
    '<div class="cookie-actions">' +
      '<button class="btn btn-brand" type="button" id="cookie-accept-all">Αποδοχή όλων</button>' +
      '<button class="btn btn-outline-brand" type="button" id="cookie-reject">Μόνο τα απαραίτητα</button>' +
      '<button class="btn btn-outline-brand" type="button" id="cookie-customize" aria-expanded="false" aria-controls="cookie-prefs">Ρυθμίσεις</button>' +
    '</div>' +
    '<div class="cookie-prefs" id="cookie-prefs" hidden>' +
      '<div class="form-check">' +
        '<input class="form-check-input" type="checkbox" id="cookie-necessary" checked disabled>' +
        '<label class="form-check-label" for="cookie-necessary">Απαραίτητα' +
          '<small>Πάντα ενεργά. Χωρίς αυτά ο ιστότοπος δεν λειτουργεί.</small></label>' +
      '</div>' +
      '<div class="form-check">' +
        '<input class="form-check-input" type="checkbox" id="cookie-stats">' +
        '<label class="form-check-label" for="cookie-stats">Στατιστικά' +
          '<small>Μας βοηθούν να καταλάβουμε πώς χρησιμοποιείται ο ιστότοπος.</small></label>' +
      '</div>' +
      '<div class="form-check">' +
        '<input class="form-check-input" type="checkbox" id="cookie-marketing">' +
        '<label class="form-check-label" for="cookie-marketing">Marketing' +
          '<small>Χρησιμοποιούνται για εξατομικευμένες διαφημίσεις.</small></label>' +
      '</div>' +
      '<button class="btn btn-brand w-100 mt-2" type="button" id="cookie-save">Αποθήκευση επιλογών</button>' +
    '</div>' +
  '</div>';
}

/* --- Κύρια συνάρτηση layout --------------------------------------------- */
/**
 * @param {Object} o
 * @param {string} o.slug        Σχετική διαδρομή αρχείου, π.χ. 'pages/times.html'
 * @param {number} o.depth       0 για ρίζα, 1 για υποφάκελο
 * @param {string} o.navId       id για το ενεργό στοιχείο μενού
 * @param {string} o.title       <title> (μοναδικός)
 * @param {string} o.description meta description (μοναδική)
 * @param {string} o.content     Το HTML του <main>
 * @param {Array}  [o.breadcrumbs]
 * @param {Array}  [o.schema]    Επιπλέον JSON-LD αντικείμενα
 * @param {Array}  [o.scripts]   Επιπλέον JS αρχεία (σχετικά με τη ρίζα)
 * @param {string} [o.ogType]
 */
function layout(o) {
  // Το 404 σερβίρεται από οποιοδήποτε βάθος URL, οπότε χρειάζεται
  // απόλυτες διαδρομές — αλλιώς σπάνε navbar/footer/assets.
  const b = o.absoluteLinks ? '/' : base(o.depth);
  const canonical = SITE + '/' + (o.slug === 'index.html' ? '' : o.slug);
  const ogImage = SITE + '/' + D.images.ogDefault.src;
  const robots = o.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';

  /* --- Schema: μαζεύουμε breadcrumbs + ό,τι δώσει η σελίδα ---------- */
  const schemas = [];
  const bc = breadcrumbSchema(o.breadcrumbs);
  if (bc) schemas.push(bc);
  (o.schema || []).forEach(function (s) { schemas.push(s); });

  const schemaTags = schemas.map(function (s) {
    return '<script type="application/ld+json">' + JSON.stringify(s) + '</script>';
  }).join('\n  ');

  const jsFile = function (name) { return PROD ? name.replace(/\.js$/, '.min.js') : name; };

  const extraScripts = (o.scripts || []).map(function (s) {
    return '<script src="' + b + jsFile(s) + '" defer></script>';
  }).join('\n  ');

  return '<!DOCTYPE html>\n' +
'<html lang="el">\n' +
'<head>\n' +
'  <meta charset="utf-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
'  <title>' + esc(o.title) + '</title>\n' +
'  <meta name="description" content="' + esc(o.description) + '">\n' +
'  <link rel="canonical" href="' + canonical + '">\n' +
'  <meta name="robots" content="' + robots + '">\n' +
'  <meta name="theme-color" content="#0B5ED7">\n' +
'\n' +
'  <!-- Open Graph -->\n' +
'  <meta property="og:type" content="' + (o.ogType || 'website') + '">\n' +
'  <meta property="og:site_name" content="Self Storages">\n' +
'  <meta property="og:locale" content="el_GR">\n' +
'  <meta property="og:title" content="' + esc(o.title) + '">\n' +
'  <meta property="og:description" content="' + esc(o.description) + '">\n' +
'  <meta property="og:url" content="' + canonical + '">\n' +
'  <meta property="og:image" content="' + ogImage + '">\n' +
'  <meta property="og:image:width" content="1200">\n' +
'  <meta property="og:image:height" content="630">\n' +
'\n' +
'  <!-- Twitter -->\n' +
'  <meta name="twitter:card" content="summary_large_image">\n' +
'  <meta name="twitter:title" content="' + esc(o.title) + '">\n' +
'  <meta name="twitter:description" content="' + esc(o.description) + '">\n' +
'  <meta name="twitter:image" content="' + ogImage + '">\n' +
'\n' +
'  <!-- Favicons -->\n' +
(REAL_FAVICON
  ? '  <link rel="icon" href="' + b + 'favicon/favicon.ico" sizes="any">\n' +
    '  <link rel="icon" href="' + b + 'favicon/favicon-32x32.png" type="image/png" sizes="32x32">\n' +
    '  <link rel="icon" href="' + b + 'favicon/favicon-16x16.png" type="image/png" sizes="16x16">\n' +
    '  <link rel="apple-touch-icon" href="' + b + 'favicon/apple-touch-icon.png" sizes="180x180">\n'
  : '  <link rel="icon" href="' + b + 'favicon/favicon.svg" type="image/svg+xml">\n' +
    '  <link rel="apple-touch-icon" href="' + b + 'favicon/apple-touch-icon.svg">\n') +
'  <link rel="manifest" href="' + b + 'manifest.json">\n' +
'  <meta name="msapplication-config" content="' + b + 'browserconfig.xml">\n' +
'\n' +
'  <!-- Γραμματοσειρές: preload των βασικών subsets (ελληνικά + λατινικά για αριθμούς) -->\n' +
'  <link rel="preload" href="' + b + 'fonts/inter-400-greek.woff2" as="font" type="font/woff2" crossorigin>\n' +
'  <link rel="preload" href="' + b + 'fonts/inter-800-greek.woff2" as="font" type="font/woff2" crossorigin>\n' +
'  <link rel="preload" href="' + b + 'fonts/inter-400-latin.woff2" as="font" type="font/woff2" crossorigin>\n' +
'\n' +
(PROD
  ? '  <link rel="stylesheet" href="' + b + 'css/app.min.css">\n'
  : '  <link rel="stylesheet" href="' + b + 'css/bootstrap.min.css">\n' +
    '  <link rel="stylesheet" href="' + b + 'css/style.css">\n') +
'\n' +
'  <!-- ============================================================\n' +
'       ΕΠΑΛΗΘΕΥΣΗ GOOGLE SEARCH CONSOLE\n' +
'       Αντικαταστήστε το περιεχόμενο και αφαιρέστε το σχόλιο:\n' +
'  <meta name="google-site-verification" content="{VERIFICATION_CODE}">\n' +
'       ============================================================ -->\n' +
'\n' +
'  ' + schemaTags + '\n' +
'</head>\n' +
'<body' + (o.bodyClass ? ' class="' + o.bodyClass + '"' : '') + '>\n' +
'  <a class="skip-link" href="#main-content">Μετάβαση στο περιεχόμενο</a>\n' +
'  ' + SPRITE + '\n' +
'  ' + renderNav(o.navId, b) + '\n' +
'  ' + renderBreadcrumbs(o.breadcrumbs, b) + '\n' +
'  <main id="main-content">\n' +
o.content + '\n' +
'  </main>\n' +
'  ' + renderFooter(b) + '\n' +
'  ' + renderFloatingActions() + '\n' +
'  ' + renderCookieBanner(b) + '\n' +
'\n' +
'  <script src="' + b + jsFile('js/nav.js') + '" defer></script>\n' +
'  <script src="' + b + jsFile('js/data.js') + '" defer></script>\n' +
'  <script src="' + b + jsFile('js/main.js') + '" defer></script>\n' +
'  <script src="' + b + jsFile('js/cookie-consent.js') + '" defer></script>\n' +
'  ' + extraScripts + '\n' +
'</body>\n' +
'</html>\n';
}

module.exports = { layout, icon, esc, base, NAV, D, SITE };
