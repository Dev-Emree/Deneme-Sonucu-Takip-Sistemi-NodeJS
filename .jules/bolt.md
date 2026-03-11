## 2024-05-24 - [User Deserialization Performance]
**Learning:** Loading large user-associated arrays (like `tyts`, `ayts`, `ydts`) during every request via `deserializeUser` is a significant performance bottleneck in Passport.js + Mongoose applications.
**Action:** Use Mongoose field projection (e.g., `User.findById(id, '-field1 -field2')`) to exclude these heavy fields. Only fetch them when explicitly needed by a specific route.

## 2026-03-11 - [Concurrent Mongoose Pagination Queries]
**Learning:** Running Mongoose `countDocuments` and `find` sequentially for pagination increases total database latency unnecessarily.
**Action:** Use `Promise.all()` to execute both queries concurrently when implementing pagination.
