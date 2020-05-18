---
title: "Javascript: The Hard Parts, v2"
description: These are notes from the 'Javascript':' The Hard Parts, v2' course on Frontend Masters.
permalink: /frontend-masters/hard-parts-js

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

[The link to the course slideshow is here]('http://slides.com/bgando/f2f-final-day-1#/')

[The link to the course on FrontEnd Masters is here]('https://frontendmasters.com/courses/js-fundamentals-functional-v2')

## JavaScript Principles

### Thread of Execution

Assignments with Dots

{% highlight javascript %}
var person = {}; // declare a person object

person.name = "Mrs. White"; // assign a vaule to a property

var person = { // object literal notation
    "name" : "Mrs. White" // the quotation marks are not needed for a one-word property declaration, JavaScript will assume it is a string
};
{% endhighlight %}

Anything that ever uses a dot in JavaScript is an object.

A primitive value is a string, number, boolean, null, or undefined. A non-primitive valye is an object, array, function, promise. Primitive values get passed by value, non-primitive values get passed by reference. If you are passing primitive values, a copy is made, non-primitive values are passed as a reference. This behavior can produce unpredictable results if you are not careful. For example, if you were to assign ```person.name``` to a variable i.e. ```who```, then reassign ```person.name```, who would retain the original reference for ```person.name```.

### Functions

### Call Stack

## Functions & Callbacks

### Generalized Functions

### Repeating Functionality

### Higher Order Functions

### Higher Order Functions Example

### Higher Order Functions Q&A

### Callbacks & Higher Order Functions

### Arrow Functions

### Pair Programming

## Closure

### Closure Introduction

### Returning Functions

### Nested Function Scope

### Retaining Function Memory

### Function Closure

### Closure Q&A

### Closure Technical Definition & Review

### Multiple Closure Instances

### Practical Applications

### Closure Exercises

## Asynchronous JavaScript

### Single Threaded Execution Review

### Asynchronicity in JavaScript

### Asynchronous Browser Features

### Web API Example

### Web API Rules

### Callback Queue & Event Loop

### Callback Queue & Event Loop Q&A

### Callback Hell & Async Exercises

## Promises

### Promises Introduction

### Promises Example: fetch

### Promises Example: then

### Web APIs & Promises Example: fetch

### Web APIs & Promises Example: then

### Web APIs & Promises Example: Microtask Queue

### Promises and Asynchronous Q&A

### Promises Review

## Classes & Prototypes

### Class & OOP Introduction

### Object Dot Notation

### Factory Functions

### Factory Functions Example

### Prototype Chain

### Prototype Chain Example: Prototypal Link

### Prototype Chain Example: Implicit Parameters

### hasOwnProperty Method

### this Keyword

### Arrow Function Scope & this

### Prototype Chain Review

### new Keyword

### new Keyword Example

### class Keyword

## Wrapping Up