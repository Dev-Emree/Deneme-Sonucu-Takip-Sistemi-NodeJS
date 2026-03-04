## 2023-10-27 - Critical IDOR in Exam Visibility Toggle

**Vulnerability:** Insecure Direct Object Reference (IDOR) in `setPublic` controller function allowed any authenticated user to toggle the visibility of any exam by knowing its ID. The function lacked a check to verify that the requesting user owned the exam.

**Learning:** The application trusted the `examId` provided in the request body without cross-referencing it with the authenticated user's session. This pattern of "fetch object -> modify object" without "check ownership" is a common source of IDOR.

**Prevention:** Always verify ownership before modifying resources. In this case, by fetching the exam and comparing `exam.username` with the session user's `username` (or `_id`). Additionally, fail securely (e.g., return 403 Forbidden) rather than just 500 or generic error.

## 2024-05-13 - High IDOR via Missing Authorization Check in Switch Cases

**Vulnerability:** Insecure Direct Object Reference (IDOR) in `publicExam` controller function allowed unauthenticated and unauthorized users to view the details of any private AYT or YDT exam by knowing its ID. The `public` check was only implemented for TYT exams.

**Learning:** When using switch statements to handle similar object types, it's easy to accidentally miss critical security checks in some branches while including them in others. This led to a significant data exposure vulnerability.

**Prevention:** Ensure consistent authorization and validation logic across all branches of a switch statement handling resources. Whenever extracting resource data for public viewing, explicitly verify the `public` flag or equivalent authorization status for every resource type before returning the data.
