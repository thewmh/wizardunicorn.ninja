---
title: "Javascript: From Fundamentals to Functional JS"
description: These are notes from the 'From Fundamentals to Functional JS' course on Frontend Masters.
permalink: /frontend-masters/fundamentals-functional-js

layout: default
---

## Introduction

[The link to the course slideshow is here](http://slides.com/bgando/f2f-final-day-1)

[The link to the course on FrontEnd Masters is here](https://frontendmasters.com/courses/js-fundamentals-functional-v2)

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

[Destructuring slide]('http://slides.com/bgando/f2f-final-day-1/1/26')

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

Nesting

Nesting had been talked about earlier, below is an example.

{% highlight javascript %}

// nesting

const game = {};
game['suspects'] = [];

game.suspects.push({
    name: 'Rusty',
    color: 'orange'
});

game.suspects[1] = {
    name: 'Miss Scarlet',
    color: 'red'
};

// view of object literal

const game = {
    'suspects': [
        {
            name: 'Rusty',
            color: 'orange'
        },
        {
            name: 'Miss Scarlet',
            color: 'red'
        }       
    ]
}

{% endhighlight %}

Considering the above, what would ```game[suspects]``` return?

nothing… because the quote marks were missing around 'suspects'. With the added quote marks, it would return an array with the suspect objects.

### Looping Exercise

Using the nested structure from the previous section, loop through it using any ```for``` loop of your choice.

### Looping Solution

Here is a solution by a participant of the in-person class

{% highlight javascript %}
 
function foo() {
    for (let i = 0; i < game.suspects.length; i++) {
        console.log(game.suspects[i]);
    }
}

foo()

{% endhighlight %}

### Looping Exercise, Part 2

Loop through all of the properties of the suspect objects in the suspects array, mark them if you think they are guilty.

### Looping Solution, Part 2

Here is a solution by a participant of the in-person class

{% highlight javascript %}

var gameLoop = function() {
    for (var i = 0; i < game.suspects.length; i++) {
        console.log('outer loop');
        for (var key in game.suspects[i]) {
            console.log('inner loop');
            if (game.suspects[i][key] === 'Rusty') {
                console.log('Found \'em');
            } else {
                console.log('next time!');
            }
        }
    }
}

the above would log:

'outer loop'
'inner loop'
'Found em'
'inner loop'
'next time!'
'outer loop'
'inner loop'
'next time!'
'inner loop'
'next time!'

{% endhighlight %}

### Looping Exercise, Part 3

Destructure the nested data structure into two variables with the strings 'red' and 'orange'

### Looping Solution, Part 3

Here is a solution by a participant of the in-person class

{% highlight javascript %}

const firstColor = game.suspects[0].color;
const secondColor = game.suspects[1].color;

var [color, color2] = [suspects[0].color, suspects[1].color];

var [{color: firstColor}, {color: secondColor}] = suspects; // specifies a specific property of the targeted object and returns an array

{% endhighlight %}

## .forEach() Function

### Using Functions

This section covers list transformations with functions and shows how to convert data into a class

{% highlight javascript %}

function CreateSuspectObjects(name) {
    return {
        name: name,
        color: name.split(' ')[1],
        speak() {
            console.log("my name is ", name);
        }
    };
};

var suspects = ['Miss Scarlet', 'Colonel Mustard', 'Mr. White', ....];

var suspectsList = [];

{% endhighlight %}

In JavaScript classes are just functions that return objects.

Using the above code, how would you create a suspect object from each suspect in the suspects array?

One way would be to loop through the list like this:

{% highlight javascript %}

for(var i = 0; i < suspects.length; i++) {
    let suspect = CreateSuspectObjects(suspects[i])
    suspectsList.push(suspect); || suspectsList.push(CreateSuspectObjects(suspects[i]));
}

{% endhighlight %}

### forEach Function

_.each takes 2 arguments, the first thing is a list and the second thing is a callback function, also known as an iterator function because it is used on things that can be looped through (arrays). Using _.each, the callback function will be called on each item in the first argument; the list. i.e.

{% highlight javascript %}

function CreateSuspectObjects(name) {
    return {
        name: name,
        color: name.split(' ')[1],
        speak() {
            console.log("my name is ", name);
        }
    };
};

var suspects = ['Miss Scarlet', 'Colonel Mustard', 'Mr. White', ....];

var suspectsList = [];

_.each(suspects, function(name) { // suspects is the array that will be used. each name will be passed into the function until the end of the array
    let suspectObj = CreateSuspectObjects(name);
    suspectsList.push(suspectObj); || suspectsList.push(CreateSuspectObjects(name))
}

{% endhighlight %}

_.each / forEach defined

* Iterates over a list of elements, passing the values to a function

* Each invocation of iterator, the function, is called with three arguments: (element, index, list). If list is a JavaScript object, iterator's arguments will be: (value, key, list).

Each is useful for looping through lists

The difference between _.each and .forEach is: .forEach is a method on the array itself, _.each takes in the array as an argument

What would the following log?

{% highlight javascript %}

var rooms = ['observatory', 'ballroom', 'library'];
var logger = function(val) {
    console.log(val);
};

_.each(rooms, logger);

{% endhighlight %}

```observatory
ballroom
library```

### forEach and _.each Exercises

Complete the rest of this function so that it works as described in the previous sections:

{% highlight javascript %}

_.each = function(list, callback) {
    //... TODO
}

{% endhighlight %}

{% highlight javascript %}

_.each = function(list, callback) {
    for(i = 0; i < list.length; i++) {
        callback(list[i]);
    }
}

{% endhighlight %}

### forEach and _.each Solution

{% highlight javascript %}

const _ = {};

_.each = function(list, callback) {
    // needs to work with both objects and arrays
    // loop through the list
    if (Array.isArray(list)) {
        for(var i = 0; i < list.length; i++) {
            callback(list[i], i, list) // value, index, list
        }
    } else { // object
        // loop through object
        for(var key in list) {
            callback(list[key], key, list) 
        }
    }
        // call the callback with a list item
}

{% endhighlight %}

## .map() Function

### _.map() vs .map() Functions

```_.map([1, 2, 3], function(v, i, list) {console.log(v)})```

* Produces a new array of valuse by mapping each value in list through a transformation function ( iterator ).

* Each invocation of iterator is called with three arguments: (element, index, list). If list is a JavaScript object, iterator's arguments will be: (value, key, list).

map is used to take lists and transform them into a new array - manipulate, change, update

### _.map() Exercise

{% highlight javascript %}

const weapons = ['candlestick', 'lead pipe', 'revolver'];

const makeBroken = function(item) {
    return `broken ${item}`;
};

{% endhighlight %}

Unrelated Note: If you want to quickly test out a function in a library, you can usually visit the library's site and open the console. i.e. visit underscorejs.org, open the console and type `_.map()`

### _.map() Solution

{% highlight javascript %}

const weapons = ['candlestick', 'lead pipe', 'revolver'];

const makeBroken = function(item) {
    return `broken ${item}`;
};

_.map(weapons, makeBroken)

{% endhighlight %}

### _.map() vs _.each()

No notes. Was merely a comparison of underscore.js _.map and _.each. Refer to above notes for comparison.

### _.map() Exercise, Part 2

Map returns an array

Like each, map iterates through a list

{% highlight javascript %}

_.map = function(list, callback) {

    var newArray = [];

    if(Array.isArray(list)) {
        newArray = list;
        for(var i = 0; i < newArray.length; i++) {
            callback(newArray[i], i, newArray)
        }

    } else {

    }
}

{% endhighlight %}

### _.map() Solution, Part 2

{% highlight javascript %}

_.map = function(list, callback) {
    // create an empty array to store
    var a = [];
    // loop
    for (var i = 0; i < list.length; i++) {
        // callback(element)
        // push to array store
        a.push(callback(list[i], i, list));
    }

    // using _.each

    _.each(list, function(v, i, list) {
        a.push(callback(v, i, list));
    })

    //return []
    return a;
}

{% endhighlight %}

Pro tip: Seek to understand the internals of the code you are implementing. Don't rely on; change, save, check, change, save, check. Understand and clearly model what you are doing. It may (seem to) take more time up-front, but the payoff is greater in the long-run. If your code is getting too difficult to hold in your mind, that could be a sign that your code is too complex and may be an opportune time to revisit and simplify your code.

## .filter() Function

### .filter() Exercise

What is filter? Filter is a function that takes an array and a callback. It returns a new array that only contains the values that result in true when passed through the callback function.

The exercise was not detailed. So it is in the solution

### .filter() Solution

{% highlight javascript %}

const _ = {}

_.filter = function(array, callback) {
    // create a new array
    const a = [];
    // loop through the array
    for (var i = 0; i < array.length; i++) {
        // check if the callback returns true
        if (callback(array[i], i, array) === true) { // === true is not required
        // if returns true, push the item into the array
            a.push(array[i])
        }
    }
    // return new array
    return a;
}

{% endhighlight %}

### .filter() Application Exercise

Using the below object `videoData` and _.filter, return an array of objects containing only the people that were present

{% highlight javascript %}

const videoData = [
    {
        name: 'Miss Scarlet',
        present: true,
        rooms: [
            {kitchen: false},
            {ballroom: false},
            {conservatory: false},
            {'dining room': false},
            {'billiard room': false},
            {library: false}
        ]
    },
    {
        name: 'Mrs. White',
        present: false,
        rooms: [
            {kitchen: false},
            {ballroom: false},
            {conservatory: false},
            {'dining room': false},
            {'billiard room': false},
            {library: false}
        ]
    },
    {
        name: 'Reverend Green',
        present: true,
        rooms: [
            {kitchen: false},
            {ballroom: false},
            {conservatory: false},
            {'dining room': false},
            {'billiard room': false},
            {library: false}
        ]
    },
    {
        name: 'Rusty',
        present: false,
        rooms: [
            {kitchen: false},
            {ballroom: false},
            {conservatory: false},
            {'dining room': false},
            {'billiard room': false},
            {library: false}
        ]
    },
    {
        name: 'Colonel Mustard',
        present: true,
        rooms: [
            {kitchen: false},
            {ballroom: false},
            {conservatory: false},
            {'dining room': false},
            {'billiard room': false},
            {library: false}
        ]
    },
    {
        name: 'Professor Plum',
        present: true,
        rooms: [
            {kitchen: false},
            {ballroom: false},
            {conservatory: false},
            {'dining room': false},
            {'billiard room': false},
            {library: false}
        ]
    }
];

{% endhighlight %}

### .filter() Application Solution

{% highlight javascript %}

_.filter(videoData, function(suspectObject) {
    return suspectObject.present;
})

{% endhighlight %}

## Functions In-Depth

### Anatomy of a Function

How exactly does our code execute.

[Check out the anatomy of a function](http://slides.com/bgando/f2f-final-day-1/7/1)

{% highlight javascript %}

var add // function name
= function(a, b) // parameters
{ // function body
    return a + b // function body
} // function body

add(3, 4, 5); // invocation / call-time (3, 4, 5) are the arguments

{% endhighlight %}

A function definition does not invoke the function, the invocation happens after the function has been declared, usually by functionName(arguments).

Parameters of a function hold no value, their value is determined by the arguments passed at call-time.

### Function Scavenger Exercise

[Find the things!](http://slides.com/bgando/f2f-final-day-1/7/2)

### Function Scavenger Solution

* Function definitions can be spotted whenever you see the word 'function'

* Function names come in a few flavors, in this exercise nameImprover, .hide(), .forEach(), .on(), .log(), and $ are function names

* Function bodies are whatever shows up between the {}. They do not get run until the function is invoked

* Function invocations here are; return, .hide(), .forEach, console.log, .on(), $

* Function arguments and parameters. Arguments have a value, parameters are the name.
Parameters; name, adj, val
Arguments; 'body', 'button', 'click', function()...

* Function return is shown where the word 'return' appears. A side effect is anything that reaches beyond the {} of a function; i.e. console.log('I am a side effect!'). $('body').hide(); is a side effect as well.

### ES6 Arrow Functions

=> replaces the `function` keyword

If there is only one parameter, it does not need to be wrapped in parenthesis.

Arrow functions do not have their own value for `this`. Arrow functions reach into their parent scope for `this`.

If you are trying to return something from an arrow function, it is best to explicitly declare the return statement.

Side note: Template strings (surrounded by backticks), are ES6 syntax. It allows you to reference variable names i.e. `${variable}` without the need to plus signs and quote symbols all over the place.

### Projecting Exercise

Projecting is when you take a value out of one data structure and turn it into another data structure.

Filter and then map [this data structure](http://jsbin.com/duvafoc/edit) to get the names of the final suspects to send back to the "team"

### Projecting Solution

{% highlight javascript %}

// store the return value from the filter function

const suspects = _.filter(videoData, function(suspectObject) {
    return suspectObject.present;
})

const suspectsName = _.map(suspects, suspect => {
    return suspect.name;
})

{% endhighlight %}

### Spread Operator

Quick Review; what will this return?

{% highlight javascript %}

const createTuple = (a, b, c, d) => {
    return [[a, c], [b, d]];
}

createTuple('It', 'be', 'could', 'anyone', 'no one');

{% endhighlight %}

`[['It', 'could'], ['be', 'anyone']]`

With the addition of the [...] spread operator, what will this return?

{% highlight javascript %}

const createTuple = (a, b, c, ...d) => {
    return [[a, c], [b, d]];
}

createTuple('It', 'be', 'could', 'anyone', 'no one');

{% endhighlight %}

`[['It', 'could'], ['be', ['anyone', 'no one']]]`

Since `createTuple` only takes 4 arguments (a, b, c, d), 'no one' gets left out. But with the spread operator, the remaining values will be places into an array with the final value.

### Arguments Keyword

The arguments keyword references all of the arguments as a pseudo-array. A pseudo-array is an object that looks like an array, but it is actually an object. This means that we do not have access to any array methods (push, pop, slice, etc).

The arguments keyword is useful when a variable has been passed in, but it was not accounted for with a parameter.

{% highlight javascript %}

const createTuple = (a, b, c, d) => {
    console.log(arguments);
    return [[a, c], [b, d]];
}

createTuple('It', 'be', 'could', 'anyone', 'no one');

{% endhighlight %}

The above would log: `'[It', 'be', 'could', 'anyone', 'no one']`

### Default Parameters

A default parameter is the value that your parameter defaults to when it is not passed an argument.

{% highlight javascript %}

const add = function(a, b = 2) {
    console.log(arguments); // logs [3]
    return a + b;
}

add(3); // logs [5]

{% endhighlight %}

The default value of `b` is 2, so if an argument is not passed, it will default to that value.

### ES5 Rewrite Exercise

Using ES5, how would you set a default parameter for:

{% highlight javascript %}

const add = function(a, b = 2) {
    console.log(arguments); // logs [3]
    return a + b;
}

add(3); // logs [5]

{% endhighlight %}

Solution:

{% highlight javascript %}

const add = function(a, b) {
    b = b || 2;
    console.log(arguments); // logs [3]
    return a + b;
}

add(3); // logs [5]

{% endhighlight %}

### ES5 Rewrite Solution

The above exercise has the solution.

### Array-Like Object

{% highlight javascript %}

const constructArr = function() { // create function definition
    const arr = Array.prototype.slice.call(arguments); // declare a new variable, assign it to the values that were passed in. An array-like object (arguments) will be turned into an actual array ['was', 'it', 'in']
    arr.push('the billiards room?'); // push the string onto the array ['was', 'it', 'in', 'the billiards room?']
    return arr.join(' '); // joins all of the array into a string -> 'was it in the billiards room?'
};

constructArr('was', 'it', 'in'); // call the function

{% endhighlight %}

### Array.from

Array.from can turn the arguments pseudo-array into an actual array... replaces `Array.prototype.slice.call`. It has many more features [described here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

### _.from() Exercise

Implement _.from() to mimick Array.prototype.slice.call in a function

{% highlight javascript %}

const _ = {};

_.from  = function(array) {
    return Array.prototype.slice.call(arguments)
}

{% endhighlight %}

### _.from() Solution

{% highlight javascript %}

const _ = {};

_.from  = function(array) {
    return Array.prototype.slice.call(arguments)
}

{% endhighlight %}

## Scope

### Scope Walkthrough Setup

Scope is the area where a variable has access to some value. A global variable is accessable to the entire codebase. Local variables are inside of functions or blocks. The setup is using the Mocha testing library.

Function scope states that a function has access to the variables or values that are inside, or in the parent function. You can only look up the tree, but not down.

### Scope Walkthrough, Part 1

Continue walking through the testing suite

### Scope Walkthrough, Part 2

Variables declared within a function are scoped to that function. If you declare a variable and then redeclare that variable within a function, the value of that variable will be as it has been set inside of the function.

{% highlight javascript %}

var ACTUAL;
var sameName = 'outer';
var fn = function() {
    var sameName = 'inner';
    ACTUAL = sameName;
};
fn();

// ACTUAL = 'inner'

{% endhighlight %}

Whenever you call a function, you create a brand new function scope (execution context) each time.

### Scope Walkthrough, Part 3

You can pull a function out of the local scope of a document and attach it to the window i.e. `window.theFunctionIWant = theFunctionIMade;`

The appropriate time to use `let` is when you want to scope a variable inside of a block that is not a function. 

### Scope Takeaways

* Execution Context - an abstract concept of an environment where the Javascript code is evaluated and executed. Whenever any code is run in JavaScript, it’s run inside an execution context.

## Callbacks

### Higher-Order Functions & Callbacks

Higher-Order Functions in JavaScript is what enables us to do functional programming techniques. In JavaScript, functions are treated as data, similar to objects, or other elements.

A Higher-Order Function can take a function as an input i.e. `addEventListener`.

Callbacks are functions that are passed to functions.

{% highlight javascript %}

const ifElse = (condition, isTrue, isFalse) => {
    return condition ? isTrue() : isFalse();
};

ifElse(true,
() => {console.log(true);},
() => {console.log(false);}
);

{% endhighlight %}

The above is a very basic example of a callback function. ifElse is being passed: true and 2 anonymous functions. The `condition` is true, so the `true` will be printed in the console.

### Passing Arguments

{% highlight javascript %}

var increment = function(n){ return n + 1; };

var square = function(n){ return n * n; };

var doMathSoIDontHaveTo = function(n, func){ return func(n); };

doMathSoIDontHaveTo(5, square); // 25

doMathSoIDontHaveTo(4, increment); // 5

{% endhighlight %}

### Translate into ES6 Exercise

{% highlight javascript %}

var increment = n => { return n + 1; };

var square = n => { return n * n; };

var doMathSoIDontHaveTo =  (n, func) => { return func(n); };

doMathSoIDontHaveTo(5, square); // 25

doMathSoIDontHaveTo(4, increment); // 5

{% endhighlight %}

### Translate into ES6 Solution

See above solution

### Passing Arguments, Part 2

You can pass an argument to a callback function by passing in an additional parameter to the function that the callback function is called in. i.e. `const ifElse = (condition, isTrue, isFalse, argument)...` 

### _.reduce() Exercise

Implement _.reduce()

{% highlight javascript %}

const _ = {};

const _.reduce = function(list, callback, initial) {
    var prev = initial;
    for(var i = 1; i < list.length; i++) {
        if (i === 0 && prev === undefined) {
            prev = list[0]
        } else {
            prev = callback(list[i], prev)
        }
    }
    return prev;
}

_.reduce([1, 2, 3], (v, sum) => v + sum, 0)

{% endhighlight %}

### _.reduce() Solution

The above exercise has the solution.

### Empty Room Exercise

[Link to dataset for this exercise](http://jsbin.com/pazixim/edit?js)

{% highlight javascript %}

const newDevelopment = [
    {
        name: 'Miss Scarlet',
        present: true,
        rooms: [
            {kitchen: false},
            {ballroom: false},
            {conservatory: true},
            {'dining room': true},
            {'billiard room': false},
            {library: true}
        ]
    },
    {
        name: 'Reverend Green',
        present: true,
        rooms: [
            {kitchen: true},
            {ballroom: false},
            {conservatory: false},
            {'dining room': false},
            {'billiard room': true},
            {library: false}
        ]
    },
    {
        name: 'Colonel Mustard',
        present: true,
        rooms: [
            {kitchen: false},
            {ballroom: false},
            {conservatory: true},
            {'dining room': false},
            {'billiard room': true},
            {library: false}
        ]
    },
    {
        name: 'Professor Plum',
        present: true,
        rooms: [
            {kitchen: true},
            {ballroom: false},
            {conservatory: false},
            {'dining room': true},
            {'billiard room': false},
            {library: false}
        ]
    }
];

{% endhighlight %}

### Empty Room Solution

{% highlight javascript %}

const notInRoom = suspect => {
    // return an array of all of the false values

    const emptyRooms = _.reduce(suspect.rooms, (room, memo) => {
        if (room === false) memo.push(room)
        return memo
    }, []);

    return emptyRooms;
};

const notInRooms = _.map(newDevelopment, notInRoom);

_.intersection(...notInRooms)

{% endhighlight %}

## Functional Utilities

### Currying

Currying is when you create a function that can then later be called multiple times with different arguments.

For example:

{% highlight javascript %}

var abc = function(a, b, c) {
    return [a, b, c];
};

var curried = _.curry(abc);

curried(1)(2)(3);
// => [1, 2, 3]

curried(1, 2)(3);
// => [1, 2, 3]

{% endhighlight %}

Currying allows you to break up arguments passed by the number of arguments.

### Composing

Composing is when you take two functions and combine them.

For example:

{% highlight javascript %}

const consider = (name) => {
    return `I think it could be... ${name}`;
};

const exclaim = (statement) => {
    return `${statement.toUpperCase()}!`;
}

const blame  = _.compose(consider, exclaim);

blame('you);

// => 'I think it could be... YOU!'

{% endhighlight %}

[_.compose documentation](https://underscorejs.org/#compose)

## Advanced Scope: Closure

### Closure

{% highlight javascript %}

const myAlert = () => { // declare a function
    const x = 'Help! I think I found a clue!'; // save a string to the constant x
    const alerter = () => { // declare another function
        alert(x); // send an alert to the DOM
    };
    alerter();
};

myAlert(); // invoke the function

{% endhighlight %}

### Closure, Part 2

{% highlight javascript %}

const myAlert = () => {
    const x = 'Help! I think I found a clue!';
    const alerter = () => {
        alert(x);
    };

    setTimeout(alerter, 1000); // wait for 1000ms
    console.log('what happens first? this log or the alert?'); // the log appears first
};

myAlert(); // invoke the function

{% endhighlight %}

### Creating Closure

{% highlight javascript %}

const myAlert = () => {
    const x = 'Help! I think I found a clue!';
    let count = 0;
    const alerter = () => {
        alert(`${x} ${++count}`);
    };

    return alerter
};

const funcAlert = myAlert(); // creates a new execution context of the myAlert function
const funcAlert2 = myAlert(); // creates a new execution context of the myAlert function
funcAlert(); // since myAlert ultimately returns the alerter function, this will run the alerter function again from within the new execution context that has been created by funcAlert

{% endhighlight %}

If you continue to call `funcAlert();`, the `count` value would continue to increase by 1 each time the function is called and it would be independent of the execution contect of `funcAlert2();`; which would still be at 0 until called.

### Closure Demonstration

{% highlight javascript %}

const newClue = (name) => {
    const length = name.length;

    return (weapon) => {
        let clue  = length + weapon.length;
        return !!(clue % 1);
    };
};

{% endhighlight %}

{% highlight javascript %}

function countClues() {
    var n = 0;
    return {
        count: function() { return ++n; },
        reset: function() { return n = 0; }
    };
};

{% endhighlight %}

With the above function, you can create separate execution contexts by declaring variables that are equal to the function `countClues()`; i.e. `counter = countClues(); counter2 = countClues;`

### Closure Recipe

[Here is the slide for the closure recipe](http://slides.com/bgando/f2f-final-day-2#/3/7)

A closure is when a function is inside of another function and it creates scope isolation. This can be acheived by returning a function from within a function which allows the function to retain access to its parent scope even after it has been executed.

The recipe for a closure is as follows:

1. Create your parent function

2. Define some variables in the parent function's local scope

3. Define a function inside the parent function. This is called a child

4. Return the child function from inside the parent function

The execution piece of a colsure is as follows:

1. Run the parent function and save it to a variable. This variable will now hold whatever the parent function returns; i.e. the child function

2. Optional... Check what the variable now holds as it value, it should be the child function

3. Run the inner function by calling your newly created variable

4. What happened?

{% highlight javascript %}

const findSomeone = () => {

    const speak = () => {
        console.log(who);
    };

    let who = "Why hello there, Prof Plum!";

    return speak;
};

{% endhighlight %}

{% highlight javascript %}

const makeTimer = () => {
    let elapsed = 0;

    const stopwatch = () => { return elapsed; };

    const increase = () => elapsed++;

    setInterval(increase, 1000);

    return stopwatch;

};

let timer = makeTimer();

{% endhighlight %}

Same as above, but with console.log(s)

{% highlight javascript %}

const makeTimer = () => {
    console.log('initialized);
    let elapsed = 0;
    console.log(elapsed);

    const stopwatch = () => {
        console.log('stopwatch);
        return elapsed;
    }

    const increase = () => elapsed++;

    return stopwatch;
};

const timer = makeTimer();

{% endhighlight %}

### Currying and Componsing Exercises

Skips right to solutions...

### Currying and Componsing Solutions

Currying

{% highlight javascript %}

const curry = (fn) => {
    return (arg) => {
        return (arg2) => {
            return fn(arg, arg2)
        }
    }
}

{% endhighlight %}

Composing

{% highlight javascript %}

const compose = (fn, fn2) => {
    return (arg) => {
        const result = fn2(arg);
        return fn(result);
    };
};

{% endhighlight %}

## Wrapping Up "JavaScript: From Fundamentals to Functional JS"

### Wrapping Up

We covered functional utility methods, scope, functions, objects, and arrays. Mostly covered in ES5 with some ES6 thrown in. Moving forward, use and apply what you have learned in future courses.