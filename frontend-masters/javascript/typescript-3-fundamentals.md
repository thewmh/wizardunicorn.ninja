---
title: "TypeScript 3 Fundamentals, v2"
description: These are notes from the 'TypeScript 3 Fundamentals, v2' course on Frontend Masters.
permalink: /frontend-masters/typescript-3-fundamentals

layout: default
pagenav:
  - name: Introduction
    href: introduction
  - name: TypeScript Basics
    href: typescript-basics
  - name: Interfaces & Type Aliases
    href: interfaces--type-aliases
  - name: Classes
    href: classes
  - name: Converting to TypeScript
    href: converting-to-typescript
  - name: Generics
    href: generics
  - name: Top & Bottom Types
    href: top--bottom-types
  - name: Advanced Types
    href: advanced-types
  - name: Declaration Merging
    href: declaration-merging
  - name: Compiler API
    href: compiler-api
---

[Link to the workshop repository](https://github.com/mike-works/typescript-fundamentals/tree/master)
[Link to the workshop slides (presentation)](https://drive.google.com/file/d/170oHzpLNeprUa-TMmOAnSU4caEFDSb3e/view)

## Introduction

### Introduction

Our instructor for this workshop, Mike North, leads workshops at LinkedIn. He is also a tech lead on the frontend stack with a focus on TypeScript adoption. Great, but what is [TypeScript](https://www.typescriptlang.org)?

* An open-source `typed`, `syntactic superset` of JavaScript, developed by **Microsoft**
* Compiles to readable JavaScript
* Comes in three parts: `Language`, `Language Server`, and `Compiler`
* Works seamlessly with `Babel 7`

The types in TypeScript 'disappear' in the final compiled JavaScript, so you can think of TypeScript as a static analysis tool that does a lot of checking on your codebase. This is good in some ways, bad in others. Good because there is no 'cost' at runtime, bad because a fetched data response or user input will have no type-checking. You can think of TypeScript as a 'fancy' linter or other static analysis tool that verifies everything looks good, but does not produce any output.

Since the original edition of this workshop in 2017, there has been a +300% increase in TypeScript downloads, tying TypeScript's downloads and prevalence of use with that of React. 

### Rationale

...why add types?

* To encode constraints and assumptions, as part of developer intent
* Catch common mistakes (i.e. incomplete refactors)
* Move some runtime errors to compile time
* Provide your consumers (including you) with a great DX (Developer Experience)

### Course Overview

We're about to learn about:

* Adding type information to variables, functions, and classes
* Configuring the compiler
* A practical strategy for incrementally converting JS to TS
* Parameterizing interfaces and type aliases with generics
* Conditional, mapped, and branded types
* TS Compiler API Basics

While we will not be covering every single facet of TypeScript and its capabilities, our instructors goal is to leave us with a great mental model of how to think about TypeScript. Configuring the compiler is important because it can be the difference between shrinking code by 70%, i.e. if we were building for IE6, the code would be much larger because there are less features available in that browser. In the compiler you can also set how strict the rules are. We'll also get a peek under the 'hood' of TypeScript and gain an understanding of how TypeScript understands our code and how it splits it apart and represents our code in data structures.

⚠ from here forward, the workshop will be working from the repository listed at the top of these notes. If you would like to follow along, and get the most out of the workshop, clone the repository and follow the installation instructions before proceeding ⚠️

### Flags





### Configuring TypeScript



## TypeScript Basics

### Variables



### Variable Declarations



### Arrays & Tuples



### Object Types & Interfaces



### Intersection & Union Types



### Type Systems & Object Shapes



### Functions



### Function Signature Overloading



### Lexical Scope



## Interfaces & Type Aliases

### Type Aliases & extends



### Call & Construct Signatures



### Dictionary Objects & Index Signatures



### Combining Interfaces



### Type Tests

## Classes

### Classes



### Access Modifiers & Initialization



### Definite Assignment & Lazy Initialization



### Abstract Classes

## Converting to TypeScript

### Converting to TypeScript



### Compiling in "loose mode"



### Making Anys Explicit



### Strict Mode



### Address Book Exercise



### Address Book Solution



## Generics

### Generics



### Type Parameters



### Constraints & Scope



### Use Cases



### Dictionary Exercise



### Dictionary Solution



## Top & Bottom Types

### Top Types



### Type Guards



### Unknowns & Branded Types



### Bottom Types



## Advanced Types

### Mapped & Conditional Types, & Type Queries



### Built-In Utility Types



## Declaration Merging

### Declaration Merging



## Compiler API

### Initializing



### Type-Checker


### Wrapping Up
