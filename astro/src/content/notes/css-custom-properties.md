---
title: CSS Custom Properties
description: A concise reference for declaring, using, and scoping CSS custom properties—including theming patterns and fallback values.
date: 2026-05-10
tags: [css, design-systems, reference]
noteType: reference
---

CSS custom properties (a.k.a. CSS variables) are declared with a `--` prefix and scoped to the element they're declared on. Declaring them on `:root` makes them globally available.

## Declaring variables

```css
:root {
  --color-primary: #6d28d9;
  --color-surface: #ffffff;
  --space-4: 1rem;
  --space-8: 2rem;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

## Using variables and fallback values

Reference a custom property with `var()`. The second argument is an optional fallback — useful for component-level defaults when a token may not be defined.

```css
.button {
  background-color: var(--color-primary);
  padding: var(--space-2, 0.5rem) var(--space-4, 1rem);
  font-family: var(--font-body, sans-serif);
}
```

## Theming pattern

Override tokens on a scoped selector for theme switching without class-level cascade complexity:

```css
[data-theme='dark'] {
  --color-primary: #a78bfa;
  --color-surface: #1e1e2e;
}
```

Custom properties are inherited — child elements automatically pick up overrides from any ancestor, which makes this pattern both clean and predictable.
