## 2024-05-24 - [User Deserialization Performance]
**Learning:** Loading large user-associated arrays (like `tyts`, `ayts`, `ydts`) during every request via `deserializeUser` is a significant performance bottleneck in Passport.js + Mongoose applications.
**Action:** Use Mongoose field projection (e.g., `User.findById(id, '-field1 -field2')`) to exclude these heavy fields. Only fetch them when explicitly needed by a specific route.
## 2024-02-28 - Avoid loading massive arrays on document fetch
**Learning:** Loading large user-associated arrays (like `tyts`, `ayts`, `ydts`) via `findOne` during write operations causes a significant performance bottleneck and memory bloat, especially when all we need is the `username`.
**Action:** Use `findById` with projection and `.lean()` when we only need specific fields like `username`. Use atomic operators like `$push` with `updateOne` instead of `user.save()` to add to these arrays to prevent round trips and full document validation overhead.
