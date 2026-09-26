# UH Field App - Room Inspections and Furniture Draft

Mobile-first GitHub Pages draft for conducting Check-In, Check-Out, Command-Directed, and issued-furniture records before transferring the results into eMH.

## Included in this draft

- Active Check-In, Check-Out, Command-Directed, and Furniture Issued Items modules.
- Required date, building number, room number, and Building Manager/Housing Rep.
- Checkout-sheet layout reproduced from the supplied Futenma Checkout/Termination form.
- General Safety, Mold/Moisture, Pest Management, Water, HVAC, and Smoke/CO/Fire sections use the form's compact Yes / No / N/A structure and one shared details box per section.
- Kitchen, Appliances, Bathroom, Bedroom, and Living Area use the form's Rating, Condition Code, and Comments columns.
- Official rating labels and condition-code choices from the supplied form.
- Full Command-Directed checklist from the supplied five-page form, including expanded General Safety, asbestos, water, HVAC, fire alarm, and component sections.
- Command-Directed temperature, relative-humidity, and calculated dew-point readings embedded within Mold/Moisture Control.
- Separate Settings lists for preloading building numbers and Building Managers; each populates its own form field.
- Digital signature pads for the Building Manager/Housing Rep and resident at the top of every form.
- Individual and combined PDF exports use the supplied five-page Command-Directed Inspection scan as the page background, in the correct logical page order, with values and medium dots placed over the official fields.
- The official PDF fields include resident name, paygrade/rank, resident presence, location/address, and unit/room designation.
- Records can be filtered by an inclusive inspection-date range and exported as one combined PDF or one Excel workbook.
- Furniture inventory separated into its own module and organized by quantity rather than repeated item rows.
- Per-Marine and per-room furniture defaults with adjustable expected quantities.
- Expected, present, and automatically calculated missing quantities, plus rating, condition code, and comments.
- Furniture Present quantities start blank; expected quantities adjust when 1, 2, or 3 occupants are selected.
- Persistent unfinished drafts, completed-record review/editing, eMH-updated status, JSON backup, and true XLSX export.
- Resident 15-day QSRMax discrepancy instructions in the completed record.
- Offline use after the first successful load.

## GitHub Pages

Upload every file in this folder to the root of a GitHub repository. In **Settings > Pages**, select **Deploy from a branch**, `main`, and `/ (root)`.

## Draft source basis

The first module was drafted from the supplied **Check in form eMH**, **Checkout/Termination**, **Fail Inspection Criteria - Quarterly**, **Command-Directed Inspection**, and **Move-Out Standards** documents. The contact/POC list is not embedded in the app.

## Important limitations

This is a draft personal working tool that supplements, but does not replace, eMH, QSRMax, official inspections, key-control records, or local procedures. Enter only the minimum resident information required by the official checklist; do not enter DoD IDs, phone numbers, or unrelated PII/CUI. Resident information and signatures are stored locally in the browser and JSON backup; protect the device and exported files and remove records according to local requirements. Furniture quantities remain editable because the uploaded example does not prove the standard quantity for every Futenma room configuration.


## v0.6.6
- Moved Housing Rep and Resident signature labels to the left of their CAC signature fields.
- Added Re-Inspection Yes/No and Present Yes/No checkboxes below the Resident signature field on page 1.


## v0.6.6 PDF header correction
- Page 1 CAC signature fields are coordinate-positioned alongside the Housing Rep and Resident rows.
- Signature labels sit to the left of their corresponding fields.
- Re-Inspection and Present Yes/No checkboxes sit directly below the Resident signature row.
- The signature block no longer overlaps Country or Room Designation fields.


## v0.6.6
- Optional finger-captured Housing Rep and Resident signatures print in a supplemental Field Signatures block after Inspection Comments.
- Page 1 CAC signature fields remain untouched and available for certificate signing.
- Check-Out uses the same three-page form engine and behavior as Check-In, with Inspection Type shown as CHECK-OUT/TERMINATION.

## v0.7.3 — Quarterly Inspection
- Added Quarterly Inspection module with 20% / 100% cycle selection.
- Added configurable Building & Space Inventory (decks, bedrooms, common bathrooms, laundry, lounges, closets, storage, offices, utility and custom other spaces).
- Fast PASS & NEXT workflow; deficiency workflow uses standardized FAIL and NON-FAIL criteria from the supplied quarterly guidance.
- Automatic PASS / PASS W/CONDITION / FAIL logic and generated comments.
- Progress dashboard and 60-day phase indicator.
- Quarterly Excel export: COMPILED RESULTS, INSPECTION DETAIL, WORK ORDERS REQUIRED.
- Building configuration JSON import/export.
- Full JSON backup/restore now includes core app plus Quarterly data.
- Existing Check-In, Check-Out, Command-Directed and Furniture modules were not changed.


## v0.7.3 Quarterly inventory simplification
- Removed deck/floor count setup.
- Select buildings already loaded in Settings; assigned BM auto-fills and remains editable.
- Bedroom inventory uses comma-separated ranges such as `101-134, 201-234`.
- Common/support spaces use simple quantity fields.
- Existing building inventory can be edited, exported, or imported as JSON.
- Work Order Required is now a checkbox.

## v0.7.3 Quarterly cleanup
- Building Inventory is a one-time master setup reused by Quarterly cycles.
- Select a preloaded building; Assigned BM is populated from Settings assignments.
- Enter number of decks/floors; each deck gets bedroom From/To range rows with + additional range support.
- Add named common/support spaces per deck with + Add Space; copy repeating support spaces to the next deck.
- Configured building cards use edit/delete icons; editing updates the existing building inventory.
- New cycles load the saved building inventory and save a snapshot so later master-layout edits do not change historical cycles.
- Duplicate FY + Quarter + Building cycles are prevented and the existing cycle is opened instead.
- Quarterly progress/action spacing, bottom padding, and navigation-to-top behavior were tightened for phone use.
- Work Order Required remains a checkbox.


## v0.7.4 — Pace patch
- Adds a compact Pace line to the Quarterly cycle progress card.
- Pace uses the 30-day physical-inspection window: remaining spaces / remaining Phase 1 days.
- Shows ON PACE or BEHIND PACE against an even 30-day completion trajectory.
- Hides the daily pace once the inspection population is complete.

## v0.7.5 Inventory Controls Patch
- Replaced dynamic + range controls with three fixed ranges per deck; Range 2 and 3 are collapsed optional sections.
- Replaced + Space controls with a collapsible standard Common / Support Spaces quantity list.
- Added two collapsed custom space entries per deck.
- Updated placeholders: Enter number of decks, Enter room number, Enter a number.
- Pace status is green for ON PACE and red for BEHIND PACE.


## v0.7.7 Common-Space N/A Patch
- Added cycle-level Common / Support Spaces N/A checkbox.
- N/A removes common/support spaces from Required, Remaining, Pace, and percent-complete calculations without deleting the master building inventory.
- If common/support inspections already exist, the app warns before marking the category N/A; existing records are retained.
- Unchecking N/A restores the spaces to the cycle population.
- 20% cycles continue to use designated/manual space selection; the app does not invent an official random sampling rule.
- Laundry equipment remains high-level in Quarterly; detailed washer/dryer inventory is reserved for a separate future module.


## v0.7.7
- Generates a 20% bedroom sample (rounded up) proportionally across decks and randomly within each deck.
- Sample must be reviewed and accepted before it becomes the cycle population.
- Common/support spaces remain a separate population and can be marked N/A at cycle level.
- Accepted samples are locked; an uninspected sampled room can be replaced by a random unselected room on the same deck, with substitution history retained.
- Sampling method is labeled as an app method, not an official USMC sampling rule.
