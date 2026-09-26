# HAMMAD WORLD — live offline update r34

Prepared 26 September 2026. Version: `2026.09.26-r34-live-worker`.
These files are ready to upload; your live site has not been changed.

## What this fixes

1. **Offline purchases:** Save writes the purchase to durable device storage and opens its branded preview immediately. The preview keeps the logo and Size column. It shows that server confirmation is pending. Reconnecting while the app is open triggers synchronization; stock and the final bill number update after confirmation.
2. **Duplicate payments after interrupted requests:** Payments retain one operation ID across retries and closing/reopening the tab. A payment already saved on the server is recovered instead of entered again.
3. **Incomplete backup imports:** Imports reject missing required collections instead of silently replacing them with empty lists. New backups include record counts and a SHA-256 integrity check. Complete older backups remain supported.
4. **Opening without internet:** The app shell and its Firebase scripts are saved locally, together with account-scoped shop data. A previously signed-in user can reopen the prepared app offline. Reconnection verifies the user's current role before queued records are sent.
5. **Pending entries missing from backup:** Full backups include this account's pending sales, purchases and payments on this device. Pending entries also have a separate export that works offline, plus recovery under the same shop account.

## Upload the update

1. Download and extract `HAMMAD_WORLD_Live_Offline_Update_r34.zip`.
2. In the existing GitHub Pages publishing folder, replace `index.html` and upload `sw.js`, `manifest.webmanifest`, `icon.png`, and the entire `vendor` folder. Keep their relative paths. Upload the extracted files, not the ZIP itself. The package's README may also be uploaded.
3. Wait for GitHub Pages to finish deploying. Open your usual site address online and reload. In Settings, check version `2026.09.26-r34-live-worker`.
4. Sign in and keep the app open until it says **Offline ready**. Do this separately on every device/browser used for billing. Settings also has **Check offline setup**.
5. Before live entries, check Settings: the connected Firebase project must be your **live** project. First verify the live Worker project setting and `/staff/*` support. Then test offline reopening and use a controlled purchase, understanding that it will be a real entry in the live database. Its preview should appear immediately with a pending message; reconnect and check that it confirms once and updates stock once.

This live package points to `https://hammad-world-photo-upload.hammadworld25.workers.dev`. Its Firebase project setting must be the **live** Firebase project, and its deployed code must support the `/staff/*` endpoints for staff billing. Check those settings before any live staff transaction. Keep your current Firestore rules and existing records. Installing this release does not require clearing browser storage.

## Using it offline

- Sales, purchases and customer/supplier payments can be saved to the device queue. Bill previews are available immediately after the device save succeeds.
- An offline bill is marked provisional until the server confirms it. Newly purchased stock becomes available as confirmed stock after synchronization.
- Sync runs when the app is open and a usable connection returns. It also checks on focus; **Check / retry sync** is available in **Entries & sync**. A closed browser cannot be relied upon to send queued records.
- First-time sign-in, signing in again after signing out, and setup on a new device require internet. Offline use needs previously cached app files and account data.
- Use the same browser or installed app where offline setup was completed. Browser data clearing or storage eviction can remove device-only records. Export pending entries before changing devices or clearing storage.
- This release adds offline creation for sales, purchases and payments. Other server operations retain their existing connection requirements.

## Backup and recovery

- Use **Back up pending entries** in **Entries & sync** even without internet. Save the downloaded JSON outside the browser.
- To recover it, sign into the original shop account and use **Recover pending entries**. A full r33 backup can also supply its pending entries here. Recovery checks the server before replaying an uncertain entry.
- Full cloud backups require internet and owner access. They include cloud collections plus the current account's queue on the current device. Export each other device/account's pending queue separately.
- Cloud collections are read separately. Pause transactions on other devices while taking a reconciliation backup.
- Full confirmed-data restore retains the existing local-copy workflow; it does not replace the live cloud database. Pending cloud entries in such a restore are retained separately and can be downloaded from Settings, then recovered under the original cloud account.

## Verification

The previous r33 logic passed **55 automated checks**, with no captured application errors:

| Suite | Passed | Coverage |
| --- | ---: | --- |
| App workflows | 18 | Purchases, sales, returns, payments, calculations, stock, permissions, import/export and pagination |
| Sale queue regression | 15 | Lost responses, retries, account changes, storage failure and transaction behavior |
| Purchase/payment recovery | 15 | Offline preview, tab restart, duplicate prevention, recovery files, account isolation and real service-worker caching |
| Firebase integration | 7 | Actual Firebase SDK with Auth/Firestore emulators and existing rules; offline restart, reconnect, payment replay and revoked role |

The mobile purchase preview was visually checked at a 390-pixel viewport. The integration checks used Chromium and local emulators on the same app logic; the live Worker and production deployment have not been directly tested. The short offline check above verifies installation on your actual device.

Test scripts, results and a preview screenshot are included in the separate QA evidence ZIP. They do not need to be uploaded to the website.

## Test app separation

The test site and live site keep browser storage independently because they have different web origins. Each browser stores its Firebase project configuration under `hw_fb_config`; inspect the connected Firebase project in Settings on **both** sites before treating their data as separate. The previous r33 upload package still points to `hammad-world-test.hammadworld25.workers.dev` and must **not** be deployed to the live site. This r34 package points to the live Worker address. Removing the test site files does not delete Firebase records. A test Firebase project can be removed separately only after checking no deployed app or Worker still connects to it, and after preserving any records you want to keep.
