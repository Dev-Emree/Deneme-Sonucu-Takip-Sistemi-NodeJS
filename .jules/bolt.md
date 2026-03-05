## 2024-05-24 - [User Deserialization Performance]
**Learning:** Loading large user-associated arrays (like `tyts`, `ayts`, `ydts`) during every request via `deserializeUser` is a significant performance bottleneck in Passport.js + Mongoose applications.
**Action:** Use Mongoose field projection (e.g., `User.findById(id, '-field1 -field2')`) to exclude these heavy fields. Only fetch them when explicitly needed by a specific route.

## 2024-05-25 - [Database Memory Bloat Avoidance]
**Learning:** Saving huge arrays iteratively via `document.save()` triggers complete Mongoose document loading and validation, significantly draining memory, particularly for `tyts`, `ayts`, and `ydts` arrays.
**Action:** Always fetch only needed properties with `Model.findById(id, 'field1').lean()` when inserting sub-documents, and utilize atomic updates like `$push` within `Model.updateOne()` to minimize memory footprint and execution time.
