/* ============================================================================
   SELF STORAGES — main.js
   ----------------------------------------------------------------------------
   Καθαρή Vanilla JS. Καμία εξάρτηση πέρα από το Bootstrap bundle (dropdowns).
   Όλα τα features είναι progressive enhancement: αν το JS αποτύχει,
   η σελίδα παραμένει πλήρως αναγνώσιμη και λειτουργική.

   Περιεχόμενα:
     1. Navbar — glassmorphism on scroll
     2. Reveal on scroll (IntersectionObserver)
     3. Μετρητές στατιστικών (counters)
     4. Back-to-top
     5. Map facade (click-to-load)
     6. Φόρμα επικοινωνίας (validation + υποβολή)
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     1. NAVBAR — προσθέτει .is-scrolled μόλις φύγουμε από την κορυφή
     ------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) { header.classList.add('is-scrolled'); }
      else { header.classList.remove('is-scrolled'); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     2. REVEAL ON SCROLL
     Αν δεν υπάρχει IntersectionObserver ή ο χρήστης θέλει λιγότερη
     κίνηση, εμφανίζουμε τα πάντα αμέσως.
     ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) { /* τίποτα */ }
  else if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealEls, function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    Array.prototype.forEach.call(revealEls, function (el) { revealObserver.observe(el); });
  }

  /* ------------------------------------------------------------------
     3. COUNTERS
     Το τελικό νούμερο γράφεται στο HTML (data-count) ώστε να είναι
     ορατό και χωρίς JS / για τις μηχανές αναζήτησης.
     ------------------------------------------------------------------ */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
    var animateCount = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      if (isNaN(target)) { return; }
      var duration = 1100;
      var startTime = null;
      var step = function (ts) {
        if (startTime === null) { startTime = ts; }
        var progress = Math.min((ts - startTime) / duration, 1);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString('el-GR') + suffix;
        if (progress < 1) { requestAnimationFrame(step); }
        else { el.textContent = target.toLocaleString('el-GR') + suffix; }
      };
      requestAnimationFrame(step);
    };
    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(counters, function (el) { countObserver.observe(el); });
  }

  /* ------------------------------------------------------------------
     4. BACK TO TOP
     ------------------------------------------------------------------ */
  var topBtn = document.querySelector('.fab-top');
  if (topBtn) {
    var toggleTop = function () {
      if (window.scrollY > 500) { topBtn.classList.add('is-visible'); }
      else { topBtn.classList.remove('is-visible'); }
    };
    toggleTop();
    window.addEventListener('scroll', toggleTop, { passive: true });
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     5. MAP FACADE — φορτώνει τον χάρτη μόνο μετά από κλικ.
     Γιατί: ένα ενσωματωμένο Google Maps iframe κοστίζει ~20-30 μονάδες
     Lighthouse Performance και τοποθετεί cookies Google πριν καν
     δώσει ο χρήστης συγκατάθεση.
     ------------------------------------------------------------------ */
  var facades = document.querySelectorAll('.map-facade');
  Array.prototype.forEach.call(facades, function (facade) {
    var load = function () {
      if (facade.classList.contains('is-loaded')) { return; }
      var q = facade.getAttribute('data-map-query');
      if (!q) { return; }
      var iframe = document.createElement('iframe');
      iframe.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(q) +
                   '&t=&z=15&ie=UTF8&output=embed';
      iframe.title = facade.getAttribute('data-map-title') || 'Χάρτης τοποθεσίας';
      iframe.loading = 'lazy';
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      iframe.setAttribute('allowfullscreen', '');
      facade.appendChild(iframe);
      facade.classList.add('is-loaded');
      facade.removeAttribute('role');
      facade.removeAttribute('tabindex');
      facade.removeAttribute('aria-label');
    };
    facade.addEventListener('click', load);
    // Προσβασιμότητα: ενεργοποίηση και με πληκτρολόγιο
    facade.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(); }
    });
  });

  /* ------------------------------------------------------------------
     6. ΦΟΡΜΕΣ (Επικοινωνία, Μεταφορές, ...)
     Client-side validation στα ελληνικά + honeypot + fetch υποβολή.
     Κάθε <form class="ajax-form"> στη σελίδα παίρνει την ίδια συμπεριφορά. */
  Array.prototype.forEach.call(document.querySelectorAll('.ajax-form'), function (form) {
    var statusBox = form.querySelector('.form-status');

    var setError = function (field, message) {
      var errEl = document.getElementById(field.id + '-error');
      if (message) {
        field.classList.add('is-invalid');
        field.setAttribute('aria-invalid', 'true');
        if (errEl) { errEl.textContent = message; }
      } else {
        field.classList.remove('is-invalid');
        field.removeAttribute('aria-invalid');
        if (errEl) { errEl.textContent = ''; }
      }
    };

    var validateField = function (field) {
      var value = (field.value || '').trim();
      if (field.hasAttribute('required') && !value) {
        setError(field, 'Το πεδίο είναι υποχρεωτικό.');
        return false;
      }
      if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        setError(field, 'Συμπληρώστε έγκυρη διεύθυνση email.');
        return false;
      }
      if (field.type === 'tel' && value) {
        var digits = value.replace(/[^\d]/g, '');
        if (digits.length < 10) {
          setError(field, 'Συμπληρώστε έγκυρο τηλέφωνο (τουλάχιστον 10 ψηφία).');
          return false;
        }
      }
      if (field.id === 'message' && value && value.length < 10) {
        setError(field, 'Γράψτε λίγο περισσότερα (τουλάχιστον 10 χαρακτήρες).');
        return false;
      }
      setError(field, '');
      return true;
    };

    // Έλεγχος όταν ο χρήστης φεύγει από κάθε πεδίο
    var fields = form.querySelectorAll('input[required], select[required], textarea[required], input[type="email"], input[type="tel"]');
    Array.prototype.forEach.call(fields, function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid')) { validateField(field); }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot: αν συμπληρώθηκε, είναι bot — προσποιούμαστε επιτυχία.
      var hp = form.querySelector('input[name="_gotcha"]');
      if (hp && hp.value) { return; }

      var allValid = true;
      var firstInvalid = null;
      Array.prototype.forEach.call(fields, function (field) {
        if (!validateField(field)) {
          allValid = false;
          if (!firstInvalid) { firstInvalid = field; }
        }
      });

      if (!allValid) {
        if (statusBox) {
          statusBox.className = 'form-status err';
          statusBox.textContent = 'Ελέγξτε τα πεδία με κόκκινο και δοκιμάστε ξανά.';
        }
        if (firstInvalid) { firstInvalid.focus(); }
        return;
      }

      var endpoint = form.getAttribute('action') || '';

      // Αν δεν έχει ρυθμιστεί το endpoint, το λέμε καθαρά αντί να
      // αποτύχει σιωπηλά και να χαθεί το μήνυμα του πελάτη.
      if (endpoint.indexOf('{FORM_ENDPOINT_ID}') !== -1 || !endpoint) {
        if (statusBox) {
          statusBox.className = 'form-status err';
          statusBox.innerHTML = 'Η φόρμα δεν έχει ρυθμιστεί ακόμα. ' +
            'Καλέστε μας στο <a href="tel:+302107787474">210 778 7474</a> ή στείλτε email στο ' +
            '<a href="mailto:info@selfstorages.gr">info@selfstorages.gr</a>.';
        }
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = 'Αποστολή…'; }
      if (statusBox) { statusBox.className = 'form-status'; statusBox.textContent = ''; }

      fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (response) {
        if (!response.ok) { throw new Error('HTTP ' + response.status); }
        form.reset();
        if (statusBox) {
          statusBox.className = 'form-status ok';
          statusBox.textContent = 'Ευχαριστούμε! Λάβαμε το μήνυμά σας και θα επικοινωνήσουμε μαζί σας σύντομα.';
        }
      })
      .catch(function () {
        if (statusBox) {
          statusBox.className = 'form-status err';
          statusBox.innerHTML = 'Κάτι πήγε στραβά με την αποστολή. ' +
            'Καλέστε μας στο <a href="tel:+302107787474">210 778 7474</a> ή στείλτε email στο ' +
            '<a href="mailto:info@selfstorages.gr">info@selfstorages.gr</a>.';
        }
      })
      .finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalLabel; }
      });
    });
  });

})();
