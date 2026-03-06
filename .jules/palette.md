
## 2024-05-18 - [Keyboard Accessibility for Interactive Divs/Spans]
**Learning:** Found multiple instances where non-semantic elements (`div`, `span`) were used as interactive buttons without keyboard navigation support. Screen readers rely on semantic attributes and keyboard users need Enter/Space keybindings.
**Action:** Always ensure any `div` or `span` with an `addEventListener("click")` also has `role="button"`, `tabindex="0"`, an `aria-label`, and a matching `keydown` listener for Enter and Space keys.
