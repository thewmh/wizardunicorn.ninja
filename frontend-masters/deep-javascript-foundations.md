---
title: "Deep JavaScript Foundations, v3"
description: These are notes from the 'Deep JavaScript Foundations, v3' course on Frontend Masters.
permalink: /frontend-masters/deep-javascript-foundations

layout: page
subnav:
  - text: Introduction
    href: '#introduction'
  - text: Something
    links:
      - text: Something Else
        href: '#nope'
  - text: Functional Programming
    href: '#functional-programming'
---

## Introduction

### Introduction

[Link to the course document](https://static.frontendmasters.com/resources/2019-03-07-deep-javascript-v2/deep-js-foundations-v2.pdf)

[Link to the course's code exerices](https://static.frontendmasters.com/resources/2019-03-07-deep-javascript-v2/deep-js-foundations-v2-exercises.zip)

The instructor talks about the depth that this course gets into. But why dive deep into JavaScript? Consider the following code:

{% highlight javascript %}

var x = 40;

x++; // 40 - placing the plus symbols after the variable will give you the current value of the variable and then increment
x; // 41 - this will log the current value of the variable

++x; // 42 - placing the plus symbols before the variable will increment the value and then return the result
x; // 42 - this will log the current value of the variable

{% endhighlight %}

We as developers tend to assume mental models about code and when something goes wrong instead of having a better understanding about the code. The unintuitive-ness of JavaScript does not mean that it was poorly defined. **Read the spec docs!**

### Understanding Your Code

According to the JavaScript spec for the `++` operator:

> **12.4.4.1 Runtime Semantics: Evaluation
> *UpdateExpression : LeftHandSideExpression **++***
>
> 1. Let `lhs` be the result of evaluating *LeftHansSideExpression*.
> 2. Let `oldValue` be ? `ToNumber`(?`GetValue(lhs)`).
> 3. Let `newValue` be the result of adding the value 1 to `oldValue`, using the same rules as for the **+** operator.
> 4. Perform ? `PutValue(lhs, newValue)`.
> 5. Return `oldValue`.

The purpose of this course is to help you understand the DNA of JavaScript to better understand when you are doing as a developer.

To translate the above **++** spec into a function, it may look something like this:

{% highlight javascript %}

function plusPlus(orig_val) {
    var orig_val_coerced = Number(orig_val);
    x = orig_val_coerced + 1;
    return orig_val_coerced;
}

var x = "5";
plusPlus(x); // 5
x; // 6

{% endhighlight %}

Whenever there is a divergence between what your brain thinks is happening and what the computer does, that's where bugs enter the code.

### Course Overview

JavaScript can be divided into 3 pillars:

1. Types

    * Primitive Types

    * Abstract Operations

    * Coercion

    * Equality

    * TypeScript, Flow, etc...

2. Scope

    * Nested Scope

    * Hoisting

    * Closure

    * Modules

3. Objects (Oriented)

    * this

    * class{}

    * Prototypes

    * OO vs. OLOO

It is important to understand all of these pillars of JavaScript to get a better understanding of the language and therefore be more effective in your work.

## Types

### Primitive Types

"In JavaScript, everything is an object." - **false**

This is not an accurate statement. Many things in JavaScript behave like objects, but that does not make them objects. The spec lays it out. The primitive types are: Undefined, Null, Boolean, String, Symbol, Number, and Object.

* undefined - has one and only one value; undefined

* string - any value wrapped in quotes (single or double)

* number - refers to all of JavaScript's numbers

* boolean - the values `true` and `false`

* object - `{}`

* symbol - used mostly to create 'pseudo' private-keys

* undeclared - is this a type? not exactly, but it does have a behavior

* null - defined as a type, but its behavior is quirky. More details on this later.

* function - not listed [in the spec] as a type, but functions do have a very specific set of attributes that could make a function considered to be a type. Technically referred to as a sub-type of an object.

* array - numerically indexed, lengths assigned. Another sub-type to an object.

* bigint - not in the spec, but likely coming to the spec. When it does land in the spec, it will be a primitive type.

Defining/assigning a type when developing typically indicates that you expect your data to behave in a certain way. You should be defining your data w/ intent and understanding. Most of the above are not objects, so it is not correct to say that everything is an object in JavaScript. Variables don't have types, values do.

### typeof Operator

When we assign a value to a variable, we can use the `typeof` operator to determine the type of the value stored in the variable. `undefined` is the default value assigned to a variable when a value is not assigned. `undefined` does not mean no value, but a value of `undefined`. `typeof` when applied to a variable storing a function will return 'function', which is not a primitive type.

### BigInt

{% highlight javascript %}

var v = 42n;

typeof v; // "bigint"

{% highlight javascript %}

Coming soon functionality, does not behave like a standard number primitive type. It will be important to know the difference between a 'number' and a 'bigint'.

### Kinds of Emptiness

undefined vs. undeclared vs. uninitialized

These words are not synonymous, in JavaScript they are two entirely different concepts. `undeclared` means that the variable does not exist, `undefined` means that the variable exists, but has no value. `uninitialized` means the variable has never been initialized.

### NaN & isNaN

NaN does not mean 'not a number', it means 'invalid number'. Zero is not a number to use when you would like to indicate that there is no value, because zero has value. NaN is basically a number that has no value. NaN with any other mathmatically valid number will return NaN. NaN is not equal to NaN. NaN is the only value that is not equal to itself. The `isNan` utility coerces values to numbers before checking its value. `Number.isNan` does not do any coercion. Using this utility, you can determine with certainty whether a value is actually NaN or not; returns `true` or `false`. `typeof NaN` is a number.

### Negative Zero

The negative representation of the value zero. If you stringify -0, it returns as '0'. `-0 === 0` ? `true` negative zero is neither less than or greater than zero. Enter `Object.is()` which allows you to test for the negative zero. It can also be used to check NaN values.

### Type Check Exercise

### Type Check Exercise

### Type Check Exercise Solution

### Fundamental Objects

## Coercion

### Abstract Operations

### toString

### toNumber

### toBoolean

### Cases of Coercion

### Boxing

### Corner Cases of Coercion

## Philosophy of Coercion

### Intentional Coercion

### Culture of Learning

### Code Communication Q&A

### Implicit Coercion

### Understanding Features

### Coercion Exercise

### Coercion Exercise Solution

## Equality

### Double & Triple Equals

### Coercive Equality

### Double Equals Algorithm

### Double Equals Walkthrough

### Double Equals Summary

### Double Equals Corner Cases

### Corner Cases: Booleans

### Corner Cases: Summary

### The Case for Double Equals

### Equality Exercise

### Equality Exercise Solution

## Static Typing

### TypeScript & Flow

### Inferencing

### Custom Types

### Validating Operand Types

### TypeScript & Flow Summary

### Static Typing Pros

### Static Typing Cons

### Understanding Your Types

## Scope

### Scope

### Compilation & Scope

### Executing Code

### Compilation and Scope Q&A

### Code Execution: Finishing Up

### Lexical Scope Review

### Compilation Review

### Dynamic Global Variables

### Strict Mode

### Nested Scope

### Undefined vs Undeclared

### Lexical Scope Elevator

## Scope & Function Expressions

### Function Expressions

### Naming Function Expressions

### Arrow Functions

### Function Types Hierarchy

### Function Expression Exercise

### Function Expression Solution: Functions

### Function Expression Solution: Arrow Functions

## Advanced Scope

### Lexical & Dynamic Scope

### Lexical Scope

### Dynamic Scope

### Function Scoping

### IIFE Pattern

### Block Scoping

### Choosing let or var

### Explicit let Block

### const

### const Q&A

### Hoisting

### Hoisting Example

### let Doesn't Hoist

### Hoisting Exercise

### Hoisting Exercise Solution

## Closure

### Origin of Closure

### What is Closure?

### Closing Over Variables

### Module Pattern

### ES6 Modules & Node.js

### ES6 Module Syntax

### Module Exercise

### Module Exercise Solution

## Objects

### Objects Overview

### The this Keyword

### Implicit & Explicit Binding

### The new Keyword

### Default Binding

### Binding Precedence

### Arrow Functions & Lexical this

### Resolving this in Arrow Functions

### this Exercise

### this Exercise Solution

### ES6 class Keyword

### Fixing this in Classes

### class Exercise

### class Exercise Solution

## Prototypes

### Prototypes

### Prototypal Class

### The Prototype Chain

### Dunder Prototypes

### this & prototypes Q&A

### Shadowing Prototypes

### Prototypal Inheritance

### Classical vs Prototypal Inheritance

### Inheritance is Delegation

### OLOO Pattern

### Delegation-Oriented Design

## Wrapping Up

### Wrapping Up

### Bonus: Typl