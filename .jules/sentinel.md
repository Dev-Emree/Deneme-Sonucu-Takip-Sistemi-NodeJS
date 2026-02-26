## 2023-10-27 - Critical IDOR in Exam Visibility Toggle

**Vulnerability:** Insecure Direct Object Reference (IDOR) in `setPublic` controller function allowed any authenticated user to toggle the visibility of any exam by knowing its ID. The function lacked a check to verify that the requesting user owned the exam.

**Learning:** The application trusted the `examId` provided in the request body without cross-referencing it with the authenticated user's session. This pattern of "fetch object -> modify object" without "check ownership" is a common source of IDOR.

**Prevention:** Always verify ownership before modifying resources. In this case, by fetching the exam and comparing `exam.username` with the session user's `username` (or `_id`). Additionally, fail securely (e.g., return 403 Forbidden) rather than just 500 or generic error.
