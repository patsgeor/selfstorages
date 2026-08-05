/* ============================================================================
   SELF STORAGES — nav.js
   ----------------------------------------------------------------------------
   Αντικαθιστά το Bootstrap JS bundle (80 KB) για τις ΔΥΟ μόνο λειτουργίες
   που χρησιμοποιεί ο ιστότοπος: το mobile menu (collapse) και τα dropdown.

   Γιατί: φορτώναμε 80 KB JavaScript για δύο συμπεριφορές ~60 γραμμών.
   Αυτό επιβάρυνε σοβαρά τον χρόνο απόκρισης (Total Blocking Time).

   Υποστηρίζει πλήρως πληκτρολόγιο: Enter/Space ανοίγουν, Escape κλείνει
   και επιστρέφει την εστίαση, κλικ εκτός κλείνει.
   ========================================================================= */
(function () {
  'use strict';

  /* --- 1. MOBILE MENU (collapse) --------------------------------------- */
  var toggler = document.querySelector('[data-bs-toggle="collapse"]');
  if (toggler) {
    var targetSel = toggler.getAttribute('data-bs-target');
    var panel = targetSel ? document.querySelector(targetSel) : null;

    if (panel) {
      toggler.addEventListener('click', function () {
        var isOpen = panel.classList.contains('show');
        panel.classList.toggle('show', !isOpen);
        toggler.setAttribute('aria-expanded', String(!isOpen));
      });
    }
  }

  /* --- 2. DROPDOWNS ----------------------------------------------------- */
  var toggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');

  function closeAll(except) {
    Array.prototype.forEach.call(toggles, function (t) {
      if (t === except) { return; }
      var menu = t.nextElementSibling;
      if (menu && menu.classList.contains('dropdown-menu')) {
        menu.classList.remove('show');
        t.setAttribute('aria-expanded', 'false');
      }
    });
  }

  Array.prototype.forEach.call(toggles, function (toggle) {
    var menu = toggle.nextElementSibling;
    if (!menu || !menu.classList.contains('dropdown-menu')) { return; }

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = menu.classList.contains('show');
      closeAll(toggle);
      menu.classList.toggle('show', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Escape κλείνει το μενού και επιστρέφει την εστίαση στο κουμπί
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Κλικ οπουδήποτε αλλού κλείνει τα ανοιχτά dropdown
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) { closeAll(null); }
  });

})();
