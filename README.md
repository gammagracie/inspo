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
- Oct 12, 2026: Ocean variant added, see 2b.

## 2b. Look-close ocean (photo variant with rounded text callouts)

- Source: https://www.nytimes.com/interactive/2026/10/08/technology/ai-generated-image-look-close.html
- What: Same scroll and zoom as 2, on an underwater photo. No side cards. Scroll steps are invisible, and each step opens a rounded callout with placeholder text next to its box. The last step shows all five boxes with number tags.
- Demo: https://gammagracie.github.io/inspo/look-close-ocean.html ([source](look-close-ocean.html), photo in [images/](images/look-close-ocean.jpg))
- How: Photo and boxes sit in one pinned frame sized to 88% of screen height. Empty full-screen steps overlap the pin and drive an `IntersectionObserver`. Callouts live inside each box and are scaled by `1 / zoom` so text stays the same size. They fade and slide in after the zoom lands.

## 3. Studio home spin (3D card over a giant wordmark)

- Source: https://www.glekel.com/
- What: Giant wordmark with a card spinning on its Y axis in front of it. Each time the card is edge-on it swaps to the next project and the page color changes to match. About and services sit on the same live color, then a recent works grid, a scrolling marquee and the footer.
- Demo: https://gammagracie.github.io/inspo/studio-home-spin.html ([source](studio-home-spin.html))
- How: Two Web Animations per step, rotateY 0 to 90 then -90 to 0, with the art and a `--live` color variable swapped in between. Card art is generated from shapes and color, no images.
- Oct 12, 2026: Sizes matched to glekel.com screenshots. All type, spacing, wordmark (64vw), card (46.5vw, 4:3) and grid use `vw` units so proportions hold at any width.

## 4. Studio projects hover (color-changing list with cursor card)

- Source: https://www.glekel.com/projects
- What: Category filter tabs over a big list of project names with category and year on the right. Hovering a name turns the whole page that project's color, turns the name white and shows a tilted card that follows the cursor. Filtering re-renders the list with a stagger and shows year only.
- Demo: https://gammagracie.github.io/inspo/studio-projects-hover.html ([source](studio-projects-hover.html))
- How: One fixed card moved every frame with a lerp toward the pointer. Its tilt follows its height on screen, about -7 degrees near the top to +19 near the bottom, so it rotates progressively as it glides down the list. Body background transitions to the project color on hover. Touch screens skip the card.
- Oct 12, 2026: Sizes matched to glekel.com screenshots. Names 4.2vw, filters 1.3vw, square cursor card 35.5vw, header and footer shared with the home build. All in `vw` units.
- Oct 12, 2026: Progressive hover rotation matched to a screen recording of the original. Tilt = (card height on screen − 50%) × 50 degrees, eased with the card's movement.
