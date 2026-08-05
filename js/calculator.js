/* ============================================================================
   SELF STORAGES — calculator.js
   ----------------------------------------------------------------------------
   Υπολογιστής «Πόσο χώρο χρειάζομαι;» για τη σελίδα Τιμές.
   Οι επιλογές και τα αποτελέσματα διαβάζονται από το SITE_DATA.calculator
   (αρχείο js/data.js) — δεν υπάρχουν τιμές γραμμένες εδώ.
   ========================================================================= */
(function () {
  'use strict';

  var select = document.getElementById('calc-select');
  var result = document.getElementById('calc-result');
  if (!select || !result || typeof SITE_DATA === 'undefined') { return; }

  var options = SITE_DATA.calculator || [];

  var render = function () {
    var choice = null;
    for (var i = 0; i < options.length; i++) {
      if (options[i].id === select.value) { choice = options[i]; break; }
    }
    if (!choice) { result.hidden = true; return; }

    var html =
      '<div class="r-label">Προτεινόμενη λύση</div>' +
      '<div class="r-value">' + choice.result +
      ' <span class="r-price">— από ' + choice.priceFrom + '€/μήνα</span></div>';

    if (choice.alt) {
      html += '<div class="r-note">' + choice.alt.charAt(0).toUpperCase() + choice.alt.slice(1) + '.</div>';
    }
    html += '<div class="r-note">Η τελική τιμή εξαρτάται από τη διαθεσιμότητα ανά τοποθεσία και τη διάρκεια μίσθωσης. ' +
            'Καλέστε μας στο <a href="tel:+30' + SITE_DATA.contact.phonePrimary + '">' +
            SITE_DATA.contact.phonePrimaryDisplay + '</a> για ακριβή προσφορά.</div>';

    result.innerHTML = html;
    result.hidden = false;
  };

  select.addEventListener('change', render);

  // Αν ο χρήστης έχει ήδη επιλογή (π.χ. επιστροφή στη σελίδα), δείξ' τη.
  if (select.value) { render(); }
})();
