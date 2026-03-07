## 2024-05-24 - [User Deserialization Performance]
**Learning:** Loading large user-associated arrays (like `tyts`, `ayts`, `ydts`) during every request via `deserializeUser` is a significant performance bottleneck in Passport.js + Mongoose applications.
**Action:** Use Mongoose field projection (e.g., `User.findById(id, '-field1 -field2')`) to exclude these heavy fields. Only fetch them when explicitly needed by a specific route.
## 2024-05-25 - [Mongoose Large Array Updates]
**Learning:** Loading and saving large arrays using `user.tyts.push(id)` followed by `user.save()` forces Mongoose to track massive amounts of data in memory, increasing validation overhead and latency as the array grows.
**Action:** Use `.lean()` queries with projection to fetch only needed data (e.g. `username`), and update large document arrays using lightweight atomic Mongoose updates like `User.updateOne({ _id }, { $push: { [field]: val } })`. Ensure dynamic keys in `$push` are validated against empty strings to prevent accidental schema corruption.
