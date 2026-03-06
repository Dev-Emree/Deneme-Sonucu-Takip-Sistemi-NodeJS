## 2024-05-24 - [User Deserialization Performance]
**Learning:** Loading large user-associated arrays (like `tyts`, `ayts`, `ydts`) during every request via `deserializeUser` is a significant performance bottleneck in Passport.js + Mongoose applications.
**Action:** Use Mongoose field projection (e.g., `User.findById(id, '-field1 -field2')`) to exclude these heavy fields. Only fetch them when explicitly needed by a specific route.

## 2024-10-24 - [User Array Update Performance]
**Learning:** Fetching a full `User` document (including massive `tyts`, `ayts`, `ydts` arrays) and using `.save()` just to push a new exam ID causes unnecessary memory bloat, network overhead, and triggers Mongoose validation across all fields. This is a recurring bottleneck pattern with large arrays.
**Action:** When appending to an array field, use `.lean()` with projection to fetch only necessary fields (e.g., `username`), and use atomic database updates like `User.updateOne({ _id: user_id }, { $push: { [array_field]: exam_id } })` to bypass loading the full document into application memory.
