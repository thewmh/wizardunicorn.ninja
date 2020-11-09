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

[Link to the course's code exercises](https://static.frontendmasters.com/resources/2019-03-07-deep-javascript-v2/deep-js-foundations-v2-exercises.zip)

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

NaN does not mean 'not a number', it means 'invalid number'. Zero is not a number to use when you would like to indicate that there is no value, because zero has value. NaN is basically a number that has no value. NaN with any other mathematically valid number will return NaN. NaN is not equal to NaN. NaN is the only value that is not equal to itself. The `isNan` utility coerces values to numbers before checking its value. `Number.isNan` does not do any coercion. Using this utility, you can determine with certainty whether a value is actually NaN or not; returns `true` or `false`. `typeof NaN` is a number.

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

They can be used with `new`, but you should not use that keyword with them. `String(), Number(), and Boolean()` automatically coerce whatever value is passed into them into that Primitive Type, and that behavior is more useful than making an object out of them.

## Coercion

### Abstract Operations

From ECMAScript documentation:

> The ECMAScript language implicitly performs automatic type conversion as needed. To clarify the semantics of certain constructs it is useful to define a set of conversion abstract operations. The conversion abstract operations are polymorphic; they can accept a value of any ECMAScript language type. But no other specification types are used with these operations.

AKA coercion

The first abstract operation we are looking at is `ToPrimitive`. This abstract operation takes an optional `type` hint. The algorithms in JavaScript are recursive, so if we pass something that cannot be coerced into a Primitive Type, `ToPrimitive()` will re-run until it either finds a type that it can set or error out. The way that `ToPrimitive` works is, by way of hint, trying either `valueOf()` or `toString()` the order of which depends on the 'hint' you have passed in (number or string).

### toString

`ToString` takes any value and gives us the representation of that value in string form. One of the corner-cases of `ToString` is that is coerces '-0' to '0'. Calling `ToString` on an array removes the brackets, nulls and undefined(s) get left out. On an object, `ToString` will write "[object Object]". You can overwrite `ToString` to behave however you want i.e. JSON.stringify an object.

### toNumber

`ToNumber` takes any value and gives us the representation of that value in numeric form. One strange behavior is turning empty quotes to the number 0. It strips off leading zeros and can handle hexadecimal values. `null` is coerced to '0' and `undefined` is 'NaN'. When `ToNumber` is used on an object, the algorithm will eventually hit 'valueOf()' and then 'toString()' and return `NaN`. On an array, empty strings are coerced to 0. 

### toBoolean

Anytime you have any value that is not a boolean and you need a boolean value, `ToBoolean()` will eventually be used. Essentially, there is a lookup table that qualifies values as either Falsy or Truthy. Falsy values are: `"", 0, -0, null, NaN, false, undefined` Truthy values are basically any value not listed under 'falsy values', some examples: `"foo", 23, {a:1}, [1,3], true, function(){..}`. The list of truthy values is quite long. 

### Cases of Coercion

Template literal strings (available since ES6) coerce values into different types. The plus operator spec states that if either side of the plus is a string, the `ToString` method will be invoked. The remainder of this section stresses the importance of understanding when and why coercion occurs and being intentional with how you are using it in your applications. For `Boolean` values specifically, the instructor recommends only coercing `undefined, null, or {}`. There are too many corner cases with numbers and strings to make using `Boolean` coercion make sense.

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

Most developers tend to think that implicit mechanisms are magical. That when something happens behind the scenes and it wasn't obvious, then it's some sort of magic. And we tend to equate magic with bad. This is a predominant reason why anti-coercion perspective exists, because people feel like the implicitness of coercion is the downfall. Where they point to the explicitness of type casting in something like Java or C++. Like you would never automatically convert a number into some sort of float or something, but JavaScript does all this sort of automatic stuff and then they say that's a weakness of JavaScript because it's  magical and bad. It is actually neither bad nor magical, but abstraction.

Not all abstractions are good, but some are necessary. Implicitness, in functional programming, actually makes the implicitness more explicit. Implicitness is not bad, it is the proper use of abstraction. We want to hide key unnecessary details to re-focus the reader and increase clarity. Part of the reason that JavaScript has such a low point of entry is that it does not force the user to focus on such fine details. It would betray JavaScript's DNA to say that anything implicit should be avoided. Take the following examples:

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

**"If a feature is sometimes useful and sometimes dangerous and if there is a better option then always use the better option".**

**--Doug Crawford**

But what is useful and what is dangerous? Only what Doug thinks is useful or dangerous? Is there a universal definition for what is useful or dangerous? And what about 'better option'? How is that measured? This statement is not useful in its abstract sense.

As defined by the instructor:

Useful: When the reader is focused on what is important.

Dangerous: When the reader cannot tell what will happen.

Better: When the reader understands the code.

The takeaway is this; It is irresponsible to knowingly avoid usage of a feature that can improve code readability.

### Coercion Exercise

**Working With Coercion**

In this exercise, you will define some validation functions that check user inputs (such as from DOM elements). You'll need to properly handle the coercions of the various value types.

**Instructions**

1. Define an `isValidName(..)` validator that takes one parameter, `name`. The validator returns `true` if all the following match the parameter (`false` otherwise):

	- must be a string
	- must be non-empty
	- must contain non-whitespace of at least 3 characters

2. Define an `hoursAttended(..)` validator that takes two parameters, `attended` and `length`. The validator returns `true` if all the following match the two parameters (`false` otherwise):

	- either parameter may only be a string or number
	- both parameters should be treated as numbers
	- both numbers must be 0 or higher
	- both numbers must be whole numbers
	- `attended` must be less than or equal to `length`

### Coercion Exercise Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

function isValidName(name) {
    if (
        typeof name == "string" &&
        name.trim().length >= 3
        ) {
            return true;
    }
    return false;
}

function hoursAttended(attended, length) {
    if (
        typeof attended == "string" &&
        attended.trim() != "" 
    ) {
        attended = Number(attended);
    }

    if (
        typeof length == "string" &&
        length.trim() != "" 
    ) {
        length = Number(length);
    }

    if (
        typeof attended == "number" &&
        typeof length == "number" &&
        attended >= 0 &&
        length >= 0 &&
        Number.isInteger(attended) &&
        Number.isInteger(length) &&
        attended <= length
    ) {
        return true;
    }
    return false
}

{% endhighlight %}
{% endcapture %}{% include details.html %} 


## Equality

### Double & Triple Equals

`==` checks value (loose) and `===` checks value and type (strict)? This is a very common misconception. **If you're trying to understand your code, it's critical that you learn to think like JavaScript.**  Check the JavaScript specification for [Abstract Equality Comparison](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-abstract-equality-comparison) and [Strict Equality Comparison](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-strict-equality-comparison) to dig deeper into the difference between `==` and `===`. When the types of the two elements you are comparing with `==` are the same, then (according to the spec) the `===` is performed. Ideally, you should try to have the value types and make that obvious as much as possible. You should not be doing equality comparisons when you have no idea what the types are.

For `===` if the types are different, it returns `false`. The basic difference between `==` and `===` is whether or not we are going to allow any coercion to occur. JavaScript's equality is based on identity, not structure. Consider the following:

{% highlight javascript %}

let workshop1 = {
    name: "Deep JS Foundations"
};

let workshop2 = {
    name: "Deep JS Foundations"
};

if (workshop1 == workshop2) {
    // never going to get here...
}

if (workshop1 === workshop2) {
    // never going to get here...
}

{% endhighlight %}

While, the above elements may be of the same type, they are effectively different from one another. However, if `workshop2 = workshop1` then we could get a true statement to return from a comparison of these two objects.

In summary, `==` allows coercion (types different), `===` disallows coercion (types same).

### Coercive Equality

*Like every other operation, is coercion helpful in an equality comparison or not?* You should consider that statement whenever making a decision to use coercion. Again, driving home the point to be a critical, analytical thinker vs. a code monkey. The decision between using `==` or `===` is a trailing indicator to whether you truly understand your program or not. It is perhaps better to get to the root of why you would be using `===`... do you truly not know what `types` of data your function will be working with? How can you fix that? If you can solve this issue, deciding and making obvious what your types are, you will find that you have better code with fewer bugs.

Through coercive equality, you have the option to treat the `null` and `undefined` values as equal (read the spec...). Which of the following is 'better'?:

{% capture summary %}Click to view the code{% endcapture %}
{% capture details %}  
{% highlight javascript %}

var workshop1 = { topic: null };
var workshop2 = {};

if (
    (workshop1.topic === null || workshop1.topic === undefined) &&
    (workshop2.topic === null || workshop2.topic === undefined)
) {
    // ..
}

if (
    workshop1.topic == null &&
    workshop2.topic == null
) {
    // ..
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

Arguably, the second `if` statement is more concise and readable, and since we know that `null == undefined` this would work exactly the same as the first `if` statement. This is an example of using coercive equality. 

### Double Equals Algorithm

According to the Abstract Equality Comparison algorithm, if one of the operators is a number and the other is a string or boolean, it will convert the non-numeric operator into a number using `ToNumber()`. Whether or not you like how the algorithm functions is not relevant, understanding how it works and why you've received a certain outcome from using the algorithm is what matters.

**`==` prefers numeric comparison.**

Considering the above, which of the below `if` statements is more concise?

{% capture summary %}Click to view the code{% endcapture %}
{% capture details %}  
{% highlight javascript %}

var workshopEnrollment1 = 16;
var workshopEnrollment2 = workshop2Elem.value();

if (Number(workshopEnrollment1) === Number(workshopEnrollment2)) {
    // ..
}

if (workshopEnrollment1 == workshopEnrollment2) {
    // ..
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

Arguably, the second comparison is cleaner, especially if we can guarantee that either variable will only ever be a number or a string. The coercion that would occur from using `==` would be acceptable for this use case. You can choose to structure your code in such a way that coercion is a useful and obvious system, rather than the complex magic that some people feel it to be. If you invoke `==` with something that is not already of a primitive type, it will invoke `ToPrimitive()` on that.

### Double Equals Walkthrough

If you wrote a function like this:

{% capture summary %}Click to view the code{% endcapture %}
{% capture details %}  
{% highlight javascript %}

var workshop1Count = 42;
var workshop2Count = [42];

if (workshop1Count == workshop2Count) {
    // ..
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

What would happen? Would it work coercively? In the above case, yes... but should it? More importantly, why would it work? Why would a number somehow be coercively equal to an array holding that number? According to the specification, the `==` algorithm would execute in the following way:

{% capture summary %}Click to view the code{% endcapture %}
{% capture details %}  
{% highlight javascript %}

var workshop1Count = 42;
var workshop2Count = [42];

// if (workshop1Count == workshop2Count) {
// if (42 == "42") {
// if (42 === 42) {
if (true) {
    // ..
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

The array gets transformed into its primitive type, which is a stringified version of the array ("42"). Then, 42 is compared to the string "42". The `==` algorithm prefers numeric comparison, therefore the string "42" is now turned into the number 42. And now that both operators are the same type, `==` will do a `===` comparison and finally return true. All of this is an example of when coercion could be a bad thing for a developer. Just because this works does not mean that you should use it. You should reduce the surface area and not make a comparison between numbers and arrays of numbers. The fix for this would not be to use a `===` comparison, but to actually fix the problem, the comparison between two things that are not the same type. Fix it so that the comparisons that you are making make sense.

### Double Equals Summary

If the types are the same: `===`
If `null` or `undefined`: equal
If non-primitives: `ToPrimitive()`
Prefer: `ToNumber()`

### Double Equals Corner Cases

{% highlight javascript %}

[] == ![]; // true

// Under no circumstances would you compare a value to the negation of itself. BUT... here's why it works

var a = [];
var b = [];

// if(a == !b) {
// if([] == false) { reduce a to its value, an array, and negate b, an array which is truthy
// if("" == false) { non-primitive compared to a primitive, turn the array into a primitive, it becomes a string
// if(0 == false) { non-same types, convert to a number
// if(0 == 0) {
if(true) {
    // Works...
}

// This is the more sensible AND likely way you may use coercion in development, by comparing
// whether two variables of the same type are equal to one another

// if (a != b) {
// if (!(a == b)) {
// if (!(false)) {
if(true) {
    // Works...
}

{% endhighlight %}

### Corner Cases: Booleans

Just don't do this... If you want to all the boolean conversion of an array to be true, that's fine. 

{% highlight javascript %}

var a = [];

// if(a) {
// if(Boolean(a)) {
if(true) { // the if statement will invoke the toBoolean operation on the array 
    // Works...
}

// if (a == true) { converts non-primitive [] to a primitive
// if ("" == true) { [] becomes a string
// if (0 === 1) { converts both to numbers
if (false) {
    // Nope...
}

// if (a == false) { converts non-primitive [] to a primitive
// if ("" == false) { [] becomes a string
// if (0 === 0) { converts both to numbers
if (true) {
    // Works...
}

{% endhighlight %}

The comparison of `[] == true || false` is unnecessarily complicating the above code. It is simpler, and also more understandable, to just have JavaScript perform the `Boolean` operation on the original array instead of comparing it to true or false. In this case, implicit coercion does not have a gotcha whereas the explicit coercion does.

### Corner Cases: Summary

How to avoid these corner cases with `==`.

**Avoid**

1. `==` with 0 or "" or " " - when either value of the comparison can one of these values

2. `==` with non-primitives

3. `==` true or `==` false : allow ToBoolean or use `===`

### The Case for Double Equals

You should prefer `==` in all cases. Knowing `types` is always better than not knowing them. Static Types is **not** the only (or even necessarily best) way to know your types. `==` is not about comparisons with unknown types. It's best to not use `==` when you do not know the types. `==` is about comparisons with known types, optionally when conversions are helpful.

If you know the types in a comparison:

If both types are the same, `==` is identical to `===`

Using `===` would be unnecessary so prefer the shorter `==`

If the types are different, using `===` would break

Prefer the more powerful `==` or don't compare at all

If the types are different, the equivalent of `==` would  be  two (or more) `===` (i.e. slower)

Prefer the faster `==` over multiple `===`

If the types are different, two (or more) `===` comparisons may distract the reader

Prefer the cleaner `==`

All of the above suggestions are only applicable if you can ensure that the reader of your code can be certain of your types. When you know the types, `==` is the more sensible choice.

If you do not know the types:

Not knowing the types means not fully understanding the code

If possible, refactor the code

The uncertainty of not knowing the types should be obvious to the reader

The most obvious signal about the uncertainty of types is `===`

Not knowing the types is equivalent to assuming type conversion / coercion

Because of corner cases, the only *safe* choice is `===`

If you can't or won't use known and obvious types, `===` is the only reasonable choice. Even if `===` would always be equivalent to `==` in your code, using it *everywhere* sends a wrong semantic signal: "Protecting myself since I don't know/trust the types". Making your types known and obvious leads to better code. If types are known, `==` is best. Otherwise, fall back to `===`.

### Equality Exercise

#### Wrangling Equality

In this exercise, you will define a `findAll(..)` function that searches an array and returns an array with all coercive matches.

##### Instructions

1. The `findAll(..)` function takes a value and an array. It returns an array.

2. The coercive matching that is allowed:

	- exact matches (`Object.is(..)`)
	- strings (except "" or whitespace-only) can match numbers
	- numbers (except `NaN` and `+/- Infinity`) can match strings (hint: watch out for `-0`!)
	- `null` can match `undefined`, and vice versa
	- booleans can only match booleans
	- objects only match the exact same object


### Equality Exercise Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

function findAll(match, arr) {
    var ret = [];

    for (let v of arr) {
        if (Object.is(match, v)) {
            ret.push(v);
        }
        else if (match == null && v == null) {
            ret.push(v);
        }
        else if (typeof match == "boolean" && typeof v == "boolean") {
            if (match == v) {
                ret.push(v);
            }
        }
        else if (typeof match == "string" && match.trim() != "" && typeof v == "number" && !Object.is(-0, v)) {
            if (match == v) {
                ret.push(v);
            }
        }
        else if (typeof match == "number" && !Object.is(match, -0) && !Object.is(match, NaN) && !Object.is(match, Infinity) && !Object.is(match, -Infinity) && typeof v == "string" && v.trim() != "") {
            if (match == v) {
                ret.push(v);
            }
        }
    }
    return ret;
}

function setsMatch(arr1,arr2) {
	if (Array.isArray(arr1) && Array.isArray(arr2) && arr1.length == arr2.length) {
		for (let v of arr1) {
			if (!arr2.includes(v)) return false;
		}
		return true;
	}
	return false;
}

// tests:

var myObj = { a: 2 };

var values = [
	null, undefined, -0, 0, 13, 42, NaN, -Infinity, Infinity,
	"", "0", "42", "42hello", "true", "NaN", true, false, myObj
];

console.log(setsMatch(findAll(null,values),[null,undefined]) === true);
console.log(setsMatch(findAll(undefined,values),[null,undefined]) === true);
console.log(setsMatch(findAll(0,values),[0,"0"]) === true);
console.log(setsMatch(findAll(-0,values),[-0]) === true);
console.log(setsMatch(findAll(13,values),[13]) === true);
console.log(setsMatch(findAll(42,values),[42,"42"]) === true);
console.log(setsMatch(findAll(NaN,values),[NaN]) === true);
console.log(setsMatch(findAll(-Infinity,values),[-Infinity]) === true);
console.log(setsMatch(findAll(Infinity,values),[Infinity]) === true);
console.log(setsMatch(findAll("",values),[""]) === true);
console.log(setsMatch(findAll("0",values),[0,"0"]) === true);
console.log(setsMatch(findAll("42",values),[42,"42"]) === true);
console.log(setsMatch(findAll("42hello",values),["42hello"]) === true);
console.log(setsMatch(findAll("true",values),["true"]) === true);
console.log(setsMatch(findAll(true,values),[true]) === true);
console.log(setsMatch(findAll(false,values),[false]) === true);
console.log(setsMatch(findAll(myObj,values),[myObj]) === true);
console.log(setsMatch(findAll(null,values),[null,0]) === false);
console.log(setsMatch(findAll(undefined,values),[NaN,0]) === false);
console.log(setsMatch(findAll(0,values),[0,-0]) === false);
console.log(setsMatch(findAll(42,values),[42,"42hello"]) === false);
console.log(setsMatch(findAll(25,values),[25]) === false);
console.log(setsMatch(findAll(Infinity,values),[Infinity,-Infinity]) === false);
console.log(setsMatch(findAll("",values),["",0]) === false);
console.log(setsMatch(findAll("false",values),[false]) === false);
console.log(setsMatch(findAll(true,values),[true,"true"]) === false);
console.log(setsMatch(findAll(true,values),[true,1]) === false);
console.log(setsMatch(findAll(false,values),[false,0]) === false);

{% endhighlight %}
{% endcapture %}{% include details.html %}

The point of this exercise was to drive home the point that coercion can be safe when you have eliminated the corner cases and made it obvious that you have done so.

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