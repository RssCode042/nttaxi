# Security Specification - EH Taxi 6106 CMS

## Data Invariants
1. Website content is publicly readable by anyone.
2. Only authorized administrators can modify the site content.
3. Content must follow the structural schema of the translations and pricing data.

## The Dirty Dozen Payloads
1. Attempt to write to `config/site` without authentication.
2. Attempt to write to `config/site` as a non-admin user.
3. Attempt to delete the `config/site` document.
4. Attempt to inject scripts into translation strings.
5. Attempt to set `updatedAt` to a future date or non-server timestamp.
6. Attempt to modify fields not in the schema.
7. Attempt to create a document in `config/site` if it already exists.
8. Attempt to use a very large payload to exhaust database resources.
9. Attempt to read an admin-only collection.
10. Attempt to spoof the `admin` role.
11. Attempt to bypass `isEditor()` check.
12. Attempt to write invalid pricing data (negative numbers).

## Test Runner (Logic)
- verify `get` on `config/site` for `null` auth -> ALLOW
- verify `update` on `config/site` for `null` auth -> DENY
- verify `update` on `config/site` for `auth != null` but not in `admins` -> DENY
- verify `update` on `config/site` for `auth != null` and in `admins` -> ALLOW
