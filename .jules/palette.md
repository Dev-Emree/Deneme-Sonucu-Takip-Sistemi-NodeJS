## 2024-03-10 - Accordion Keyboard Accessibility
**Learning:** The application frequently uses non-semantic HTML tags (e.g., `<div>`) for interactive elements like accordions.
**Action:** Ensure keyboard and screen reader accessibility by explicitly adding `role="button"`, `tabindex="0"`, `aria-label`, and dynamic `aria-expanded`/`aria-controls` attributes. Bind `keydown` listeners for `Enter` and `Space` alongside `click`, calling `preventDefault()` on `Space` to stop unwanted page scrolling.
