## 2023-10-27 - Critical IDOR in Exam Visibility Toggle

**Vulnerability:** Insecure Direct Object Reference (IDOR) in `setPublic` controller function allowed any authenticated user to toggle the visibility of any exam by knowing its ID. The function lacked a check to verify that the requesting user owned the exam.

**Learning:** The application trusted the `examId` provided in the request body without cross-referencing it with the authenticated user's session. This pattern of "fetch object -> modify object" without "check ownership" is a common source of IDOR.

**Prevention:** Always verify ownership before modifying resources. In this case, by fetching the exam and comparing `exam.username` with the session user's `username` (or `_id`). Additionally, fail securely (e.g., return 403 Forbidden) rather than just 500 or generic error.

## 2024-05-24 - Critical DoS in Exam Router Property Access

**Vulnerability:** Unhandled TypeErrors on nested properties leading to Denial of Service (DoS). For example, `req.body.examName.length` and `req.session.passport.user` were accessed without validating if `examName` is a string or if `passport` existed on `req.session`.
**Learning:** This application lacks centralized request validation (like `express-validator`). It implicitly trusts the shape of incoming JSON payloads. An attacker can crash the entire Express process by sending malicious structures (like `{"examName": null}` or `{}`) when the route directly accesses methods or properties on expected object shapes without verifying them first.
**Prevention:** Always perform type checking (e.g. `typeof req.body.examName !== 'string'`) before calling `.length` on user inputs. Use optional chaining (`?.`) when deeply accessing `req.session` or similar nested objects to prevent "Cannot read properties of undefined" exceptions.
