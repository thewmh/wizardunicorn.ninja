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

[The link to the course slideshow is here]('http://slides.com/bgando/f2f-final-day-1#/')

[The link to the course on FrontEnd Masters is here]('https://frontendmasters.com/courses/js-fundamentals-functional-v2')

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

Try not to use non-valid characters as property names, like ```'^&*'```, that is not a very good property name both because it uses non-valid characters and it is not named in a very memorable or sensible way. You can certainly use non-valid characters to name your properties, but the name will need to be surrounded by quotes. Try to keep your code to the point and don't get too fancy.

Q&A

Q: What is the difference between an array and an object? (this seems to have already been answered in the previous section)

A: An array is a special kind of object. The most special thing about an array is the .length property which is a property that is computed as you add numerical indices. Numerical indices are different than properties on an array because an array captures that and will increment the length. 

If you have an array containing any number of items and add something to an index that does not exist; if you add something to the array at an index position that is more than 1 greater than the current .length [numnber of index positions] of the array, empty values will be inserted until it reaches the requested index position. i.e. original array is ```y[0,1,2,3,4,5]``` and you would like to add ```y[10]=number```, the array will now be ```y[0,1,2,3,4,5,,,,number]```

Arrays are easier to reverse and loop through than objects.

### Game Characters Challenge

Exercise: Create an object using bracket and dot notation that represents the characters and related data you may find in a game of Clue.

Characters
Weapons
Rooms

{% highlight javascript %}
var clue = {
  characters: ['Professor Plum', 'Miss Scarlet', 'Mrs. Peacock', 'Mr. Boddy', 'Mrs. White', 'Colonel Mustard', 'The Singing Telegram Girl', 'The Motorist', 'Mr. Green],
  weapons: ['candlestick', 'dagger', 'lead pipe', 'revolver', 'rope', 'spanner'],
  rooms: ['dining room', 'kitchen', 'study', 'billiard room', 'sunroom', 'ballroom']
}
{% endhighlight %}

### Game Characters Solution

{% highlight javascript %}
var game = {}; // initialize an object literal

game.murderer = "??"; // initialize a property

game['weapons'] = ['laser', 'angry cat', 'dish soap'] // why would you choose an array vs an object? If you have a list of something that is all falling under the same category, an array makes more sense vs an object

If you took the above array and made it into an object, it might look something like this

game['weapons'] = [ // an object(s) 'key' should be the same for each 'value', so that it is predictable.
    {type: 'laser', location: 'lab'},
    {type: 'angry cat', location: 'dining room'},
    {type: 'dish soap', location: 'sunroom'}
]

game.name = []; initialize an array literal

game.name[0] = 'Miss Scarlet';
game.name.push('Mr. Green')
{% endhighlight %}

### Object Review

JavaScript Object Rules

You can use dot or bracket notation when working with; 

Dot Notation: strings

Bracket Notation: strings, numbers, variables, weird characters, expressions

Why would you even use dot notation? Because it is less characters than bracket notation

### ES6 Destructuring

[Destructuring slide]('http://slides.com/bgando/f2f-final-day-1#/1/26')

Destructuring is a simplified way of defining variables and taking them outside of an object or an array.

i.e. Destructuring an Array

{% highlight javascript %}
// create a new array and declare it's values. could use let, var, etc…

const [thing1, thing2] = [true, false];

// reassigning values to existing array

[thing1, thing2] = [true, false];
{% endhighlight %}

```const``` and ```let``` are features of ES6

```const``` is used when you want the value of the variable to remain constant

const will not apply to the properties of the object unless you explicitly 'freeze' them using [Object.freeze]('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze')

```let``` is used when you want to restrict a variable to a certain scope

i.e. Destructuring an Object

{% highlight javascript %}
// create a new object and declare it's values. could use let, var, etc…

const {thing1, thing2} = {thing1: true, thing2: false};

// reassigning values to existing object

{thing1, thing2} = {thing1: true, thing2: false};
{% endhighlight %}

Objects do not have an order, but the names do have to match. If you think or expect that an object needs an order, you should be using an array.

### Destructuring Challenge

Create an object that looks like this:

{"name": "Rusty", "room": "kitchen", "weapon": "candlestick"}

Extract out the weapon and location using destructuring

### Destructuring Solution

let {name, room, weapon} = {"name": "Rusty", "room": "kitchen", "weapon": "candlestick"}

### Destructuring Examples

On extracting data and working with nested data structures

{% highlight javascript %}
// Destructuring === arrays

var [a, b] = [1, 2];
console.log(a, b);
// => 1 2

// Omit certain values
var [a, , b] = [1, 2, 3];
console.log(a, b);
// => 1 3

// Combine with spread/rest operator (accumulates the rest of the values)
var [a, ...b] = [1, 2, 3];
console.log(a, b);
// => 1 [ 2, 3 ]

// Swap variables easily without temp
var a = 1, b = 2;
// var temp = a;
// a = b;
// b = temp;
[b, a] = [a, b];
console.log(a, b);
// => 2 1

// Advance deep arrays
var [a, [b, [c, d]]] = [1, [2, [[[3, 4], 5], 6]]];
console.log("a:", a, "b:", b, "c:", c, "d:", d);
// => a: 1 b: 2 c: [ [ 3, 4 ], 5 ] d: 6
// ^ None of the 'Advance deep arrays' example above is useful

{% endhighlight %}

There are many more notes in the course itself covering destructuring but the instructor does not cover them and suggests to look for a course on ES6

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