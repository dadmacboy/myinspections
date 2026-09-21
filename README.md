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
- Furniture inventory separated into its own module and organized by quantity rather than repeated item rows.
- Per-Marine and per-room furniture defaults with adjustable expected quantities.
- Expected, present, and automatically calculated missing quantities, plus rating, condition code, and comments.
- Furniture Present quantities start blank; expected quantities adjust when 1, 2, or 3 occupants are selected.
- Persistent unfinished drafts, completed-record review, eMH-updated status, JSON backup, and true XLSX export.
- Resident 15-day QSRMax discrepancy instructions in the completed record.
- Offline use after the first successful load.

## GitHub Pages

Upload every file in this folder to the root of a GitHub repository. In **Settings > Pages**, select **Deploy from a branch**, `main`, and `/ (root)`.

## Draft source basis

The first module was drafted from the supplied **Check in form eMH**, **Checkout/Termination**, **Fail Inspection Criteria - Quarterly**, **Command-Directed Inspection**, and **Move-Out Standards** documents. The contact/POC list is not embedded in the app.

## Important limitations

This is a draft personal working tool that supplements, but does not replace, eMH, QSRMax, official inspections, key-control records, or local procedures. Do not enter resident names, DoD IDs, phone numbers, or other unnecessary PII/CUI. Signatures are stored only in the browser and JSON backup; the Excel summary records whether each signature was captured. Protect the device and export or remove records according to local requirements. Furniture quantities remain editable because the uploaded example does not prove the standard quantity for every Futenma room configuration.
