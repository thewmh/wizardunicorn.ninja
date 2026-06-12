---
title: Design Systems Workshop Takeaways
description: Notes from a workshop on design systems at scale—on token decisions, adoption friction, and the tension between flexibility and constraint.
date: 2026-03-15
tags: [design-systems, workshop, process]
noteType: workshop
---

Attended a half-day workshop on design systems at scale, facilitated by a team from a large product org that had rebuilt their system twice. These are the things I actually took away — not their slides.

**Start with decisions, not components.** The instinct is to build buttons and modals early. The real work is deciding what your token vocabulary is before any of that. Teams that skip this end up with a component library and a token system that don't speak the same language.

**Adoption friction is a social problem, not a technical one.** The workshop kept coming back to this. A perfectly designed component that no one uses is a failure. The systems that took hold were the ones where a design systems team sat with a product team and used the system to ship something together, early.

**Constraint is a feature.** There's a recurring temptation to make every value configurable. But flexibility at the token level is what creates the sprawl you built the system to prevent. The most durable systems had strong opinions about what could vary and what couldn't.

A few rough notes I scribbled at the end: token naming conventions matter more than token values, semantic aliases outlive primitive names, and "just use the design system" is not a viable adoption strategy.
