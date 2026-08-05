# Self Storages — Στατικός Ιστότοπος

Πλήρης εταιρικός ιστότοπος σε **HTML5 / CSS3 / Bootstrap 5 / Vanilla JavaScript**.
Χωρίς βάση δεδομένων, χωρίς PHP, χωρίς framework. 26 στατικές σελίδες.

---

## Μετρήσεις Lighthouse

Πραγματικές μετρήσεις σε τοπικό διακομιστή με ενεργή συμπίεση:

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| **Desktop** | **98** | **100** | **100** | **100** |
| **Mobile** (throttled 4G) | **89** | **100** | **100** | **100** |

Core Web Vitals (mobile): FCP 1.6s · LCP 2.4s · CLS 0.015 · TBT 360ms

> Το Performance θα ανέβει σε πραγματικό hosting με CDN. Το mobile score μετριέται
> με προσομοίωση αργού 4G και CPU 4× πιο αργής — είναι το αυστηρότερο σενάριο.

---

## Γρήγορη εκκίνηση

Ο ιστότοπος είναι **στατικά αρχεία**. Δεν χρειάζεται τίποτα για να λειτουργήσει —
απλώς ανεβάστε τα στον διακομιστή σας.

Για τοπική προεπισκόπηση:

```bash
npx http-server . -p 8099 -g --brotli
```

---

## ⭐ Πού αλλάζω τι

### Τιμές, τηλέφωνα, διευθύνσεις, ερωτήσεις FAQ

**Ένα αρχείο: `js/data.js`**

Εκεί βρίσκονται όλα: τιμοκατάλογοι, οι 6 τοποθεσίες, στοιχεία επικοινωνίας,
ωράριο, διαδρομές εικόνων και οι 12 ερωτήσεις του FAQ.

Μετά από **οποιαδήποτε** αλλαγή εκεί:

```bash
node build/generate.js --prod && node build/optimize.js
```

Οι τιμές γράφονται ως **κείμενο** μέσα στο HTML (ώστε να τις διαβάζει η Google),
αλλά παράγονται από το `data.js` — δεν χρειάζεται να τις αλλάξετε σε δύο σημεία.

> Ο πλήρης τιμοκατάλογος εμφανίζεται **μόνο** στη σελίδα `pages/times.html`.
> Οι υπόλοιπες σελίδες δείχνουν «από Χ€» και παραπέμπουν εκεί. Έτσι μια αλλαγή
> τιμής δεν σας υποχρεώνει να ψάξετε σε 26 σελίδες.

### Μενού και footer

`build/templates/layout.js` — ο πίνακας `NAV` στην αρχή του αρχείου.
Μία αλλαγή εκεί ισχύει σε όλες τις σελίδες μετά το build.

### Κείμενα σελίδων

| Σελίδες | Αρχείο |
|---|---|
| Αρχική, Σχετικά, Υπηρεσίες, Αποθήκες, Φορολογική Έδρα, Μετακομίσεις | `build/pages-main.js` |
| Τιμές, Περιοχές, FAQ, Επικοινωνία, νομικά, 404 | `build/pages-secondary.js` |
| Οι 6 σελίδες τοποθεσιών | `build/pages-locations.js` |
| Blog (index + 5 άρθρα) | `build/pages-blog.js` |

### Νέο άρθρο στο blog

Στο `build/pages-blog.js` αντιγράψτε ένα αντικείμενο του πίνακα `POSTS`,
αλλάξτε `slug`, `title`, `date`, `body` και κάντε build. Το άρθρο μπαίνει
αυτόματα στο index, στο sitemap και στα «σχετικά άρθρα».

---

## 📸 Εικόνες

Οι πραγματικές φωτογραφίες είναι ήδη μπηγμένες (ενότητα `images` στο `js/data.js`):

| Κλειδί | Αρχείο | Πού εμφανίζεται |
|---|---|---|
| `hero` | `hero.jpg` | Φόντο hero στην Αρχική |
| `about` | `boxes_warehouse.webp` | «Ποιοι Είμαστε», τμήμα Αρχικής |
| `security` | `security-slider.webp` | Ενότητα Ασφάλειας στην Αρχική |
| `storagePage` | `selfstorages.webp` | Σελίδα Ενοικίαση Αποθηκών + 6 σελίδες τοποθεσιών |
| `taxAddress` | `tax-address.webp` | Σελίδα Φορολογική Έδρα / Virtual Office |
| `moving` | `moving_loading.webp` | Σελίδα Μετακομίσεις |
| `calculator` | `calculator-room.webp` | Υπολογιστής χώρου (σελίδα Τιμές) |

Για να αλλάξετε μία: ανεβάστε το νέο αρχείο στο `images/`, αλλάξτε τη διαδρομή στο
`js/data.js`, κάντε build. Το `alt` κείμενο δίπλα σε κάθε εικόνα μετράει για SEO
και προσβασιμότητα — κρατήστε το περιγραφικό.

> ⚠️ **Εκκρεμεί μόνο η `og-default`** (εικόνα κοινοποίησης, 1200×630) — παραμένει
> προσωρινό SVG. Facebook, LinkedIn και X **δεν εμφανίζουν SVG** σε προεπισκοπήσεις
> κοινοποίησης· χρειάζεται πραγματικό `.jpg`/`.png` πριν τη δημοσίευση.

### Favicon / λογότυπο

Το favicon (`favicon.ico` + PNG σε όλα τα μεγέθη) είναι ήδη φτιαγμένο από το
**πραγματικό λογότυπο** της επιχείρησης (κομμένο στο κτίριο-εικονίδιο, χωρίς
κείμενο — σε 16-32px το κείμενο δεν διαβάζεται). Το πλήρες λογότυπο υπάρχει
και ξεχωριστά στο `images/logo.png`.

Αν αλλάξει ποτέ το λογότυπο: βάλτε το νέο αρχείο ως πηγή στο
`build/make-favicons.js` (μεταβλητή `SRC_LOGO`) και τρέξτε:
```bash
node build/make-favicons.js
```
Παράγει ξανά όλο το πακέτο (favicon.ico, apple-touch-icon, android-chrome,
mstile). Το `build/generate.js` δεν ξαναγράφει ποτέ αυτά τα αρχεία αν υπάρχουν ήδη.

---

## ✉️ Φόρμα Επικοινωνίας

Η φόρμα **δεν είναι ακόμα συνδεδεμένη**. Μέχρι να τη ρυθμίσετε, εμφανίζει
μήνυμα με τα τηλέφωνά σας αντί να αποτυγχάνει σιωπηλά.

1. Δημιουργήστε δωρεάν λογαριασμό σε [Formspree](https://formspree.io) ή
   [Web3Forms](https://web3forms.com)
2. Πάρτε το endpoint σας (π.χ. `https://formspree.io/f/abcdwxyz`)
3. Στο `js/data.js` → `contact.formEndpoint` αντικαταστήστε το
   `{FORM_ENDPOINT_ID}` με το δικό σας ID
4. Build
5. Αφαιρέστε το κίτρινο πλαίσιο-σημείωση από το `build/pages-secondary.js`
   (συνάρτηση `contact()`)

---

## 📊 Google & Tracking

### Search Console
Στο `build/templates/layout.js` βρείτε το σχόλιο `ΕΠΑΛΗΘΕΥΣΗ GOOGLE SEARCH CONSOLE`,
βάλτε τον κωδικό σας και αφαιρέστε τα σχόλια. Μετά υποβάλετε το
`https://www.selfstorages.gr/sitemap.xml`.

### Analytics, Ads, Pixel
Όλα τα placeholders βρίσκονται στο **`js/cookie-consent.js`**, στη συνάρτηση
`loadTrackingScripts()` στο τέλος του αρχείου. Υπάρχουν έτοιμα blocks για:
GA4 · Google Tag Manager · Google Ads · Meta Pixel · LinkedIn Insight · Microsoft Clarity

Βάλτε τα ID σας και αφαιρέστε τα σχόλια από όποιο θέλετε.

> **GDPR:** κανένα script tracking δεν εκτελείται πριν ο χρήστης πατήσει «Αποδοχή».
> Αυτό είναι απαίτηση (opt-in, όχι opt-out) και είναι ήδη υλοποιημένο σωστά.
> Για τον ίδιο λόγο ο χάρτης Google φορτώνει **μόνο μετά από κλικ**.

---

## 🛠 Εντολές

| Εντολή | Τι κάνει |
|---|---|
| `node build/generate.js` | Χτίζει τις σελίδες (development, μη ελαχιστοποιημένα assets) |
| `node build/generate.js --prod` | Χτίζει με τα ελαχιστοποιημένα assets |
| `node build/optimize.js` | Καθαρίζει το Bootstrap, ελαχιστοποιεί CSS/JS, προ-συμπιέζει |
| `node build/check-links.js` | Ελέγχει κάθε σύνδεσμο, εικόνα και anchor |

**Πλήρες production build:**
```bash
node build/generate.js --prod && node build/optimize.js && node build/check-links.js
```

---

## 📁 Δομή

```
/                  index.html, 404.html, robots.txt, sitemap.xml,
                   sitemap-images.xml, manifest.json, browserconfig.xml
/css               style.css (πηγή) · bootstrap.min.css · app.min.css (production)
/js                data.js ⭐ · nav.js · main.js · calculator.js · cookie-consent.js
/fonts             Inter woff2 (self-hosted, ελληνικά + λατινικά)
/images            φωτογραφίες
/icons             sprite.svg (34 εικονίδια, inline)
/favicon           favicon.ico, favicon-16/32, apple-touch-icon, android-chrome, mstile (από το πραγματικό λογότυπο)
/pages             11 σελίδες
/perioches         6 σελίδες τοποθεσιών
/blog              index + 5 άρθρα
/build             scripts παραγωγής — ΔΕΝ ανεβαίνει στο production
```

---

## 🚀 Ανέβασμα στο hosting

**Μην ανεβάζετε τον φάκελο του project όπως είναι** — περιέχει scripts και
εργαλεία που δεν έχουν καμία θέση σε διακομιστή.

Τρέξτε:

```bash
node build/generate.js --prod && node build/optimize.js && node build/dist.js
```

Δημιουργείται ο φάκελος **`dist/`** με ακριβώς τα 52 αρχεία που χρειάζεται ο
ιστότοπος (~2.3 MB). Ανεβάστε το **περιεχόμενο** του `dist/` μέσα στο
`public_html` της Hostinger — όχι τον ίδιο τον φάκελο `dist`.

Το `dist.js` αφήνει αυτόματα απ' έξω: `build/`, `node_modules/`, `package*.json`,
`README.md`, `.claude/`, τα μη ελαχιστοποιημένα `css/style.css` και `js/*.js`,
και τα προ-συμπιεσμένα `.gz/.br`.

### Χρειάζομαι τα .gz / .br;

**Όχι σε Hostinger.** Τρέχει LiteSpeed, που συμπιέζει αυτόματα κάθε απάντηση.
Τα προ-συμπιεσμένα αρχεία απλώς θα διπλασίαζαν τον αριθμό αρχείων χωρίς όφελος.

Χρειάζονται μόνο σε **nginx** με `gzip_static`/`brotli_static`, ή σε
Netlify/Cloudflare Pages. Σε αυτή την περίπτωση:

```bash
node build/optimize.js --precompress && node build/dist.js --precompress
```

### Ρυθμίσεις διακομιστή

**Σελίδα 404:** ρυθμίστε τον διακομιστή να σερβίρει το `/404.html`.

**Apache** (`.htaccess`): υπάρχει ήδη στη ρίζα και αντιγράφεται αυτόματα στο
`dist/` από το `build/dist.js`. Περιέχει `ErrorDocument 404`, συμπίεση,
caching στατικών αρχείων και security headers (`X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`).
Δείτε το αρχείο για λεπτομέρειες — αν ποτέ ενεργοποιήσετε νέο analytics/pixel
domain, θα χρειαστεί να το προσθέσετε και στο CSP.

**Nginx:**
```nginx
error_page 404 /404.html;
gzip_static on;
brotli_static on;   # αν υπάρχει το module
location ~* \.(css|js|woff2)$ { expires 1y; add_header Cache-Control "public, immutable"; }
```

Το `optimize.js` παράγει ήδη `.gz` και `.br` δίπλα σε κάθε αρχείο, ώστε η συμπίεση
να δουλεύει και σε παρόχους χωρίς πρόσβαση στη ρύθμιση.

**HTTPS:** υποχρεωτικό. Ενεργοποιήστε δωρεάν πιστοποιητικό Let's Encrypt.

---

## ⚠️ Πριν τη δημοσίευση — υποχρεωτικά

- [ ] **Κριτικές πελατών** (αρχική σελίδα): αντικαταστήστε τα τρία placeholders
      με πραγματικά σχόλια. Μη δημοσιεύσετε κατασκευασμένες κριτικές.
- [ ] **Νομικές σελίδες**: συμπληρώστε τα στοιχεία σε `{ΑΓΚΥΛΕΣ}` (επωνυμία, ΑΦΜ,
      έδρα, χρόνοι τήρησης) και **ζητήστε έλεγχο από δικηγόρο**. Τα κείμενα είναι
      σοβαρά πρότυπα, όχι νομική συμβουλή.
- [ ] **Ασφάλιση περιεχομένου**: στη σελίδα Τιμές δηλώνεται ως πρόσθετη χρέωση.
      Επιβεβαιώστε το και διορθώστε αν χρειάζεται.
- [ ] **Εικόνα `og-default`** σε πραγματικό JPG/PNG (βλ. ενότητα Εικόνες) — η μόνη που παραμένει SVG.
- [ ] **Φόρμα** — σύνδεση endpoint.
- [ ] **Domain**: το `js/data.js` → `business.domain` πρέπει να είναι το τελικό URL
      (χρησιμοποιείται σε canonical, sitemap και schema).
- [ ] Αφαιρέστε όλα τα κίτρινα πλαίσια «Σημείωση προς τον διαχειριστή».

---

## Τεχνικές σημειώσεις

**Γιατί Inter και όχι Plus Jakarta Sans:** το Plus Jakarta Sans **δεν διαθέτει
ελληνικούς χαρακτήρες**. Θα εμφανιζόταν system font σε όλο τον ελληνικό ιστότοπο.
Το Inter έχει πλήρες greek subset.

**Γιατί δεν φορτώνεται το Bootstrap JS:** χρησιμοποιούσαμε 80 KB για δύο μόνο
λειτουργίες (mobile menu, dropdown). Αντικαταστάθηκαν από το `js/nav.js` (~60 γραμμές,
1.2 KB minified), με πλήρη υποστήριξη πληκτρολογίου.

**Γιατί το Bootstrap CSS είναι μικρό:** το `optimize.js` κρατά μόνο τους κανόνες
που χρησιμοποιούνται πραγματικά — 227 KB → 51 KB.

**Γιατί ο χάρτης θέλει κλικ:** ένα ενσωματωμένο Google Maps iframe κοστίζει
20-30 μονάδες Lighthouse και τοποθετεί cookies πριν τη συγκατάθεση.

**Το «Virtual Office»:** η σελίδα στοχεύει τους όρους «virtual office» και
«εικονικό γραφείο» επειδή εκεί ψάχνει ο κόσμος — αλλά δηλώνει **ρητά** ότι
δεν παρέχεται τηλεφωνική γραμματεία, διαχείριση αλληλογραφίας ή αίθουσες
συσκέψεων. Μην αφαιρέσετε αυτή τη διευκρίνιση.
