## 2023-10-27 - Critical IDOR in Exam Visibility Toggle

**Vulnerability:** Insecure Direct Object Reference (IDOR) in `setPublic` controller function allowed any authenticated user to toggle the visibility of any exam by knowing its ID. The function lacked a check to verify that the requesting user owned the exam.

**Learning:** The application trusted the `examId` provided in the request body without cross-referencing it with the authenticated user's session. This pattern of "fetch object -> modify object" without "check ownership" is a common source of IDOR.

**Prevention:** Always verify ownership before modifying resources. In this case, by fetching the exam and comparing `exam.username` with the session user's `username` (or `_id`). Additionally, fail securely (e.g., return 403 Forbidden) rather than just 500 or generic error.
## 2024-10-24 - [DoS Risk] Unhandled Type Errors in Express Routes
**Vulnerability:** Unauthenticated or malformed requests to Express routes (like missing `req.session.passport` or `req.body.examName`) were causing unhandled TypeErrors (e.g., `Cannot read properties of undefined`), immediately crashing the Node.js process and resulting in a Denial of Service.
**Learning:** Node.js Express route handlers must aggressively validate all expected nested properties on `req.body` and `req.session` before accessing their properties (such as `.length`). The absence of optional chaining or explicit checks allowed malformed payloads to bypass application logic and crash the underlying server.
**Prevention:** Always use safe optional chaining (`?.`) when accessing deeply nested properties of request objects, and explicitly validate types (e.g., `typeof req.body?.prop !== 'string'`) before invoking methods or reading length properties to prevent unhandled exceptions.
