/* ============================================================================
   ΣΕΛΙΔΕΣ ΤΟΠΟΘΕΣΙΩΝ (×6)
   ----------------------------------------------------------------------------
   Κοινό template, ΜΟΝΑΔΙΚΟ περιεχόμενο ανά περιοχή. Η διαφοροποίηση
   στηρίζεται σε: εισαγωγικό κείμενο, τοπικά σημεία αναφοράς, κοινό
   αγοραστικό προφίλ, NAP, χάρτης και LocalBusiness schema.
   ========================================================================= */
'use strict';

const { icon, esc, D, SITE } = require('./templates/layout.js');
const C = require('./templates/components.js');

const MIN_LOFT = Math.min.apply(null, D.pricing.lofts.map(x => x.price));
const MIN_STORAGE = Math.min.apply(null, D.pricing.storage.map(x => x.price));
const MIN_TAX = Math.min.apply(null, D.pricing.taxDomicile.map(x => x.price));

function locationPage(loc, index) {
  const b = '../';
  const url = SITE + '/perioches/' + loc.slug + '.html';
  const fullAddress = loc.street + ', ' + loc.name + ', Αθήνα';

  // Οι υπόλοιπες τοποθεσίες, για εσωτερική διασύνδεση
  const others = D.locations.filter(function (l) { return l.slug !== loc.slug; });

  const content =
  '<section class="page-hero"><div class="container">' +
    '<h1>Ενοικίαση αποθήκης ' + esc(loc.preposition) + ' ' + esc(loc.name) + '</h1>' +
    '<p>' + esc(loc.street) + ' · Αποθήκες και πατάρια από ' + MIN_LOFT + '€ τον μήνα, με ασφάλεια 24 ώρες το 24ωρο.</p>' +
  '</div></section>' +

  '<section class="section"><div class="container">' +
    '<div class="row g-4 g-lg-5">' +

      '<div class="col-lg-7 reveal">' +
        '<h2>Η αποθήκη μας ' + esc(loc.preposition) + ' ' + esc(loc.name) + '</h2>' +
        '<p class="lead">' + esc(loc.intro) + '</p>' +
        '<p>Η εγκατάστασή μας βρίσκεται στην οδό <strong>' + esc(loc.street) + '</strong>, κοντά σε ' +
          esc(loc.landmarks) + '. Εξυπηρετεί κυρίως ' + esc(loc.audience) + '.</p>' +

        '<h3 class="mt-4">Τι μπορείτε να αποθηκεύσετε εδώ</h3>' +
        '<ul class="check-list">' +
          '<li><strong>Οικοσκευή και έπιπλα</strong> — από λίγα κιβώτια μέχρι το περιεχόμενο ολόκληρου σπιτιού.</li>' +
          '<li><strong>Εποχιακά είδη</strong> — χειμερινός ή θερινός εξοπλισμός, βαλίτσες, αθλητικά.</li>' +
          '<li><strong>Επαγγελματικός εξοπλισμός</strong> — αρχεία, εμπορεύματα, εργαλεία.</li>' +
          '<li><strong>Πράγματα σε μεταβατική περίοδο</strong> — κατά τη διάρκεια μετακόμισης ή ανακαίνισης.</li>' +
        '</ul>' +

        '<h3 class="mt-4">Στοιχεία εγκατάστασης</h3>' +
        '<div class="contact-info-item">' +
          '<span class="ci-icon">' + icon('geo-alt-fill') + '</span>' +
          '<div><div class="ci-label">Διεύθυνση</div>' +
            '<div class="ci-value">' + esc(loc.street) + '</div>' +
            '<div class="text-muted small">' + esc(loc.postalCode) + ' ' + esc(loc.name) + ', Αττική</div></div>' +
        '</div>' +
        '<div class="contact-info-item">' +
          '<span class="ci-icon">' + icon('clock-fill') + '</span>' +
          '<div><div class="ci-label">Ωράριο (κατόπιν ραντεβού)</div>' +
            '<div class="ci-value">Δευτέρα – Παρασκευή</div>' +
            '<div class="text-muted small">' + esc(D.contact.hoursText) + '</div></div>' +
        '</div>' +
        '<div class="contact-info-item">' +
          '<span class="ci-icon">' + icon('telephone-fill') + '</span>' +
          '<div><div class="ci-label">Τηλέφωνα</div>' +
            '<div class="ci-value"><a href="tel:+30' + D.contact.phonePrimary + '">' + D.contact.phonePrimaryDisplay + '</a></div>' +
            '<div class="text-muted small">' +
              D.contact.phonesMobile.map(function (p) { return '<a href="tel:+30' + p + '">' + p + '</a>'; }).join(' · ') +
            '</div></div>' +
        '</div>' +

        '<div class="d-flex flex-wrap gap-2 mt-4">' +
          '<a class="btn btn-brand" href="tel:+30' + D.contact.phonePrimary + '">' + icon('telephone-fill') + ' Καλέστε τώρα</a>' +
          '<a class="btn btn-whatsapp" href="https://wa.me/' + D.contact.whatsapp + '" target="_blank" rel="noopener">' + icon('whatsapp') + ' WhatsApp</a>' +
          '<a class="btn btn-outline-brand" href="' + b + 'pages/times.html">' + icon('currency-euro') + ' Τιμές</a>' +
        '</div>' +
      '</div>' +

      '<div class="col-lg-5 reveal reveal-d1">' +
        C.mapFacade(fullAddress, 'Self Storages — ' + loc.name) +
        '<div class="mt-4">' +
          '<img class="rounded-4 shadow-sm w-100" src="' + b + D.images.storagePage.src + '" alt="Χώρος αποθηκών Self Storages ' + esc(loc.preposition) + ' ' + esc(loc.name) + '" width="800" height="600" loading="lazy">' +
        '</div>' +
      '</div>' +

    '</div>' +
  '</div></section>' +

  /* Υπηρεσίες σε αυτή την τοποθεσία */
  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Διαθέσιμα ' + esc(loc.preposition) + ' ' + esc(loc.name),
      'Τι προσφέρουμε σε αυτή την εγκατάσταση', '') +
    '<div class="row g-3 g-md-4">' +
      '<div class="col-lg-4 col-md-6"><div class="card-modern reveal">' +
        '<div class="card-icon">' + icon('box-seam') + '</div><h3>Αποθήκες</h3>' +
        '<p>Από 2-3 τ.μ. έως 15 τ.μ., ανάλογα με τη διαθεσιμότητα. Από ' + MIN_STORAGE + '€ τον μήνα.</p>' +
        '<a class="card-link" href="' + b + 'pages/enoikiasi-apothikon.html">Μεγέθη <span class="arw">' + icon('arrow-right') + '</span></a></div></div>' +
      '<div class="col-lg-4 col-md-6"><div class="card-modern reveal reveal-d1">' +
        '<div class="card-icon">' + icon('boxes') + '</div><h3>Πατάρια</h3>' +
        '<p>Οικονομική λύση για μικρό όγκο, σε τέσσερα μεγέθη. Από ' + MIN_LOFT + '€ τον μήνα.</p>' +
        '<a class="card-link" href="' + b + 'pages/enoikiasi-apothikon.html#pataria">Δείτε τα πατάρια <span class="arw">' + icon('arrow-right') + '</span></a></div></div>' +
      '<div class="col-lg-4 col-md-6"><div class="card-modern reveal reveal-d2">' +
        '<div class="card-icon">' + icon('building') + '</div><h3>Φορολογική έδρα</h3>' +
        '<p>Δηλώστε τη διεύθυνση <strong>' + esc(loc.street) + '</strong> ως έδρα, με μισθωτήριο στο taxisnet. Από ' + MIN_TAX + '€ τον μήνα.</p>' +
        '<a class="card-link" href="' + b + 'pages/forologiki-edra-virtual-office.html">Πώς λειτουργεί <span class="arw">' + icon('arrow-right') + '</span></a></div></div>' +
    '</div>' +
  '</div></section>' +

  '<section class="section"><div class="container">' +
    C.sectionHead('Ασφάλεια', 'Ίδιος εξοπλισμός ασφαλείας σε κάθε εγκατάσταση', '') +
    C.securityCards() +
  '</div></section>' +

  /* Άλλες τοποθεσίες */
  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Εναλλακτικές', 'Άλλες τοποθεσίες κοντά σας',
      'Αν το ' + esc(loc.name) + ' δεν σας εξυπηρετεί, δείτε τις υπόλοιπες εγκαταστάσεις μας.') +
    '<div class="row g-3 g-md-4">' +
      others.map(function (l, i) {
        return '<div class="col-lg-4 col-md-6"><div class="location-card reveal reveal-d' + (i % 3) + '">' +
          '<h3>' + esc(l.name) + '</h3>' +
          '<p class="addr">' + icon('geo-alt-fill') + ' ' + esc(l.street) + '</p>' +
          '<a class="card-link" href="' + b + 'perioches/' + l.slug + '.html">Δείτε την τοποθεσία <span class="arw">' + icon('arrow-right') + '</span></a>' +
          '</div></div>';
      }).join('') +
    '</div>' +
  '</div></section>' +

  C.ctaBand(b, {
    title: 'Κλείστε την αποθήκη σας ' + loc.preposition + ' ' + loc.name,
    text: 'Καλέστε μας για να δείτε τι είναι διαθέσιμο αυτή τη στιγμή στη συγκεκριμένη εγκατάσταση και να κλείσετε ραντεβού επίσκεψης.'
  });

  return {
    slug: 'perioches/' + loc.slug + '.html', depth: 1, navId: loc.slug,
    title: 'Ενοικίαση Αποθήκης ' + loc.name + ' | Self Storages',
    description: 'Αποθήκες και πατάρια ' + loc.preposition + ' ' + loc.name + ' (' + loc.street + '), από ' +
      MIN_LOFT + '€/μήνα. Ασφάλεια 24/7, μηνιαία ενοικίαση. Καλέστε στο ' + D.contact.phonePrimaryDisplay + '.',
    breadcrumbs: [
      { name: 'Αρχική', href: 'index.html' },
      { name: 'Περιοχές', href: 'pages/perioches.html' },
      { name: loc.name, href: 'perioches/' + loc.slug + '.html' }
    ],
    content: content,
    schema: [C.localBusinessSchema(loc, url)]
  };
}

function all() {
  return D.locations.map(locationPage);
}

module.exports = { all };
