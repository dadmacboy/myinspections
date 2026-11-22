# UH Field NEXT v1.0.2 Release Candidate

MCAS Futenma UH Building Manager field operations app.

## Release-candidate changes
- Daily Log priority order: Escort, Lock Service, Appliance, QC / Repair Verification.
- Escort entries distinguish Escort Only from Escort + QC.
- Standalone QC / Repair Verification remains a separate activity.
- Daily Log CSV/Excel export preserves Sub-Activity / Result.
- Building & Room Roster Manager can add/update future buildings using real physical room lists.
- Room rosters can be pasted or imported from CSV; no occupancy or active/inactive status is stored.
- Buildings are not assigned to a default BM.
- Existing inspection cycles retain their saved room-roster snapshots when a current roster changes.

## GitHub Pages deployment
Replace the seven existing root files with the seven files in this package. Do not delete browser data on users' phones. After deployment, users can open Settings > Check for Update.

## Test before production
1. Daily Log: Escort > Escort + QC.
2. Daily Log: QC / Repair Verification by itself.
3. Export Daily Log Excel and confirm Sub-Activity / Result.
4. Settings: add a test building and paste a room roster.
5. Start a 20% inspection for that building and verify only entered rooms are sampled.
6. Confirm selecting a building does not force a BM.
