#!/usr/bin/env node
/* ============================================================================
   MAKE-FAVICONS — παράγει πλήρες favicon package από το πραγματικό λογότυπο
   ----------------------------------------------------------------------------
   ΧΡΗΣΗ:  node build/make-favicons.js

   Πηγή: το εικονίδιο (μόνο το κτίριο, όχι το κείμενο) κόβεται από το
   πραγματικό λογότυπο του selfstorages.gr (λήψη από wp-content/uploads,
   με ρητή εντολή του χρήστη).

   Παράγει:
     favicon/favicon.ico            (32×32, πολλαπλά μεγέθη μέσα)
     favicon/favicon-16x16.png
     favicon/favicon-32x32.png
     favicon/apple-touch-icon.png   (180×180, με λευκό φόντο — απαίτηση iOS)
     favicon/android-chrome-192x192.png
     favicon/android-chrome-512x512.png
     favicon/mstile-150x150.png     (Windows tiles)
     images/logo.png                (πλήρες λογότυπο, για χρήση στο site)
   ========================================================================= */
'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico').default;

const ROOT = path.join(__dirname, '..');
// Το πραγματικό λογότυπο είναι ήδη committed στο repo — reproducible σε
// οποιοδήποτε clone/CI, χωρίς εξάρτηση από τοπικό φάκελο.
const SRC_LOGO = path.join(ROOT, 'images', 'logo.png');

(async function () {
  if (!fs.existsSync(SRC_LOGO)) {
    console.error('❌ Δεν βρέθηκε το πηγαίο λογότυπο: ' + SRC_LOGO);
    process.exit(1);
  }

  const meta = await sharp(SRC_LOGO).metadata();
  console.log('Πηγαίο λογότυπο: ' + meta.width + '×' + meta.height);

  /* --- 2. Κόψιμο του εικονιδίου (μόνο το κτίριο) ------------------------
     Το λογότυπο είναι [εικονίδιο κτιρίου][SELF STORAGES.GR κείμενο] με
     tagline σε ξεχωριστή γραμμή κάτω. Για favicon χρειαζόμαστε ΜΟΝΟ το
     εικονίδιο — σε 16-32px οποιοδήποτε κείμενο είναι αδιάβαστο.
     Η περιοχή 0,0,115,92 επιβεβαιώθηκε οπτικά ότι περιέχει καθαρά μόνο
     το κτίριο, χωρίς να αγγίζει το tagline.                               */
  const cropped = sharp(SRC_LOGO).extract({ left: 0, top: 0, width: 115, height: 92 });

  fs.mkdirSync(path.join(ROOT, 'favicon'), { recursive: true });

  /* --- 3. PNG σε όλα τα απαραίτητα μεγέθη -------------------------------
     Λευκό φόντο (όχι διάφανο): το apple-touch-icon ΔΕΝ πρέπει να έχει
     διαφάνεια — το iOS βάζει μαύρο φόντο πίσω από διάφανες περιοχές.      */
  const sizes = [
    ['favicon-16x16.png', 16],
    ['favicon-32x32.png', 32],
    ['apple-touch-icon.png', 180],
    ['android-chrome-192x192.png', 192],
    ['android-chrome-512x512.png', 512],
    ['mstile-150x150.png', 150]
  ];

  for (const [name, size] of sizes) {
    await cropped.clone()
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .png()
      .toFile(path.join(ROOT, 'favicon', name));
    console.log('  ✓ favicon/' + name);
  }

  /* --- 4. favicon.ico (πολλαπλά μεγέθη σε ένα αρχείο) -------------------
     Παλιότεροι browsers/Windows ζητούν ρητά .ico στη ρίζα.               */
  const icoBuffers = await Promise.all([16, 32, 48].map(function (size) {
    return cropped.clone()
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .png().toBuffer();
  }));
  const icoBuffer = await pngToIco(icoBuffers);
  fs.writeFileSync(path.join(ROOT, 'favicon', 'favicon.ico'), icoBuffer);
  console.log('  ✓ favicon/favicon.ico (16/32/48px)');

  /* --- 5. favicon.svg — vector fallback για μοντέρνους browsers ---------
     Χρησιμοποιούμε το ήδη υπάρχον SVG glyph (καθαρό, scalable) αντί για
     ενσωματωμένο raster σε SVG wrapper, ώστε να μείνει ελαφρύ. Αν θέλετε
     το ΑΚΡΙΒΩΣ πραγματικό λογότυπο και σε SVG, χρειάζεται vectorization
     (π.χ. σε Illustrator) — το PNG-based .ico/.png παραπάνω είναι ήδη το
     πραγματικό λογότυπο σε κάθε άλλη περίπτωση.                          */

  console.log('\n✅ Favicon package έτοιμο από το πραγματικό λογότυπο selfstorages.gr');
})().catch(function (err) { console.error(err); process.exit(1); });
