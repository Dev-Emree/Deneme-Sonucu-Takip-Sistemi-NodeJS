## 2023-10-27 - Critical IDOR in Exam Visibility Toggle

**Vulnerability:** Insecure Direct Object Reference (IDOR) in `setPublic` controller function allowed any authenticated user to toggle the visibility of any exam by knowing its ID. The function lacked a check to verify that the requesting user owned the exam.

**Learning:** The application trusted the `examId` provided in the request body without cross-referencing it with the authenticated user's session. This pattern of "fetch object -> modify object" without "check ownership" is a common source of IDOR.

**Prevention:** Always verify ownership before modifying resources. In this case, by fetching the exam and comparing `exam.username` with the session user's `username` (or `_id`). Additionally, fail securely (e.g., return 403 Forbidden) rather than just 500 or generic error.


## 2024-03-08 - Critical Application DoS via Unhandled TypeErrors

**Vulnerability:** Calling `.length` on `req.body.examName` without verifying it is a string allowed an attacker to bypass length restrictions or crash the server by providing a different type (like an object or undefined). Accessing `req.session.passport.user` without verifying `req.session.passport` exists similarly risks unhandled TypeErrors if a session is malformed or invalid.
**Learning:** The Express framework parses JSON payloads into objects. Relying on the shape of `req.body` or `req.session` without validation leaves the application vulnerable to DoS attacks because an unhandled TypeError inside a route handler crashes the entire Node process.
**Prevention:** Always validate that nested properties like `req.body.examName` are strings using `typeof` before calling string methods (`.length`, `.toLowerCase()`). Use optional chaining (`?.`) when accessing nested properties of `req.session` or `req.body` to prevent "Cannot read properties of undefined" errors.
