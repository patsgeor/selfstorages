/* ============================================================================
   ΚΥΡΙΕΣ ΣΕΛΙΔΕΣ — περιεχόμενο
   Κάθε συνάρτηση επιστρέφει ένα αντικείμενο σελίδας για τον generator.
   ========================================================================= */
'use strict';

const { icon, esc, D, SITE } = require('./templates/layout.js');
const C = require('./templates/components.js');

const MIN_LOFT = Math.min.apply(null, D.pricing.lofts.map(x => x.price));
const MIN_STORAGE = Math.min.apply(null, D.pricing.storage.map(x => x.price));
const MIN_TAX = Math.min.apply(null, D.pricing.taxDomicile.map(x => x.price));
const YEARS = new Date().getFullYear() - D.business.foundedYear;

/* ==========================================================================
   ΑΡΧΙΚΗ
   ========================================================================== */
function home() {
  const b = '';
  const img = D.images.hero;

  const content =
  /* --- HERO --- */
  '<section class="hero">' +
    '<img class="hero-media" src="' + b + img.src + '" alt="" width="1600" height="900" fetchpriority="high">' +
    '<div class="container">' +
      '<span class="hero-badge"><span class="bullet"></span>Οικογενειακή επιχείρηση από το ' + D.business.foundedYear + '</span>' +
      '<h1>Ενοικίαση αποθηκών και φορολογικής έδρας στην Αθήνα</h1>' +
      '<p class="lead">Ασφαλείς αποθήκες και πατάρια για ιδιώτες και επιχειρήσεις, σε ' + D.locations.length +
        ' σημεία της Αττικής. Μηνιαία ενοικίαση χωρίς δέσμευση, από ' + MIN_LOFT + '€ τον μήνα.</p>' +
      '<div class="hero-actions">' +
        '<a class="btn btn-light-solid btn-lg-cta" href="' + b + 'pages/times.html">' + icon('currency-euro') + ' Δείτε τιμές</a>' +
        '<a class="btn btn-ghost-light btn-lg-cta" href="tel:+30' + D.contact.phonePrimary + '">' + icon('telephone-fill') + ' ' + D.contact.phonePrimaryDisplay + '</a>' +
      '</div>' +
      '<div class="hero-trust">' +
        '<span class="hero-trust-item"><span class="ico">' + icon('shield-check') + '</span>Κάμερες &amp; συναγερμός 24/7</span>' +
        '<span class="hero-trust-item"><span class="ico">' + icon('calendar-check') + '</span>Χωρίς δέσμευση διάρκειας</span>' +
        '<span class="hero-trust-item"><span class="ico">' + icon('people-fill') + '</span>500+ πελάτες</span>' +
        '<span class="hero-trust-item"><span class="ico">' + icon('geo-alt-fill') + '</span>' + D.locations.length + ' τοποθεσίες στην Αττική</span>' +
      '</div>' +
    '</div>' +
  '</section>' +

  /* --- ΥΠΗΡΕΣΙΕΣ --- */
  '<section class="section">' +
    '<div class="container">' +
      C.sectionHead('Τι προσφέρουμε', 'Δύο υπηρεσίες, μία λύση για τον χώρο σας',
        'Είτε χρειάζεστε χώρο για τα πράγματά σας είτε επίσημη διεύθυνση για την επιχείρησή σας, καλύπτουμε και τα δύο από την ίδια εγκατάσταση.') +
      '<div class="row g-3 g-md-4">' +

        '<div class="col-lg-4 col-md-6"><article class="card-modern reveal">' +
          '<div class="card-icon">' + icon('box-seam') + '</div>' +
          '<h3>Ενοικίαση αποθηκών &amp; παταριών</h3>' +
          '<p>Από ένα μικρό πατάρι για λίγα κιβώτια, μέχρι αποθήκη 15 τ.μ. για ολόκληρη οικοσκευή. ' +
            'Πληρώνετε μηνιαία και κρατάτε τον χώρο για όσο τον χρειάζεστε.</p>' +
          '<a class="card-link" href="' + b + 'pages/enoikiasi-apothikon.html">Δείτε μεγέθη και τιμές <span class="arw">' + icon('arrow-right') + '</span></a>' +
        '</article></div>' +

        '<div class="col-lg-4 col-md-6"><article class="card-modern reveal reveal-d1">' +
          '<div class="card-icon">' + icon('building') + '</div>' +
          '<h3>Φορολογική έδρα &amp; επαγγελματική διεύθυνση</h3>' +
          '<p>Νόμιμο μισθωτήριο με ανάρτηση στο taxisnet, σε πραγματική διεύθυνση. ' +
            'Η λύση για ελεύθερους επαγγελματίες που δεν θέλουν να δηλώσουν το σπίτι τους ως έδρα.</p>' +
          '<a class="card-link" href="' + b + 'pages/forologiki-edra-virtual-office.html">Πώς λειτουργεί <span class="arw">' + icon('arrow-right') + '</span></a>' +
        '</article></div>' +

        '<div class="col-lg-4 col-md-6"><article class="card-modern reveal reveal-d2">' +
          '<div class="card-icon">' + icon('truck') + '</div>' +
          '<h3>Μετακομίσεις &amp; μεταφορές</h3>' +
          '<p>Αναλαμβάνουμε και τη μεταφορά, ώστε να μη χρειαστεί να συντονίσετε δύο διαφορετικές ' +
            'εταιρείες για την ίδια δουλειά.</p>' +
          '<a class="card-link" href="' + b + 'pages/metakomiseis.html">Ζητήστε προσφορά <span class="arw">' + icon('arrow-right') + '</span></a>' +
        '</article></div>' +

      '</div>' +
      '<div class="mt-4 reveal">' + C.priceTeaser(b) + '</div>' +
    '</div>' +
  '</section>' +

  /* --- 3 ΒΗΜΑΤΑ --- */
  '<section class="section section-subtle">' +
    '<div class="container">' +
      C.sectionHead('Η διαδικασία', 'Τρία βήματα και η αποθήκη σας είναι έτοιμη',
        'Χωρίς γραφειοκρατία και χωρίς χρονοβόρες διαδικασίες. Οι περισσότεροι πελάτες μας ολοκληρώνουν την ίδια μέρα.') +
      '<div class="timeline">' +
        '<div class="tl-step reveal"><div class="tl-num">1</div>' +
          '<h3>Μας λέτε τι θέλετε να αποθηκεύσετε</h3>' +
          '<p>Ένα τηλεφώνημα αρκεί. Με βάση το τι έχετε, σας προτείνουμε μέγεθος και την πλησιέστερη τοποθεσία.</p></div>' +
        '<div class="tl-step reveal reveal-d1"><div class="tl-num">2</div>' +
          '<h3>Επισκέπτεστε τον χώρο</h3>' +
          '<p>Κλείνουμε ραντεβού για να δείτε από κοντά την αποθήκη πριν αποφασίσετε. Χωρίς καμία δέσμευση.</p></div>' +
        '<div class="tl-step reveal reveal-d2"><div class="tl-num">3</div>' +
          '<h3>Παίρνετε τα κλειδιά</h3>' +
          '<p>Υπογράφουμε, παραλαμβάνετε το δικό σας κλειδί και μεταφέρετε τα πράγματά σας όποτε σας βολεύει.</p></div>' +
      '</div>' +
    '</div>' +
  '</section>' +

  /* --- ΓΙΑΤΙ ΕΜΑΣ --- */
  '<section class="section">' +
    '<div class="container">' +
      '<div class="row g-4 g-lg-5 align-items-center">' +
        '<div class="col-lg-6 reveal">' +
          '<span class="eyebrow">Γιατί να μας επιλέξετε</span>' +
          '<h2>Μια οικογενειακή επιχείρηση, όχι ένα τηλεφωνικό κέντρο</h2>' +
          '<p class="lead">Ξεκινήσαμε το ' + D.business.foundedYear + ' με μία εγκατάσταση. ' + YEARS +
            ' χρόνια αργότερα εξυπηρετούμε πάνω από 500 πελάτες σε ' + D.locations.length + ' σημεία της Αττικής — ' +
            'με τους ίδιους ανθρώπους να σηκώνουν το τηλέφωνο.</p>' +
          '<ul class="check-list">' +
            '<li><strong>Ξεκάθαρες τιμές.</strong> Ο τιμοκατάλογος είναι δημοσιευμένος. Δεν υπάρχουν κρυφές χρεώσεις ούτε «έξοδα φακέλου».</li>' +
            '<li><strong>Καμία δέσμευση για αποθήκες.</strong> Πληρώνετε μηνιαία και σταματάτε όποτε θέλετε.</li>' +
            '<li><strong>Άμεση επικοινωνία.</strong> Μιλάτε με τον ίδιο άνθρωπο κάθε φορά που καλείτε.</li>' +
            '<li><strong>Δύο υπηρεσίες μαζί.</strong> Αποθήκη και φορολογική έδρα από την ίδια διεύθυνση.</li>' +
          '</ul>' +
          '<a class="btn btn-outline-brand" href="' + b + 'pages/sxetika.html">Η ιστορία μας ' + icon('arrow-right') + '</a>' +
        '</div>' +
        '<div class="col-lg-6 reveal reveal-d1">' +
          '<img class="rounded-4 shadow-sm w-100" src="' + b + D.images.about.src + '" alt="' + esc(D.images.about.alt) + '" width="900" height="600" loading="lazy">' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +

  /* --- ΣΤΑΤΙΣΤΙΚΑ --- */
  '<section class="section-sm bg-dark-section"><div class="container">' + C.statsRow() + '</div></section>' +

  /* --- ΑΣΦΑΛΕΙΑ --- */
  '<section class="section">' +
    '<div class="container">' +
      C.sectionHead('Ασφάλεια', 'Τα πράγματά σας φυλάσσονται σοβαρά',
        'Κάθε εγκατάσταση διαθέτει τον ίδιο εξοπλισμό ασφαλείας — δεν υπάρχουν «οικονομικές» τοποθεσίες με λιγότερη προστασία.') +
      '<div class="row g-4 g-lg-5 align-items-center mb-4 mb-lg-5">' +
        '<div class="col-lg-6 reveal">' +
          '<img class="rounded-4 shadow-sm w-100" src="' + b + D.images.security.src + '" alt="' + esc(D.images.security.alt) + '" width="900" height="504" loading="lazy">' +
        '</div>' +
        '<div class="col-lg-6 reveal reveal-d1">' +
          '<h3>Ατομικό κλείδωμα, δικά σας κλειδιά</h3>' +
          '<p>Κάθε αποθήκη κλειδώνει ξεχωριστά και το κλειδί το κρατάτε αποκλειστικά εσείς — κανείς από εμάς δεν έχει πρόσβαση στον χώρο σας. ' +
            'Ο κοινόχρηστος χώρος παρακολουθείται 24/7 από κάμερες, με συναγερμό και πυρανίχνευση σε λειτουργία ακόμα και όταν η εγκατάσταση είναι κλειστή.</p>' +
          '<a class="card-link" href="' + b + 'pages/enoikiasi-apothikon.html">Δείτε πώς λειτουργεί <span class="arw">' + icon('arrow-right') + '</span></a>' +
        '</div>' +
      '</div>' +
      C.securityCards() +
    '</div>' +
  '</section>' +

  /* --- ΤΟΠΟΘΕΣΙΕΣ --- */
  '<section class="section section-subtle">' +
    '<div class="container">' +
      C.sectionHead('Πού θα μας βρείτε', 'Έξι τοποθεσίες σε όλη την Αττική',
        'Επιλέξτε την πλησιέστερη σε εσάς. Κάθε σελίδα έχει διεύθυνση, ωράριο και χάρτη.') +
      C.locationCards(b) +
      '<div class="text-center mt-4 reveal">' +
        '<a class="btn btn-outline-brand" href="' + b + 'pages/perioches.html">Δείτε όλες τις περιοχές εξυπηρέτησης ' + icon('arrow-right') + '</a>' +
      '</div>' +
    '</div>' +
  '</section>' +

  /* --- TESTIMONIALS --- */
  '<section class="section">' +
    '<div class="container">' +
      C.sectionHead('Κριτικές πελατών', 'Τι λένε οι πελάτες μας', '') +
      '<div class="row g-3 g-md-4">' +
        D.testimonials.map(function (t, i) {
          return '<div class="col-lg-4 col-md-6"><figure class="testimonial' + (t.isPlaceholder ? ' is-placeholder' : '') + ' reveal reveal-d' + (i % 3) + '">' +
            '<div class="quote" aria-hidden="true">&ldquo;</div>' +
            '<blockquote class="mb-0"><p>' + esc(t.text) + '</p></blockquote>' +
            '<figcaption><div class="who">' + esc(t.who) + '</div><div class="where">' + esc(t.where) + '</div></figcaption>' +
            '</figure></div>';
        }).join('') +
      '</div>' +
      (D.testimonials.some(function (t) { return t.isPlaceholder; }) ?
        '<div class="alert alert-warning mt-4 reveal" role="note">' +
          icon('exclamation-triangle-fill') + ' <strong>Σημείωση προς τον διαχειριστή:</strong> ' +
          'υπάρχουν κριτικές σε κενές θέσεις στο <code>js/data.js</code> (<code>testimonials</code>). ' +
          'Συμπληρώστε πραγματικά σχόλια πελατών (ιδανικά από το Google Business Profile) πριν δημοσιεύσετε τον ιστότοπο, ' +
          'και αλλάξτε το <code>isPlaceholder</code> σε <code>false</code>. ' +
          'Μη δημοσιεύετε κατασκευασμένες κριτικές — είναι παραπλανητικό και αντίθετο στη νομοθεσία προστασίας καταναλωτή.' +
        '</div>' : '') +
    '</div>' +
  '</section>' +

  /* --- FAQ --- */
  '<section class="section section-subtle">' +
    '<div class="container">' +
      C.sectionHead('Συχνές ερωτήσεις', 'Απαντήσεις στα πιο συνηθισμένα ερωτήματα', '') +
      C.faqAccordion(D.faq, 6) +
      '<div class="text-center mt-4 reveal">' +
        '<a class="btn btn-outline-brand" href="' + b + 'pages/faq.html">Όλες οι ερωτήσεις ' + icon('arrow-right') + '</a>' +
      '</div>' +
    '</div>' +
  '</section>' +

  C.ctaBand(b);

  return {
    slug: 'index.html', depth: 0, navId: 'home',
    title: 'Ενοικίαση Αποθηκών Αθήνα & Φορολογική Έδρα | Self Storages',
    description: 'Ενοικίαση αποθηκών και παταριών σε 6 σημεία της Αττικής, από ' + MIN_LOFT +
      '€/μήνα, και φορολογική έδρα από ' + MIN_TAX + '€/μήνα. Οικογενειακή επιχείρηση από το ' + D.business.foundedYear + '.',
    content: content,
    schema: [C.organizationSchema(), C.websiteSchema()]
  };
}

/* ==========================================================================
   ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ
   ========================================================================== */
function about() {
  const b = '../';
  const content =
  '<section class="page-hero"><div class="container">' +
    '<h1>Ποιοι είμαστε</h1>' +
    '<p>Μια οικογενειακή επιχείρηση αποθήκευσης στην Αττική, από το ' + D.business.foundedYear + '.</p>' +
  '</div></section>' +

  '<section class="section"><div class="container">' +
    '<div class="row g-4 g-lg-5 align-items-center">' +
      '<div class="col-lg-6 reveal">' +
        '<h2>Ξεκινήσαμε επειδή δεν βρίσκαμε αυτό που ψάχναμε</h2>' +
        '<p class="lead">Το ' + D.business.foundedYear + ' ανοίξαμε την πρώτη μας εγκατάσταση με μια απλή παρατήρηση: ' +
          'στην Αθήνα υπήρχαν είτε τεράστιες βιομηχανικές αποθήκες, είτε τίποτα. Φτιάξαμε αυτό που έλειπε: ' +
          'μικρές και μεσαίες αποθήκες μέσα στη γειτονιά, με λογική τιμή και χωρίς συμβόλαια που σε δεσμεύουν για χρόνια.</p>' +
        '<p>' + YEARS + ' χρόνια μετά, εξυπηρετούμε πάνω από 500 πελάτες από ' + D.locations.length +
          ' εγκαταστάσεις. Παραμένουμε οικογενειακή επιχείρηση — συνειδητή επιλογή, όχι περιορισμός.</p>' +
      '</div>' +
      '<div class="col-lg-6 reveal reveal-d1">' +
        '<img class="rounded-4 shadow-sm w-100" src="' + b + D.images.about.src + '" alt="' + esc(D.images.about.alt) + '" width="900" height="600" loading="lazy">' +
      '</div>' +
    '</div>' +
  '</div></section>' +

  '<section class="section-sm bg-dark-section"><div class="container">' + C.statsRow() + '</div></section>' +

  '<section class="section"><div class="container">' +
    C.sectionHead('Οι αρχές μας', 'Τέσσερα πράγματα που δεν διαπραγματευόμαστε', '') +
    '<div class="row g-3 g-md-4">' +
      '<div class="col-lg-3 col-md-6"><div class="card-modern reveal">' +
        '<div class="card-icon">' + icon('currency-euro') + '</div><h3>Διαφάνεια στην τιμή</h3>' +
        '<p>Ο τιμοκατάλογός μας είναι δημοσιευμένος στον ιστότοπο. Η τιμή που βλέπετε είναι η τιμή που πληρώνετε.</p></div></div>' +
      '<div class="col-lg-3 col-md-6"><div class="card-modern reveal reveal-d1">' +
        '<div class="card-icon">' + icon('calendar-check') + '</div><h3>Ευελιξία</h3>' +
        '<p>Για τις αποθήκες δεν ζητάμε δέσμευση. Αν οι ανάγκες σας αλλάξουν, αλλάζετε μέγεθος ή σταματάτε.</p></div></div>' +
      '<div class="col-lg-3 col-md-6"><div class="card-modern reveal reveal-d2">' +
        '<div class="card-icon">' + icon('shield-check') + '</div><h3>Ίδια ασφάλεια παντού</h3>' +
        '<p>Κάθε εγκατάσταση έχει τον ίδιο εξοπλισμό: κάμερες, συναγερμό, πυρανίχνευση, ατομικές κλειδαριές.</p></div></div>' +
      '<div class="col-lg-3 col-md-6"><div class="card-modern reveal">' +
        '<div class="card-icon">' + icon('people-fill') + '</div><h3>Προσωπική εξυπηρέτηση</h3>' +
        '<p>Δεν έχουμε τηλεφωνικό κέντρο. Μιλάτε με τους ίδιους ανθρώπους που διαχειρίζονται τις εγκαταστάσεις.</p></div></div>' +
    '</div>' +
  '</div></section>' +

  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Οι εγκαταστάσεις μας', 'Πού θα μας βρείτε', '') +
    C.locationCards(b) +
  '</div></section>' +

  C.ctaBand(b, { title: 'Θέλετε να δείτε μια αποθήκη από κοντά;', text: 'Κλείστε ένα ραντεβού χωρίς καμία δέσμευση. Θα σας δείξουμε τους διαθέσιμους χώρους και θα απαντήσουμε στις ερωτήσεις σας.' });

  return {
    slug: 'pages/sxetika.html', depth: 1, navId: 'about',
    title: 'Ποιοι Είμαστε | Self Storages — Οικογενειακή Επιχείρηση από το ' + D.business.foundedYear,
    description: 'Οικογενειακή επιχείρηση αποθήκευσης από το ' + D.business.foundedYear + ', με ' + YEARS +
      ' χρόνια εμπειρίας, 500+ πελάτες και ' + D.locations.length + ' εγκαταστάσεις στην Αττική.',
    breadcrumbs: [{ name: 'Αρχική', href: 'index.html' }, { name: 'Ποιοι Είμαστε', href: 'pages/sxetika.html' }],
    content: content
  };
}

/* ==========================================================================
   ΥΠΗΡΕΣΙΕΣ (hub)
   ========================================================================== */
function services() {
  const b = '../';
  const content =
  '<section class="page-hero"><div class="container">' +
    '<h1>Οι υπηρεσίες μας</h1>' +
    '<p>Αποθηκευτικοί χώροι, φορολογική έδρα και μεταφορές — από μία επιχείρηση, σε ' + D.locations.length + ' σημεία της Αττικής.</p>' +
  '</div></section>' +

  /* --- ΒΑΣΙΚΗ ΥΠΗΡΕΣΙΑ 1: ΑΠΟΘΗΚΕΣ --- */
  '<section class="section"><div class="container">' +
    C.sectionHead('Βασική υπηρεσία', 'Ενοικίαση αποθηκών &amp; παταριών',
      'Από ένα μικρό πατάρι μέχρι αποθήκη 15 τ.μ., με μηνιαία ενοικίαση και χωρίς δέσμευση.', 'start') +
    '<div class="row g-4">' +
      '<div class="col-lg-4 col-md-6"><article class="card-modern reveal">' +
        '<div class="card-icon">' + icon('box-seam') + '</div>' +
        '<h3>Αποθήκες</h3>' +
        '<p>Από 2-3 τ.μ. έως 15 τ.μ. για οικοσκευή, έπιπλα, αρχεία ή εμπορεύματα, από ' + MIN_STORAGE + '€.</p>' +
        '<a class="card-link" href="' + b + 'pages/enoikiasi-apothikon.html">Μεγέθη και τιμές <span class="arw">' + icon('arrow-right') + '</span></a>' +
      '</article></div>' +

      '<div class="col-lg-4 col-md-6"><article class="card-modern reveal reveal-d1">' +
        '<div class="card-icon">' + icon('boxes') + '</div>' +
        '<h3>Πατάρια</h3>' +
        '<p>Η πιο οικονομική λύση για λίγα κιβώτια και εποχιακά είδη, από ' + MIN_LOFT + '€ τον μήνα.</p>' +
        '<a class="card-link" href="' + b + 'pages/enoikiasi-apothikon.html#pataria">Δείτε τα πατάρια <span class="arw">' + icon('arrow-right') + '</span></a>' +
      '</article></div>' +

      '<div class="col-lg-4 col-md-6"><article class="card-modern reveal reveal-d2">' +
        '<div class="card-icon accent">' + icon('calculator') + '</div>' +
        '<h3>Υπολογισμός χώρου</h3>' +
        '<p>Δεν ξέρετε τι μέγεθος χρειάζεστε; Ο υπολογιστής μας σας δίνει πρόταση σε δύο κλικ.</p>' +
        '<a class="card-link" href="' + b + 'pages/times.html#calculator">Υπολογίστε τώρα <span class="arw">' + icon('arrow-right') + '</span></a>' +
      '</article></div>' +
    '</div>' +
  '</div></section>' +

  /* --- ΒΑΣΙΚΗ ΥΠΗΡΕΣΙΑ 2: ΦΟΡΟΛΟΓΙΚΗ ΕΔΡΑ --- */
  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Βασική υπηρεσία', 'Φορολογική έδρα &amp; επαγγελματική διεύθυνση',
      'Νόμιμο μισθωτήριο με ανάρτηση στο taxisnet, σε πραγματική διεύθυνση.', 'start') +
    '<div class="row g-4 g-lg-5 align-items-center">' +
      '<div class="col-lg-7 reveal">' +
        '<p class="lead">Η λύση για ελεύθερους επαγγελματίες και μικρές επιχειρήσεις που δεν θέλουν να δηλώσουν το σπίτι τους ως έδρα.</p>' +
        '<a class="btn btn-brand" href="' + b + 'pages/forologiki-edra-virtual-office.html">Πώς λειτουργεί, από ' + MIN_TAX + '€/μήνα ' + icon('arrow-right') + '</a>' +
      '</div>' +
      '<div class="col-lg-5 reveal reveal-d1">' +
        '<div class="card-modern"><div class="card-icon">' + icon('building') + '</div>' +
          '<h3>Επαγγελματική διεύθυνση</h3>' +
          '<p>Μισθωτήριο στο taxisnet, χωρίς γραφείο που δεν χρειάζεστε.</p></div>' +
      '</div>' +
    '</div>' +
  '</div></section>' +

  /* --- ΣΥΜΠΛΗΡΩΜΑΤΙΚΑ --- */
  '<section class="section"><div class="container">' +
    C.sectionHead('Συμπληρωματικά', 'Μετακομίσεις &amp; εξυπηρέτηση σε όλη την Αττική', '', 'start') +
    '<div class="row g-4">' +
      '<div class="col-lg-6"><article class="card-modern reveal">' +
        '<div class="card-icon">' + icon('truck') + '</div>' +
        '<h3>Μετακομίσεις &amp; μεταφορές</h3>' +
        '<p>Μεταφορά επίπλων και οικοσκευής σε συνδυασμό με την ενοικίαση της αποθήκης σας.</p>' +
        '<a class="card-link" href="' + b + 'pages/metakomiseis.html">Ζητήστε προσφορά <span class="arw">' + icon('arrow-right') + '</span></a>' +
      '</article></div>' +

      '<div class="col-lg-6"><article class="card-modern reveal reveal-d1">' +
        '<div class="card-icon accent">' + icon('geo-alt-fill') + '</div>' +
        '<h3>Εξυπηρέτηση σε όλη την Αττική</h3>' +
        '<p>Έξι εγκαταστάσεις που καλύπτουν κέντρο, νότια, βόρεια και νοτιοανατολικά προάστια.</p>' +
        '<a class="card-link" href="' + b + 'pages/perioches.html">Δείτε τις περιοχές <span class="arw">' + icon('arrow-right') + '</span></a>' +
      '</article></div>' +
    '</div>' +
  '</div></section>' +

  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Ασφάλεια', 'Ό,τι κι αν αποθηκεύσετε, προστατεύεται το ίδιο', '') +
    C.securityCards() +
  '</div></section>' +

  C.ctaBand(b);

  return {
    slug: 'pages/ypiresies.html', depth: 1, navId: 'services',
    title: 'Υπηρεσίες Αποθήκευσης & Φορολογικής Έδρας | Self Storages',
    description: 'Ενοικίαση αποθηκών και παταριών από ' + MIN_LOFT + '€/μήνα, φορολογική έδρα από ' +
      MIN_TAX + '€/μήνα και υπηρεσίες μετακόμισης, σε 6 σημεία της Αττικής.',
    breadcrumbs: [{ name: 'Αρχική', href: 'index.html' }, { name: 'Υπηρεσίες', href: 'pages/ypiresies.html' }],
    content: content
  };
}

/* ==========================================================================
   ΕΝΟΙΚΙΑΣΗ ΑΠΟΘΗΚΩΝ
   ========================================================================== */
function storage() {
  const b = '../';
  const content =
  '<section class="page-hero"><div class="container">' +
    '<h1>Ενοικίαση αποθηκών στην Αθήνα</h1>' +
    '<p>Αποθηκευτικοί χώροι από 2 έως 15 τ.μ. για ιδιώτες και επιχειρήσεις, με μηνιαία ενοικίαση και χωρίς δέσμευση.</p>' +
  '</div></section>' +

  '<section class="section"><div class="container">' +
    '<div class="row g-4 g-lg-5">' +
      '<div class="col-lg-7 reveal">' +
        '<h2>Πότε χρειάζεστε αποθήκη</h2>' +
        '<p class="lead">Οι περισσότεροι πελάτες μας έρχονται για έναν από τέσσερις λόγους — και σε όλους η λύση είναι η ίδια: ένας καθαρός, ασφαλής χώρος που πληρώνεται μηνιαία.</p>' +
        '<ul class="check-list">' +
          '<li><strong>Μετακόμιση.</strong> Το νέο σπίτι δεν είναι έτοιμο ή δεν χωράει ό,τι είχατε. Η αποθήκη καλύπτει το ενδιάμεσο διάστημα.</li>' +
          '<li><strong>Ανακαίνιση.</strong> Χρειάζεστε να αδειάσετε δωμάτια χωρίς να πετάξετε έπιπλα που θα ξαναχρησιμοποιήσετε.</li>' +
          '<li><strong>Έλλειψη χώρου στο σπίτι.</strong> Εποχιακά είδη, βαλίτσες, αθλητικός εξοπλισμός και παιδικά πράγματα που δεν χωράνε πια.</li>' +
          '<li><strong>Επαγγελματική χρήση.</strong> Αρχεία, εμπορεύματα e-shop, εξοπλισμός συνεργείων ή εκθέσεων.</li>' +
        '</ul>' +
        '<div class="alert alert-light border reveal" role="note">' +
          icon('patch-check-fill') + ' <strong>Τρέχουσες προσφορές:</strong> δωρεάν μήνες σε συμβόλαιο 6 ή 12 μηνών, δωρεάν μεταφορά εντός Αττικής και εκπτώσεις. ' +
          '<a class="card-link d-inline-flex" href="' + b + 'pages/times.html#prosfores">Δείτε όλες τις προσφορές <span class="arw">' + icon('arrow-right') + '</span></a>' +
        '</div>' +
      '</div>' +
      '<div class="col-lg-5 reveal reveal-d1">' +
        '<img class="rounded-4 shadow-sm w-100" src="' + b + D.images.storagePage.src + '" alt="' + esc(D.images.storagePage.alt) + '" width="800" height="600" loading="lazy">' +
      '</div>' +
    '</div>' +
  '</div></section>' +

  /* Μεγέθη αποθηκών — περιγραφικά, χωρίς επανάληψη του πίνακα τιμών */
  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Μεγέθη', 'Ποιο μέγεθος ταιριάζει στην περίπτωσή σας',
      'Οι αντιστοιχίες παρακάτω βασίζονται σε πραγματικές μετακομίσεις που έχουμε εξυπηρετήσει. ' +
      'Αν δεν είστε σίγουροι, τηλεφωνήστε μας και το βρίσκουμε μαζί.') +
    '<div class="row g-3 g-md-4">' +
      D.pricing.storage.map(function (s, i) {
        return '<div class="col-lg-4 col-md-6"><div class="card-modern reveal reveal-d' + (i % 3) + '">' +
          '<div class="card-icon">' + icon('box-seam') + '</div>' +
          '<h3>' + esc(s.size) + '</h3>' +
          '<p class="text-muted small mb-2">' + esc(s.cbm) + '</p>' +
          '<p>' + esc(s.fits) + '</p></div></div>';
      }).join('') +
    '</div>' +
    '<div class="mt-4 text-center reveal">' +
      '<a class="btn btn-brand btn-lg-cta" href="' + b + 'pages/times.html">' + icon('currency-euro') + ' Δείτε αναλυτικές τιμές</a>' +
    '</div>' +
  '</div></section>' +

  /* Πατάρια */
  '<section class="section" id="pataria"><div class="container">' +
    '<div class="row g-4 g-lg-5 align-items-center">' +
      '<div class="col-lg-6 reveal">' +
        '<span class="eyebrow">Οικονομική λύση</span>' +
        '<h2>Πατάρια: όταν δεν χρειάζεστε ολόκληρη αποθήκη</h2>' +
        '<p>Το πατάρι είναι μικρότερος, κλειστός αποθηκευτικός χώρος σε υπερυψωμένο επίπεδο, από ' + MIN_LOFT +
          '€ τον μήνα — για λίγα κιβώτια, εποχιακά ρούχα ή μικροσυσκευές. Η σωστή επιλογή όταν δεν έχει νόημα ' +
          'να πληρώνετε για αποθήκη 5 τ.μ. αν χρειάζεστε τον μισό χώρο.</p>' +
        '<ul class="check-list">' +
          D.pricing.lofts.map(function (l) {
            return '<li><strong>' + esc(l.size) + '</strong> — ' + esc(l.fits) + '</li>';
          }).join('') +
        '</ul>' +
        '<a class="btn btn-outline-brand" href="' + b + 'pages/times.html">Τιμές παταριών ' + icon('arrow-right') + '</a>' +
      '</div>' +
      '<div class="col-lg-6 reveal reveal-d1">' +
        '<img class="rounded-4 shadow-sm w-100" src="' + b + D.images.calculator.src + '" alt="' + esc(D.images.calculator.alt) + '" width="800" height="600" loading="lazy">' +
      '</div>' +
    '</div>' +
  '</div></section>' +

  '<section class="section-sm"><div class="container">' +
    '<div class="row justify-content-center"><div class="col-lg-9">' +
      '<div class="alert alert-danger reveal" role="note">' +
        icon('exclamation-triangle-fill') + ' <strong>Απαγορεύεται:</strong> ' + esc(D.offers.prohibitedText) +
      '</div>' +
    '</div></div>' +
  '</div></section>' +

  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Ασφάλεια', 'Πώς προστατεύονται τα πράγματά σας', '') +
    C.securityCards() +
  '</div></section>' +

  '<section class="section"><div class="container">' +
    C.sectionHead('Τοποθεσίες', 'Διαλέξτε την πλησιέστερη αποθήκη', '') +
    C.locationCards(b) +
  '</div></section>' +

  C.ctaBand(b, { title: 'Δεν ξέρετε τι μέγεθος χρειάζεστε;', text: 'Πείτε μας τι θέλετε να αποθηκεύσετε και σας λέμε ακριβώς ποιο μέγεθος φτάνει — χωρίς να σας χρεώσουμε παραπάνω χώρο.' });

  return {
    slug: 'pages/enoikiasi-apothikon.html', depth: 1, navId: 'storage',
    title: 'Ενοικίαση Αποθηκών Αθήνα — Αποθηκευτικοί Χώροι από ' + MIN_STORAGE + '€ | Self Storages',
    description: 'Αποθήκες προς ενοικίαση από 2 έως 15 τ.μ. και πατάρια από ' + MIN_LOFT +
      '€/μήνα, σε 6 σημεία της Αττικής. Ασφάλεια 24/7, μηνιαία ενοικίαση χωρίς δέσμευση.',
    breadcrumbs: [
      { name: 'Αρχική', href: 'index.html' },
      { name: 'Υπηρεσίες', href: 'pages/ypiresies.html' },
      { name: 'Ενοικίαση Αποθηκών', href: 'pages/enoikiasi-apothikon.html' }
    ],
    content: content,
    schema: [C.serviceSchema('Ενοικίαση αποθηκευτικών χώρων',
      'Ενοικίαση αποθηκών και παταριών για ιδιώτες και επιχειρήσεις σε 6 σημεία της Αττικής.',
      SITE + '/pages/enoikiasi-apothikon.html')]
  };
}

/* ==========================================================================
   ΦΟΡΟΛΟΓΙΚΗ ΕΔΡΑ / VIRTUAL OFFICE
   ΣΗΜΑΝΤΙΚΟ: στοχεύουμε τους όρους «virtual office» και «εικονικό γραφείο»,
   αλλά δηλώνουμε ΡΗΤΑ τι δεν παρέχουμε. Καμία υπόσχεση για υπηρεσίες
   που δεν υπάρχουν.
   ========================================================================== */
function taxOffice() {
  const b = '../';
  const content =
  '<section class="page-hero"><div class="container">' +
    '<h1>Φορολογική έδρα &amp; επαγγελματική διεύθυνση στην Αθήνα</h1>' +
    '<p>Νόμιμη έδρα για την επιχείρησή σας σε πραγματική διεύθυνση, με μισθωτήριο αναρτημένο στο taxisnet. Από ' + MIN_TAX + '€ τον μήνα.</p>' +
  '</div></section>' +

  /* Ειλικρινής τοποθέτηση για το «virtual office» */
  '<section class="section"><div class="container">' +
    '<div class="row justify-content-center"><div class="col-lg-9">' +
      '<div class="reveal">' +
        '<span class="eyebrow">Ψάχνετε «virtual office» ή «εικονικό γραφείο»;</span>' +
        '<h2>Ας το ξεκαθαρίσουμε από την αρχή</h2>' +
        '<p class="lead">Ο όρος «virtual office» χρησιμοποιείται στην αγορά για δύο διαφορετικά πράγματα — εμείς παρέχουμε το ένα από τα δύο, και προτιμούμε να το πούμε καθαρά πριν μας καλέσετε.</p>' +
        '<p>Αν αυτό που χρειάζεστε είναι <strong>μια νόμιμη, πραγματική διεύθυνση για να δηλώσετε έδρα ' +
          'στην εφορία</strong>, είμαστε ακριβώς αυτό που ψάχνετε. Αν χρειάζεστε γραμματειακή υποστήριξη ' +
          'και αίθουσες συσκέψεων, θα πρέπει να απευθυνθείτε σε πάροχο υπηρεσιών γραφείου.</p>' +
      '</div>' +

      '<div class="compare-grid mt-4 reveal">' +
        '<div class="compare-col is-yes">' +
          '<h3><span class="mark-yes">' + icon('patch-check-fill') + '</span> Τι παρέχουμε</h3>' +
          '<ul>' +
            '<li>Πραγματική, υπαρκτή διεύθυνση σε μία από τις ' + D.locations.length + ' εγκαταστάσεις μας</li>' +
            '<li>Κανονικό μισθωτήριο συμβόλαιο</li>' +
            '<li>Επίσημη ανάρτηση του μισθωτηρίου στο taxisnet</li>' +
            '<li>Χρήση της διεύθυνσης ως έδρα επιχείρησης ή ατομικής επιχείρησης</li>' +
            '<li>Δυνατότητα συνδυασμού με αποθηκευτικό χώρο στην ίδια διεύθυνση</li>' +
            '<li>Διάρκεια από 6 έως 60 μήνες, με κλιμακωτή τιμή</li>' +
          '</ul>' +
        '</div>' +
        '<div class="compare-col is-no">' +
          '<h3><span class="mark-no">' + icon('x-lg') + '</span> Τι ΔΕΝ παρέχουμε</h3>' +
          '<ul>' +
            '<li>Τηλεφωνική γραμματεία ή απάντηση κλήσεων στο όνομά σας</li>' +
            '<li>Παραλαβή, διαλογή και προώθηση αλληλογραφίας</li>' +
            '<li>Αίθουσες συσκέψεων ή θέσεις εργασίας</li>' +
            '<li>Γραφείο με πρόσβαση για εσάς και το προσωπικό σας</li>' +
            '<li>Λογιστικές ή νομικές υπηρεσίες</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +

      '<div class="alert alert-light border mt-4 reveal">' +
        icon('info-circle-fill') + ' <strong>Γιατί το γράφουμε αυτό:</strong> πολλοί επισκέπτες φτάνουν εδώ ' +
        'αναζητώντας «virtual office Αθήνα». Προτιμούμε να χάσουμε ένα τηλεφώνημα παρά να σας απασχολήσουμε ' +
        'για κάτι που δεν προσφέρουμε.' +
      '</div>' +
    '</div></div>' +
  '</div></section>' +

  /* Εικόνα εγκατάστασης: υποστηρίζει το βασικό επιχείρημα της σελίδας,
     ότι πρόκειται για ΠΡΑΓΜΑΤΙΚΗ, υπαρκτή διεύθυνση — όχι εικονική. */
  '<section class="section section-subtle"><div class="container">' +
    '<div class="row g-4 g-lg-5 align-items-center">' +
      '<div class="col-lg-6 reveal">' +
        '<span class="eyebrow">Πραγματική διεύθυνση</span>' +
        '<h2>Η έδρα σας είναι ένα υπαρκτό κτίριο</h2>' +
        '<p class="lead">Δεν πρόκειται για ταχυδρομική θυρίδα ούτε για διεύθυνση «στα χαρτιά». ' +
          'Αντιστοιχεί σε μία από τις ' + D.locations.length + ' εγκαταστάσεις μας, με πινακίδα και ανθρώπους που δουλεύουν εκεί καθημερινά — μια έδρα που αντέχει σε έλεγχο.</p>' +
        '<a class="card-link" href="' + b + 'pages/perioches.html">Δείτε τις διευθύνσεις μας <span class="arw">' + icon('arrow-right') + '</span></a>' +
      '</div>' +
      '<div class="col-lg-6 reveal reveal-d1">' +
        '<img class="rounded-4 shadow-sm w-100" src="' + b + D.images.taxAddress.src + '" alt="' + esc(D.images.taxAddress.alt) + '" width="900" height="600" loading="lazy">' +
      '</div>' +
    '</div>' +
  '</div></section>' +

  '<section class="section"><div class="container">' +
    C.sectionHead('Ποιους αφορά', 'Σε ποιους ταιριάζει η ενοικίαση φορολογικής έδρας',
      'Αν αναγνωρίζετε τον εαυτό σας σε κάποια από τις παρακάτω περιπτώσεις, η λύση σας κοστίζει από ' + MIN_TAX + '€ τον μήνα.') +
    '<div class="row g-3 g-md-4">' +
      '<div class="col-lg-4 col-md-6"><div class="card-modern reveal">' +
        '<div class="card-icon">' + icon('briefcase-fill') + '</div><h3>Ελεύθεροι επαγγελματίες</h3>' +
        '<p>Κάνετε έναρξη και δεν θέλετε η προσωπική σας κατοικία να εμφανίζεται ως έδρα σε παραστατικά και δημόσια μητρώα.</p></div></div>' +
      '<div class="col-lg-4 col-md-6"><div class="card-modern reveal reveal-d1">' +
        '<div class="card-icon">' + icon('house-door-fill') + '</div><h3>Όσοι νοικιάζουν κατοικία</h3>' +
        '<p>Το μισθωτήριο κατοικίας ή ο κανονισμός της πολυκατοικίας συχνά απαγορεύει τη δήλωση επαγγελματικής έδρας.</p></div></div>' +
      '<div class="col-lg-4 col-md-6"><div class="card-modern reveal reveal-d2">' +
        '<div class="card-icon">' + icon('boxes') + '</div><h3>Μικρά e-shop</h3>' +
        '<p>Χρειάζεστε ταυτόχρονα έδρα και χώρο για το απόθεμά σας — και τα δύο στην ίδια διεύθυνση.</p></div></div>' +
    '</div>' +
  '</div></section>' +

  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Η διαδικασία', 'Πώς γίνεται, βήμα προς βήμα', '') +
    '<div class="timeline">' +
      '<div class="tl-step reveal"><div class="tl-num">1</div><h3>Επιλογή διεύθυνσης &amp; διάρκειας</h3>' +
        '<p>Διαλέγετε σε ποια από τις ' + D.locations.length + ' τοποθεσίες θέλετε την έδρα και για πόσους μήνες.</p></div>' +
      '<div class="tl-step reveal reveal-d1"><div class="tl-num">2</div><h3>Υπογραφή μισθωτηρίου</h3>' +
        '<p>Υπογράφουμε κανονικό μισθωτήριο συμβόλαιο με τα στοιχεία σας.</p></div>' +
      '<div class="tl-step reveal reveal-d2"><div class="tl-num">3</div><h3>Ανάρτηση στο taxisnet</h3>' +
        '<p>Το μισθωτήριο αναρτάται επίσημα και μπορείτε να το χρησιμοποιήσετε για την έναρξη ή τη μεταβολή έδρας.</p></div>' +
    '</div>' +
    '<div class="text-center mt-5 reveal">' +
      '<a class="btn btn-brand btn-lg-cta" href="' + b + 'pages/times.html">' + icon('currency-euro') + ' Δείτε τον τιμοκατάλογο</a>' +
    '</div>' +
  '</div></section>' +

  '<section class="section"><div class="container">' +
    C.sectionHead('Διευθύνσεις', 'Διαθέσιμες διευθύνσεις για φορολογική έδρα', '') +
    C.locationCards(b) +
  '</div></section>' +

  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Ερωτήσεις', 'Συχνές ερωτήσεις για τη φορολογική έδρα', '') +
    C.faqAccordion(D.faq.filter(function (f) {
      return /έδρα|virtual|taxisnet/i.test(f.q);
    })) +
  '</div></section>' +

  C.ctaBand(b, { title: 'Θέλετε να ξεκινήσετε;', text: 'Καλέστε μας και σε ένα τηλεφώνημα θα ξέρετε ακριβώς τι χρειάζεται, πόσο κοστίζει και πόσο γρήγορα γίνεται.' });

  return {
    slug: 'pages/forologiki-edra-virtual-office.html', depth: 1, navId: 'tax',
    title: 'Φορολογική Έδρα Αθήνα & Virtual Office από ' + MIN_TAX + '€ | Self Storages',
    description: 'Νόμιμη ενοικίαση φορολογικής έδρας στην Αθήνα με μισθωτήριο στο taxisnet, από ' + MIN_TAX +
      '€/μήνα. Πραγματική επαγγελματική διεύθυνση σε 6 σημεία της Αττικής.',
    breadcrumbs: [
      { name: 'Αρχική', href: 'index.html' },
      { name: 'Υπηρεσίες', href: 'pages/ypiresies.html' },
      { name: 'Φορολογική Έδρα', href: 'pages/forologiki-edra-virtual-office.html' }
    ],
    content: content,
    schema: [C.serviceSchema('Ενοικίαση φορολογικής έδρας',
      'Νόμιμη ενοικίαση φορολογικής έδρας και επαγγελματικής διεύθυνσης με ανάρτηση μισθωτηρίου στο taxisnet.',
      SITE + '/pages/forologiki-edra-virtual-office.html')]
  };
}

/* ==========================================================================
   ΜΕΤΑΚΟΜΙΣΕΙΣ
   ========================================================================== */
function moving() {
  const b = '../';
  const locationOptions = D.locations.map(function (l) {
    return '<option value="' + esc(l.name) + '">' + esc(l.name) + '</option>';
  }).join('');
  const content =
  '<section class="page-hero"><div class="container">' +
    '<h1>Μετακομίσεις &amp; μεταφορές</h1>' +
    '<p>Αναλαμβάνουμε τη μεταφορά μαζί με την αποθήκευση, ώστε να μη συντονίζετε δύο διαφορετικά συνεργεία.</p>' +
  '</div></section>' +

  '<section class="section"><div class="container">' +
    '<div class="row g-4 g-lg-5 align-items-center">' +
      '<div class="col-lg-6 reveal">' +
        '<h2>Μία επικοινωνία για όλη τη δουλειά</h2>' +
        '<p class="lead">Ο πιο συνηθισμένος πονοκέφαλος σε μια μετακόμιση δεν είναι το κόστος — είναι ο συντονισμός. ' +
          'Όταν η μεταφορά και η αποθήκευση γίνονται από την ίδια επιχείρηση, δεν υπάρχει περίπτωση να έρθει ' +
          'το φορτηγό και να μην είναι έτοιμος ο χώρος.</p>' +
        '<ul class="check-list">' +
          '<li><strong>Μεταφορά επίπλων και οικοσκευής</strong> από και προς την αποθήκη σας.</li>' +
          '<li><strong>Συνδυασμός με ενοικίαση.</strong> Ο χώρος είναι έτοιμος την ημέρα της μεταφοράς.</li>' +
          '<li><strong>Προσφορά χωρίς δέσμευση.</strong> Μας λέτε τι έχετε και σας δίνουμε τιμή.</li>' +
        '</ul>' +
        '<a class="btn btn-brand" href="#moving-form">Ζητήστε προσφορά ' + icon('arrow-right') + '</a>' +
      '</div>' +
      '<div class="col-lg-6 reveal reveal-d1">' +
        '<img class="rounded-4 shadow-sm w-100" src="' + b + D.images.moving.src + '" alt="' + esc(D.images.moving.alt) + '" width="800" height="600" loading="lazy">' +
      '</div>' +
    '</div>' +
  '</div></section>' +

  '<section class="section section-subtle"><div class="container">' +
    C.sectionHead('Πώς δίνουμε τιμή', 'Τι επηρεάζει το κόστος της μεταφοράς',
      'Δεν υπάρχει ενιαία τιμή για όλες τις μετακομίσεις. Τα παρακάτω είναι όσα ρωτάμε για να σας δώσουμε ακριβές νούμερο.') +
    '<div class="row g-3 g-md-4">' +
      '<div class="col-lg-3 col-md-6"><div class="card-modern reveal">' +
        '<div class="card-icon">' + icon('boxes') + '</div><h3>Όγκος</h3>' +
        '<p>Πόσα δωμάτια ή πόσα κυβικά μεταφέρονται.</p></div></div>' +
      '<div class="col-lg-3 col-md-6"><div class="card-modern reveal reveal-d1">' +
        '<div class="card-icon">' + icon('geo-alt-fill') + '</div><h3>Απόσταση</h3>' +
        '<p>Από πού προς πού, και σε ποια από τις εγκαταστάσεις μας.</p></div></div>' +
      '<div class="col-lg-3 col-md-6"><div class="card-modern reveal reveal-d2">' +
        '<div class="card-icon">' + icon('house-door-fill') + '</div><h3>Όροφος &amp; πρόσβαση</h3>' +
        '<p>Ύπαρξη ανελκυστήρα, δυνατότητα στάθμευσης φορτηγού.</p></div></div>' +
      '<div class="col-lg-3 col-md-6"><div class="card-modern reveal">' +
        '<div class="card-icon">' + icon('calendar-check') + '</div><h3>Ημερομηνία</h3>' +
        '<p>Καθημερινή ή Σαββατοκύριακο, και πόσο νωρίς προγραμματίζεται.</p></div></div>' +
    '</div>' +
  '</div></section>' +

  /* --- ΦΟΡΜΑ ΠΡΟΣΦΟΡΑΣ --- */
  '<section class="section" id="moving-form"><div class="container">' +
    '<div class="row justify-content-center">' +
      '<div class="col-lg-8 reveal">' +
        '<div class="form-card">' +
          '<h2 class="h4 mb-3">Ζητήστε προσφορά για τη μετακόμισή σας</h2>' +
          '<p class="text-muted small mb-4">Τα πεδία με <span class="req">*</span> είναι υποχρεωτικά. ' +
            'Πείτε μας τι έχετε να μεταφέρετε και από πού — δείτε την ' +
            '<a href="' + b + 'pages/privacy-policy.html">Πολιτική Απορρήτου</a>.</p>' +

          '<form id="moving-form-el" class="ajax-form" action="' + esc(D.contact.formEndpoint) + '" method="POST" novalidate>' +
            '<div class="row g-3">' +
              '<div class="col-md-6">' +
                '<label class="form-label" for="mv-name">Ονοματεπώνυμο <span class="req">*</span></label>' +
                '<input class="form-control" type="text" id="mv-name" name="name" required autocomplete="name" aria-describedby="mv-name-error">' +
                '<div class="field-error" id="mv-name-error" role="alert"></div>' +
              '</div>' +
              '<div class="col-md-6">' +
                '<label class="form-label" for="mv-phone">Τηλέφωνο <span class="req">*</span></label>' +
                '<input class="form-control" type="tel" id="mv-phone" name="phone" required autocomplete="tel" aria-describedby="mv-phone-error">' +
                '<div class="field-error" id="mv-phone-error" role="alert"></div>' +
              '</div>' +
              '<div class="col-md-6">' +
                '<label class="form-label" for="mv-email">Email <span class="req">*</span></label>' +
                '<input class="form-control" type="email" id="mv-email" name="email" required autocomplete="email" aria-describedby="mv-email-error">' +
                '<div class="field-error" id="mv-email-error" role="alert"></div>' +
              '</div>' +
              '<div class="col-md-6">' +
                '<label class="form-label" for="mv-from">Από πού γίνεται η παραλαβή; <span class="req">*</span></label>' +
                '<input class="form-control" type="text" id="mv-from" name="pickup" required placeholder="Π.χ. Παγκράτι" aria-describedby="mv-from-error">' +
                '<div class="field-error" id="mv-from-error" role="alert"></div>' +
              '</div>' +
              '<div class="col-md-6">' +
                '<label class="form-label" for="mv-location">Ποια τοποθεσία Self Storages σας εξυπηρετεί;</label>' +
                '<select class="form-select" id="mv-location" name="location">' +
                  '<option value="">Δεν έχω προτίμηση</option>' + locationOptions +
                '</select>' +
              '</div>' +
              '<div class="col-md-6">' +
                '<label class="form-label" for="mv-date">Προτιμώμενη ημερομηνία</label>' +
                '<input class="form-control" type="date" id="mv-date" name="date">' +
              '</div>' +
              '<div class="col-12">' +
                '<label class="form-label" for="mv-message">Τι μεταφέρετε; <span class="req">*</span></label>' +
                '<textarea class="form-control" id="mv-message" name="message" rows="4" required ' +
                  'placeholder="Π.χ. Οικοσκευή δυαριού, 3ος όροφος με ασανσέρ. Προτιμώ Σαββατοκύριακο." ' +
                  'aria-describedby="mv-message-error"></textarea>' +
                '<div class="field-error" id="mv-message-error" role="alert"></div>' +
              '</div>' +
            '</div>' +

            /* Honeypot — αόρατο στους χρήστες, παγίδα για bots */
            '<div class="hp-field" aria-hidden="true">' +
              '<label for="mv-gotcha">Μην συμπληρώσετε αυτό το πεδίο</label>' +
              '<input type="text" id="mv-gotcha" name="_gotcha" tabindex="-1" autocomplete="off">' +
            '</div>' +

            '<button class="btn btn-brand btn-lg-cta mt-4 w-100" type="submit">' +
              icon('envelope-fill') + ' Ζητήστε προσφορά</button>' +
            '<div class="form-status" role="status" aria-live="polite"></div>' +
          '</form>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div></section>';

  return {
    slug: 'pages/metakomiseis.html', depth: 1, navId: 'moving',
    title: 'Μετακομίσεις & Μεταφορές Αθήνα | Self Storages',
    description: 'Υπηρεσίες μετακόμισης και μεταφοράς επίπλων σε συνδυασμό με ενοικίαση αποθήκης, ' +
      'σε όλη την Αττική. Ζητήστε προσφορά χωρίς δέσμευση.',
    breadcrumbs: [
      { name: 'Αρχική', href: 'index.html' },
      { name: 'Υπηρεσίες', href: 'pages/ypiresies.html' },
      { name: 'Μετακομίσεις', href: 'pages/metakomiseis.html' }
    ],
    content: content,
    schema: [C.serviceSchema('Μετακομίσεις και μεταφορές',
      'Υπηρεσίες μετακόμισης και μεταφοράς επίπλων και οικοσκευής σε συνδυασμό με αποθήκευση.',
      SITE + '/pages/metakomiseis.html')]
  };
}

module.exports = { home, about, services, storage, taxOffice, moving };
