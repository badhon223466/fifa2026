# Firebase Security Specification

## Data Invariants
- `settings/broadcast`: Only authorized admins can write. Public can read.
- `ads`: Only authorized admins can write. Public can read active ads.

## Authorized Admins
- mdbadhon7734@gmail.com

## The Dirty Dozen (Attacker Payloads)
1. Anonymous user trying to update `settings/broadcast`. (Expected: DENIED)
2. Authenticated non-admin trying to update `settings/broadcast`. (Expected: DENIED)
3. Admin trying to update `settings/broadcast` with a 2MB string. (Expected: DENIED)
4. Attacker trying to delete the `settings` collection. (Expected: DENIED)
5. Attacker trying to create a setting without the `broadcastUrl` field. (Expected: DENIED)
6. Attacker trying to inject `isAdmin: true` into their user profile (if it existed). (Expected: DENIED)
7. Attacker trying to bypass `isValidId` with 1KB document IDs. (Expected: DENIED)
8. Attacker trying to update `updatedAt` with a client-side timestamp instead of `request.time`. (Expected: DENIED)
9. Attacker trying to list all settings if there was PII (none here, but logic applies). (Expected: SECURE)
10. Attacker trying to create an Ad with `position: 'top-bar'` (not in enum). (Expected: DENIED)
11. Attacker trying to update an Ad they didn't create (if owner logic existed). (Expected: DENIED)
12. Attacker trying to read `settings` when not signed in (if read restricted). (Expected: ALLOWED for public config, but restricted for certain fields if any).
