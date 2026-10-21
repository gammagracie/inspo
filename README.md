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

## 5. Ten quiet serifs (type specimen with live tester)

- Source: https://shambhaviojha.medium.com/10-beautiful-serifs-on-google-fonts-you-probably-havent-seen-before-97a56efa0000
- What: Specimen cards for Viaoda Libre, Alice, Averia Serif Libre, Caudex, Domine, Gilda Display, Kavoon, Literata, Prata and Solway. Each card shows the name, a big Ag, the alphabet, a sample line, a paragraph, available weights and a Google Fonts link. A sticky tester bar changes the sample text, size and italic for every card at once.
- Demo: https://gammagracie.github.io/inspo/serif-specimens.html ([source](serif-specimens.html))
- How: One Google Fonts request loads all ten families. Cards are built from a small data array. The tester writes into each sample line and sets a `--size` variable. Dark mode follows the system setting, with a toggle.

## 6. Ten quiet serifs cards (article layout variant)

- Source: https://shambhaviojha.medium.com/10-beautiful-serifs-on-google-fonts-you-probably-havent-seen-before-97a56efa0000
- What: Same ten fonts laid out like the article. Black background, three staggered columns of colored cards. Each card is set in its own font with the name and style count on top, a description, and the style list on the right in each weight.
- Demo: https://gammagracie.github.io/inspo/serif-cards.html ([source](serif-cards.html))
- Note: Descriptions for Prata, Literata, Viaoda Libre, Solway and Alice were cut off or missing in the reference screenshot, so they were written for this demo. Those cards are marked with a dot.

## 7. Gallery window site (bevel borders, colored nav row)

- Source: https://deitch.com/
- What: Homepage plus three inner pages. Every page is one grey-bevel window over a grey desk, with a row of six colored section buttons and a cookie bar pinned below. Home is a scrolling ticker of current shows over a moving background. Exhibitions is a three-column card grid under a colored breadcrumb bar (also serves New York, Special Projects and Archive with their own color). Artists is the same grid with names. About is a text column beside a pinned captioned photo.
- Demo: https://gammagracie.github.io/inspo/deitch/ ([source](deitch/))
- How: The bevel is a 26px gradient tile used as `border-image` 8 round, so every edge reads as a tube. Grid cells draw only their right and bottom borders, and the grid is 4px wider than the window so the last edge hides. Type is in `rem` with the root size stepping from 40% to 62.5% by width, like the original. Nav icons animate on hover and on the current section. Artwork, names and copy are generated placeholders, not the gallery's.

## References

Screen recordings and screenshots of the original pages live in [references/](references/README.md).
