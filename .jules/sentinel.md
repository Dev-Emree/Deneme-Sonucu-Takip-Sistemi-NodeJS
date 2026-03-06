## 2023-10-27 - Critical IDOR in Exam Visibility Toggle

**Vulnerability:** Insecure Direct Object Reference (IDOR) in `setPublic` controller function allowed any authenticated user to toggle the visibility of any exam by knowing its ID. The function lacked a check to verify that the requesting user owned the exam.

**Learning:** The application trusted the `examId` provided in the request body without cross-referencing it with the authenticated user's session. This pattern of "fetch object -> modify object" without "check ownership" is a common source of IDOR.

**Prevention:** Always verify ownership before modifying resources. In this case, by fetching the exam and comparing `exam.username` with the session user's `username` (or `_id`). Additionally, fail securely (e.g., return 403 Forbidden) rather than just 500 or generic error.

## 2024-05-24 - [CRITICAL] Authorization Bypass / IDOR in publicExam

**Vulnerability:** The `publicExam` function exposed AYT and YDT exam data without checking if the exam was actually set to `public`. The `tyt` case was properly checked `if (!exam.public) return false;`, but the check was completely missing for `ayt` and `ydt`.
**Learning:** This is an example of inconsistent access controls across similar object types, leading to a partial authorization bypass. The original author remembered to protect one type of test result (TYT), but forgot for the other two. It's also critical to ensure that when `findById` returns `null` (because the object does not exist), accessing `exam.public` does not cause an Unhandled TypeError, which is a DoS risk.
**Prevention:** Apply consistent authorization checks across all branches of a switch statement or loop dealing with protected data. Ensure existence checks (`!exam`) are performed before checking properties (`!exam.public`).
