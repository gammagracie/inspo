# INSPO

Functionality and styling to reuse.

## 1. Scroll ruler nav (vertical labels that flip to a header)

- Source: https://getartcraft.com/apps
- What: Right edge has a ruler with tick marks and vertical (rotated) section labels. When a section scrolls into view, its label animates up and turns horizontal as the active header in the top right.
- Demo: [scroll-ruler-nav.html](scroll-ruler-nav.html)
- How: `IntersectionObserver` sets the active section. Labels use `writing-mode: vertical-rl`. The active label is cloned into a fixed top-right slot with a slide-up + fade transition. Ruler ticks are a `repeating-linear-gradient`. Respects `prefers-reduced-motion`. Dark mode follows the system setting, with a Dark/Light toggle top left that remembers the choice.

## 2. Look-close overlay boxes (scroll and tap to zoom into image details)

- Source: https://www.nytimes.com/interactive/2026/10/08/technology/ai-generated-image-look-close.html
- What: Image stays pinned while caption cards scroll past. Each card outlines one detail with a box, dims the rest, and zooms the image into it. Tapping any box jumps to its card. The last card shows all boxes at once.
- Demo: [look-close-overlay.html](look-close-overlay.html)
- How: `IntersectionObserver` picks the active card. Boxes are buttons positioned in percentages over the image, so they scale with it. Zoom is one `translate() scale()` on a wrapper holding both the image and boxes, clamped so no empty edges show. Box borders divide by the scale so they stay the same thickness. The dimming is a large `box-shadow` on the active box. Dark mode and toggle match demo 1.
