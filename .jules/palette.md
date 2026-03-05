
## 2024-05-19 - Adding Accessibility to Interactive Non-Semantic Tags in EJS Templates
**Learning:** The project makes heavy use of non-semantic HTML tags (`<div>`, `<span>`, `<h4>`) for interactive elements in EJS templates (e.g., toggling exam details, info popups, URL copying, and visibility switches in `exams.ejs`), which causes them to be ignored by screen readers and keyboard navigation.
**Action:** Always verify if a `<div>`, `<span>`, or other non-semantic tag has a `click` listener attached in EJS views. If so, retrofit it by adding `role="button"`, `tabindex="0"`, appropriate `aria-label` or `aria-expanded` attributes, and bind a `keydown` listener to handle `Enter` and `Space` to match the expected button-like behavior.
