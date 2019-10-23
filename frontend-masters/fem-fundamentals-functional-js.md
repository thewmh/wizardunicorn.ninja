---
title: "Frontend Masters - Javascript: From Fundamentals to Functional JS"
description: These are notes from the 'From Fundamentals to Functional JS' course on Frontend Masters.
permalink: /frontend-masters/fem-fundamentals-functional-js

layout: page
sidenav: fem-js-func
subnav:
  - text: Introduction
    href: '#introduction'
  - text: Functional Programming
    href: '#functional-programming'
---

## Introduction

### Tips for Learning

* Difficulty ramps up considerably, but if you stick with it you will reap the rewards

* Take responsibility for your learning - don't make excuses for why you cannot learn something, figure out how to measure your learning (it is different for everyone)

* Consider the questions asked

* Don't read too much. If you are trying to learn a skill that requires you to solve problems, it's not always as productive as it may feel

* Teach other people, explain what you learned and how it works

### Functional Programming

Functional programming has become popular to the point that functional programming and utility methods have been integrated into modern frameworks. Functional programming is about breaking code into verbs, vs object oriented programming being about nouns. It is easier to think about software in terms of objects because that's where we, as humans, live, in the physical world. Whereas with functional programming, you need to think in terms of the actions. In functional programming, the focus is on... functions. Lots of functions, functions being passed to functions, functions being returned from functions, working with parameters and arguments. One benefit of functional programming vs object oriented programming: Pure functions don't have side-effects - makes code easier to test

## Objects

### Property Access

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

### Arrays

{% highlight javascript %}
var person = []; // declare a person array

person.name = "Mrs. White"; // assign a vaule to a property

var who = person.name;

who; //??
{% endhighlight %}

Arrays are objects, and because of that, the rules are exactly the same. The major difference between an array and an object are the available methods for either, an example of which is ```.length``` being an available method for arrays, but not objects. If you check the ```typeof``` for the ```person``` variable in the code block above, the console should return ```object```.

### Bracket Notation

{% highlight javascript %}
var person = []; // declare a person array
var plea = "wouldShe"

person.name = "Mrs. White"; // assign a vaule to a property

person[plea] = "I would never!"
{% endhighlight %}

The ```person[plea] = "I would never!"``` will create a new property in the person object based on the original value of the plea variable ```"wouldShe"```, which will make the person object look like this:

{% highlight javascript %}
person = {
  name: "Mrs. White"
  wouldShe: "I would never!"
}
{% endhighlight %}

If the intention was to create a ```plea``` key for the person object, then you need to surround the ```plea``` with quotes. i.e. ```person["plea"] = "I would never!"```. The person object would then look like this:

{% highlight javascript %}
person = {
  name: "Mrs. White"
  plea: "I would never!"
}
{% endhighlight %}

Reviewing what we've learned about objects and arrays:

* An array is an object that has methods available to it.

* A property string can be passed with dot notation or brackets and quotes.

* Dot notation coerces to a string, but cannot coerce a number to a string, it will result in a SyntaxError. JavaScript will start to evaluate the number as a number and then throw the SyntaxError.

* If you receive a SyntaxError when trying to access a variable within an object with dot notation, use bracket notation and quotes around the variable name to access it.

### Non-Valid Characters



### Game Characters Challenge

### Game Characters Solution

### Object Review

### ES6 Destructuring

### Destructuring Challenge

### Destructuring Solution

### Destructuring Examples

## List Transformations

### List Transformations

### Looping Exercise

### Looping Solution

### Looping Exercise, Part 2

### Looping Solution, Part 2

### Looping Exercise, Part 3

### Looping Solution, Part 3

## .forEach() Function

### Using Functions

### forEach Function

### forEach and _.each Exercises

### forEach and _.each Solution

## .map() Function

### _.map() vs .map() Functions

### _.map() Exercise

### _.map() Solution

### _.map() vs _.each()

### _.map() Exercise, Part 2

### _.map() Solution, Part 2

## .filter() Function

### .filter() Exercise

### .filter() Solution

### .filter() Application Exercise

### .filter() Application Solution

## Functions In-Depth

### Anatomy of a Function

### Function Scavenger Exercise

### Function Scavenger Solution

### ES6 Arrow Functions

### Projecting Exercise

### Projecting Solution

### Spread Operator

### Arguments Keyword

### Default Parameters

### ES5 Rewrite Exercise

### ES5 Rewrite Solution

### Array-Like Object

### Array.from

### _.from() Exercise

### _.from() Solution

## Scope

### Scope Walkthrough Setup

### Scope Walkthrough, Part 1

### Scope Walkthrough, Part 2

### Scope Walkthrough, Part 3

### Scope Takeaways

## Callbacks

### Higher-Order Functions & Callbacks

### Passing Arguments

### Translate into ES6 Exercise

### Translate into ES6 Solution

### Passing Arguments, Part 2

### _.reduce() Exercise

### _.reduce() Solution

### Empty Room Exercise

### Empty Room Solution

## Functional Utilities

### Currying

### Composing

## Advanced Scope: Closure

### Closure

### Closure, Part 2

### Creating Closure

### Closure Demonstration

### Closure Recipe

### Currying and Componsing Exercises

### Currying and Componsing Solutions

## Wrapping Up "JavaScript: From Fundamentals to Functional JS"

### Wrapping Up