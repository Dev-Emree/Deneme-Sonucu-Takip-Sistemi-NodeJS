## 2024-05-24 - [User Deserialization Performance]
**Learning:** Loading large user-associated arrays (like `tyts`, `ayts`, `ydts`) during every request via `deserializeUser` is a significant performance bottleneck in Passport.js + Mongoose applications.
**Action:** Use Mongoose field projection (e.g., `User.findById(id, '-field1 -field2')`) to exclude these heavy fields. Only fetch them when explicitly needed by a specific route.

## 2024-05-26 - [Concurrent Pagination Queries]
**Learning:** Executing Mongoose pagination queries (`countDocuments` and `find`) sequentially introduces unnecessary database latency, especially as the dataset grows.
**Action:** Execute these independent queries concurrently using `Promise.all()` to significantly reduce response times for paginated endpoints.
