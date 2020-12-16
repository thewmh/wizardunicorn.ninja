---
title: "JavaScript: The Recent Parts"
description: These are notes from the 'JavaScript':' The Recent Parts' course on Frontend Masters.
permalink: /frontend-masters/javascript-recent-parts

layout: default
---

## Introduction

### JavaScript New Feature Process

JavaScript fatigue? The language changes so fast it seems like every few months, theres some new blog post about some new feature. How can I possibly keep up?! Don't be afraid of the changes! It is important to remember that from 1999 to 2009 there were essentially no changes made to JavaScript. There was a period of stagnation in various areas of the web, which actually brought about new browsers. But in 2009, unity was found amongst the authors of the JavaScript spec, at which point the landscape had changed dramatically. ES5 signaled that everyone was going to get back on track and work together. But then... 2010, 2011, 2012, 2013... Nothing about JavaScript changed. Until ES6 / ES2015. 6 more years passed before any update was made to JavaScript.

And when ES6 did land, there were over 300 new features which definitely led to some blowback within the [JavaScript] community. This brought about the question of, 'how can we not stagnate and also not just show up with a massive load of changes to dump on the community?'. So it was decided that the best thing for the JavaScript language was to move forward little by little. Now, on an annual basis, updates are pushed to the language. This decision is reflected in the updated naming of the releases; ES2016, ES2017, ES2018, ES2019...

There are four stages to releasing a new feature in JavaScript. Stage 4 means that it is done, finished, and shipped. Now, in the current state of JavaScript releases and workflow, there are annual updates to the language.  Some are small, others are large, but overall, the updates are more manageable for the end users. Nonetheless, the fatigue felt amongst the community is understandable, but the annual updates to the language are necessary or else the language will get surpassed by something else.

### Declarative JavaScript

There are some important narratives happening with the evolution of JavaScript, the most important (in the instructors opinion) of those being a more declarative language. Declarative as in, declarative vs. imperative. Declarative meaning we declare the outcome, the what, and we allow the abstractions of the language to handle the how, so that the reader is more focused on the what, the outcome, and even more importantly, the why. This makes code able to communicate better. Generally speaking, more declarative code communicates better.

An example would be using the `spread operator` over `.apply` or `.slice`. The outcome is the same, but you can do it in a much cleaner and more communicative way. You'll see throughout this course that some examples are imperative or declarative, but the overarching theme will be that the updates coming to the language are being implemented in such a way that it is as clear, concise, and communicable a way as possible.

### Browser Support & Transpilers

Browser support should not be overlooked. There are still developers today who are not using things that landed, in JavaScript, in 2009! The reason being that they may have to support a legacy browser which does not support modern syntax, so they 'take comfort' in not *having* to learn the new things. But you can learn the things! Transpilers to the rescue! Babel is probably the most known transpiler which allows you to write [JavaScript] in the most current syntax, which Babel can then compile to a syntax that is supported by older browsers.

There will likely always be a gap between what you need to support and what are the most current features of the language. It is important to stay on top of the most current features! You don't have to learn and master every new feature the day it comes out, but you should be aware of them and keep your 'finger' on the 'pulse' of the language. Yes, the transpilers can be intimidating, but they are what help us to stay on top of the language updates. Don't allow the intimidation to keep you from learning about all the things. Welcome the transpiling overlords and write the new things!

### Course Overview

We are not going to cover the 300+ updates that came out of ES6, but we will look a subset of features from:

* ES6 / ES2015
* ES2016
* ES2017
* ES2018
* ES2019

Your beloved instructor believes that the things contained within this workshop are the things that you should focus on first. And those features are:

* Template Strings
* String padding / trimming
* Destructuring - by far the most complex and lengthy portion of this workshop, but totally worth it
* Array find() / includes()
* Array flat() / flatMap()
* Iterators, Generators
* RegExp Improvements
* async .. await
* async* .. yield await

The last three items in this course point to the maturation of the language in respect to asynchronous programming, which is a big thing that has been quite far behind in JavaScript for quite a long time. We'll find some exercises along the way to play with these features to develop a deeper understanding of them. This workshop will not make you an expert on any of these features, it will be up to you to go back to your codebase and try to implement these features in your code! 

## Strings

### Template Strings

### Tagged Templates

### Applying Tagged Templates

### Tagged Template Exercise

### Tagged Template Solution

### Padding & Trimming

## Array Destructuring

### Destructuring

### Refactoring Code Using Destructuring

### Spread Operator & Declaring Destructured Arrays

### Declaration & Assignment

### Comma Separation

### Parameter Arrays

### Nested Array Destructuring

## Object Destructuring

### Object Destructuring

### Object Assignment Destructuring

### Object Default Assignment

### Nested Object Destructuring

### Default Assignment Q & A

### Parameter Objects

### Nested Object & Array Destructuring

## Further Destructuring

### Named Arguments

### Destructuring & Restructuring

### Destructuring Exercise

### Destructuring Solution

## Array Methods

### find, findIndex, & includes

### flat & flatMap

## Iterators & Generators

### Iterators

### Declarative Iterators

### Data Structure without Iterators

### Generators

### Iterator & Generator Exercise

### Iterator & Generator Solution

## Regular Expressions

### Look Ahead & Behind

### Named Capture Groups

### dotall Mode

### Regex Exercise

### Regex Solution

## Async Await

### Async Functions

### Async Await Exercise

### Async Await Solution

### Async Iteration

### Async Function Problems

### Async Generators with yield

### Async Generators Iteration

## Wrap-Up

### Wrap-Up