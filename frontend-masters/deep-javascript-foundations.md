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

{% endhighlight %}

Coming soon functionality, does not behave like a standard number primitive type. It will be important to know the difference between a 'number' and a 'bigint'.

### Kinds of Emptiness

undefined vs. undeclared vs. uninitialized

These words are not synonymous, in JavaScript they are two entirely different concepts. `undeclared` means that the variable does not exist, `undefined` means that the variable exists, but has no value. `uninitialized` means the variable has never been initialized.

### NaN & isNaN

NaN does not mean 'not a number', it means 'invalid number'. Zero is not a number to use when you would like to indicate that there is no value, because zero has value. NaN is basically a number that has no value. NaN with any other mathmatically valid number will return NaN. NaN is not equal to NaN. NaN is the only value that is not equal to itself. The `isNan` utility coerces values to numbers before checking its value. `Number.isNan` does not do any coercion. Using this utility, you can determine with certainty whether a value is actually NaN or not; returns `true` or `false`. `typeof NaN` is a number.

### Negative Zero

The negative representation of the value zero. If you stringify -0, it returns as '0'. `-0 === 0` ? `true` negative zero is neither less than or greater than zero. Enter `Object.is()` which allows you to test for the negative zero. It can also be used to check NaN values. A negative zero could be used to track the direction an element was traveling when it gets to zero. If an element was traveling in a negative direction (towards zero), when it gets to zero, it would be useful to denote which direction it was traveling rather than just zero. Negative zero to the rescue!

### Type Check Exercise

Make a Polyfill for `Object.is(..)`

1. `Object.is(..)1 should take two parameters.

2. It should return `true` if the passed in parameters are exactly the same value (not just `===`), or `false` otherwise.

3. For `NaN` testing, you can use `Number.isNan(..)`, but first see if you can find a way to test without usage of any utility?

4. For `-0` testing, no built-in utility exists, but here's a hint: `-Infinity`.

5. If the parameters are any other values, just test them for strict equality.

6. You cannot use the built-in `Object.is(..)`

**Polyfill Pattern**

> Note: Since your JS environment probably already has `Object.is(..)`, to test your polyfill you'll have to first unconditionally define it (no `if` guard), and then add the `if` guard when you're done.

To define a polyfill, it looks like this:

{% highlight javascript %}

if (!Object.is) {
    Object.is = function ObjectIs(..) {..};
}

{% endhighlight %}

In the (Code Exercises)[https://static.frontendmasters.com/resources/2019-03-07-deep-javascript-v2/deep-js-foundations-v2-exercises.zip], the file `types-exercises > object-is > ex.js` you will find the file that has all of the `Object.is(..)` tests.

### Type Check Exercise Solution

{% highlight javascript %}

if (!Object.is || true) {
    Object.is = function ObjectIs(x, y) {
        var xNegZero = isItNegZero(x);
        var yNegZero = isItNegZero(x);

        if (xNegZero || yNegZero) {
            return xNegZero && yNegZero;
        } else if (isItNaN(x) && isItNaN(y)) {
            return true;
        } else {
            return x === y;
        }

        function isItNegZero(v) {
            return v == 0 && (1/v) == -Infinity;
        }

        function isItNaN(v) {
            return v !== v;
        }
    };
}

{% endhighlight %}

### Fundamental Objects

In addition to Primitive Values are Fundamental Objects. AKA Built-In Objects or Native Functions. Under the following circumstances, it is recommended to use the `new` keyword:

* Object()

* Array()

* Function()

* Date()

* RegExp()

* Error()

And with these, it is not recommended to use the `new` keyword:

* String()

* Number()

* Boolean()

They can be used with `new`, but you should not use that keyword with them. `String(), Number(), and Boolean()` automatically coerce whatever value is passed into them into that Primitive Type, and that behaviour is more useful than making an object out of them.

## Coercion

### Abstract Operations

From ECMAScript documentation:

> The ECMAScript language implicitly performs automatic type conversion as needed. To clarify the semantics of certain construsts it is useful to define a set of conversion abstract operations. The conversion abstract operations are polymorphic; they can accept a value of any ECMAScript language type. But no other specification types are used with these operations.

AKA coercion

The first abstract operation we are looking at is `ToPrimitive`. This abstract operation takes an optional `type` hint. The algorithims in JavaScript are recursive, so if we pass something that cannot be coerced into a Primitive Type, `ToPrimitive()` will re-run until it either finds a type that it can set or error out. The way that `ToPrimitive` works is, by way of hint, trying either `valueOf()` or `toString()` the order of which depends on the 'hint' you have passed in (number or string).

### toString

`ToString` takes any value and gives us the representation of that value in string form. One of the corner-cases of `ToString` is that is coerces '-0' to '0'. Calling `ToString` on an array removes the brackets, nulls and undefined(s) get left out. On an object, `ToString` will write "[object Object]". You can overwrite `ToString` to behave however you want i.e. JSON.stringify an object.

### toNumber

`ToNumber` takes any value and gives us the representation of that value in numeric form. One strange behaviour is turning empty quotes to the number 0. It strips off leading zeros and can handle hexidecimal values. `null` is coerced to '0' and `undefined` is 'NaN'. When `ToNumber` is used on an object, the algorithm will eventually hit 'valueOf()' and then 'toString()' and return `NaN`. On an array, empty strings are coerced to 0. 

### toBoolean

Anytime you have any value that is not a boolean and you need a boolean value, `ToBoolean()` will eventually be used. Esentially, there is a lookup table that qualifies values as either Falsy or Truthy. Falsy values are: `"", 0, -0, null, NaN, false, undefined` Truthy values are basically any value not listed under 'falsy values', some examples: `"foo", 23, {a:1}, [1,3], true, function(){..}`. The list of truthy values is quite long. 

### Cases of Coercion

Template literal strings (available since ES6) coerece values into different types. The plus operator spec states that if either side of the plus is a string, the `ToString` method will be invoked. The remainder of this section stresses the importance of understanding when and why coercion occurs and being intentional with how you are using it in your applications. For `Boolean` values specifically, the instructor recommends only coercing `undefined, null, or {}`. There are too many corner cases with numbers and strings to make using `Boolean` coercion make sense.

### Boxing

Accessing methods on primitive values occurs through a process called boxing, which is a form of implicit coercion. All programming languages have type conversions, because it is absolutely necessary. You will always have cases where you have a string where you need to deal with it as a number or a number that you have to deal with as a boolean.

### Corner Cases of Coercion

It is impossible to design a system that will not have corner cases. A lot of the corner cases have to deal with `Number`, `String` has a few as well. If you construct an instance of the boolean object and pass in false, it will return true. Not only does an empty string become zero, but so does any string that is full of white space. Booleans implicitly coerce themselves to numbers, which can be dangerous!

## Philosophy of Coercion

### Intentional Coercion

You cannot deal with type conversion corner cases by avoiding coercions. Instead, you have to adapt a coding style that makes value types plain and obvious. A quality JavaScript program embraces coercions, making sure the types involved in every operation are clear. Thus, corner cases are safely managed. Within your programs, you get to decide how to deal with coercion and it is in your best interest to pay attention to what you are doing by making them obvious in your code. JavaScript's dynamic typing is not a weakness, it is one of its strong qualities. It's one of the reasons JavaScript is so ubiquitous.

### Culture of Learning

You should use the tools as effectively as you can and when someone is on your code base that does not quite understand, you should work with them to raise their level of understanding. On our development teams, we should promote advancement amongst all team members. Be effective with your communication by writing clear and communicative code.

### Code Communication Q&A

You should not rely on code comments as a crutch for the code to explain itself. Code comments should tell you why something is doing something.

### Implicit Coercion

Most developers tend to think that implicit mechanisms are magical. That when something happens beneath the scenes and it wasn't obvious, then it's some sort of magic. And we tend to equate magic with bad. This is a predominant reason why anti-coercion perspective exists, because people feel like the implicitness of coercion is the downfall. Where they point to the explicitness of type casting in something like Java or C++. Like you would never automatically convert a number into some sort of float or something, but JavaScript does all this sort of automatic stuff and then they say that's a weakness of JavaScript because it's  magical and bad. It is actually neither bad nor magical, but abstraction.

Not all abstractions are good, but some are necessary. Implicitness, in functional programming, actually makes the implicitness more explicit. Implicitness is not bad, it is the proper use of abstraction. We want to hide key unnecessary details to re-focus the reader and increase clarity. Part of the reason that JavaScript has such a low point of entry is that it does not focus the user to focus on such fine details. It would betray JavaScripts DNA to say that anything implicit should be avoided. Take the following examples:

{% highlight javascript %}

var numStudents = 16;

console.log(
    `There are ${String(numStudents)} students.`
);
// "There are 16 students."

var numStudents = 16;

console.log(
    `There are ${numStudents} students.`
);
// "There are 16 students."

{% endhighlight %}

The second example is more readable and is a fine example of implicit coercion not being a bad or magical thing. And in this example:

{% highlight javascript %}

var workshopEnrollment1 = 16;
var workshopEnrollment2 = workshop2Elem.value;

if(Number(workshopEnrollment1) < Number(workshopEnrollment2)) {
    //...
}

if(workshopEnrollment1 < workshopEnrollment2) {
    //...
}

{% endhighlight %}

If both of the numbers are strings, JavaScript wouldn't turn them into numbers, the less than operator will do an alphanumeric comparison. Again, if you can guarantee that each of the variables for the less than comparison would be numbers, then the second version of the if statement is just fine and we can deal with implicit coercion without fear. If you have the choice to use coercion but it's not obvious, it would be in your purview to make it obvious. If you communicate your intent, it will not trip up other readers of your code. Is showing the extra details helpful to the reader (of your code) or not? Sometimes yes, sometimes no. Be a critical and analytical thinker, be an engineer and not a code monkey!

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