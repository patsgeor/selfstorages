/* ============================================================================
   SELF STORAGES — cookie-consent.js  (GDPR opt-in)
   ----------------------------------------------------------------------------
   ΚΑΝΟΝΑΣ: κανένα script παρακολούθησης δεν εκτελείται πριν ο χρήστης
   δώσει ρητή συγκατάθεση. Στην ΕΕ απαιτείται opt-in, όχι opt-out —
   δηλαδή τα κουτάκια ξεκινούν ΞΕΤΣΕΚΑΡΙΣΤΑ και τα scripts φορτώνουν
   μόνο αφού πατηθεί «Αποδοχή».

   ΠΩΣ ΠΡΟΣΘΕΤΕΤΕ TRACKING:
   Δείτε τη συνάρτηση loadTrackingScripts() στο τέλος του αρχείου —
   εκεί υπάρχουν έτοιμα, σχολιασμένα blocks για GA4, GTM, Meta Pixel,
   LinkedIn Insight, Microsoft Clarity και Google Ads.
   ========================================================================= */
(function () {
  'use strict';

  var STORAGE_KEY = 'ss_cookie_consent_v1';
  var banner = document.getElementById('cookie-banner');
  if (!banner) { return; }

  var prefsPanel = document.getElementById('cookie-prefs');
  var btnAcceptAll = document.getElementById('cookie-accept-all');
  var btnReject = document.getElementById('cookie-reject');
  var btnCustomize = document.getElementById('cookie-customize');
  var btnSave = document.getElementById('cookie-save');
  var chkStats = document.getElementById('cookie-stats');
  var chkMarketing = document.getElementById('cookie-marketing');

  /* --- Ανάγνωση / αποθήκευση προτίμησης ----------------------------- */
  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null; // π.χ. απενεργοποιημένο localStorage σε ιδιωτική περιήγηση
    }
  }

  function saveConsent(consent) {
    consent.timestamp = new Date().toISOString();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(consent)); } catch (e) { /* αγνοούμε */ }
    applyConsent(consent);
    closeBanner();
  }

  function closeBanner() {
    banner.classList.remove('is-open');
    banner.setAttribute('aria-hidden', 'true');
  }

  function openBanner() {
    banner.classList.add('is-open');
    banner.setAttribute('aria-hidden', 'false');
  }

  /* --- Εφαρμογή ------------------------------------------------------ */
  function applyConsent(consent) {
    if (consent.statistics || consent.marketing) {
      loadTrackingScripts(consent);
    }
  }

  /* --- Χειριστές κουμπιών -------------------------------------------- */
  if (btnAcceptAll) {
    btnAcceptAll.addEventListener('click', function () {
      saveConsent({ necessary: true, statistics: true, marketing: true });
    });
  }

  if (btnReject) {
    btnReject.addEventListener('click', function () {
      saveConsent({ necessary: true, statistics: false, marketing: false });
    });
  }

  if (btnCustomize && prefsPanel) {
    btnCustomize.addEventListener('click', function () {
      var isHidden = prefsPanel.hasAttribute('hidden');
      if (isHidden) {
        prefsPanel.removeAttribute('hidden');
        btnCustomize.setAttribute('aria-expanded', 'true');
      } else {
        prefsPanel.setAttribute('hidden', '');
        btnCustomize.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (btnSave) {
    btnSave.addEventListener('click', function () {
      saveConsent({
        necessary: true,
        statistics: chkStats ? chkStats.checked : false,
        marketing: chkMarketing ? chkMarketing.checked : false
      });
    });
  }

  /* --- Επανάνοιγμα από το footer ------------------------------------- */
  var reopenLinks = document.querySelectorAll('[data-cookie-settings]');
  Array.prototype.forEach.call(reopenLinks, function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var existing = readConsent();
      if (existing) {
        if (chkStats) { chkStats.checked = !!existing.statistics; }
        if (chkMarketing) { chkMarketing.checked = !!existing.marketing; }
      }
      if (prefsPanel) {
        prefsPanel.removeAttribute('hidden');
        if (btnCustomize) { btnCustomize.setAttribute('aria-expanded', 'true'); }
      }
      openBanner();
      if (btnSave) { btnSave.focus(); }
    });
  });

  /* --- Εκκίνηση ------------------------------------------------------- */
  var saved = readConsent();
  if (saved) {
    applyConsent(saved);          // ήδη έχει αποφασίσει — δεν ξαναρωτάμε
  } else {
    openBanner();                 // πρώτη επίσκεψη
  }


  /* ====================================================================
     ΦΟΡΤΩΣΗ SCRIPTS ΠΑΡΑΚΟΛΟΥΘΗΣΗΣ
     --------------------------------------------------------------------
     ⚙️  ΕΔΩ ΕΝΕΡΓΟΠΟΙΕΙΤΕ ΤΑ ΕΡΓΑΛΕΙΑ.
     Αντικαταστήστε τα ID μέσα στα άγκιστρα και αφαιρέστε τα σχόλια
     από το block που θέλετε. Τίποτα δεν τρέχει χωρίς συγκατάθεση.
     ================================================================== */
  function loadTrackingScripts(consent) {
    if (window.__ssTrackingLoaded) { return; }
    window.__ssTrackingLoaded = true;

    /* ---- ΣΤΑΤΙΣΤΙΚΑ (χρειάζονται consent.statistics) ---------------- */
    if (consent.statistics) {

      /* --- Google Analytics 4 -------------------------------------
      var GA4_ID = 'G-XXXXXXXXXX';
      var gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
      document.head.appendChild(gaScript);
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA4_ID, { anonymize_ip: true });
      --------------------------------------------------------------- */

      /* --- Google Tag Manager --------------------------------------
      var GTM_ID = 'GTM-XXXXXXX';
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',GTM_ID);
      --------------------------------------------------------------- */

      /* --- Microsoft Clarity ---------------------------------------
      var CLARITY_ID = 'xxxxxxxxxx';
      (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script',CLARITY_ID);
      --------------------------------------------------------------- */
    }

    /* ---- MARKETING (χρειάζονται consent.marketing) ------------------ */
    if (consent.marketing) {

      /* --- Google Ads conversion ----------------------------------
      var ADS_ID = 'AW-XXXXXXXXX';
      var adsScript = document.createElement('script');
      adsScript.async = true;
      adsScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS_ID;
      document.head.appendChild(adsScript);
      window.dataLayer = window.dataLayer || [];
      function gtagAds(){ dataLayer.push(arguments); }
      gtagAds('js', new Date());
      gtagAds('config', ADS_ID);
      --------------------------------------------------------------- */

      /* --- Meta (Facebook) Pixel -----------------------------------
      var PIXEL_ID = 'XXXXXXXXXXXXXXX';
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', PIXEL_ID); fbq('track', 'PageView');
      --------------------------------------------------------------- */

      /* --- LinkedIn Insight Tag ------------------------------------
      var LINKEDIN_ID = 'XXXXXXX';
      window._linkedin_partner_id = LINKEDIN_ID;
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(LINKEDIN_ID);
      (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
      var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");
      b.type="text/javascript";b.async=true;
      b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
      s.parentNode.insertBefore(b,s);})(window.lintrk);
      --------------------------------------------------------------- */
    }
  }

})();
