## 2023-10-27 - Critical IDOR in Exam Visibility Toggle

**Vulnerability:** Insecure Direct Object Reference (IDOR) in `setPublic` controller function allowed any authenticated user to toggle the visibility of any exam by knowing its ID. The function lacked a check to verify that the requesting user owned the exam.

**Learning:** The application trusted the `examId` provided in the request body without cross-referencing it with the authenticated user's session. This pattern of "fetch object -> modify object" without "check ownership" is a common source of IDOR.

**Prevention:** Always verify ownership before modifying resources. In this case, by fetching the exam and comparing `exam.username` with the session user's `username` (or `_id`). Additionally, fail securely (e.g., return 403 Forbidden) rather than just 500 or generic error.

## 2025-02-14 - Unhandled TypeErrors Leading to DoS
**Vulnerability:** Express route handlers in `routes/exam.router.js` accessed nested properties on `req.session.passport` and `req.body.examName` without verifying if the properties existed or were of the correct type. Specifically, accessing `req.session.passport.user` when `req.session.passport` was undefined, and accessing `req.body.examName.length` when `req.body.examName` was undefined or not a string. This resulted in Unhandled TypeErrors that crashed the Express server.
**Learning:** In Node.js, an unhandled exception in an async route handler without an error-handling middleware will cause the application process to crash, leading to a Denial of Service.
**Prevention:** Always use optional chaining (`?.`) when accessing deeply nested properties that may be undefined, and explicitly check the `typeof` user input before accessing properties like `.length` or calling methods that depend on a specific data type.
