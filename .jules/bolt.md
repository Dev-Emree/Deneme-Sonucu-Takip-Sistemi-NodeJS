## 2024-05-24 - [User Deserialization Performance]
**Learning:** Loading large user-associated arrays (like `tyts`, `ayts`, `ydts`) during every request via `deserializeUser` is a significant performance bottleneck in Passport.js + Mongoose applications.
**Action:** Use Mongoose field projection (e.g., `User.findById(id, '-field1 -field2')`) to exclude these heavy fields. Only fetch them when explicitly needed by a specific route.
