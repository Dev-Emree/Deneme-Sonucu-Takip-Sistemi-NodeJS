## 2023-10-27 - Critical IDOR in Exam Visibility Toggle

**Vulnerability:** Insecure Direct Object Reference (IDOR) in `setPublic` controller function allowed any authenticated user to toggle the visibility of any exam by knowing its ID. The function lacked a check to verify that the requesting user owned the exam.

**Learning:** The application trusted the `examId` provided in the request body without cross-referencing it with the authenticated user's session. This pattern of "fetch object -> modify object" without "check ownership" is a common source of IDOR.

**Prevention:** Always verify ownership before modifying resources. In this case, by fetching the exam and comparing `exam.username` with the session user's `username` (or `_id`). Additionally, fail securely (e.g., return 403 Forbidden) rather than just 500 or generic error.
## 2026-03-02 - [CRITICAL] DoS via Unhandled TypeError in exam router
**Vulnerability:** The application was vulnerable to Denial of Service (DoS) due to unhandled `TypeError`s when accessing properties of potentially undefined objects like `req.body.examName.length` and `req.session.passport.user`. An attacker could crash the Node.js process by sending malformed requests (e.g., `examName` as null or missing session).
**Learning:** In Express.js, `req.body` and `req.session` properties are user-controlled and can be undefined or of unexpected types. Accessing nested properties or methods (like `.length`) without validation leads to synchronous crashes before any error handling middleware can catch them.
**Prevention:** Always explicitly validate the existence and type of user-provided input before accessing nested properties. Use optional chaining (`req.session?.passport?.user`) and type checks (`typeof req.body?.examName === 'string'`) to safely handle missing or invalid data.
