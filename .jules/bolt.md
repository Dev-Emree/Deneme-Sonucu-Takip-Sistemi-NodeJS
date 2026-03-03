## 2024-05-24 - [User Deserialization Performance]
**Learning:** Loading large user-associated arrays (like `tyts`, `ayts`, `ydts`) during every request via `deserializeUser` is a significant performance bottleneck in Passport.js + Mongoose applications.
**Action:** Use Mongoose field projection (e.g., `User.findById(id, '-field1 -field2')`) to exclude these heavy fields. Only fetch them when explicitly needed by a specific route.

## 2024-05-28 - Avoid full document fetches for atomic array updates
**Learning:** In MongoDB and Mongoose, updating a user array by fetching the full user document (`User.findOne`), pushing to the array, and then saving it (`user.save()`) causes memory bloat, especially as arrays grow larger over time. It also forces full-document validation during `.save()`.
**Action:** Always fetch only the fields required for context using projection and `.lean()` (e.g., `User.findById(id, 'username').lean()`). Perform array updates using atomic operations like `updateOne({ _id: id }, { $push: { arrayField: newItem } })`. This dramatically reduces memory footprint and database overhead.
