## 2024-11-20 - Keyboard Accessibility on Custom Accordions
**Learning:** The application uses non-semantic HTML tags (like `<div>` with `.exam-p1`) for interactive accordions. These required explicit `role="button"`, `tabindex="0"`, `aria-expanded`, and `aria-controls` attributes, along with specific JavaScript `keydown` listeners for 'Enter' and 'Space' to be accessible.
**Action:** When implementing custom interactive elements, always pair CSS class toggling with corresponding ARIA attribute updates and ensure keyboard listeners mirror click behaviors.
