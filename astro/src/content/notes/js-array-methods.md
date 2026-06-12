---
title: JavaScript Array Methods Worth Memorising
description: A quick-reference for the array methods you'll reach for constantly—map, filter, reduce, find, and a few underused ones.
date: 2026-04-22
tags: [javascript, fundamentals, reference]
noteType: reference
---

These are the methods that come up in real work. Terse by design — this is a reference, not a tutorial.

```js
const nums = [1, 2, 3, 4, 5];

// Transform every element — returns a new array
nums.map(n => n * 2);                     // [2, 4, 6, 8, 10]

// Keep elements matching a predicate
nums.filter(n => n % 2 === 0);            // [2, 4]

// Accumulate to a single value
nums.reduce((acc, n) => acc + n, 0);      // 15

// First match — returns the element or undefined
nums.find(n => n > 3);                    // 4

// Does every / any element satisfy the predicate?
nums.every(n => n > 0);                   // true
nums.some(n => n > 4);                    // true

// Flatten one level deep — useful after a map that returns arrays
[[1, 2], [3, 4]].flat();                  // [1, 2, 3, 4]
nums.flatMap(n => [n, n * 2]);            // [1,2, 2,4, 3,6, 4,8, 5,10]
```

None of these mutate the original array. `reduce` is the most general-purpose — `map` and `filter` are both expressible as reduces, but prefer the specific methods when the intent is clear.
