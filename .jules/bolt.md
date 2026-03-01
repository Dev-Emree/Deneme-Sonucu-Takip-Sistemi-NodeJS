## 2024-05-24 - [User Deserialization Performance]
**Learning:** Loading large user-associated arrays (like `tyts`, `ayts`, `ydts`) during every request via `deserializeUser` is a significant performance bottleneck in Passport.js + Mongoose applications.
**Action:** Use Mongoose field projection (e.g., `User.findById(id, '-field1 -field2')`) to exclude these heavy fields. Only fetch them when explicitly needed by a specific route.

## 2024-05-24 - [User Update Performance]
**Learning:** Updating large arrays (`tyts`, `ayts`, `ydts`) on the `User` model via `findOne()` and `.save()` incurs massive performance penalties (memory bloat + validation overhead).
**Action:** Always use `.findById(id, 'username').lean()` for reading lightweight user data, and atomic operators like `.updateOne({ _id: id }, { $push: { arrayName: itemId } })` to append items to arrays efficiently without fetching or saving the full document.
