# Hammad World — r38

App version: `2026.10.02-r38-report-complete`.
Worker version: `r38-report-complete`.

This release addresses the 12 r36 audit findings. Staff permissions are unchanged.
Deploy matching app, Worker, Firestore rules and catalogue files together using the
release instructions. Complete live verification and financial reconciliation
before replacing the current accounting system.

Runtime files: index.html, sw.js, manifest.webmanifest, icon.png and vendor/.
The vendor folder contains Firebase 9.23.0 compatibility scripts and the locally
bundled HEIC converter. Keep the accompanying license files.

Supplier returns select an original purchase invoice. New purchases separate
invoice payable, recorded cash and private acquisition cost. Financial-year
reports cover 1 April–31 March. Bill numbering remains continuous.

Old financial records are preserved; ambiguous old cost overrides and unlinked
supplier returns require owner reconciliation. Do not clear device storage while
pending entries remain.

## Attached QA report corrections
All twelve findings from Hammad_World_QA_Report_r36.pdf have mapped corrections in r38. Staff-created party opening balances must be zero. Zero-rate free-goods purchase lines are valid. Owner refunds use /owner/refund, validated against the complete server ledger. Deploy the matching Worker and Firestore rules before using this app. Read the packaged deployment instructions and r38 QA report. Local tests passed; live enforcement/device sign-off is still required.
