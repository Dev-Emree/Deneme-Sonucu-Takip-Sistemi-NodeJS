## 2024-05-24 - [User Deserialization Performance]
**Learning:** Loading large user-associated arrays (like `tyts`, `ayts`, `ydts`) during every request via `deserializeUser` is a significant performance bottleneck in Passport.js + Mongoose applications.
**Action:** Use Mongoose field projection (e.g., `User.findById(id, '-field1 -field2')`) to exclude these heavy fields. Only fetch them when explicitly needed by a specific route.

## 2024-05-25 - [Mongoose Pagination Queries]
**Learning:** For Mongoose pagination queries (e.g., `countDocuments` and `find`), executing them sequentially creates unnecessary database latency, especially on larger collections.
**Action:** Execute `countDocuments` and `find` concurrently using `Promise.all([Model.countDocuments(), Model.find()])` to fetch total count and paginated results simultaneously.
