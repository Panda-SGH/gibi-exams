---
name: Gibi Exams
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#404751'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#707882'
  outline-variant: '#c0c7d3'
  surface-tint: '#0062a1'
  primary: '#005f9e'
  on-primary: '#ffffff'
  primary-container: '#1278c3'
  on-primary-container: '#fdfcff'
  inverse-primary: '#9dcaff'
  secondary: '#00629d'
  on-secondary: '#ffffff'
  secondary-container: '#67b6ff'
  on-secondary-container: '#004673'
  tertiary: '#894d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ad6200'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#9dcaff'
  on-primary-fixed: '#001d35'
  on-primary-fixed-variant: '#00497b'
  secondary-fixed: '#cfe5ff'
  secondary-fixed-dim: '#99cbff'
  on-secondary-fixed: '#001d34'
  on-secondary-fixed-variant: '#004a78'
  tertiary-fixed: '#ffdcc0'
  tertiary-fixed-dim: '#ffb875'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6b3b00'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 16px
  gutter: 12px
---

## Brand & Style
The design system is centered on high-utility, low-friction interactions tailored for the Ethiopian student demographic. The aesthetic is **Minimalist and Utility-Focused**, prioritizing information density and legibility over decorative elements. 

By leveraging the familiar visual language of the Telegram ecosystem, the interface reduces cognitive load. It avoids "startup" flourishes like heavy gradients or aggressive animations to ensure high performance on low-end Android devices and slow network conditions. The brand evokes a sense of reliability, academic focus, and "native" integration within the Telegram Mini App environment.

## Colors
The palette is rooted in the Telegram Blue (`#2481cc`) to maintain a seamless transition from the chat interface to the app. 

- **Primary:** Used for actionable elements, progress indicators, and primary branding.
- **Background:** A soft grey-blue (`#F0F2F5`) is used for the page body to distinguish it from the white surface cards.
- **Surface:** Pure white is reserved for high-priority content containers (cards, inputs, sheets).
- **Text:** High-contrast dark grey (`#222222`) for readability, with a softer secondary grey for metadata and captions.

## Typography
The design system utilizes **Inter** exclusively to ensure maximum legibility and system-level performance. The type hierarchy is intentionally compact to allow for dense information display (e.g., exam lists, study materials) without feeling cluttered. 

- **Headlines:** Semi-bold to Bold weights, used sparingly to define page sections.
- **Body:** Standardized at 14px for general content and 16px for primary reading tasks to accommodate mobile viewing distances.
- **Labels:** Used for navigation titles, chip text, and table headers, often in a slightly tighter tracking for a professional look.

## Layout & Spacing
The layout follows a **Fluid Grid** model optimized for narrow mobile viewports (320px - 480px). 

- **Container Margins:** A strict 16px horizontal margin is applied to all main content blocks.
- **Stacking:** Elements use a vertical 8px or 12px rhythm to maintain a compact "utility" feel.
- **Bottom Navigation:** The primary navigation is a fixed bottom tab bar (56px height) to ensure easy thumb reach on mobile.
- **Grid:** For dashboard layouts, a 2-column grid with a 12px gutter is used for exam category cards.

## Elevation & Depth
In line with the lightweight philosophy, this design system avoids heavy drop shadows. 

- **Tonal Layers:** Depth is primarily communicated through color. Surface cards (`#FFFFFF`) sit on top of the neutral background (`#F0F2F5`).
- **Low-Contrast Outlines:** All cards and interactive containers use a `1px` solid border (`#E5E7EB`) instead of shadows to define their boundaries.
- **Active State:** When an element is pressed, it receives a subtle background tint (`#F3F4F6`) or a slight scale down (98%) rather than a shadow increase.

## Shapes
The shape language is inspired by `shadcn/ui`, utilizing "Soft" to "Rounded" corners that feel modern yet structured.

- **Cards & Inputs:** 8px (0.5rem) corner radius.
- **Buttons:** 8px (0.5rem) for a standard utility look.
- **Chips/Badges:** 16px (1rem) or fully pill-shaped to differentiate them from actionable buttons.
- **Modals/Sheets:** 12px (0.75rem) top-only radius for bottom-anchored sheets.

## Components
- **Buttons:** Primary buttons use the Telegram Blue background with white text. Secondary buttons use a white background with a 1px grey border. Height is fixed at 44px for optimal touch targets.
- **Cards:** White background, 1px border (`#E5E7EB`), 8px radius. Content inside has 12px internal padding.
- **Input Fields:** 1px border with a 4px horizontal padding. Focus state switches the border to Telegram Blue.
- **Lists:** Clean, edge-to-edge list items with a 1px bottom separator. No icons on the left unless essential for identification.
- **Chips:** Small, low-contrast indicators for "Exam Year" or "Subject" tags, using a light grey background and dark grey text.
- **Bottom Tabs:** Minimalist icons (24px) with 10px labels. Active state is indicated by the primary blue color.
- **Progress Bars:** Thin 4px bars used for showing "Exam Completion" or "Study Progress," utilizing a background of `#E5E7EB` and a fill of primary blue.