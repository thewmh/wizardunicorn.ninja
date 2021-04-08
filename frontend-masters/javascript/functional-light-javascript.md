---
title: "Functional Light JavaScript, v3"
description: These are notes from the 'Functional Light JavaScript, v3' course on Frontend Masters.
permalink: /frontend-masters/functional-light-javascript

layout: default
pagenav:
  - name: Introduction
    href: introduction
  - name: Function Purity
    href: function-purity
  - name: Argument Adapters
    href: argument-adapters
  - name: Point Free
    href: point-free
  - name: Closure
    href: closure
  - name: Composition
    href: composition
  - name: Immutability
    href: immutability
  - name: Recursion
    href: recursion
  - name: List Operations
    href: list-operations
  - name: Transduction
    href: transduction
  - name: Data Structure Operations
    href: data-structure-operations
  - name: Async
    href: async
  - name: Functional JS Utils
    href: functional-js-utils
  - name: Wrapping Up
    href: wrapping-up
---

[Link to the course document](http://static.frontendmasters.com/resources/2019-05-06-functional-light-v3/functional-light-v3.pdf)

## Introduction

### Introduction

This workshop will cover a 'style' of functional programming that the instructor, Kyle Simpson, has developed; Functional-Light JS. You can also read Kyle's book of the same name [here](https://github.com/getify/Functional-Light-JS). 'Light' is not intended to allude to the depth or level of difficulty of this workshop, rather 'Light' refers to the workshops' intention to not weigh you down with terminology or mathematic notation. This workshop will take a 'bottom-up' approach to Functional Programming in JavaScript, an approach that does not make the assumption that you have a background in mathematics or knowledge of specific terminology.

### Why Functional Programming

One of the biggest reasons to learn functional programming is because it is, in Kyle's opinion, impossible to write functional programming in isolation. Meaning that if you bring these concepts back to work and write some code in a functional programming style, submit a pull request, that it is then somehow magically going to now be the way that your team writes code. Nope... It is important to learn functional programming so that you can convince others of its importance. 

Functional programming is not imperative, it is declarative. An imperative approach is one that is primarily focused on how to do something; i.e. add a bunch of numbers from an array and return the result, would probably lead you to having an accumulator variable and a for loop to loop over the array and add each number in the array to the accumulator variable. But this is an imperative approach because a future reader of your code would have to read all of your code to understand what is happening. This is *fine*. but the being that benefits most from imperative code is the computer, not the human. A declarative approach focuses on the what, the outcome; which should, by its very nature, make your code inherently more obvious as to what its purpose is and what it does. Functional programming != declarative, but it is **more** declarative than it is imperative.

### Functional Programming Journey

The instructor, and maybe you or myself?, admits to starting off with somewhat readable but imperative (non-functional) code which evolved to less readable but closer to declarative code, finally ending up at highly readable and functional code. He points out that in the middle of that journey is where most people 'drop-off' from continuing to pursue functional programming. The 'pit of despair' is that point when most people 'drop-off' from continuing to pursue functional programming and the instructor admits he hit this point, but stresses the importance of continuing on, of continuing to pursue ones understanding of functional programming. Small wins will turn into bigger wins will turn into something that is greater than no understanding whatsoever of functional programming. The important thing is to keep at it!

No one can remove the fact that functional programming is difficult, but an aim of this course is to make it approachable and more manageable. It will be important for you to find comfort in the unfamiliar and keep the faith when your code becomes less readable on your functional programming journey, when you learn a new concept or approach this is how it will be at first, but it is important to trust the process of learning and know that at some point you will understand what you are doing and your code will become more readable.

### Code is Provable

Functional programming is based on mathematical principles. It is likely that we've all written code that did not pass a test and then we fumble through trying to figure out how to get whatever we're working on to pass the test. But what would it be like if when you wrote some code that you were then going to test that you were 100% certain of the outcome? Would that fact make you a more effective programmer? Would you have more confidence? Would you drop your sense of being an imposter?! The set of techniques associated with functional programming are not just a nicely designed API, they *are* about using mathematical principles, in a mathematically sound way, that just so happens to look like programming and happens to let us solve programming problems. An overarching goal [of functional programming] is to reduce the cognitive overhead, to rely on mathematical principles, to produce code that requires less reading; code that is easier to understand, which frees us up to focus on the important pieces with far less guesswork. 

### Course Overview

* Functions - because... in functional programming it is important to understand what a function is **and** what a function is *is* probably not what you think it is.
* Closure - you do not understand the entirety of functional programming if you do not understand closure. We will understand it.
* Composition - the way that data flows and is mapped through applications.
* Immutability - how we manage the changes to values and state over time. Management of state change is one of the fundamentals of almost all programming.
* Recursion - an incredibly useful too, especially in functional programming.
* Lists / Data Structures - map, filter, reduce... this is what everybody calls functional programming, but with the other sections, these functions are only part of functional programming, not the entirety of what it is.
* Async - the act of applying functional principles over time... aka asynchronous functional programming.
* FP Libraries - a look at some of the libraries available in the wild to use in projects that will help you get the most out of functional programming.

## Function Purity

### Functions vs Procedures

### Function Naming Semantics

### Side Effects

### Pure Functions & Constants

### Reducing Surface Area

### Same Input, Same Output

### Level of Confidence

### Extracting Impurity

### Containing Impurity

### Impurity Exercise: Wrappers & Adapters

### Impurity Solution: Wrappers

### Impurity Solution: Adapters

## Argument Adapters

### Function Arguments

### Arguments Shape Adapters

### Flip & Reverse Adapter

### Spread Adapter

## Point Free

### Equational Reasoning

### Point Free Refactor

### Point Free Exercise

### Point Free Solution

### Advanced Point Free

## Closure

### Closure

### Closure Exercise

### Closure Solution

### Lazy vs Eager Execution

### Memoization

### Referential Transparency

### Generalized to Specialized

### Partial Application & Currying

### Partial Application & Currying Comparison

### Changing Function Shape with Curry

## Composition

### Composition Illustration

### Declarative Data Flow

### Piping vs Composition

### Piping & Composition Exercise

### Piping & Composition Solution

### Associativity

### Composition with Currying

## Immutability

### Immutability

### Rethinking const Immutability

### Value Immutability

### Object.freeze

### Don't Mutate, Copy

### Immutable Data Structures

### Immutable.js Overview

### Immutability Exercise

### Immutability Solution

## Recursion

### Recursion

### Base Condition Location

### Recursion Exercise

### Recursion Solution

### Stack Frames & Memory Limits

### Optimization: Tail Calls

### Proper Tail Calls

### Refactoring to PTC Form

### Continuation-Passing Style

### Trampolines

### CPS & Trampolines Q&A

## List Operations

### Map: Transformation

### Filter: Inclusion

### Reduce: Combination

### Composition with Reduce

### List Operations Exercise

### List Operations Solution: add & constant

### List Operations Solution: addn

### List Operations Solution: Modify Collection

### Fusion

## Transduction

### Transduction

### Transduction Q&A

### Deriving Transduction: Extracting Reduce

### Deriving Transduction: Combiner & Currying

### Deriving Transduction: Single Reduce

### Derivation Summary and Q&A

## Data Structure Operations

### Data Structure Operations

### Object Filter & Reduce Exercise

### Object Filter & Reduce Solution

### Advanced Point Free Exercise

### Advanced Point Free Solution

### Monad Data Structures

### Just Monad

### Maybe Monad

### Monads Q&A

## Async

### Map Lazy & Lazy Array

### Observables

### Reactive Programming with Rx.js

### Async with Rx.js Exercise

### Async with Rx.js Solution

## Functional JS Utils

### Lodash/FP

### Ramda

### FPO

## Wrapping Up

### Wrapping Up