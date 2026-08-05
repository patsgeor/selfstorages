/* ============================================================================
   ΔΕΥΤΕΡΕΥΟΥΣΕΣ ΣΕΛΙΔΕΣ — τιμές, περιοχές, FAQ, επικοινωνία, νομικά, 404
   ========================================================================= */
'use strict';

const { icon, esc, D, SITE } = require('./templates/layout.js');
const C = require('./templates/components.js');

const MIN_LOFT = Math.min.apply(null, D.pricing.lofts.map(x => x.price));
const MIN_STORAGE = Math.min.apply(null, D.pricing.storage.map(x => x.price));
const MIN_TAX = Math.min.apply(null, D.pricing.taxDomicile.map(x => x.price));
const TODAY = new Date().toLocaleDateString('el-GR', { year: 'numeric', month: 'long', day: 'numeric' });

/* ==========================================================================
   ΤΙΜΕΣ  —  ⚠️ Η ΜΟΝΑΔΙΚΗ σελίδα με πλήρεις πίνακες τιμών.
   Οι τιμές παράγονται από το js/data.js αλλά γράφονται ως στατικό HTML,
   ώστε να τις διαβάζει κανονικά η Google.
   ========================================================================== */
function prices() {
  const b = '../';

  const storageCards = D.pricing.storage.map(function (s, i) {
    return '<div class="col-lg-4 col-md-6"><div class="price-card reveal reveal-d' + (i % 3) + '">' +
      '<div class="p-size">' + esc(s.size) + '</div>' +
      '<div class="p-cbm">' + esc(s.cbm) + '</div>' +
      '<div class="p-amount">' + s.price + '€<span class="per"> /μήνα</span></div>' +
      '<p class="p-fits">' + esc(s.fits) + '</p>' +
      '</div></div>';
  }).join('');

  const loftCards = D.pricing.lofts.map(function (l, i) {
    return '<div class="col-lg-3 col-md-6"><div class="price-card reveal reveal-d' + (i % 3) + '">' +
      '<div class="p-size">Πατάρι ' + esc(l.size) + '</div>' +
      '<div class="p-amount">' + l.price + '€<span class="per"> /μήνα</span></div>' +
      '<p class="p-fits">' + esc(l.fits) + '</p>' +
      '</div></div>';
  }).join('');

  const taxCards = D.pricing.taxDomicile.map(function (t, i) {
    const label = t.label || (t.months + ' μήνες');
    return '<div class="col-lg-3 col-md-4 col-6"><div class="price-card' + (t.highlight ? ' is-featured' : '') + ' reveal reveal-d' + (i % 3) + '">' +
      (t.highlight ? '<span class="price-badge">Καλύτερη τιμή</span>' : '') +
      '<div class="p-size">' + esc(label) + '</div>' +
      '<div class="p-amount">' + t.price + '€<span class="per"> /μήνα</span></div>' +
      '</div></div>';
  }).join('');

  const calcOptions = D.calculator.map(function (o) {
    return '<option value="' + esc(o.id) + '">' + esc(o.label) + '</option>';
  }).join('');

  const offerCards = D.offers.storage.map(function (o, i) {
    return '<div class="col-lg-4 col-md-6"><div class="card-modern reveal reveal-d' + (i % 3) + '">' +
      '<div class="card-icon accent">' + icon(o.icon) + '</div>' +
      '<h3>' + esc(o.title) + '</h3><p>' + esc(o.text) + '</p></div></div>';
  }).join('');

  const content =
  '<section class="page-hero"><div class="container">' +
    '<h1>Τιμές ενοικίασης αποθήκης και φορολογικής έδρας</h1>' +
    '<p>Δημοσιευμένος τιμοκατάλογος, χωρίς κρυφές χρεώσεις. Η τιμή που βλέπετε είναι η τιμή που πληρώνετε.</p>' +
  '</div></section>' +

  /* --- CALCULATOR --- */
  '<section class="section" id="calculator"><div class="container">' +
    C.sectionHead('Υπολογιστής χώρου', 'Πόσο χώρο χρειάζομαι;',
      'Επιλέξτε τι σκοπεύετε να αποθηκεύσετε και θα σας προτείνουμε μέγεθος. Οι αντιστοιχίες βασίζονται σε πραγματικές μετακομίσεις που έχουμε εξυπηρετήσει.') +
    '<div class="row justify-content-center"><div class="col-lg-10">' +
      '<div class="calc-wrap reveal"><div class="row g-4 align-items-center">' +
        '<div class="col-md-7">' +
          '<label class="calc-label" for="calc-select">Τι θέλετε να αποθηκεύσετε;</label>' +
          '<select class="form-select" id="calc-select">' +
            '<option value="" selected disabled>Επιλέξτε…</option>' + calcOptions +
          '</select>' +
          '<div class="calc-result" id="calc-result" role="status" aria-live="polite" hidden></div>' +
        '</div>' +
        '<div class="col-md-5 text-center">' +
          '<img class="img-fluid rounded-3" src="' + b + D.images.calculator.src + '" alt="' + esc(D.images.calculator.alt) + '" width="500" height="380" loading="lazy">' +
        '</div>' +
      '</div></div>' +
    '</div></div>' +
  '</div></section>' +

  /* --- ΑΠΟΘΗΚΕΣ --- */
  '<section class="section section-subtle" id="apothikes"><div class="container">' +
    C.sectionHead('Αποθήκες', 'Τιμοκατάλογος αποθηκών',
      'Μηνιαία ενοικίαση χωρίς ελάχιστη δέσμευση. Μπορείτε να σταματήσετε ή να αλλάξετε μέγεθος όποτε θέλετε.') +
    '<div class="row g-3 g-md-4">' + storageCards + '</div>' +
  '</div></section>' +

  /* --- ΠΑΤΑΡΙΑ --- */
  '<section class="section" id="pataria"><div class="container">' +
    C.sectionHead('Πατάρια', 'Τιμοκατάλογος παταριών',
      'Η πιο οικονομική λύση για μικρό όγκο. Ίδιοι όροι με τις αποθήκες: μηνιαία, χωρίς δέσμευση.') +
    '<div class="row g-3 g-md-4">' + loftCards + '</div>' +
  '</div></section>' +

  /* --- ΠΡΟΣΦΟΡΕΣ --- */
  '<section class="section section-subtle" id="prosfores"><div class="container">' +
    C.sectionHead('Προσφορές', 'Τρέχουσες προσφορές σε ενοικίαση αποθήκης',
      'Ισχύουν σε συνδυασμό με τις παραπάνω τιμές — αναφέρετέ τις όταν κλείνετε το συμβόλαιό σας.') +
    '<div class="row g-3 g-md-4">' + offerCards + '</div>' +
    '<div class="alert alert-danger mt-4 reveal" role="note">' +
      icon('exclamation-triangle-fill') + ' <strong>Απαγορεύεται:</strong> ' + esc(D.offers.prohibitedText) +
    '</div>' +
  '</div></section>' +

  /* --- ΦΟΡΟΛΟΓΙΚΗ ΕΔΡΑ --- */
  '<section class="section" id="forologiki-edra"><div class="container">' +
    C.sectionHead('Φορολογική έδρα', 'Τιμοκατάλογος φορολογικής έδρας',
      'Εδώ η τιμή εξαρτάται από τη διάρκεια του συμβολαίου: όσο μεγαλύτερη η δέσμευση, τόσο χαμηλότερο το μηνιαίο κόστος.') +
    '<div class="row g-3 g-md-4 justify-content-center">' + taxCards + '</div>' +
    '<p class="text-center text-muted mt-4 small reveal">Όλες οι τιμές αφορούν μηνιαίο κόστος για τη συνολική διάρκεια που επιλέγετε.</p>' +
  '</div></section>' +

  /* --- ΤΙ ΠΕΡΙΛΑΜΒΑΝΕΤΑΙ --- */
  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Διαφάνεια', 'Τι περιλαμβάνεται στην τιμή', '') +
    '<div class="row justify-content-center"><div class="col-lg-9">' +
      '<div class="compare-grid reveal">' +
        '<div class="compare-col is-yes">' +
          '<h3><span class="mark-yes">' + icon('patch-check-fill') + '</span> Περιλαμβάνεται</h3>' +
          '<ul>' +
            '<li>Παρακολούθηση με κάμερες 24 ώρες το 24ωρο</li>' +
            '<li>Σύστημα συναγερμού και πυρανίχνευσης</li>' +
            '<li>Ατομική κλειδαριά — τα κλειδιά τα κρατάτε εσείς</li>' +
            '<li>Φωτισμός και καθαριότητα κοινόχρηστων χώρων</li>' +
            '<li>Πρόσβαση κατόπιν ραντεβού στο ωράριο λειτουργίας</li>' +
            '<li>Δυνατότητα αλλαγής μεγέθους χωρίς ποινή</li>' +
          '</ul>' +
        '</div>' +
        '<div class="compare-col is-no">' +
          '<h3><span class="mark-no">' + icon('info-circle-fill') + '</span> Χρεώνεται ξεχωριστά</h3>' +
          '<ul>' +
            '<li>Μεταφορά και μετακόμιση των πραγμάτων σας</li>' +
            '<li>Υλικά συσκευασίας</li>' +
            '<li>Ασφάλιση περιεχομένου — ρωτήστε μας για τις διαθέσιμες επιλογές</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="alert alert-warning mt-4 reveal" role="note">' +
        icon('exclamation-triangle-fill') + ' <strong>Σημείωση προς τον διαχειριστή:</strong> ' +
        'επιβεβαιώστε αν προσφέρετε ασφάλιση περιεχομένου και σε ποια τιμή. ' +
        'Αν περιλαμβάνεται δωρεάν, μεταφέρετε τη γραμμή στη στήλη «Περιλαμβάνεται» και ενημερώστε το ' +
        '<code>js/data.js</code>. Αφαιρέστε αυτό το πλαίσιο πριν τη δημοσίευση.' +
      '</div>' +
    '</div></div>' +
  '</div></section>' +

  '<section class="section"><div class="container">' +
    C.sectionHead('Ερωτήσεις', 'Συχνές ερωτήσεις για τιμές και όρους', '') +
    C.faqAccordion(D.faq.filter(function (f) { return /διάρκεια|κοστίζει|διαφορά|μεγέθη|αποθηκεύσω/i.test(f.q); })) +
  '</div></section>' +

  C.ctaBand(b, { title: 'Θέλετε ακριβή προσφορά;', text: 'Καλέστε μας και σε ένα λεπτό θα ξέρετε ποιο μέγεθος χρειάζεστε, σε ποια τοποθεσία υπάρχει διαθεσιμότητα και πόσο ακριβώς κοστίζει.' });

  /* Schema με προσφορές — βοηθά τη Google να καταλάβει το εύρος τιμών */
  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ενοικίαση αποθηκευτικών χώρων και φορολογικής έδρας',
    provider: { '@id': D.business.domain + '/#organization' },
    areaServed: { '@type': 'AdministrativeArea', name: 'Αττική' },
    url: SITE + '/pages/times.html',
    offers: D.pricing.storage.map(function (s) {
      return {
        '@type': 'Offer', name: 'Αποθήκη ' + s.size, price: String(s.price),
        priceCurrency: 'EUR', availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification', price: String(s.price),
          priceCurrency: 'EUR', unitCode: 'MON', billingIncrement: 1
        }
      };
    }).concat(D.pricing.lofts.map(function (l) {
      return {
        '@type': 'Offer', name: 'Πατάρι ' + l.size, price: String(l.price),
        priceCurrency: 'EUR', availability: 'https://schema.org/InStock'
      };
    }))
  };

  return {
    slug: 'pages/times.html', depth: 1, navId: 'prices',
    title: 'Τιμές Ενοικίασης Αποθήκης Αθήνα | Self Storages',
    description: 'Αναλυτικός τιμοκατάλογος: αποθήκες από ' + MIN_STORAGE + '€, πατάρια από ' + MIN_LOFT +
      '€ και φορολογική έδρα από ' + MIN_TAX + '€ τον μήνα. Χωρίς κρυφές χρεώσεις.',
    breadcrumbs: [{ name: 'Αρχική', href: 'index.html' }, { name: 'Τιμές', href: 'pages/times.html' }],
    content: content,
    scripts: ['js/calculator.js'],
    schema: [offerSchema]
  };
}

/* ==========================================================================
   ΠΕΡΙΟΧΕΣ ΕΞΥΠΗΡΕΤΗΣΗΣ
   ========================================================================== */
function areas() {
  const b = '../';

  const zones = D.serviceAreas.map(function (z, i) {
    return '<div class="col-lg-6"><div class="card-modern reveal reveal-d' + (i % 3) + '">' +
      '<div class="card-icon accent">' + icon('geo-alt-fill') + '</div>' +
      '<h3>' + esc(z.zone) + '</h3>' +
      '<p class="text-muted small mb-3">Πλησιέστερη εγκατάσταση: <strong>' + esc(z.nearest) + '</strong></p>' +
      '<p>' + z.areas.map(esc).join(' · ') + '</p>' +
      '</div></div>';
  }).join('');

  const content =
  '<section class="page-hero"><div class="container">' +
    '<h1>Περιοχές εξυπηρέτησης στην Αττική</h1>' +
    '<p>Έξι εγκαταστάσεις που καλύπτουν το κέντρο και τα προάστια της Αθήνας.</p>' +
  '</div></section>' +

  '<section class="section"><div class="container">' +
    C.sectionHead('Οι εγκαταστάσεις μας', 'Πού βρίσκονται οι αποθήκες μας',
      'Αυτές είναι οι ' + D.locations.length + ' φυσικές μας εγκαταστάσεις. Κάθε μία έχει τη δική της σελίδα με διεύθυνση, ωράριο και χάρτη.') +
    C.locationCards(b) +
  '</div></section>' +

  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Κάλυψη', 'Από ποιες περιοχές μάς επισκέπτονται',
      'Δεν διατηρούμε εγκατάσταση σε κάθε συνοικία — έχουμε όμως πελάτες από όλο το λεκανοπέδιο. ' +
      'Παρακάτω βλέπετε ποια εγκατάστασή μας εξυπηρετεί κάθε περιοχή.') +
    '<div class="row g-3 g-md-4">' + zones + '</div>' +
    '<div class="alert alert-light border mt-4 reveal">' +
      icon('info-circle-fill') + ' <strong>Δεν βλέπετε την περιοχή σας;</strong> ' +
      'Καλέστε μας στο <a href="tel:+30' + D.contact.phonePrimary + '">' + D.contact.phonePrimaryDisplay + '</a>. ' +
      'Οι εγκαταστάσεις μας εξυπηρετούν ολόκληρη την Αττική και σχεδόν πάντα υπάρχει μία σε λογική απόσταση από εσάς.' +
    '</div>' +
  '</div></section>' +

  C.ctaBand(b, { title: 'Ποια τοποθεσία σας βολεύει;', text: 'Πείτε μας από πού είστε και σας προτείνουμε την πλησιέστερη εγκατάσταση με διαθεσιμότητα.' });

  return {
    slug: 'pages/perioches.html', depth: 1, navId: 'areas',
    title: 'Περιοχές Εξυπηρέτησης — Αποθήκες σε όλη την Αττική | Self Storages',
    description: 'Έξι εγκαταστάσεις σε Παγκράτι, Καισαριανή, Γλυφάδα, Μαρούσι, Παλαιό Φάληρο και Ηλιούπολη, ' +
      'με κάλυψη σε όλο το λεκανοπέδιο Αττικής.',
    breadcrumbs: [{ name: 'Αρχική', href: 'index.html' }, { name: 'Περιοχές', href: 'pages/perioches.html' }],
    content: content
  };
}

/* ==========================================================================
   FAQ
   ========================================================================== */
function faq() {
  const b = '../';
  const content =
  '<section class="page-hero"><div class="container">' +
    '<h1>Συχνές ερωτήσεις</h1>' +
    '<p>Ό,τι μας ρωτούν πιο συχνά για την ενοικίαση αποθήκης και φορολογικής έδρας.</p>' +
  '</div></section>' +

  '<section class="section"><div class="container">' +
    C.faqAccordion(D.faq) +
    '<div class="text-center mt-5 reveal">' +
      '<p class="text-muted">Δεν βρήκατε την απάντηση που ψάχνατε;</p>' +
      '<a class="btn btn-brand btn-lg-cta" href="tel:+30' + D.contact.phonePrimary + '">' +
        icon('telephone-fill') + ' Καλέστε μας στο ' + D.contact.phonePrimaryDisplay + '</a>' +
    '</div>' +
  '</div></section>' +

  C.ctaBand(b);

  return {
    slug: 'pages/faq.html', depth: 1, navId: 'faq',
    title: 'Συχνές Ερωτήσεις για Ενοικίαση Αποθήκης | Self Storages',
    description: 'Απαντήσεις σε ' + D.faq.length + ' συχνές ερωτήσεις: διάρκεια ενοικίασης, μεγέθη, ασφάλεια, ' +
      'τιμές, φορολογική έδρα και taxisnet.',
    breadcrumbs: [{ name: 'Αρχική', href: 'index.html' }, { name: 'Συχνές Ερωτήσεις', href: 'pages/faq.html' }],
    content: content,
    schema: [C.faqSchema(D.faq)]
  };
}

/* ==========================================================================
   ΕΠΙΚΟΙΝΩΝΙΑ
   ========================================================================== */
function contact() {
  const b = '../';

  const locationOptions = D.locations.map(function (l) {
    return '<option value="' + esc(l.name) + '">' + esc(l.name) + '</option>';
  }).join('');

  const content =
  '<section class="page-hero"><div class="container">' +
    '<h1>Επικοινωνία</h1>' +
    '<p>Καλέστε μας, στείλτε μήνυμα ή περάστε από μία εγκατάσταση. Απαντάμε την ίδια μέρα.</p>' +
  '</div></section>' +

  '<section class="section"><div class="container">' +
    '<div class="row g-4 g-lg-5">' +

      /* --- ΦΟΡΜΑ --- */
      '<div class="col-lg-7 reveal">' +
        '<div class="form-card">' +
          '<h2 class="h4 mb-3">Στείλτε μας μήνυμα</h2>' +
          '<p class="text-muted small mb-4">Τα πεδία με <span class="req">*</span> είναι υποχρεωτικά. ' +
            'Θα χρησιμοποιήσουμε τα στοιχεία σας μόνο για να απαντήσουμε στο αίτημά σας — δείτε την ' +
            '<a href="' + b + 'pages/privacy-policy.html">Πολιτική Απορρήτου</a>.</p>' +

          '<form id="contact-form" class="ajax-form" action="' + esc(D.contact.formEndpoint) + '" method="POST" novalidate>' +
            '<div class="row g-3">' +
              '<div class="col-md-6">' +
                '<label class="form-label" for="name">Ονοματεπώνυμο <span class="req">*</span></label>' +
                '<input class="form-control" type="text" id="name" name="name" required autocomplete="name" aria-describedby="name-error">' +
                '<div class="field-error" id="name-error" role="alert"></div>' +
              '</div>' +
              '<div class="col-md-6">' +
                '<label class="form-label" for="phone">Τηλέφωνο <span class="req">*</span></label>' +
                '<input class="form-control" type="tel" id="phone" name="phone" required autocomplete="tel" aria-describedby="phone-error">' +
                '<div class="field-error" id="phone-error" role="alert"></div>' +
              '</div>' +
              '<div class="col-md-6">' +
                '<label class="form-label" for="email">Email <span class="req">*</span></label>' +
                '<input class="form-control" type="email" id="email" name="email" required autocomplete="email" aria-describedby="email-error">' +
                '<div class="field-error" id="email-error" role="alert"></div>' +
              '</div>' +
              '<div class="col-md-6">' +
                '<label class="form-label" for="service">Τι σας ενδιαφέρει;</label>' +
                '<select class="form-select" id="service" name="service">' +
                  '<option value="Αποθήκη">Ενοικίαση αποθήκης</option>' +
                  '<option value="Πατάρι">Ενοικίαση παταριού</option>' +
                  '<option value="Φορολογική έδρα">Φορολογική έδρα</option>' +
                  '<option value="Μετακόμιση">Μετακόμιση / μεταφορά</option>' +
                  '<option value="Άλλο">Κάτι άλλο</option>' +
                '</select>' +
              '</div>' +
              '<div class="col-12">' +
                '<label class="form-label" for="location">Προτιμώμενη τοποθεσία</label>' +
                '<select class="form-select" id="location" name="location">' +
                  '<option value="">Δεν έχω προτίμηση</option>' + locationOptions +
                '</select>' +
              '</div>' +
              '<div class="col-12">' +
                '<label class="form-label" for="message">Το μήνυμά σας <span class="req">*</span></label>' +
                '<textarea class="form-control" id="message" name="message" rows="5" required ' +
                  'placeholder="Π.χ. Χρειάζομαι αποθήκη για την οικοσκευή ενός δυαριού, για περίπου 6 μήνες." ' +
                  'aria-describedby="message-error"></textarea>' +
                '<div class="field-error" id="message-error" role="alert"></div>' +
              '</div>' +
            '</div>' +

            /* Honeypot — αόρατο στους χρήστες, παγίδα για bots */
            '<div class="hp-field" aria-hidden="true">' +
              '<label for="_gotcha">Μην συμπληρώσετε αυτό το πεδίο</label>' +
              '<input type="text" id="_gotcha" name="_gotcha" tabindex="-1" autocomplete="off">' +
            '</div>' +

            '<button class="btn btn-brand btn-lg-cta mt-4 w-100" type="submit">' +
              icon('envelope-fill') + ' Αποστολή μηνύματος</button>' +
            '<div class="form-status" role="status" aria-live="polite"></div>' +
          '</form>' +

          '<div class="alert alert-warning mt-4" role="note">' +
            icon('exclamation-triangle-fill') + ' <strong>Σημείωση προς τον διαχειριστή:</strong> ' +
            'η φόρμα δεν είναι ακόμα συνδεδεμένη. Δείτε το <code>README.md</code> (ενότητα «Φόρμα Επικοινωνίας») ' +
            'για να βάλετε το endpoint σας. Μέχρι τότε η φόρμα εμφανίζει μήνυμα με τα τηλέφωνα αντί να αποτυγχάνει σιωπηλά.' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* --- ΣΤΟΙΧΕΙΑ --- */
      '<div class="col-lg-5 reveal reveal-d1">' +
        '<h2 class="h4 mb-3">Άμεση επικοινωνία</h2>' +
        '<div class="contact-info-item">' +
          '<span class="ci-icon">' + icon('telephone-fill') + '</span>' +
          '<div><div class="ci-label">Σταθερό</div>' +
            '<div class="ci-value"><a href="tel:+30' + D.contact.phonePrimary + '">' + D.contact.phonePrimaryDisplay + '</a></div></div>' +
        '</div>' +
        '<div class="contact-info-item">' +
          '<span class="ci-icon">' + icon('telephone-fill') + '</span>' +
          '<div><div class="ci-label">Κινητά</div><div class="ci-value">' +
            D.contact.phonesMobile.map(function (p) { return '<a href="tel:+30' + p + '">' + p + '</a>'; }).join('<br>') +
          '</div></div>' +
        '</div>' +
        '<div class="contact-info-item">' +
          '<span class="ci-icon">' + icon('whatsapp') + '</span>' +
          '<div><div class="ci-label">WhatsApp</div>' +
            '<div class="ci-value"><a href="https://wa.me/' + D.contact.whatsapp + '" target="_blank" rel="noopener">Στείλτε μήνυμα</a></div></div>' +
        '</div>' +
        '<div class="contact-info-item">' +
          '<span class="ci-icon">' + icon('envelope-fill') + '</span>' +
          '<div><div class="ci-label">Email</div>' +
            '<div class="ci-value"><a href="mailto:' + D.contact.email + '">' + D.contact.email + '</a></div></div>' +
        '</div>' +
        '<div class="contact-info-item">' +
          '<span class="ci-icon">' + icon('clock-fill') + '</span>' +
          '<div><div class="ci-label">Ωράριο</div>' +
            '<div class="ci-value">Δευτέρα – Παρασκευή</div>' +
            '<div class="text-muted small">' + esc(D.contact.hoursText) + '</div></div>' +
        '</div>' +

        '<div class="mt-4">' +
          '<a class="btn btn-brand w-100 mb-2" href="tel:+30' + D.contact.phonePrimary + '">' +
            icon('telephone-fill') + ' Καλέστε τώρα</a>' +
          '<a class="btn btn-whatsapp w-100" href="https://wa.me/' + D.contact.whatsapp + '" target="_blank" rel="noopener">' +
            icon('whatsapp') + ' WhatsApp</a>' +
        '</div>' +
      '</div>' +

    '</div>' +
  '</div></section>' +

  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Διευθύνσεις', 'Οι ' + D.locations.length + ' εγκαταστάσεις μας', '') +
    '<div class="row g-3 g-md-4">' +
      D.locations.map(function (l, i) {
        return '<div class="col-lg-4 col-md-6"><div class="location-card reveal reveal-d' + (i % 3) + '">' +
          '<h3>' + esc(l.name) + '</h3>' +
          '<p class="addr">' + icon('geo-alt-fill') + ' ' + esc(l.street) + ', ' + esc(l.postalCode) + '</p>' +
          '<p class="hrs">' + icon('clock-fill') + ' ' + esc(D.contact.hoursText) + '</p>' +
          '<a class="card-link" href="' + b + 'perioches/' + l.slug + '.html">Χάρτης και λεπτομέρειες <span class="arw">' + icon('arrow-right') + '</span></a>' +
          '</div></div>';
      }).join('') +
    '</div>' +
  '</div></section>';

  return {
    slug: 'pages/epikoinonia.html', depth: 1, navId: 'contact',
    title: 'Επικοινωνία — Τηλέφωνα & Διευθύνσεις | Self Storages',
    description: 'Καλέστε στο ' + D.contact.phonePrimaryDisplay + ', στείλτε WhatsApp ή συμπληρώστε τη φόρμα. ' +
      'Διευθύνσεις και ωράριο για τις ' + D.locations.length + ' εγκαταστάσεις μας στην Αττική.',
    breadcrumbs: [{ name: 'Αρχική', href: 'index.html' }, { name: 'Επικοινωνία', href: 'pages/epikoinonia.html' }],
    content: content,
    schema: [{
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Επικοινωνία — Self Storages',
      url: SITE + '/pages/epikoinonia.html',
      mainEntity: {
        '@type': 'Organization',
        '@id': D.business.domain + '/#organization',
        contactPoint: [{
          '@type': 'ContactPoint',
          telephone: '+30' + D.contact.phonePrimary,
          email: D.contact.email,
          contactType: 'customer service',
          areaServed: 'GR',
          availableLanguage: ['el', 'en']
        }]
      }
    }]
  };
}

/* ==========================================================================
   ΝΟΜΙΚΕΣ ΣΕΛΙΔΕΣ
   ========================================================================== */
function legalShell(title, intro, body) {
  return '<section class="page-hero"><div class="container">' +
      '<h1>' + esc(title) + '</h1><p>' + esc(intro) + '</p>' +
    '</div></section>' +
    '<section class="section"><div class="container"><div class="row justify-content-center">' +
      '<div class="col-lg-9"><div class="article-body">' +
        '<p class="text-muted small">Τελευταία ενημέρωση: ' + TODAY + '</p>' +
        body +
      '</div></div>' +
    '</div></div></section>';
}

const ADMIN_NOTE =
  '<div class="alert alert-warning" role="note">' +
  '<strong>Σημείωση προς τον διαχειριστή:</strong> το κείμενο αυτό είναι ένα σοβαρό, ' +
  'γενικής χρήσης πρότυπο και καλύπτει τη συνήθη περίπτωση ενός εταιρικού ιστότοπου χωρίς ' +
  'ηλεκτρονικές συναλλαγές. <strong>Δεν αποτελεί νομική συμβουλή.</strong> Πριν τη δημοσίευση, ' +
  'συμπληρώστε τα στοιχεία σε αγκύλες και ζητήστε από δικηγόρο ή τον υπεύθυνο προστασίας δεδομένων ' +
  'σας να το ελέγξει, ώστε να ανταποκρίνεται στην πραγματική επεξεργασία δεδομένων που κάνετε.' +
  '</div>';

function privacy() {
  const b = '../';
  const body = ADMIN_NOTE +
    '<h2>1. Ποιοι είμαστε</h2>' +
    '<p>Υπεύθυνος επεξεργασίας των προσωπικών δεδομένων είναι η <strong>' + D.business.name + '</strong>, ' +
      '{ΝΟΜΙΚΗ ΕΠΩΝΥΜΙΑ}, με έδρα {ΔΙΕΥΘΥΝΣΗ ΕΔΡΑΣ} και ΑΦΜ {ΑΦΜ}. ' +
      'Για κάθε θέμα σχετικό με τα δεδομένα σας: <a href="mailto:' + D.contact.email + '">' + D.contact.email + '</a>, ' +
      'τηλ. ' + D.contact.phonePrimaryDisplay + '.</p>' +

    '<h2>2. Ποια δεδομένα συλλέγουμε</h2>' +
    '<ul>' +
      '<li><strong>Στοιχεία που μας δίνετε εσείς:</strong> ονοματεπώνυμο, τηλέφωνο, email και το περιεχόμενο ' +
        'του μηνύματός σας, όταν συμπληρώνετε τη φόρμα επικοινωνίας ή μας καλείτε.</li>' +
      '<li><strong>Στοιχεία σύμβασης:</strong> εφόσον προχωρήσετε σε μίσθωση, τα στοιχεία που απαιτούνται ' +
        'από τον νόμο για την κατάρτιση του μισθωτηρίου.</li>' +
      '<li><strong>Τεχνικά δεδομένα:</strong> εφόσον συναινέσετε, δεδομένα χρήσης του ιστότοπου μέσω ' +
        'cookies στατιστικών. Χωρίς τη συγκατάθεσή σας δεν ενεργοποιείται κανένα εργαλείο ανάλυσης.</li>' +
      '<li><strong>Βίντεο-επιτήρηση:</strong> στις εγκαταστάσεις μας λειτουργεί κλειστό κύκλωμα ' +
        'παρακολούθησης για λόγους ασφάλειας. Χρόνος τήρησης: {ΗΜΕΡΕΣ} ημέρες.</li>' +
    '</ul>' +

    '<h2>3. Γιατί τα επεξεργαζόμαστε και με ποια νομική βάση</h2>' +
    '<ul>' +
      '<li><strong>Απάντηση στο αίτημά σας</strong> — νομική βάση: λήψη μέτρων πριν τη σύναψη σύμβασης (άρθρο 6§1β ΓΚΠΔ).</li>' +
      '<li><strong>Εκτέλεση της μίσθωσης και τιμολόγηση</strong> — νομική βάση: εκτέλεση σύμβασης και ' +
        'συμμόρφωση με έννομη υποχρέωση (άρθρο 6§1β και 6§1γ ΓΚΠΔ).</li>' +
      '<li><strong>Ασφάλεια εγκαταστάσεων</strong> — νομική βάση: έννομο συμφέρον (άρθρο 6§1στ ΓΚΠΔ).</li>' +
      '<li><strong>Στατιστικά και marketing</strong> — νομική βάση: η συγκατάθεσή σας (άρθρο 6§1α ΓΚΠΔ), ' +
        'την οποία μπορείτε να ανακαλέσετε ανά πάσα στιγμή από τις <a href="#" data-cookie-settings>Ρυθμίσεις Cookies</a>.</li>' +
    '</ul>' +

    '<h2>4. Πόσο καιρό τα κρατάμε</h2>' +
    '<p>Τα μηνύματα επικοινωνίας διατηρούνται για {ΜΗΝΕΣ} μήνες. Τα στοιχεία σύμβασης και τα φορολογικά ' +
      'παραστατικά διατηρούνται για όσο χρόνο επιβάλλει η φορολογική νομοθεσία. Τα δεδομένα από cookies ' +
      'στατιστικών διατηρούνται σύμφωνα με τις ρυθμίσεις του εκάστοτε εργαλείου.</p>' +

    '<h2>5. Με ποιους μοιραζόμαστε τα δεδομένα σας</h2>' +
    '<p>Δεν πωλούμε προσωπικά δεδομένα. Ενδέχεται να τα κοινοποιήσουμε σε: τον πάροχο φιλοξενίας του ' +
      'ιστότοπου, την υπηρεσία επεξεργασίας της φόρμας επικοινωνίας, το λογιστήριό μας και σε δημόσιες ' +
      'αρχές όπου το επιβάλλει ο νόμος.</p>' +

    '<h2>6. Τα δικαιώματά σας</h2>' +
    '<p>Έχετε δικαίωμα πρόσβασης, διόρθωσης, διαγραφής, περιορισμού της επεξεργασίας, φορητότητας και ' +
      'εναντίωσης, καθώς και δικαίωμα ανάκλησης της συγκατάθεσής σας. Για την άσκησή τους επικοινωνήστε ' +
      'στο <a href="mailto:' + D.contact.email + '">' + D.contact.email + '</a>. Απαντάμε εντός ενός μηνός.</p>' +
    '<p>Έχετε επίσης δικαίωμα καταγγελίας στην <strong>Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα</strong> ' +
      '(Λεωφ. Κηφισίας 1-3, 115 23 Αθήνα, <a href="https://www.dpa.gr" target="_blank" rel="noopener">www.dpa.gr</a>).</p>' +

    '<h2>7. Ασφάλεια</h2>' +
    '<p>Ο ιστότοπος λειτουργεί με κρυπτογραφημένη σύνδεση (HTTPS). Λαμβάνουμε εύλογα τεχνικά και ' +
      'οργανωτικά μέτρα για την προστασία των δεδομένων σας από απώλεια, κακή χρήση ή μη εξουσιοδοτημένη πρόσβαση.</p>' +

    '<h2>8. Αλλαγές στην πολιτική</h2>' +
    '<p>Ενδέχεται να επικαιροποιήσουμε την παρούσα πολιτική. Η ημερομηνία τελευταίας ενημέρωσης ' +
      'αναγράφεται στην κορυφή της σελίδας.</p>';

  return {
    slug: 'pages/privacy-policy.html', depth: 1, navId: '',
    title: 'Πολιτική Απορρήτου | Self Storages',
    description: 'Πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά σας δεδομένα, σύμφωνα με τον ΓΚΠΔ.',
    breadcrumbs: [{ name: 'Αρχική', href: 'index.html' }, { name: 'Πολιτική Απορρήτου', href: 'pages/privacy-policy.html' }],
    content: legalShell('Πολιτική Απορρήτου',
      'Πώς διαχειριζόμαστε τα προσωπικά σας δεδομένα, σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων.', body)
  };
}

function cookies() {
  const body = ADMIN_NOTE +
    '<h2>Τι είναι τα cookies</h2>' +
    '<p>Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας όταν επισκέπτεστε έναν ' +
      'ιστότοπο. Χρησιμοποιούνται για να λειτουργεί σωστά ο ιστότοπος, να θυμάται τις προτιμήσεις σας ή ' +
      'να συλλέγει στατιστικά χρήσης.</p>' +

    '<h2>Η προσέγγισή μας</h2>' +
    '<p>Δεν ενεργοποιούμε κανένα cookie στατιστικών ή marketing πριν μας δώσετε ρητή συγκατάθεση. ' +
      'Τα σχετικά scripts φορτώνονται μόνο αφού πατήσετε «Αποδοχή» — δεν εκτελούνται στο παρασκήνιο ' +
      'εν αναμονή της απάντησής σας.</p>' +
    '<p>Για τον ίδιο λόγο, <strong>ο χάρτης Google φορτώνει μόνο όταν πατήσετε πάνω του</strong>. ' +
      'Μέχρι τότε δεν γίνεται καμία επικοινωνία με τους διακομιστές της Google.</p>' +

    '<h2>Κατηγορίες cookies</h2>' +
    '<h3>Απαραίτητα</h3>' +
    '<p>Χρειάζονται για τη βασική λειτουργία. Στον ιστότοπό μας περιορίζονται σε μία τοπική εγγραφή ' +
      '(<code>ss_cookie_consent_v1</code>) που θυμάται την επιλογή σας για τα cookies, ώστε να μη σας ' +
      'ρωτάμε ξανά. Δεν απαιτούν συγκατάθεση.</p>' +

    '<h3>Στατιστικά</h3>' +
    '<p>Μας βοηθούν να καταλάβουμε πόσοι επισκέπτονται τον ιστότοπο και ποιες σελίδες διαβάζουν, ώστε ' +
      'να τον βελτιώνουμε. Ενεργοποιούνται μόνο με τη συγκατάθεσή σας.</p>' +

    '<h3>Marketing</h3>' +
    '<p>Χρησιμοποιούνται για τη μέτρηση της απόδοσης διαφημίσεων και την προβολή σχετικού περιεχομένου. ' +
      'Ενεργοποιούνται μόνο με τη συγκατάθεσή σας.</p>' +

    '<h2>Πώς αλλάζω γνώμη</h2>' +
    '<p>Μπορείτε να αλλάξετε ή να ανακαλέσετε τη συγκατάθεσή σας οποιαδήποτε στιγμή από τον σύνδεσμο ' +
      '<a href="#" data-cookie-settings><strong>Ρυθμίσεις Cookies</strong></a> (υπάρχει και στο κάτω μέρος ' +
      'κάθε σελίδας). Μπορείτε επίσης να διαγράψετε ή να μπλοκάρετε cookies από τις ρυθμίσεις του ' +
      'προγράμματος περιήγησής σας.</p>';

  return {
    slug: 'pages/cookies.html', depth: 1, navId: '',
    title: 'Πολιτική Cookies | Self Storages',
    description: 'Ποια cookies χρησιμοποιούμε, γιατί, και πώς μπορείτε να αλλάξετε ή να ανακαλέσετε τη συγκατάθεσή σας.',
    breadcrumbs: [{ name: 'Αρχική', href: 'index.html' }, { name: 'Cookies', href: 'pages/cookies.html' }],
    content: legalShell('Πολιτική Cookies',
      'Ποια cookies χρησιμοποιεί ο ιστότοπος και πώς ελέγχετε τις επιλογές σας.', body)
  };
}

function terms() {
  const body = ADMIN_NOTE +
    '<h2>1. Αντικείμενο</h2>' +
    '<p>Οι παρόντες όροι διέπουν τη χρήση του ιστότοπου <strong>' + D.business.domain.replace(/^https?:\/\//, '') +
      '</strong>. Με την περιήγησή σας αποδέχεστε τους όρους αυτούς. Οι όροι της εκάστοτε μίσθωσης ' +
      'καθορίζονται αποκλειστικά από το υπογεγραμμένο μισθωτήριο συμβόλαιο και όχι από την παρούσα σελίδα.</p>' +

    '<h2>2. Πληροφορίες και τιμές</h2>' +
    '<p>Καταβάλλουμε κάθε προσπάθεια ώστε οι πληροφορίες και οι τιμές που δημοσιεύονται να είναι ακριβείς ' +
      'και επίκαιρες. Οι τιμές ενδέχεται να μεταβληθούν και η διαθεσιμότητα των χώρων δεν είναι εγγυημένη ' +
      'μέχρι την υπογραφή μισθωτηρίου. Τυχόν τυπογραφικά λάθη δεν δεσμεύουν την επιχείρηση.</p>' +

    '<h2>3. Πνευματική ιδιοκτησία</h2>' +
    '<p>Το περιεχόμενο του ιστότοπου (κείμενα, φωτογραφίες, λογότυπο, σχεδιασμός) ανήκει στην ' +
      D.business.name + ' ή χρησιμοποιείται με άδεια. Απαγορεύεται η αναπαραγωγή ή αναδημοσίευση χωρίς ' +
      'έγγραφη άδεια.</p>' +

    '<h2>4. Ορθή χρήση</h2>' +
    '<p>Δεσμεύεστε να μη χρησιμοποιήσετε τον ιστότοπο για παράνομο σκοπό, να μην επιχειρήσετε μη ' +
      'εξουσιοδοτημένη πρόσβαση και να μην αποστέλλετε ανεπιθύμητα ή κακόβουλα μηνύματα μέσω της φόρμας.</p>' +

    '<h2>5. Σύνδεσμοι προς τρίτους</h2>' +
    '<p>Ο ιστότοπος ενδέχεται να περιέχει συνδέσμους προς ιστότοπους τρίτων. Δεν ελέγχουμε και δεν ' +
      'φέρουμε ευθύνη για το περιεχόμενο ή τις πρακτικές απορρήτου τους.</p>' +

    '<h2>6. Περιορισμός ευθύνης</h2>' +
    '<p>Ο ιστότοπος παρέχεται «ως έχει». Στον βαθμό που επιτρέπεται από τον νόμο, δεν φέρουμε ευθύνη για ' +
      'ζημία που προκύπτει από τη χρήση ή την αδυναμία χρήσης του. Η παρούσα ρήτρα δεν περιορίζει ' +
      'δικαιώματα που σας παρέχει αναγκαστικού δικαίου διάταξη, ιδίως η νομοθεσία προστασίας καταναλωτή.</p>' +

    '<h2>7. Εφαρμοστέο δίκαιο</h2>' +
    '<p>Εφαρμόζεται το ελληνικό δίκαιο. Αρμόδια ορίζονται τα δικαστήρια {ΠΟΛΗ}. Για καταναλωτικές ' +
      'διαφορές διατηρείτε το δικαίωμα προσφυγής στις αρμόδιες αρχές εναλλακτικής επίλυσης διαφορών.</p>' +

    '<h2>8. Επικοινωνία</h2>' +
    '<p>Για οποιοδήποτε ερώτημα σχετικά με τους παρόντες όρους: ' +
      '<a href="mailto:' + D.contact.email + '">' + D.contact.email + '</a> ή ' + D.contact.phonePrimaryDisplay + '.</p>';

  return {
    slug: 'pages/oroi-xrisis.html', depth: 1, navId: '',
    title: 'Όροι Χρήσης | Self Storages',
    description: 'Οι όροι που διέπουν τη χρήση του ιστότοπου της Self Storages: πληροφορίες και τιμές, ' +
      'πνευματική ιδιοκτησία, ορθή χρήση, περιορισμός ευθύνης και εφαρμοστέο δίκαιο.',
    breadcrumbs: [{ name: 'Αρχική', href: 'index.html' }, { name: 'Όροι Χρήσης', href: 'pages/oroi-xrisis.html' }],
    content: legalShell('Όροι Χρήσης', 'Οι όροι που διέπουν τη χρήση αυτού του ιστότοπου.', body)
  };
}

/* ==========================================================================
   404
   ========================================================================== */
function notFound() {
  const b = '';   // το 404 σερβίρεται από οποιοδήποτε βάθος URL
  const content =
  '<section class="section text-center"><div class="container">' +
    '<div class="row justify-content-center"><div class="col-lg-7">' +
      '<div style="font-size:clamp(4rem,12vw,7rem);font-weight:800;line-height:1;color:var(--brand-primary);letter-spacing:-.05em">404</div>' +
      '<h1 class="mt-3">Η σελίδα δεν βρέθηκε</h1>' +
      '<p class="lead">Ο σύνδεσμος που ακολουθήσατε ίσως είναι λανθασμένος ή η σελίδα μετακινήθηκε. ' +
        'Δείτε παρακάτω πού μπορείτε να πάτε.</p>' +
      '<div class="d-flex flex-wrap gap-2 justify-content-center mt-4">' +
        '<a class="btn btn-brand" href="/index.html">' + icon('house-door-fill') + ' Αρχική</a>' +
        '<a class="btn btn-outline-brand" href="/pages/times.html">' + icon('currency-euro') + ' Τιμές</a>' +
        '<a class="btn btn-outline-brand" href="/pages/perioches.html">' + icon('geo-alt-fill') + ' Περιοχές</a>' +
        '<a class="btn btn-outline-brand" href="/pages/epikoinonia.html">' + icon('envelope-fill') + ' Επικοινωνία</a>' +
      '</div>' +
      '<p class="mt-5 text-muted">Ή καλέστε μας απευθείας στο ' +
        '<a href="tel:+30' + D.contact.phonePrimary + '"><strong>' + D.contact.phonePrimaryDisplay + '</strong></a>.</p>' +
    '</div></div>' +
  '</div></section>';

  return {
    slug: '404.html', depth: 0, navId: '',
    title: 'Η σελίδα δεν βρέθηκε (404) | Self Storages',
    description: 'Η σελίδα που ζητήσατε δεν υπάρχει. Επιστρέψτε στην αρχική ή επικοινωνήστε μαζί μας.',
    content: content,
    noindex: true,
    absoluteLinks: true
  };
}

module.exports = { prices, areas, faq, contact, privacy, cookies, terms, notFound };
