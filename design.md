# SsaRanga Website --- UI Color, Typography & Motion Design System

## Purpose

Use this document as visual direction for updating SsaRanga website UI.

Website already has content and structure. Do **not** rewrite or
reorganize core website content.

Primary goal:

-   Update UI color system
-   Update typography
-   Improve visual hierarchy
-   Create calm, premium, modern spa/wellness identity
-   Add subtle, fluid animations
-   Preserve SsaRanga's emotional meaning
-   Keep Young Minds, Women, Elders as three major visual pillars

Reference visual direction: soft cyan + ocean blue interface, rounded
cards, clean typography, subtle gradients, calm motion.

------------------------------------------------------------------------

# 1. Brand Personality

SsaRanga should feel:

-   Calm
-   Warm
-   Welcoming
-   Premium
-   Natural
-   Reflective
-   Human
-   Contemporary
-   Safe
-   Intergenerational

Avoid making website feel:

-   Corporate
-   Clinical
-   Loud
-   Neon
-   Overly feminine
-   Childish
-   Generic meditation app
-   Generic medical website

Core emotional idea:

> Nurture Within • Grow Beyond

Website should visually communicate pause, connection, reflection and
growth.

------------------------------------------------------------------------

# 2. Brand Context From Website Content

SsaRanga is positioned as a space where people can pause, express
themselves, discover strengths and grow.

Three primary audience pillars:

1.  Young Minds
2.  Women --- Rooted & Rising
3.  Elders

These should become three distinct but visually related content groups.

Important brand phrases:

-   Nurture Within • Grow Beyond
-   A space to pause, connect, reflect and grow.
-   A Little Pause Can Change a Lot
-   Growing Strong From Within
-   Rooted & Rising
-   Every Story Matters. Every Experience Has Value.
-   Connect • Explore • Reflect • Express • Grow

Source: SsaRanga website content document.

------------------------------------------------------------------------

# 3. Color Direction

Base visual inspiration:

Soft sky/ocean cyan background + deep ocean blue + bright aquatic blue.

Do not copy reference UI literally.

Adapt its visual language to SsaRanga's warmer, human, nature-oriented
identity.

## Core Palette

### Ocean Mist

`#8DDFEA`

Primary light background.

Use for:

-   Hero backgrounds
-   Large section backgrounds
-   Empty visual space
-   Decorative gradients

### Sea Foam

`#C9F4F6`

Soft supporting color.

Use for:

-   Secondary backgrounds
-   Soft cards
-   Hover states
-   Form fields
-   Decorative shapes

### Ocean Blue

`#008AC7`

Primary interaction color.

Use for:

-   Primary buttons
-   Links
-   Active navigation
-   Important icons
-   Interactive highlights

### Deep Ocean

`#00638F`

Secondary dark blue.

Use for:

-   Dark cards
-   Navigation states
-   CTA areas
-   Footer
-   Strong contrast sections

### Midnight Ocean

`#003B5C`

Deepest brand color.

Use for:

-   Major headings
-   Footer background
-   Premium sections
-   High-contrast text

Avoid using it as dominant page background everywhere.

### White

`#FFFFFF`

Use for:

-   Cards
-   Text on dark backgrounds
-   Clean content sections
-   Buttons with blue backgrounds

### Ocean Gray

`#557C87`

Secondary text.

Use for:

-   Paragraphs
-   Metadata
-   Supporting labels
-   Descriptions

------------------------------------------------------------------------

# 4. Color Usage Ratio

Target visual balance:

-   45--55% very light backgrounds / Ocean Mist family
-   20--30% White
-   10--15% Deep Ocean
-   5--10% Ocean Blue
-   Small amounts of Midnight Ocean for strong contrast

Do not make every section blue.

Create rhythm:

Light → White → Blue → Light → White → Deep Ocean → Light

------------------------------------------------------------------------

# 5. Gradients

## Hero Gradient

``` css
background: linear-gradient(
  135deg,
  #8DDFEA 0%,
  #5ED1E2 45%,
  #008AC7 100%
);
```

Use for hero or major visual sections.

## Soft Background Gradient

``` css
background: linear-gradient(
  180deg,
  #C9F4F6 0%,
  #8DDFEA 100%
);
```

Use for calm transitional sections.

## Deep Ocean Gradient

``` css
background: linear-gradient(
  135deg,
  #008AC7 0%,
  #00638F 55%,
  #003B5C 100%
);
```

Use for:

-   Premium CTA
-   Footer
-   Featured experience
-   Strong visual break

Gradients should feel like water/light, not flashy marketing gradients.

------------------------------------------------------------------------

# 6. Typography

## Primary Typeface

Use:

**Manrope**

Recommended weights:

-   400 Regular
-   500 Medium
-   600 SemiBold
-   700 Bold

Manrope should handle:

-   Navigation
-   Body
-   Buttons
-   Cards
-   Labels
-   Forms
-   Most headings

## Display Typeface

Optional:

**DM Serif Display**

Use sparingly for:

-   Hero statement
-   Emotional section headings
-   Founder quote
-   Large editorial moments

Do not use serif throughout website.

Desired typography feeling:

Modern + calm + slightly editorial + premium.

Avoid:

-   Heavy condensed fonts
-   Futuristic fonts
-   Comic/playful fonts
-   Excessively decorative script fonts

------------------------------------------------------------------------

# 7. Typography Scale

## Hero Heading

64--80px desktop

48--56px tablet

38--44px mobile

Weight: 600

Line-height: 0.98--1.08

Example:

**Nurture Within\
Grow Beyond**

## Section Heading

42--52px desktop

32--40px mobile

Weight: 600

Line-height: 1.1

## Supporting Heading

22--28px

Weight: 500--600

## Body

16--18px

Line-height: 1.6

Weight: 400

## Small Text

12--14px

Weight: 500

## Buttons

14--16px

Weight: 600

Do not make text overly small.

SsaRanga content contains reflective, emotional copy. Give paragraphs
enough line-height and width.

Recommended reading width:

`600–720px`

------------------------------------------------------------------------

# 8. Typography Color Rules

On light backgrounds:

``` text
Heading       #003B5C
Body          #557C87
Accent        #008AC7
```

On dark backgrounds:

``` text
Heading       #FFFFFF
Body          #C9F4F6
Accent        #8DDFEA
```

Avoid pure black `#000000`.

Use Midnight Ocean instead.

------------------------------------------------------------------------

# 9. Logo Treatment

Existing SsaRanga logo contains:

-   Artistic tree/human form
-   Floral/natural elements
-   SsaRanga wordmark
-   Kannada identity
-   Mind Spa positioning

Logo shown in source document should remain recognizable.

Do not recolor logo aggressively.

Preferred placement:

-   Light background version where possible
-   Dark/white variant only if officially available
-   Give logo breathing room
-   Never place logo directly against visually noisy photography

Logo should feel organic while rest of UI remains modern.

------------------------------------------------------------------------

# 10. Layout Language

Use generous whitespace.

Cards:

``` text
border-radius: 20–28px
```

Large feature panels:

``` text
border-radius: 28–36px
```

Pills:

``` text
border-radius: 999px
```

Avoid sharp rectangular cards.

Use:

-   Large rounded image blocks
-   Soft cards
-   Floating content panels
-   Organic decorative shapes
-   Spacious sections

------------------------------------------------------------------------

# 11. Button System

## Primary Button

``` text
Background: #008AC7
Text: #FFFFFF
Radius: 999px
```

Examples from content:

-   Explore SsaRanga
-   Connect With Us
-   Begin Your SsaRanga Journey
-   Explore Young Minds Programs
-   Explore Women's Programs
-   Explore Elders Programs
-   View Upcoming Workshops
-   Send Enquiry

## Primary Hover

``` text
Background: #00638F
Transform: translateY(-2px)
Transition: 250–300ms
```

Add soft shadow.

## Secondary Button

``` text
Background: transparent
Border: 1px solid rgba(0,59,92,0.25)
Text: #003B5C
Radius: 999px
```

Hover:

``` text
Background: #C9F4F6
Border: #008AC7
```

------------------------------------------------------------------------

# 12. Card System

Cards should feel like soft floating objects.

## Light Card

``` css
background: rgba(255,255,255,0.72);
border: 1px solid rgba(255,255,255,0.60);
```

Optional:

``` css
backdrop-filter: blur(14px);
```

## Dark Card

``` css
background: linear-gradient(
  145deg,
  #008AC7,
  #003B5C
);
```

Use white typography.

Do not turn every component into glassmorphism.

Glass effect should be limited to:

-   Floating navigation
-   Featured cards
-   Booking/enquiry widgets
-   Special callouts

------------------------------------------------------------------------

# 13. Three Pillars --- Important

Young Minds, Women and Elders are core visual pillars.

Keep same design system but give each pillar subtle identity.

## Young Minds

Visual accent:

`#8DDFEA`

Mood:

-   Fresh
-   Curious
-   Energetic
-   Growing

Possible imagery:

-   Natural light
-   Movement
-   Creativity
-   Learning
-   Play

## Women --- Rooted & Rising

Visual accent:

`#C9F4F6`

Mood:

-   Grounded
-   Reflective
-   Warm
-   Confident
-   Rising

Use elegant photography and softer compositions.

Do not make section overly pink.

## Elders

Visual accent:

`#D8F1E8`

Secondary natural accent can be introduced carefully.

Mood:

-   Wisdom
-   Warmth
-   Stories
-   Connection
-   Celebration

Keep same oceanic base system so website still feels like one brand.

------------------------------------------------------------------------

# 14. Section Visual Rhythm

Recommended visual sequence:

``` text
HERO
Ocean Mist / Ocean Gradient

        ↓

A LITTLE PAUSE
White / soft background

        ↓

WHAT WE BELIEVE
Sea Foam

        ↓

THREE SPACES
Three rounded cards

        ↓

ABOUT / PHILOSOPHY
White

        ↓

FOUNDER
Soft Ocean Mist

        ↓

PROGRAMS
White + blue cards

        ↓

SSARANGA EXPERIENCE
Light background + 5-step journey

        ↓

ACTIVITIES
Soft cards

        ↓

SSARANGA MOMENTS
Image-led gallery

        ↓

TESTIMONIALS
Sea Foam / White

        ↓

EVENTS
Light background

        ↓

CONTACT
Deep Ocean gradient

        ↓

FOOTER
Midnight Ocean
```

This is visual guidance, not mandatory page restructuring.

------------------------------------------------------------------------

# 15. Hero Direction

Hero should immediately communicate:

**SsaRanga**

**Nurture Within • Grow Beyond**

**A space to pause, connect, reflect and grow.**

Use:

-   Large typography
-   Ocean Mist gradient
-   Soft natural image or abstract organic visual
-   Rounded image/card
-   Minimal decorative waves
-   Two CTAs

Primary CTA:

**Explore SsaRanga**

Secondary CTA:

**Connect With Us**

Hero should feel spacious.

Do not fill hero with excessive text.

------------------------------------------------------------------------

# 16. "A Little Pause Can Change a Lot"

This section should visually slow down.

Use:

-   White background
-   Large heading
-   Narrow text column
-   Soft floating organic shape
-   Slow fade-in

Possible visual:

A circular translucent Ocean Mist shape behind text.

This section should create contrast after energetic hero.

------------------------------------------------------------------------

# 17. "What We Believe"

Use three large statements:

**Every mind has potential.**

**Every story has value.**

**Every stage of life deserves space.**

Display as separate visual blocks or staggered typography.

Do not make these look like ordinary bullet points.

------------------------------------------------------------------------

# 18. Programs UI

Program cards should use rounded containers.

Each card:

``` text
Category
Large title
Short description
Format
CTA
```

Example:

``` text
YOUNG MINDS

Discover • Express • Grow

Interactive experiences that nurture
confidence, emotional awareness,
communication and life skills.

Workshops | Activity Sessions | Group Programs

Explore Young Minds Programs
```

Keep card text concise visually while preserving source content.

------------------------------------------------------------------------

# 19. Five-Step Experience Animation

The SsaRanga Experience has five stages:

``` text
1. Connect
2. Explore
3. Reflect
4. Express
5. Grow
```

Visualize as:

``` text
Connect
   ↓
Explore
   ↓
Reflect
   ↓
Express
   ↓
Grow
```

Or as horizontal journey on desktop.

Each stage can appear sequentially as user scrolls.

Animation:

-   Circle/icon fades in
-   Number appears
-   Connector line grows
-   Text slides upward slightly

Do not use aggressive timeline animation.

------------------------------------------------------------------------

# 20. Activity Cards

Activities from source content:

-   Storytelling
-   Creative Expression
-   Conversations
-   Interactive Activities
-   Reflection
-   Connection

Use simple line icons.

Each card can have:

-   Small icon
-   Title
-   One-sentence description
-   Soft hover elevation

Icons should use rounded strokes.

------------------------------------------------------------------------

# 21. Image Direction

Photography should feel:

-   Natural
-   Warm
-   Human
-   Authentic
-   Softly lit
-   Calm

Good subjects:

-   Conversations
-   Hands
-   Storytelling
-   Nature
-   Creative activities
-   Intergenerational interaction
-   Women in reflective environments
-   Children learning through activities
-   Elders sharing stories

Avoid overly staged corporate stock photography.

Avoid excessive blue filters over photographs.

Use subtle color grading instead.

------------------------------------------------------------------------

# 22. Image Treatment

Rounded image containers:

``` text
24–32px radius
```

Hover:

``` text
image scale: 1.03–1.04
duration: 700ms
```

Overlay:

``` css
background: linear-gradient(
  180deg,
  transparent 30%,
  rgba(0,59,92,0.72) 100%
);
```

Use overlay only where text is placed over image.

------------------------------------------------------------------------

# 23. Motion Design Language

Animation metaphor:

**Water + breathing + growth**

Movement should be:

-   Slow
-   Organic
-   Fluid
-   Predictable
-   Subtle

Never make page feel like gaming UI.

------------------------------------------------------------------------

# 24. Page Entrance

Recommended:

``` text
opacity: 0 → 1
translateY: 20px → 0
```

Duration:

`600–900ms`

Stagger:

``` text
Heading       0ms
Paragraph     120ms
CTA           240ms
Image         350ms
```

------------------------------------------------------------------------

# 25. Scroll Reveal

Use Intersection Observer / equivalent scroll-triggered animation.

``` text
opacity: 0 → 1
translateY: 30px → 0
```

Duration:

`700ms`

Card stagger:

``` text
Card 1    0ms
Card 2    100ms
Card 3    200ms
```

Maximum stagger should remain short.

------------------------------------------------------------------------

# 26. Floating Decorative Elements

Use translucent:

-   Circles
-   Organic blobs
-   Leaves
-   Soft wave shapes
-   Light gradients

Motion:

``` text
X: -15px → +15px
Y: -10px → +10px
Rotation: -2deg → +2deg
Duration: 6–10 seconds
```

Use `ease-in-out`.

Movement should barely register consciously.

------------------------------------------------------------------------

# 27. Button Animation

On hover:

-   Slight upward movement
-   Slight shadow increase
-   Arrow shifts right

Example:

``` text
Button:
translateY(-2px)

Arrow:
translateX(4px)
```

Duration:

`250–300ms`

No bounce.

------------------------------------------------------------------------

# 28. Image Animation

On hover:

``` text
scale(1.04)
```

Duration:

`700ms`

Use overflow hidden on image wrapper.

Result should feel like image is gently breathing.

------------------------------------------------------------------------

# 29. Navigation Animation

Initial:

``` text
background: transparent
```

After scroll:

``` text
background: rgba(255,255,255,0.80)
backdrop-filter: blur(16px)
```

Transition:

`300–400ms`

Navigation should remain minimal.

Suggested:

``` text
SsaRanga

Home
About
Young Minds
Women
Elders
Programs
Moments
Events
Contact

Connect
```

If existing navigation differs, preserve current information
architecture unless UI creator has explicit reason to change it.

------------------------------------------------------------------------

# 30. Premium Dark Section

Use deep ocean section:

``` text
#003B5C
```

Possible content:

**Your journey deserves a space.**

**Maybe that space begins with a conversation.**

**Maybe with a story.**

**Maybe with a pause.**

**Maybe it begins at SsaRanga.**

CTA:

**Begin Your SsaRanga Journey**

Use white text + Ocean Mist accent.

This section should feel emotionally strong.

------------------------------------------------------------------------

# 31. Contact / Enquiry UI

Contact section should feel approachable, not corporate.

Source fields:

-   Name
-   Age Group
-   Phone Number
-   Email
-   Interested In
-   Message

Interested In options:

-   Young Minds
-   Women
-   Elders
-   Workshop
-   One-to-One Session
-   Community Program

Use:

-   White / translucent form cards
-   Large rounded inputs
-   Clear labels
-   Generous spacing
-   Ocean Blue focus state

Focus state:

``` text
border: #008AC7
box-shadow: 0 0 0 3px rgba(0,138,199,0.12)
```

------------------------------------------------------------------------

# 32. Testimonials

Testimonials should remain visually simple.

Use:

-   Large quotation
-   Small attribution
-   Soft card
-   Plenty of whitespace

Do not fabricate testimonials.

Only publish genuine feedback with permission.

------------------------------------------------------------------------

# 33. Events

Event cards:

``` text
Event Name

Date
Time
Venue

Register Now
```

Use Ocean Blue CTA.

Keep event cards visually light.

------------------------------------------------------------------------

# 34. Footer

Footer:

``` text
SsaRanga

Nurture Within. Grow Beyond.

Young Minds
Women
Elders
Workshops

Instagram
WhatsApp
Email

© 2026 SsaRanga. All Rights Reserved.
```

Background:

`#003B5C`

Text:

`#FFFFFF`

Secondary text:

`#C9F4F6`

Accent:

`#8DDFEA`

------------------------------------------------------------------------

# 35. Spacing System

Use consistent spacing.

``` text
8px
12px
16px
24px
32px
48px
64px
80px
96px
120px
```

Major sections:

`96–140px` vertical padding desktop.

Mobile:

`64–88px`

Do not compress content excessively.

SsaRanga's message needs breathing room.

------------------------------------------------------------------------

# 36. Responsive Behavior

Desktop:

-   Wide hero
-   Large typography
-   3-column pillar cards
-   Horizontal experience journey
-   Large imagery

Tablet:

-   2-column layouts where appropriate
-   Reduced heading sizes
-   Maintain generous spacing

Mobile:

-   Single-column layout
-   Hero heading 38--44px
-   Full-width CTA where useful
-   Cards stacked
-   Experience timeline becomes vertical
-   Navigation becomes simple mobile menu
-   Reduce decorative motion

Do not simply shrink desktop UI.

Recompose layouts for mobile.

------------------------------------------------------------------------

# 37. Accessibility

Maintain readable contrast.

Do not use color as only state indicator.

For interactive states use:

-   Color
-   Text
-   Border
-   Icon
-   Position

Support reduced motion:

``` css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
    scroll-behavior: auto;
  }
}
```

------------------------------------------------------------------------

# 38. Avoid

Do not use:

-   Pure black
-   Neon cyan
-   Excessive purple
-   Excessive pink
-   Excessive gradients
-   Excessive glassmorphism
-   Sharp corners
-   Heavy shadows
-   Bouncy animations
-   Rapid parallax
-   Excessive floating particles
-   Huge text blocks
-   Tiny body text
-   Generic corporate blue
-   Generic medical imagery

Do not make Young Minds look childish.

Do not make Women section stereotypically pink.

Do not make Elders section visually old-fashioned.

All three should feel modern, dignified and connected.

------------------------------------------------------------------------

# 39. Design Tokens

``` css
:root {
  --color-ocean-mist: #8DDFEA;
  --color-sea-foam: #C9F4F6;

  --color-primary: #008AC7;
  --color-deep-ocean: #00638F;
  --color-midnight-ocean: #003B5C;

  --color-white: #FFFFFF;
  --color-text-secondary: #557C87;

  --radius-sm: 10px;
  --radius-md: 20px;
  --radius-lg: 28px;
  --radius-xl: 36px;
  --radius-pill: 999px;

  --shadow-soft:
    0 15px 40px rgba(0, 59, 92, 0.12);

  --transition-fast: 200ms ease;
  --transition-normal: 350ms ease;
  --transition-slow: 700ms ease;
}
```

------------------------------------------------------------------------

# 40. Final UI Creator Instruction

Update existing SsaRanga website UI using this design system.

Do not turn website into a generic blue spa website.

Use reference visual language:

**soft cyan environment + deep ocean blue + rounded UI + clean
typography + subtle gradients + fluid motion**

But adapt it to SsaRanga's identity:

**nature + human connection + reflection + growth + intergenerational
warmth**

Core visual formula:

``` text
SOFT OCEAN BACKGROUNDS
        +
DEEP BLUE CONTRAST
        +
CLEAN MANROPE TYPOGRAPHY
        +
OPTIONAL EDITORIAL SERIF
        +
ROUNDED ORGANIC CARDS
        +
NATURAL PHOTOGRAPHY
        +
SLOW FLUID ANIMATION
        =
SSARANGA
```

Most important rule:

> Website should feel like a calm place to enter, pause and breathe ---
> not like a dashboard, medical portal or typical corporate website.
