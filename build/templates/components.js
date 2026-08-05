/* ============================================================================
   COMPONENTS — επαναχρησιμοποιήσιμα κομμάτια περιεχομένου
   Χρησιμοποιούνται από τις σελίδες ώστε να μην επαναλαμβάνεται HTML.
   ========================================================================= */
'use strict';

const { icon, esc, D } = require('./layout.js');

/* --- Επικεφαλίδα ενότητας ---------------------------------------------- */
function sectionHead(eyebrow, title, text, align) {
  return '<div class="section-head' + (align === 'start' ? ' text-start' : '') + ' reveal">' +
    (eyebrow ? '<span class="eyebrow">' + esc(eyebrow) + '</span>' : '') +
    '<h2>' + title + '</h2>' +
    (text ? '<p>' + text + '</p>' : '') +
    '</div>';
}

/* --- Μπάντα CTA --------------------------------------------------------- */
function ctaBand(b, opts) {
  opts = opts || {};
  const title = opts.title || 'Χρειάζεστε αποθηκευτικό χώρο;';
  const text = opts.text || 'Πείτε μας τι θέλετε να αποθηκεύσετε και σας προτείνουμε το κατάλληλο μέγεθος και την πλησιέστερη τοποθεσία — χωρίς δέσμευση.';
  return '<section class="section"><div class="container">' +
    '<div class="cta-band reveal">' +
      '<h2>' + esc(title) + '</h2>' +
      '<p>' + esc(text) + '</p>' +
      '<div class="cta-actions">' +
        '<a class="btn btn-light-solid btn-lg-cta" href="tel:+30' + D.contact.phonePrimary + '">' +
          icon('telephone-fill') + ' ' + D.contact.phonePrimaryDisplay + '</a>' +
        '<a class="btn btn-ghost-light btn-lg-cta" href="' + b + 'pages/epikoinonia.html">' +
          icon('envelope-fill') + ' Στείλτε μας μήνυμα</a>' +
      '</div>' +
    '</div>' +
  '</div></section>';
}

/* --- Κάρτες τοποθεσιών -------------------------------------------------- */
function locationCards(b, limit) {
  const list = limit ? D.locations.slice(0, limit) : D.locations;
  return '<div class="row g-3 g-md-4">' + list.map(function (l, i) {
    return '<div class="col-lg-4 col-md-6"><div class="location-card reveal reveal-d' + (i % 3) + '">' +
      '<h3>' + esc(l.name) + '</h3>' +
      '<p class="addr">' + icon('geo-alt-fill') + ' ' + esc(l.street) + '</p>' +
      '<p class="hrs">' + icon('clock-fill') + ' ' + esc(D.contact.hoursText) + '</p>' +
      '<a class="card-link" href="' + b + 'perioches/' + l.slug + '.html">' +
        'Δείτε την τοποθεσία <span class="arw">' + icon('arrow-right') + '</span></a>' +
      '</div></div>';
  }).join('') + '</div>';
}

/* --- Στατιστικά --------------------------------------------------------- */
function statsRow() {
  const yearsActive = new Date().getFullYear() - D.business.foundedYear;
  return '<div class="stats-grid">' +
    '<div class="stat reveal"><span class="num">' + D.business.foundedYear + '</span><span class="lbl">Από το ' + D.business.foundedYear + '</span></div>' +
    '<div class="stat reveal reveal-d1"><span class="num" data-count="500" data-suffix="+">500+</span><span class="lbl">Πελάτες</span></div>' +
    '<div class="stat reveal reveal-d2"><span class="num" data-count="' + D.locations.length + '">' + D.locations.length + '</span><span class="lbl">Τοποθεσίες</span></div>' +
    '<div class="stat reveal reveal-d3"><span class="num">' + yearsActive + '</span><span class="lbl">Χρόνια εμπειρίας</span></div>' +
  '</div>';
}

/* --- FAQ accordion ------------------------------------------------------
   items: πίνακας {q,a}. Αν δοθεί limit, παίρνει τα πρώτα N.               */
function faqAccordion(items, limit) {
  const list = limit ? items.slice(0, limit) : items;
  return '<div class="faq-list">' + list.map(function (f) {
    return '<details class="faq-item reveal"><summary>' + esc(f.q) + '</summary>' +
      '<div class="faq-body">' + esc(f.a) + '</div></details>';
  }).join('') + '</div>';
}

/* --- Map facade (φορτώνει με κλικ) -------------------------------------- */
function mapFacade(query, title) {
  return '<div class="map-facade" data-map-query="' + esc(query) + '" data-map-title="' + esc(title) + '" ' +
    'role="button" tabindex="0" aria-label="Φόρτωση χάρτη: ' + esc(title) + '">' +
    '<div class="mf-inner">' +
      '<span class="mf-pin">' + icon('geo-alt-fill') + '</span>' +
      '<div class="mf-title">' + esc(title) + '</div>' +
      '<p class="mf-hint">Πατήστε για να φορτώσει ο χάρτης της Google.<br>' +
        'Δεν φορτώνεται αυτόματα, ώστε η σελίδα να παραμένει γρήγορη και χωρίς cookies τρίτων.</p>' +
      '<span class="btn btn-outline-brand btn-sm">Εμφάνιση χάρτη</span>' +
    '</div></div>';
}

/* --- Teaser τιμής ------------------------------------------------------- */
function priceTeaser(b) {
  const minStorage = Math.min.apply(null, D.pricing.lofts.map(function (x) { return x.price; }));
  const minTax = Math.min.apply(null, D.pricing.taxDomicile.map(function (x) { return x.price; }));
  return '<div class="d-flex flex-wrap gap-3 align-items-center">' +
    '<span class="price-teaser">Αποθήκες &amp; πατάρια <span class="amt">από ' + minStorage + '€</span>/μήνα</span>' +
    '<span class="price-teaser">Φορολογική έδρα <span class="amt">από ' + minTax + '€</span>/μήνα</span>' +
    '<a class="card-link" href="' + b + 'pages/times.html">Αναλυτικός τιμοκατάλογος <span class="arw">' + icon('arrow-right') + '</span></a>' +
  '</div>';
}

/* --- Χαρακτηριστικά ασφαλείας ------------------------------------------- */
function securityCards() {
  const items = [
    ['camera-video-fill', 'Κάμερες 24/7', 'Κλειστό κύκλωμα παρακολούθησης σε λειτουργία όλο το εικοσιτετράωρο, σε όλες τις εγκαταστάσεις.'],
    ['bell-fill', 'Σύστημα συναγερμού', 'Συναγερμός υψηλών προδιαγραφών με άμεση ειδοποίηση σε περίπτωση παραβίασης.'],
    ['lock-fill', 'Ατομική κλειδαριά', 'Κάθε αποθήκη κλειδώνει ξεχωριστά. Τα κλειδιά τα κρατάτε αποκλειστικά εσείς.'],
    ['fire', 'Πυρανίχνευση', 'Σύστημα ανίχνευσης καπνού και φωτιάς με αυτόματη ειδοποίηση.']
  ];
  return '<div class="row g-3 g-md-4">' + items.map(function (it, i) {
    return '<div class="col-lg-3 col-md-6"><div class="card-modern reveal reveal-d' + (i % 3) + '">' +
      '<div class="card-icon accent">' + icon(it[0]) + '</div>' +
      '<h3>' + it[1] + '</h3><p>' + it[2] + '</p></div></div>';
  }).join('') + '</div>';
}

/* --- Schema: LocalBusiness ανά τοποθεσία -------------------------------- */
function localBusinessSchema(loc, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SelfStorage',
    name: 'Self Storages — ' + loc.name,
    description: 'Ενοικίαση αποθηκών και παταριών ' + loc.preposition + ' ' + loc.name +
                 '. Ασφαλείς χώροι με κάμερες 24/7, από ' +
                 Math.min.apply(null, D.pricing.lofts.map(function (x) { return x.price; })) + '€/μήνα.',
    url: url,
    telephone: '+30' + D.contact.phonePrimary,
    email: D.contact.email,
    priceRange: '€€',
    parentOrganization: { '@type': 'Organization', name: D.business.name, url: D.business.domain },
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.street,
      addressLocality: loc.name,
      postalCode: loc.postalCode,
      addressRegion: 'Αττική',
      addressCountry: 'GR'
    },
    areaServed: { '@type': 'City', name: 'Αθήνα' },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: D.contact.hoursDays, opens: D.contact.hoursOpen1, closes: D.contact.hoursClose1 },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: D.contact.hoursDays, opens: D.contact.hoursOpen2, closes: D.contact.hoursClose2 }
    ]
  };
}

/* --- Schema: Organization (μία φορά, στην αρχική) ------------------------ */
function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': D.business.domain + '/#organization',
    name: D.business.name,
    url: D.business.domain,
    description: D.business.description,
    foundingDate: String(D.business.foundedYear),
    email: D.contact.email,
    telephone: '+30' + D.contact.phonePrimary,
    areaServed: { '@type': 'AdministrativeArea', name: 'Αττική' },
    location: D.locations.map(function (l) {
      return {
        '@type': 'Place',
        name: 'Self Storages — ' + l.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: l.street,
          addressLocality: l.name,
          postalCode: l.postalCode,
          addressRegion: 'Αττική',
          addressCountry: 'GR'
        }
      };
    })
  };
}

/* --- Schema: WebSite ----------------------------------------------------- */
function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': D.business.domain + '/#website',
    url: D.business.domain,
    name: D.business.name,
    inLanguage: 'el-GR',
    publisher: { '@id': D.business.domain + '/#organization' }
  };
}

/* --- Schema: FAQPage ----------------------------------------------------- */
function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(function (f) {
      return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } };
    })
  };
}

/* --- Schema: Service ----------------------------------------------------- */
function serviceSchema(name, description, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    url: url,
    serviceType: name,
    provider: { '@id': D.business.domain + '/#organization' },
    areaServed: { '@type': 'AdministrativeArea', name: 'Αττική' }
  };
}

module.exports = {
  sectionHead, ctaBand, locationCards, statsRow, faqAccordion, mapFacade,
  priceTeaser, securityCards,
  localBusinessSchema, organizationSchema, websiteSchema, faqSchema, serviceSchema
};
