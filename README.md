# INSPO

Functionality and styling to reuse.

## 1. Scroll ruler nav (vertical labels that flip to a header)

- Source: https://getartcraft.com/apps
- What: Right edge has a ruler with tick marks and vertical (rotated) section labels. When a section scrolls into view, its label animates up and turns horizontal as the active header in the top right.
- Demo: [scroll-ruler-nav.html](scroll-ruler-nav.html)
- How: `IntersectionObserver` sets the active section. Labels use `writing-mode: vertical-rl`. The active label is cloned into a fixed top-right slot with a slide-up + fade transition. Ruler ticks are a `repeating-linear-gradient`. Respects `prefers-reduced-motion`. Dark mode follows the system setting, with a Dark/Light toggle top left that remembers the choice.
