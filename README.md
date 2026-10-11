# INSPO

Functionality and styling to reuse.

## 1. Scroll ruler nav (vertical labels that flip to a header)

- Source: https://getartcraft.com/apps
- What: Right edge is a numbered ruler that scrolls with the page, with a blue marker showing scroll progress. Each upcoming section's name rides up beside the ruler as vertical text. When the section is reached, its letters swing one by one along an arc into a horizontal header in the top right. Past headers shrink into a small stack above it. Upcoming sections are listed small in the bottom right.
- Demo: https://gammagracie.github.io/inspo/scroll-ruler-nav.html ([source](scroll-ruler-nav.html))
- How: Scroll handler (rAF throttled) picks the active section and places vertical labels at their section's top edge. The fly-in measures each letter's rect in the vertical label and in the header, then animates a floating copy of each letter with the Web Animations API, from rotate(-90deg) and small scale through a mid-arc keyframe to its final spot, staggered from the last letter. Ruler scale is a page-height strip translated by scrollY. Dark mode follows the system setting, with a Dark/Light toggle. Respects `prefers-reduced-motion`.

## 2. Look-close overlay boxes (scroll and tap to zoom into image details)

- Source: https://www.nytimes.com/interactive/2026/10/08/technology/ai-generated-image-look-close.html
- What: Image stays pinned while caption cards scroll past. Each card outlines one detail with a box, dims the rest, and zooms the image into it. Tapping any box jumps to its card. The last card shows all boxes at once.
- Demo: https://gammagracie.github.io/inspo/look-close-overlay.html ([source](look-close-overlay.html))
- How: `IntersectionObserver` picks the active card. Boxes are buttons positioned in percentages over the image, so they scale with it. Zoom is one `translate() scale()` on a wrapper holding both the image and boxes, clamped so no empty edges show. Box borders divide by the scale so they stay the same thickness. The dimming is a large `box-shadow` on the active box. Dark mode and toggle match demo 1.
