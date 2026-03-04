## 2024-05-24 - [User Deserialization Performance]
**Learning:** Loading large user-associated arrays (like `tyts`, `ayts`, `ydts`) during every request via `deserializeUser` is a significant performance bottleneck in Passport.js + Mongoose applications.
**Action:** Use Mongoose field projection (e.g., `User.findById(id, '-field1 -field2')`) to exclude these heavy fields. Only fetch them when explicitly needed by a specific route.

## 2025-03-04 - [Database Updates Performance]
**Learning:** Loading full documents into memory just to append references to large arrays (e.g., `user.tyts.push(id)` followed by `user.save()`) causes memory bloat and latency, especially as the arrays grow.
**Action:** Use Mongoose atomic operations like `$push` with `updateOne` and field projection (`findById().lean()`) when merely creating an association, skipping the full document load and validation overhead completely.
