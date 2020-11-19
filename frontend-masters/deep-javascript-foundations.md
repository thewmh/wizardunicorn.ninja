---
title: "Deep JavaScript Foundations, v3"
description: These are notes from the 'Deep JavaScript Foundations, v3' course on Frontend Masters.
permalink: /frontend-masters/deep-javascript-foundations

layout: page
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

The instructor does not use TypeScript or Flow, because he believe that they are solving problems in a way that makes his code worse. But... here are some details:

Benefits:

1. Catch type-related mistakes - very useful!

2. Communicate type intent - makes code more obvious

3. Provides IDE feedback - 🔥

Caveats:

1. inferencing is best-guess, not a guarantee

2. Annotations are optional - need to opt-in

3. Any part of the application that isn't typed introduces uncertainty

### Inferencing

Consider the following:

{% highlight javascript %}

var teacher = "You";

// ..

teacher = { name: "You" };
// Error: can't assign object to string

{% endhighlight %}

The above is an example of static typing that comes with the use of TypeScript or Flow. Because you initially set the value of `teacher` to a string, these statically typed systems will infer that `teacher` should always be a string... but what if you want to reassign `teacher` to hold an object? You're SOL. You can also strictly declare that `teacher` should only ever be a string:

{% highlight javascript %}

var teacher: string = "You";

// ..

teacher = { name: "You" };
// Error: can't assign object to string

{% endhighlight %}

...and you would of course see the same error as before.

### Custom Types

{% highlight javascript %}

type student = { name: string };

function getName(studentRec: student): string {
    return studentRec.name;
}

var firstStudent: student = { name: "Frank" };

var firstStudentName: string = getName(firstStudent);

{% endhighlight %}

With TypeScript and Flow, you can define custom types. The above defines that an object of a type that has a property called name that is of type string. You can pass values of that type as parameters and receive values back as parameters. Any of the above only works based on the 'guarantee' that things are assigned correctly.

### Validating Operand Types

Something undervalued about TypeScript is that it can tell us that certain operations would be invalid. The following would produce an error in TypeScript:

{% highlight javascript %}

var studentName: string = "Frank";

var studentCount: number = 16 - studentName;
// error: can't subtract string

{% endhighlight %}

The only issue with how TypeScript handles the above, in the instructors opinion, is the inability to change how TypeScript handles coercion on a case-by-case basis. 

### TypeScript & Flow Summary

If you are interested in the differences and similarities between TypeScript and Flow, [check out this article](https://github.com/niieani/typescript-vs-flowtype). TypeScript and Flow are very useful in that a lot of people are finding them to be helpful to solve their typing issues, helpful to make their types more obvious. The only issue is that you are unable to configure these.

### Static Typing Pros

They make types more obvious in code.

Familiarity: they look like other language's type systems.

Extremely popular nowadays. With TypeScript coming from Microsoft and Flow coming from Facebook, there is no doubt that these static typing systems are here to stay. Learning and using them is actually a pretty valuable tool to add to your toolset.

They are very sophisticated and good at what they do.

### Static Typing Cons

They use "non-JS-standard" syntax (or code comments). It is not very likely that these will be adopted into JavaScript spec.

They require a build process, which raises the barrier to entry. While build processes are common these days, it is nice to be able to just write vanilla JS and load it in the browser.

Their sophistication can be intimidating to those without prior formal types experience. The barrier to entry ramps up very quickly.

They focus more on "static types" (variables, parameters, returns, properties, etc.) than value types. JavaScript is a dynamically typed language, so static typing is kinda weird...

### Understanding Your Types

JavaScript has a (dynamic) type system, which uses various forms of coercion for value type conversion, including equality comparisons. However, the prevailing response seems to be: avoid as much of this system as possible, and use `===` to "protect" from needing to worry about types. Part of the problem with avoidance of whole swaths of JavaScript, like pretending `===` saves you from needing to know types, is that it tends to systemically perpetuate bugs. You cannot write quality JavaScript programs without knowing the types involved in your operations. Alternatively, many choose to adopt a different "static types" system layered on top. While certainly helpful in some respects, this is  "avoidance" of a different sort. Apparently, JavaScript's type system is inferior, so it must be replaced, rather than learned and leveraged. Many claim that JavaScript's type system is too difficult for newer devs to learn, and that static types are (somehow) more learnable.

Instructors claim: the better approach is to embrace and learn JavaScript's type system, and to adopt a coding style which makes types as obvious as possible. By doing so, you will make your code more readable and more robust, for experienced and new developers alike. As an option to aid in that effort, the instructor created [Typl](https://github.com/getify/TypL), which he believes embraces and unlocks the best parts of JavaScript's types and coercion. 

## Scope

### Scope

One of the three main pillars of JavaScript is its scope system and how it deals with scope. Specifically, lexical scope. What is the lexical scope mechanism of JavaScript?

Scope is where to look for things. But what are you looking for? All variables in a JavaScript application are either receiving the assignment of a value or you are retrieving the value of a variable. There is not other purpose for the existence of variables in JavaScript programs. It is extremely common for people to think about JavaScript as running top-down, line by line. But JavaScript is not an interpreted language (which would run top-down), it is a compiled language or at the very least, you could say it is parsed. There is some processing that has to happen before execution occurs.

An example of JavaScript being parsed would be having an error somewhere in your code that is thrown at runtime before any JavaScript has even been executed. How did JavaScript know the error was there if it is supposed to execute top-down? There must have been a processing step. Enter compiler theory... In compiler theory, there are essentially four steps (sometimes two are combined, so sometimes there are three steps); lexing and tokenization, parsing (which turns the stream of tokens into an Abstract Syntax Tree), the last step is code generation, which takes the abstract syntax tree and produces some kind of other executable form of the program.

The way that (JavaScript) processing happens before we first execute, is there is a stage where it goes through compilation and parsing, and it produces an abstract syntax tree. It also produces a plan for the lexical environment. That is, where all the lexical scopes are and what is going to be in them. It prepares this plan, and that is the executable code that is handed off to be executed by the other part of the JavaScript engine.

Understanding the above, it is important to think of JavaScript as a two-pass system rather than a single-pass. JavaScript organizes scopes with functions and blocks. 

### Compilation & Scope

{% highlight javascript %}

var teacher = "Kyle";

function otherClass() {
    var teacher = "Suzy";
    console.log("Welcome!");
}

function ask() {
    var question = "Why?";
    console.log(question);
}

otherClass(); // Welcome!
ask(); // Why?

{% endhighlight  %}

Looking at the above code, you can likely understand everything that will happen, but is that the entire picture? But how exactly does the JavaScript engine think about / handle this code? To understand the complete picture, we need to consider that JavaScript has both a compiler and a scope manager. These two pieces of JavaScript will help us complete the picture of what *exactly* is happening with the above code. The compiler and scope manager will have some back and forth while sorting through the JavaScript code to organize the code in terms of global scope and local scope. The first `var` and the functions will be in global scope while the `var`(s) inside of the functions will be in the local scope of their function(s). This is then handed over, as part of the execution plan, to the virtual (JavaScript) machine can run this code.

In a lexically scoped language, which JavaScript is, all of the scopes that we are dealing with are determined at compile time, not at run time. This allows the (JavaScript) engine to more efficiently optimize because everything is known.

### Executing Code

After the compiler and scope manager have had their pass at the JavaScript code, execution can happen. Now, the 'conversation' will be between the scope manager and the virtual machine (JavaScript engine). The virtual machine will try to run the code and at each step will check with the scope manager to see whether the references exist.

Key to understanding lexical scope: If JavaScript cannot find the reference to a variable that was declared within a scope, it (JavaScript) will go up a level (scope) to look for the reference and continue doing so until it finds the reference or has no additional scope to step through.

### Compilation and Scope Q&A

Reread the last two sections or read this [stolen from here](https://astronautweb.co/javascript-lexical-scope/):

A relatively basic concept in JavaScript is that each declared function creates its own scope. What gets a little more mind bending is the concept of a closure - a function which is able to remember and access its lexical scope even when that function is executing outside its lexical scope.

Lexical scope is the scope model used by the JavaScript language, which differs to some other languages which use dynamic scope. Lexical scope is the scope defined at lexing time.

#### So, what is lexing time?

This digs into the mechanics of how JavaScript engine works. Despite commonly being referred to as an interpreted language, JavaScript compiles code immediately before executing it. For example the statement: `var a = 2;` is split into two separate steps at lexing time:

`var a` This declares the variable in the scope, before code execution.
`a = 2` This assigns the value 2 to the variable a, if it is found in the available scope.
The lexing phase of compilation determines where and how all identifiers are declared, and thus how they will be looked up during execution. This is the same mechanism which results in “hoisting” variables. The variables are not actually moved within the source code, the declarations simply occur during the lexing phase and so the JavaScript engine is aware of these before execution.

Consider these examples:

Example 1:

{% highlight javascript %}

var a = 1;
console.log('a:', a); // a: 1

{% endhighlight %}

Example 2:

{% highlight javascript %}

console.log('a:', a); // a: undefined
var a = 1;

{% endhighlight %}

Example 3:

{% highlight javascript %}

console.log('a:', a); // Uncaught ReferenceError: a is not defined

{% endhighlight %}

Example 1 is straightforward and works as expected, however note the subtle difference between other two examples. Example 2 logs that the value of a is undefined, but the identifier a has itself been declared; compared with example 3 in which the identifier a has not been declared, hence resulting in a reference error.

This demonstrates that during the lexing phase, the JavaScript engine declares the variables first, before the following step in which the values are assigned to the identifiers - this is hoisting. Because functions are also defined at this time (lexing phase), we can say that lexical scope is based on where variables and blocks of scope exist at author time, and thus are locked down at the end of the lexing phase. Scope is not defined at runtime, rather it can be accessed at runtime.

Again, a closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.

{% highlight javascript %}
function foo() {  // 'scope of foo' aka lexical scope for bar
   var memory = 'hello closure';
   return function bar() {
      console.log(memory);
   }
}
 
// returns the bar function and assigns it to the identifier 'closure’;
const closure = foo();
 
closure(); // hello closure
{% endhighlight %}

So... lexical scope is the author-time scope created by a closure. It is the ‘outer’ scope of a function which is defined inside a closure.

### Code Execution: Finishing Up

Continues walking through the code in the 'Compilation & Scope' section above. Nothing that hasn't already been covered. Reread the first few sections of this unit.

### Lexical Scope Review

JavaScript is not an interpreted language, in the sense that it does not execute code line-by-line. Instead, JavaScript should be thought of as a two-pass processing. The first pass is compilation / parsing, during which the main thing that happens is the scope / plan is created and the identifiers are mapped. The second pass is execution. Let's walk through some code... again.

{% highlight javascript %}

var teacher = "Kyle";

function otherClass() {
    var teacher = "Suzy";
    console.log("Welcome!");
}

function ask() {
    var question = "Why?";
    console.log(question);
}

otherClass(); // Welcome!
ask(); // Why?

{% endhighlight  %}

The (compilation) process for the above code is something like this:

Compiler: Hey Scope Manager, I have a formal declaration for a variable called `teacher`, have you ever heard of that before?

Scope Manager: No, but I have created it in the global scope.

C: Hey Scope Manager, I have a formal declaration for `otherClass`, heard of it?

SM: No, but I have created it in the global scope.

C: BTW, that last thing, that was pointing at a function, so we need a new scope.

SM: Yep.

C: Great, inside of that function's scope I have another formal declaration for a variable called `teacher`, nahmean?

SM: No, but I have created it in the function's scope.

C: Fine. I have another formal declaration for `ask`, have you ever...?

SM: No, but I have created it in the global scope.

C: BTW, that last identifier, `ask`, that was pointing at a function, make a new scope.

SM: Yeah, ok. A new scope has been made for the `ask` identifier which points at a function.

C: Cool beans. Inside of *that* function scope, I have a formal declaration for a variable called `question`, have you ever?

SM: Nope, but I have created it in the function's scope.

With no additional declarations in the global scope, the compilation is complete. Time to process / execute the code.

Execution Engine: Hey Scope Manager, I have a target reference for `teacher`, ever heard of it?

Scope Manager: Yep, here it is!

EE: Hey Scope Manager, now I have a source reference for `otherClass`, have you ever heard of that?

SM: Yep, here it is!

EE: Great. Inside of that scope I have a target reference for `teacher`, heard of it?

SM: Yep, here it is!

EE: Ok, now I have a source reference for `console`, have you (local scope) ever heard of it?

SM: Nope, let me go up a level (to global scope) and check.

EE: Alright then, global scope, have you ever heard of `console`?

SM: Yeah, here it is. You have access to any methods or properties on this object.

EE: 🔥❗️ Now I have another source reference, this time for something called `ask`?

SM: Sure, I have heard of it, here it is.

EE: Cool. Now in this functions local scope there is a target reference to `question`, have you heard of that?

SM: Yep, here it is.

EE: Awesome, now I have another source reference for `console`, (local scope) have you heard of it?

SM: Nope, let me go up a level (to global scope) and check.

EE: Have you (global scope) heard of `console`?

SM: Yes! You have access to any methods or properties on this object.

EE: But do you also have any knowledge of the source reference to something called `question`?

SM: Yep, here it is.

That completes the program. All of the above happens in a fraction of a millisecond, but it is important to understand how your JavaScript code is compiled and executed.

### Compilation Review

Another review, like the last section, but this time walking through the following code:

{% highlight javascript %}

var teacher = "Kyle";

function otherClass() {
    teacher = "Suzy";
    topic = "React";
    console.log("Welcome!");
}

otherClass(); // Welcome

teacher; // ??
topic; // ??

{% endhighlight %}

Try to walk through the code and have the conversion(s) of the two passes (compilation and execution) that JavaScript goes through.

### Dynamic Global Variables

In the last section, you can see a variable `topic` that was never (formally) declared. What happens? Is there an error or not? (un)Fortunately(?), there is no error, but a new global variable `topic` is created for you. This is maybe a 'bad' thing, but it is in fact how JavaScript handles this undeclared variable. It comes from the early days of JavaScript when it was considered that people may forget to (formally) declare a variable, and instead of erroring out, one would be created. So forgiving!

But if you turn on 'strict mode', the 'auto' creation of an undeclared variable would behave differently.

### Strict Mode

Turning on strict mode `"use strict"` would throw a ReferenceError for the undeclared variable in the previous section. Use strict mode! Most transpilers use strict mode for you. That's nice. Using strict mode vs. not can introduce some different behaviors for how errors are handled, for example sometimes in non-strict mode errors will be handled silently, but if you use strict mode, you will get feedback for your errors.

### Nested Scope

Now let's look at some code with a nested scope:

{% highlight javascript %}

var teacher = "Kyle";

function otherClass() {
    var teacher = "Suzy";

    function ask(question) {
        console.log(teacher, question);
    }

    ask("Why?");
}

otherClass(); // Suzy Why?
ask("????");

{% endhighlight %}

The final line of the above code would throw a ReferenceError because `ask()` does not exist in the global scope and therefore cannot be located.

### Undefined vs Undeclared

What is the difference between undefined and undeclared?

Undefined: A variable exists, but at the moment it has no value.

Undeclared: Never formally declared in any scope that we have access to.

### Lexical Scope Elevator

Imagine lexical scope as a building and current scope is the first floor of that building. If you do not find what you are looking for on the floor (scope) that you are on, keep going up until you either find it or not. Global scope is the top floor and if you do not find what you are looking for there, there is nowhere else to go.

# 🏢

## Scope & Function Expressions

### Function Expressions

{% highlight javascript %}

function teacher() { /* .. */ }

var myTeacher = function anotherTeacher() {
    console.log(anotherTeacher);
};

console.log(teacher);
console.log(myTeacher);
console.log(anotherTeacher);

{% endhighlight %}

`myTeacher` is a function expression. Unlike a function declaration, which adds any declarations into its own scope, a function expression
will add declarations within its own scope, which is not the same scope as its identifier. i.e. `myTeacher` is in the global scope, but `anotherTeacher` is in its own scope, as is anything declared within it.

The final line `console.log(anotherTeacher);` will throw a ReferenceError because `anotherTeacher` is not declared in the global scope.

What is a named function expression? It is a function expression that has a name...

{% highlight javascript %}

var clickHandler = function() {
    // ..
};

var keyHandler = function keyHandler() {
    // ..
};

{% endhighlight %}

The first function above is an anonymous function expression, while the second function is an example of a named function expression. It is suggested that you should 💯% prefer the named function expression over the anonymous function expression, like always, forever, because...

### Naming Function Expressions

Here's why you should always prefer named function expressions over anonymous function expressions:

1. A named function expression creates a reliable self-reference to the function from inside of itself. Useful if you are going to make the function recursive, useful if the function is an event handler and needs to reference itself to unbind itself, useful if you need to access any properties on the function, such as; its length or its name. **Any time** you need to have a self-reference to a function, the only answer is that it needs to have a name.

2. More debuggable stack traces. If you use a name for your function expression, it will show up in the stack trace.

3. More self-documenting code. If you have an anonymous function, it is a lot harder to determine exactly where an error may be and you have to look between the code and console to make that determination. If you have a named function expression, the process is simplified simply because the name appears with your errors.

The purpose of code is not to make it as convenient as possible for you to type, but to communicate clearly your intent. The argument is made that it is likely more clear and simple to instead use function declarations over function expressions. The purpose of a function name is to tell you, "why does this thing exist?".

### Arrow Functions

{% highlight javascript %}

var ids = people.map(person => person.id);

var ids = people.map(function getId(person) {
    return person.id;
});

{% endhighlight %}

Arrow functions are anonymous. The instructor believes that you should not be using arrow functions as a replacement for all other functions. Named (arrow) function expressions? You would be saving characters (used) be just using a function declaration *and* making your code more readable. More concise code != more readable code

### Function Types Hierarchy

Named Function Declaration > Named Function Expression > Anonymous Function Expression. This is not intended to be a hardline rule, you do have to look at the various use cases. But, they are organized in an order that provides a reader of you code with the most information to least.

### Function Expression Exercise

#### Function Expressions

In this exercise, you will be writing some functions and function expressions, to manage the student enrollment records for a workshop.

**Note:** The spirit of this exercise is to use functions wherever possible and appropriate, so consider usage of array utilities `map(..)`, `filter(..)`, `find(..)`, `sort(..)`, and `forEach(..)`.

#### Instructions (Part 1)

**Note:** In Part 1, use only function declarations or named function expressions.

You are provided three functions stubs -- `printRecords(..)`, `paidStudentsToEnroll()`, and `remindUnpaid(..)` -- which you must define.

At the bottom of the file you will see these functions called, and a code comment indicating what the console output should be.

1. `printRecords(..)` should:
	- take a list of student Ids
	- retrieve each student record by its student Id (hint: array `find(..)`)
	- sort by student name, ascending (hint: array `sort(..)`)
	- print each record to the console, including `name`, `id`, and `"Paid"` or `"Not Paid"` based on their paid status

2. `paidStudentsToEnroll()` should:
	- look through all the student records, checking to see which ones are paid but **not yet enrolled**
	- collect these student Ids
	- return a new array including the previously enrolled student Ids as well as the to-be-enrolled student Ids (hint: spread `...`)

3. `remindUnpaid(..)` should:
	- take a list of student Ids
	- filter this list of student Ids to only those whose records are in unpaid status
	- pass the filtered list to `printRecords(..)` to print the unpaid reminders

#### Instructions (Part 2)

Now that you've completed Part 1, refactor to use **only** `=>` arrow functions.

For `printRecords(..)`, `paidStudentsToEnroll()`, and `remindUnpaid(..)`, assign these arrow functions to variables of such names, so that the execution still works.

As the appeal of `=>` arrow functions is their conciseness, wherever possible try to use only expression bodies (`x => x.id`) instead of full function bodies (`x => { return x.id; }`).


### Function Expression Solution: Functions

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

function getStudentById(studentId) {
    return studentRecords.find(function matchId(record) {
        return (record.id == studentId);
    });
}

function printRecords(recordIds) {
    let records = recordIds.map(getStudentById);

    records.sort(function sortByNameAsc(record1, record2) {
        record1.name < record2.name ? -1 : record1 > record2.name ? 1 : 0;
    });

    records.forEach(function printRecord(record) {
        console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
    });
}

function paidStudentsToEnroll() {
	var idsToEnroll = studentRecords.filter(function needsToEnroll(record) {
        return (record.paid && !currentEnrollments.includes(record.id))
    })
    .map(function getStudentId(record) {
        return record.id;
    })

    return [ ...currentEnrollment, ...idsToEnroll ];
}

function remindUnpaid(recordIds) {
	var unpaidIds = recordIds.filter(function isUnpaid(studentId) {
        var record = getStudentById(studentId);
        return !record.paid;
    });

    printRecords(unpaidIds);
}

// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/

{% endhighlight %}
{% endcapture %}{% include details.html %} 

### Function Expression Solution: Arrow Functions

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

var getStudentById = studentId =>
    studentRecords.find(
        record => record.id == studentId
    );

var printRecords = recordIds =>
    recordIds.map(getStudentById)
    .sort(
        (record1, record2) => (record1.name < record2.name ? -1 : record1.name > record2.name ? 1 : 0)
    )
    .forEach(
        record => console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`)
    );

var paidStudentsToEnroll = () => [
    ...currentEnrollment,
    ...(
        studentRecords.filter(
            record => (record.paid && !currentEnrollment.includes(record.id))
        )
        .map(record => record.id)
    )
]

var remindUnpaid = recordIds => 
    printRecords(
    recordIds.filter(
        studentId => !getStudentById(studentId).paid
    ))

// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/

{% endhighlight %}
{% endcapture %}{% include details.html %}

## Advanced Scope

### Lexical & Dynamic Scope

The idea of nested scope and that a compiler, parser, and processor is figuring out all the scope ahead of time before being executed, this is **lexical scope**. The vast majority of programming languages are lexically scoped.

Another model for scoping is dynamic scoping. Bash script is an example of a dynamically scoped language.

Lexical scope is fixed at author time and is not affected by run time conditions. Dynamic scoping, as the name implies, means that scope can be affected at run time.

### Lexical Scope

Lexical scope is popular because it can be optimized. When you are compiling code, defining variables and functions, etc, at run time there is no additional computation required. Conceptually, you can think of your programs scope as bubbles. There is a bubble around each function, and another around any nested functions, and one globally. You may be able to find a plugin that helps visualize your scopes as well! `vscode-levels`

### Dynamic Scope

In a dynamically scoped language (not JavaScript), the value assigned to a variable is dependent on where it was called from. Consider the following:

{% highlight javascript %}

var teacher = "Kyle";

function ask(question) {
    console.log(teacher, question);
}

function otherClass() {
    var teacher = "Suzy";

    ask("Why?");
}

otherClass():

{% endhighlight %}

In the above code, what is the value of `teacher` in the `ask` function? In a lexically scoped language (JavaScript), the value of teacher would come from the global scope, because the `ask` function does not have any reference to the `teacher` variable, so the value of `teacher` would be `"Kyle"`. But in a dynamically scoped language (not JavaScript), the value of `teacher` would depend on where the `ask` function was called from, in this case `otherClass`. In `otherClass`, the value of `teacher` is `"Suzy"`, so in the `ask` function, `teacher` would return `"Suzy"`.

This can be quite flexible, but it is not how JavaScript works...

Dynamic Scope is determined by the conditions at run time. Even though JavaScript does not have dynamic scoping, there is a feature of the language that allows us to use this type of behavior which will be discussed in a later unit.

### Function Scoping

How would you fix an issue where you want/need to have two variables have the same name without them colliding? Wrap at least one of them in a function! But now you have a new scope that still has a naming collision 😞. Enter *the principle of least exposure/privilege*! The principle states that you should default to keeping everything private and only exposing the minimal necessary. This essentially sets up a defensive posture and is one of the core principles of software engineering. It solves the following problems:

1. Name collisions
2. It protects your things so that somebody else cannot accidentally or intentionally misuse that thing.
3. Protect yourself for future refactoring.

If you expose something, it's almost a guarantee that someone is going to use it. As soon as someone uses it, you are restricting your ability to refactor it. Because if you refactor it, you are going to break someones code.

### IIFE Pattern

IIFE - Immediately Invoked Function Expression - Using a function expression to create a scope, immediately invoking it. If you are making an IIFE, there is likely some purpose for it and it should be named! Whether they are anonymous or not, IIFEs are just functions, which means that you can pass values into them. An interesting use case for an IIFE is a `try / catch`. If you are setting the value of a variable based on the result of a `try / catch` statement, it could be confusing to your reader... make it an IIFE!

{% highlight javascript %}

var teacher = (function getTeacher() {
    try {
        return fetchTeacher(1);
    }
    catch (err) {
        return "Kyle";
    }
})();

{% endhighlight %}

IFFEs can be used any place that you need an expression, and any time you need a statement or scope in an expression.

### Block Scoping

Block scoping is done with curly braces `{}`, instead of with functions. `let` and `const` exist so that you can make a declaration inside of a block and it turns that block into a scope. i.e.

{% highlight javascript %}

var teacher = "Kyle";

{
    let teacher = "Suzy";
    console.log(teacher); // Suzy
}

console.log(teacher); // Kyle

{% endhighlight %}

Blocks are not scopes until they have a `let` or a `const` inside of them which implicitly makes them a scope. You should use `let` in places where it already makes sense for it to be used, inside of a block scope. `let` is a replacement for your already semantically signaled block scope(s).

Is `let` the new `var`? Nope. `let` is a new tool that we should add on to our existing usage and there are still reasons to use the `var` keyword.

### Choosing let or var

Consider the following:

{% highlight javascript %}

function repeat(fn, n) {
    var result;

    for (var i = 0; i < n; i++) {
        result = fn( result, i );
    }

    return result;
}

{% endhighlight %}

In the above code, you *could* replace both `var`(s) with `let`, but the instructor suggests to only replace the `var` in the `for loop` with `let`. Here's why: If you have a variable that belongs to the entire scope of the function, the correct and semantic way to signal that to your reader is not to use a `let` at the top level of your function scope, but to use a `var` because that is the thing it has always done for 24 years. Again, you could replace the initial `var` with `let`, it is recommended not to because doing so would remove a small amount of important semantic information from the reader, who may then not know your intent. `let` is supposed to signify a very localized usage of a variable, ideally within a couple lines of code.

If your code has something that is *naturally* block scoped, use `let`. Here's an example of some code that would not work if you replaced `var` with `let`:

{% highlight javascript %}

function lookupRecord(searchStr) {
    try {
        var id = getRecord(searchStr);
    }
    catch(err) {
        var id = -1;
    }

    return id;
}

{% endhighlight %}

If the `var`(s) were replaced with `let`(s), the `let`(s) would be scoped to their blocks (`try / catch`) and would not be available for the `return` statement. 🤯

`var` attaches itself to the function scope and is preferable in the above case because it is able to break out of the *unintended* block scope of the `try / catch`. 

### Explicit let Block

If you are going to use `let` for only a few lines of code and not again within the same function, it is recommended to put it in its own block scope. Like so:

{% highlight javascript %}

function formatStr(str) {
    { let prefix, rest;
        prefix = str.slice( 0, 3 );
        rest = str.slice( 3 );
        str = prefix.toUpperCase() + rest;
    }

    if (/^FOO:/.test( str )) {
        return str;
    }

    return str.slice( 4 );
}

{% endhighlight %}

### const

`const` is even better than `let`! But `const` does not carry its own weight in JavaScript. `const` is a variable that cannot be reassigned. `const` can be mutated! `const teachers = ["Me", "You"]; teachers[1] = "Someone Else";` There is baggage that comes with `const`. What the `const` keyword is actually supposed to inform is something along the lines of: For the rest of this [code] block, I am not going to be reassigned. The instructor will only use `const` with primitive values, which are immutable; strings, booleans, and numbers.

### const Q&A

Q: If you only use `const` for strings, would that be a good use case?

A: Yes, I only use `const` for primitive, immutable values; strings, numbers, and booleans.

Q: With arrays or objects, I usually just put `freeze` or `deepfreeze` around it?

A: I do like to use `object.freeze` which is a shallow read-only lock of all the properties in an array or object.

### Hoisting

Until a couple of years ago, the word 'hoisting' literally did not appear in the JavaScript specification. Turns out, hoisting is not a real thing. The JavaScript engine does not hoist, it does not move things around the way it is suggested with hoisting. Hoisting is a made up [English] language convention to discuss the idea of lexical scope. Consider the following code:

{% highlight javascript %}

student; // ??
teacher; // ??

var student = "You";
var teacher = "Kyle";

{% endhighlight %}

What will happen?! JavaScript will, in its first of two passes, parse the above code and create the variables, but without any value assigned to them, so both `student` and `teacher` would return `undefined`. *But*, the concept of hoisting does not mean that any actual code has been moved around. Functions hoist, they are taken at compile time and defined in such a way so they can be used earlier in the scope than when they've been declared.

### Hoisting Example

{% highlight javascript %}

// var hoisting?
// usually bad :/
teacher = "Kyle";
var teacher;

// function hoisting?
// Pretty useful :)
getTeacher();

function getTeacher() {
    return teacher;
}

{% endhighlight %}

Unlike `var` hoisting, function hoisting can be useful. Do you usually put all of your function calls at the end of your files? How about putting them all at the top so you can immediately see them?! You can!

### let Doesn't Hoist

`let` doesn't hoist is not true... `let` and `const` hoist, but not in the same way as `var` or functions. A `var` will initialize to `undefined`, but a `let` or `const` will not be initialized. `let` or `const` will hoist, but will throw a temporal dead zone [TDZ] error. But why TDZ? TDZ exists because of `const`. Imagine `const` being attached inside of a block scope. And also imagine if `const` initialized itself to `undefined`. Then you `console.log` that `const` and it returns undefined, then later it returned the actual value that was assigned to it, now your `const` *can* have two different values assigned to it? This *academically* violates the concept of `const`. So they make the TDZ and also assign this behavior to `let`.

It is advised that you declare all `let` or `const` on the very first line of your blocks to avoid TDZ errors.

Q: Why do function expressions not hoist?

A: When you assign a function expression to a variable, the variable's declaration itself hoisted, but the assignment only comes at run time.

### Hoisting Exercise

#### Hoisting

In this exercise, you will refactor some code that manages student enrollment records for a workshop, to take advantage of function hoisting.

#### Instructions

Refactor all inline function expressions to be function declarations. Place function declarations at the bottom (that is, below any executable code) of their respective scopes.

Also, pull function declarations to outer scopes if they don't need to be nested.

### Hoisting Exercise Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/

// ********************************

function getStudentFromId(studentId) {
	return studentRecords.find(matchId);

    function matchId(record){
		return (record.id == studentId);
	}
}

function printRecords(recordIds) {
    var records = recordIds.map(getStudentFromId);
    
    record.sort(sortByNameAsc);
    records.forEach(printRecord);
}

function sortByNameAsc(record1,record2){
    if (record1.name < record2.name) return -1;
    else if (record1.name > record2.name) return 1;
    else return 0;
}

function printRecord(record){
    console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
}

function paidStudentsToEnroll() {
	var recordsToEnroll = studentRecords.filter(needToEnroll);

	var idsToEnroll = recordsToEnroll.map(getStudentId);

	return [ ...currentEnrollment, ...idsToEnroll ];
}

function needToEnroll(record){
    return (record.paid && !currentEnrollment.includes(record.id));
}

function getStudentId(record){
    return record.id;
}

function remindUnpaid(recordIds) {
	var unpaidIds = recordIds.filter(notYetPaid);

	printRecords(unpaidIds);
}

function notYetPaid(studentId){
    var record = getStudentFromId(studentId);
    return !record.paid;
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

The purpose of this exercise is to flatten the scope of the program, which makes it [scope] easier to manage. Additionally, this can make your code more readable, which makes it easier for both your future self or another developer to dig in and work with your code.

## Closure

### Origin of Closure

Closure, according to the instructor, is one of the most important ideas ever invented in computer science. The instructor goes on to tell the story of the developer of JavaScript and how pervasive closure is across all development languages yet most developers do not know how to define it. Closure predates computer science, coming from lambda calculus. To understand closure, you have to understand lexical scope.

### What is Closure?

Closure is when a function is able to "remember" and access its lexical scope, the variables outside of itself, even when the function is executed outside of that lexical scope. The first part, a function is able to access variables outside of itself, is lexical scope; if `teacher` is not defined in *my* scope, is it in the 'next-level-up' scope? And so on, until it finds `teacher` or not. But without the second part, even when the function is executed outside of that lexical scope, is what makes closure... closure. The preservation, or linkage, back to the original scope where a function was defined, no matter where it is passed, it retains its value and retains its scope, that is closure.

Here is an example of closure:

{% highlight javascript %}

function ask(question) {
    setTimeout(function waitASec() {
        console.log(question);
    }, 100);
}

ask("What is closure?");

{% endhighlight %}

### Closing Over Variables

{% highlight javascript %}

var teacher = "Kyle";

var myTeacher = function() {
    console.log(teacher);
};

teacher = "Suzy";

myTeacher(); // ??

{% endhighlight %}

`myTeacher();` would return `Suzy`. Closure is not capturing values, but preserving access to variables. One cannot effectively use closure until you get away from the perception that closure captures values. Consider the following:

{% highlight javascript %}

for (var i = 1; i <= 3; i++) {
    setTimeout(function() {
        console.log(`i: ${i}`);
    }, i * 1000);
}

// i: 4
// i: 4
// i: 4

{% endhighlight %}

`i` would only return `4` because we need another variable, or variables, to store the various 'states' that `i` would be through its iteration. One way to 'solve' this would be to declare a new variable and assign it to the value of `i`. i.e.

{% highlight javascript %}

for (var i = 1; i <= 3; i++) {

    let j = i;

    setTimeout(function() {
        console.log(`j: ${j}`);
    }, j * 1000);
}

// j: 1
// j: 2
// j: 3

{% endhighlight %}

For each iteration, `j` will be 'updated' with the 'new' value of `i`, so the console will log the expected values of 1,2,3. An arguably better / more concise approach would be to do the following:

{% highlight javascript %}

for (let i = 1; i <= 3; i++) {
    setTimeout(function() {
        console.log(`i: ${i}`);
    }, i * 1000);
}

// i: 1
// i: 2
// i: 3

{% endhighlight %}

Using `let` also produces the expected result because `let` creates a new `i` for each iteration. This is new behavior as of ES6. The point is if you need to close over different variables, then you need the different variables, not try to capture different values.

Q: The `i` declared in the `for loop` is interpreted as a new variable for each iteration?

A: Yes, it [the `i`] is interpreted as if each iteration there is a new declaration of `i` and JavaScript takes care of assigning it the value that it at the end of the previous iteration. All  `for loop`(s) have this type of `let` variance. `for of`, `for in`, and `for` loops have this.

In summary, closure is a preservation of the linkage to a variable, not the capturing of that value.

### Module Pattern

Now that we understand lexical scope and closure, we can look at the module pattern. First let's look at what is not a module, like this:

{% highlight javascript %}

var workshop = {
    teacher: "Kyle",
    ask(question) {
        console.log(this.teacher, question);
    },
};

workshop.ask("Is this a module?");
// Kyle Is this a module?

{% endhighlight %}

The above code is not a module, it *is* what could be called a 'namespace'. Not really a syntactic feature of the [JavaScript] language, but it's an idiom that we make namespaces with objects. While there is nothing wrong with writing your code in this way, it is definitely not a module. The reason being is that the module pattern requires the concept of encapsulation. Encapsulation is to hide data and behavior. The idea of a module is that there are things that are 'public', that's your public API, and there are things that are private, things that nobody on the outside can touch. If you want to have a module, you need to have encapsulation (data hiding).

The 'classic' module pattern, sometimes referred to as the revealing module pattern, encapsulates data and it does so with closure. You can't have a module if you don't have closure. Here is an example of what a module *does* look like:

{% highlight javascript %}

var workshop = (function Module(teacher) {
    var publicAPI = {ask, };
    return publicAPI;
    
    function ask(question) {
        console.log(this.teacher, question);
    }
})("Kyle");

workshop.ask("It's a module, right?");
// Kyle It's a module, right?

{% endhighlight %}

The above module has two components to it.

1. An outer enclosing function. In this case, the outer enclosing function is an IIFE. When you run a module as an IIFE, it is kind of similar to a Singleton. Because IIFEs run once and then they are done. But it's not really *done* because the closure prevents its scope from going away.

2. The second component of the module is the inner function, which is closed over two variables `teacher` and `question`. Since it is closed over the `teacher` variable, the `workshop` object on the outside, which has reference to the `ask` function, preserves the inner scope through closure. 

The module pattern keeps private state private and exposes things on an object, as you can see in the `publicAPI` object, where `ask` is exposed. This usage of closure is actually closing over variables that are designed to change state over time. That's the whole purpose of a module, to track state over time. You could go so far as to say that if you have something that you are calling a module but it does not track state in any way, it is not really a module.

Here is an example of a module in a factory function style:

{% highlight javascript %}

function WorkshopModule(teacher) {
    var publicAPI = { ask, };
    return publicAPI;

    function ask(question) {
        console.log(teacher, question);
    }
};

var workshop = WorkshopModule("Kyle");

workshop.ask("It's a module, right?");
// Kyle It's a module, right?

{% endhighlight %}

With the Module Factory pattern, you can create as many instances of the module and they will all have their own state. The module pattern is arguable the most prevalent and important of all code organization patterns. ~80-90% of all JavaScript that's ever been written has used some mechanism like the module pattern as it's code organization pattern. But, the module pattern in JavaScript is more of a syntactic hack in that it is not exactly a language feature or first-class citizen, but rather a methodology of using the tools in a way that accomplishes some end goal.

### ES6 Modules & Node.js

Because the module pattern is actually not a part of JavaScript, and many wanted them to be, modules eventually found their way to the language in ES6. In the current implementation, they are still very much a WIP. The issue being that TC39 and Node.js did not communicate about how modules would be implemented at first. There have been some conversations about how to fix this, but where its landed is that to use modules in Node, you have to use a new file extension name; `.mjs`. There is a working group within Node that is trying to get full support for modules, which they will implement in phases. And at the time of writing this, Node should have pushed phase 1 of 4 of module support in Node. The ES6 module pattern looks like this:

{% highlight javascript %}

var teacher = "Kyle";

export default function ask(question) {
    console.log(teacher, question);
};

{% endhighlight %}

Because the above is a module, it is assumed that everything is private. The way you make something public is by using the `export` keyword, everything you do not export will be private. In ES6, modules are file-based. Which means it is impossible to have more than one ES6 module in the same file. Which means that for each module your application needs, you need to have a separate file for it. This can grow quickly. And since you have to compile everything back to the module format we've previously covered anyway, wouldn't it make sense to just write your modules in that format and skip the compilation step?

### ES6 Module Syntax

To import modules into your files, there are two major styles used:

{% highlight javascript %}

import ask from "workshop.mjs";

ask("It's a default import, right?");
// Kyle It's a default import, right?

import * as workshop from "workshop.mjs";

workshop.ask("It's a namespace import, right?");
// Kyle It's a namespace import, right?

{% endhighlight %}

The first import is known as a `named import`, the second style is known as a `namespace import` which is effectively collecting all (*) of the exports and placing them in the namespace of `workshop`. The `namespace import` is more similar to how modules have been done in JavaScript over the last 20 years, whereas the `named import` style is more of a new school thinking. Neither is right or wrong, but comes down to how you prefer to work with your modules.

Whichever way you choose to implement your modules, the same underlying structure / purpose applies. You are organizing a set of behavior into a cohesive unit, hiding data in it and exposing a minimal necessary API. The module pattern is one of the three core pillars of JavaScript and touches everything else in a foundational way.

### Module Exercise

#### Modules

In this exercise, you will refactor some code that manages student enrollment records for a workshop, to use the module pattern.

#### Instructions

1. Wrap all of the functions in a module factory (ie, function named `defineWorkshop()`). This function should make a return a public API object.

2. The returned public API object should include the following methods:

	- `addStudent(id,name,paid)`
	- `enrollStudent(id)`
	- `printCurrentEnrollment()`
	- `enrollPaidStudents()`
	- `remindUnpaidStudents()`,

3. Move the `currentEnrollment` and `studentRecords` arrays inside the module definition, but as empty arrays.

4. Create an instance of this module by calling `defineWorkshop()`, and name it `deepJS`.

5. Define all the student records by calling `deepJS.addStudent(..)` for each.

6. Define the student enrollments by calling `deepJS.enrollStudent(..)` for each.

7. Change the execution code (the console output steps) to references to `deepJS.*` public API methods.

{% capture summary %}Work from this code{% endcapture %}
{% capture details %}  
{% highlight javascript %}

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/


// ********************************

function getStudentFromId(studentId) {
	return studentRecords.find(matchId);

	// *************************

	function matchId(record) {
		return (record.id == studentId);
	}
}

function printRecords(recordIds) {
	var records = recordIds.map(getStudentFromId);

	records.sort(sortByNameAsc);

	records.forEach(printRecord);
}

function sortByNameAsc(record1,record2){
	if (record1.name < record2.name) return -1;
	else if (record1.name > record2.name) return 1;
	else return 0;
}

function printRecord(record) {
	console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
}

function paidStudentsToEnroll() {
	var recordsToEnroll = studentRecords.filter(needToEnroll);

	var idsToEnroll = recordsToEnroll.map(getStudentId);

	return [ ...currentEnrollment, ...idsToEnroll ];
}

function needToEnroll(record) {
	return (record.paid && !currentEnrollment.includes(record.id));
}

function getStudentId(record) {
	return record.id;
}

function remindUnpaid(recordIds) {
	var unpaidIds = recordIds.filter(notYetPaid);

	printRecords(unpaidIds);
}

function notYetPaid(studentId) {
	var record = getStudentFromId(studentId);
	return !record.paid;
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

### Module Exercise Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

var deepJS = defineWorkshop();
deepJS.addStudent(313, "Frank", true);
deepJS.addStudent(410, "Suzy", true);
deepJS.addStudent(709, "Brian", false);
deepJS.addStudent(105, "Henry", false);
deepJS.addStudent(502, "Mary", true);
deepJS.addStudent(664, "Bob", false);
deepJS.addStudent(250, "Peter", true);
deepJS.addStudent(375, "Sarah", true);
deepJS.addStudent(867, "Greg", false);
deepJS.enrollStudent(410);
deepJS.enrollStudent(105);
deepJS.enrollStudent(664);
deepJS.enrollStudent(375);
deepJS.printCurrentEnrollment;
console.log("----");
deepJS.enrollPaidStudents();
console.log("----");
deepJS.remindUnpaidStudents();

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/


// ********************************

function defineWorkshop() {
    var currentEnrollment = [];
    var studentRecords = [];
    var publicAPI = { 
        addStudent,
        enrollStudent,
        printCurrentEnrollment,
        enrollPaidStudents,
        remindUnpaidStudents
    };
    return publicAPI;

    function addStudent(id, name, paid) {
        studentRecords.push({id, name, paid});
    }

    function enrollStudent(id) {
        if( !currentEnrollment.includes(id)) {
            currentEnrollment.push(id);
        }
    }

    function printCurrentEnrollment() {
        printRecords(currentEnrollment);
    }

    function enrollPaidStudents() {
        currentEnrollment = paidStudentsToEnroll();
        printRecords(currentEnrollment);
    }

    function remindUnpaidStudents() {
        remindUnpaid(currentEnrollment);
    }
    
    // *************************

    function getStudentFromId(studentId) {
	    return studentRecords.find(matchId);

	    // *************************

        function matchId(record) {
            return (record.id == studentId);
        }
    }

    function printRecords(recordIds) {
        var records = recordIds.map(getStudentFromId);

        records.sort(sortByNameAsc);

        records.forEach(printRecord);
    }

    function sortByNameAsc(record1,record2){
        if (record1.name < record2.name) return -1;
        else if (record1.name > record2.name) return 1;
        else return 0;
    }

    function printRecord(record) {
        console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
    }

    function paidStudentsToEnroll() {
        var recordsToEnroll = studentRecords.filter(needToEnroll);

        var idsToEnroll = recordsToEnroll.map(getStudentId);

        return [ ...currentEnrollment, ...idsToEnroll ];
    }

    function needToEnroll(record) {
        return (record.paid && !currentEnrollment.includes(record.id));
    }

    function getStudentId(record) {
        return record.id;
    }

    function remindUnpaid(recordIds) {
        var unpaidIds = recordIds.filter(notYetPaid);

        printRecords(unpaidIds);
    }

    function notYetPaid(studentId) {
        var record = getStudentFromId(studentId);
        return !record.paid;
    }
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

Modules are pretty important in JavaScript, maybe even in all of software development. You will get a lot of mileage out of thinking in this pattern, practicing it, trying to implement it more. Try to find opportunities to implement the module pattern!

## Objects

### Objects Overview

Another of the 'three core pillars' of JavaScript that is important to understand is the 'Objects' Oriented system. Objects, `this`, and Prototypes make up the objects oriented system. Objects oriented instead of object oriented because JavaScript is not strictly a class system, there are classes that have been layered on top of it.

### The this Keyword

Arguably the most confused of all the JavaScript features, the `this` keyword. If you are coming to JavaScript from another language that uses the `this` keyword, you may have had some difficulty understanding how `this` was implemented in JavaScript.

A function's `this` references the execution context for that call, determined entirely by how the function was called. In other words, if you look at a function that has the `this` keyword in it, it is defined by how the function was called. This is counterintuitive because most people think you could look at a function and figure out what its `this` keyword is going to point out. But the definition of the function does not  matter at all, to determining the `this` keyword. The only thing that matters is how the function was invoked.

A `this`-aware function can have a different context each time it is called, which makes it more flexible and reusable. Here is an example of the dynamic flexibility of the `this` keyword in action:

{% highlight javascript %}

function ask(question) {
    console.log(this.teacher, question);
}

function otherClass() {
    var myContext = {
        teacher: "Suzy"
    };
    ask.call(myContext, "Why?");
}

otherClass();

{% endhighlight %}

The `this` keyword exists so we can invoke functions in different contexts. There are four different ways to invoke a function. Each of the four ways to call a function in JavaScript will define what is the `this` keyword differently. 

### Implicit & Explicit Binding

The first of the four methods to invoke a function we'll cover is implicit binding.

{% highlight javascript %}

var workshop = {
    teacher: "Kyle",
    ask(question) {
        console.log(this.teacher, question);
    },
};

workshop.ask("What is implicit binding?");
// Kyle What is implicit binding?

{% endhighlight %}

Revisiting the namespace pattern, how does the `this` keyword behave inside of this pattern? When `ask` function is invoked, how do you know what the `this` keyword will point at? Because of the 'call site' (workshop), the `this` keyword will point at the `workshop` object. This is exactly how the `this` binding works in other languages. This is the most intuitive form of the `this` keyword because it decides the method based upon what object you call it from. The idea of having implicit binding is useful because this is how we share behavior among different contexts. Here is another example of implicit binding where the `ask` function is being used more than once and has two different `this` contexts:

{% highlight javascript %}

function ask(question) {
    console.log(this.teacher, question);
}

var workshop1 = {
    teacher: "Kyle",
    ask: ask,
};

var workshop2 = {
    teacher: "Suzy",
    ask: ask,
};

workshop1.ask("How do I share a method?");
// Kyle How do I share a method?

workshop2.ask("How do I share a method?");
// Suzy How do I share a method?

{% endhighlight %}

In the above code, you can see that the `ask` function is being assigned to different contexts (`workshop1` `workshop2`) and because of this, the `this` keyword will point at the respective objects that it was called from. Another method to invoke functions which we've seen before is the `.call` method. Along with the `.apply` method, the `.call` method takes, as their first argument, a `this` keyword.

{% highlight javascript %}

function ask(question) {
    console.log(this.teacher, question);
}

var workshop1 = {
    teacher: "Kyle";
}

var workshop2 = {
    teacher: "Suzy";
}

ask.call(workshop1, "Can I explicitly set context?");
// Kyle Can I explicitly set context?

ask.call(workshop2, "Can I explicitly set context?");
// Suzy Can I explicitly set context?

{% endhighlight %}

Above, on the first `ask.call`, when you pass in `workshop1`, it is saying invoke the `ask` function with the `this` context of `workshop1`. It is similar to the implicit binding example at the beginning of this section, the function is still being shared, but it is now being done explicitly rather than implicitly. We are saying, wherever this function comes from, invoke it in this particular context, which I am going to specify. `.call` and `.apply` can be used to explicitly tell JavaScript what context to invoke a function in.

A variation of explicit binding is called hard binding, which looks like this:

{% highlight javascript %}

var workshop = {
    teacher: "Kyle",
    ask(question) {
        console.log(this.teacher, question);
    },
};

setTimeout(workshop.ask, 10, "Lost this?");
// undefined Lost this?

setTimeout(workshop.ask.bind(workshop), 10, "Hard bound this?");
// Kyle Hard bound this?

{% endhighlight %}

The first `setTimeout` above is not the call site for `workshop.ask`, so the binding is lost and bound to the global object in this case. A common solution to this can be seen on the second `setTimeout` which hard binds the `workshop.ask` function to the `workshop` object. *If* you use `.bind` to hard bind the `this` to a particular scope, you are effectively removing the flexibility of the `this` keyword, which is not the intended purpose of the `this` keyword. If you do not need the flexibility, you may be better off refactoring your code to a module pattern which provides a fixed, predictable behavior.

If you are only occasionally using hard binding when setting up a `this` aware function, you are probably getting enough benefit out of your code as it is written and do not need to refactor it. If you are frequently using hard binding when setting up a `this` aware function, you should probably refactor your code. If you want flexible dynamism, use a `this` keyword, if you want predictability, use closures, use lexical scope.

### The new Keyword

The third way to invoke a function is the `new` keyword, which may seem like we are invoking a 'class constructor', but it is really just an unfortunate syntactic trick to make it look like it is dealing with classes when it really isn't. The `new` keyword does four very specific things when invoking a function and the purpose of the `new` keyword is to invoke a function with a `this` keyword that points to a whole new empty object. You could get the same behavior if you used `.call()`, which would also invoke a function with a `this` keyword that points to a whole new empty object, the only difference is the 'syntactic sugar' that the `new` keyword provides. Here are the four things that the `new` keyword does when it is used to invoke a function:

1. Create a brand new empty object.

2. * Link that object to another object.

3. Calls the function with `this` pointing to the new object.

4. If the function does not return an object, the `new` keyword assumes that `this` should be returned. 

If you put `new` in front of any function, even an empty one, all four of the things will happen.

### Default Binding

The final way of invoking a function is with default binding, which looks like this `functionName(argument);`. If your program is in 'strict mode', and `this` has no explicit binding, `this` will be undefined and calling a function that refers to `this` will throw a TypeError, because in 'strict mode' `this` needs to be explicitly defined. The reason being, that if you have created a `this` aware function, there is no reason that `this` should not be defined. Define `this` in strict mode! Use one of the other three methods to invoke a function; `new` keyword, `.call`, `.apply`, or `.bind`, or a context object, i.e. `workshop.ask()`

### Binding Precedence

What if you had a [function] call site like this:

{% highlight javascript %}

var workshop = {
    teacher: "Kyle";
    ask: function ask(question) {
        console.log(this.teacher, question);
    },
};

new (workshop.ask.bind(workshop))("What does this do?");

{% endhighlight %}

In the above code, the function `ask` is being called with `new`, a context object, `.bind`, that's three of the ways to invoke a function being used at once. This is not a useful thing to do, but let's look at how it works and which of the function invoke(rs?) takes precedence. The order of binding precedence is as follows:

1. Is the function called by `new`? If so, the newly created object will be the `this` keyword.

2. Is the function called by `.call` or `.apply` (`.bind` uses `.apply`)? If so, the context object that is specified will be used.

3. Is the function called on a context object? If so, use that object.

4. DEFAULT: Global object (except strict mode).

### Arrow Functions & Lexical this

But what about arrow functions and the `this` keyword?! Lexical `this` occurs. But what is lexical `this`? An arrow functions `this` is not hardbound to its parents `this`, the correct way to think about what an arrow function does is; An arrow function does not define a `this` keyword at all. So if you put a `this` keyword inside of an arrow function, it will behave just like every other variable, which in this case means that it will resolve itself to a scope that does define a `this` keyword. The [JavaScript] spec states: An arrow function does not define local bindings for arguments, super, this, or new.target. Any reference to arguments, super, this, or new.target within an arrow function must resolve to a binding in a lexically enclosing environment.

### Resolving this in Arrow Functions

{% highlight javascript %}

var workshop = {
    teacher: "Kyle",
    ask: (question) => {
        console.log(this.teacher, question);
    },
};

workshop.ask("What happened to 'this'?");
// undefined What happened to 'this'?

workshop.ask.call(workshop, "Still no 'this'?:");
// undefined Still no 'this'?

{% endhighlight %}

Ummm... why is `this` returning undefined? Well, what is the parent scope for the `ask` function in the above code? Did you guess global? If you did, that is correct; the `workshop` object is not a scope, it is an object, so the `ask` function would look in the global scope for `this`, which in this case is in fact undefined. 😞

It is recommended that the *only* time you should use an arrow function is when you will benefit from the lexical `this` behavior. The only alternative is a *hack* such as `var self = this;`. Which is not a good alternative because the `this` keyword never points at a function but at a context, so if you absolutely must do the `var self = this;` hack, it is probably better to write it as `var context = this;`. (Preference of the instructor, may help readability) But really, the purpose, or function, of the arrow function should be to adopt the `this` of a parent scope.

**Only use => arrow functions when you need lexical this.**

If you are going to use an arrow function to have access to lexical `this`, you need to combat the following three issues with using an anonymous function:

1. Anonymous functions don't have a self-reference - In case you need to do recursion or binding.

2. Anonymous functions don't have a name - Assign it to a variable or a property so that it gets a name inference.

3. Anonymous functions don't have readily obvious reasons for their existence - Somehow, make it clear to the reader what your function's purpose is.

### this Exercise

#### `this`

In this exercise, you will refactor some code that manages student enrollment records for a workshop, from the module pattern to the namespace pattern using the `this` keyword.

#### Instructions

1. Remove the `defineWorkshop()` module factory, and replace it with an object literal (named `deepJS`) that holds all the module's functions, as well as the `currentEnrollment` and `studentRecords` data arrays.

2. Change all internal function references and references to the data  arrays to use the `this` keyword prefix.

3. Make sure any place where a `this`-aware callback is passed is hard-bound with `bind(..)`. Don't `bind(..)` a function reference if it's not `this`-aware.

{% capture summary %}Work from this code{% endcapture %}
{% capture details %}  
{% highlight javascript %}

var deepJS = defineWorkshop();

deepJS.addStudent(311,"Frank",/*paid=*/true);
deepJS.addStudent(410,"Suzy",/*paid=*/true);
deepJS.addStudent(709,"Brian",/*paid=*/false);
deepJS.addStudent(105,"Henry",/*paid=*/false);
deepJS.addStudent(502,"Mary",/*paid=*/true);
deepJS.addStudent(664,"Bob",/*paid=*/false);
deepJS.addStudent(250,"Peter",/*paid=*/true);
deepJS.addStudent(375,"Sarah",/*paid=*/true);
deepJS.addStudent(867,"Greg",/*paid=*/false);

deepJS.enrollStudent(410);
deepJS.enrollStudent(105);
deepJS.enrollStudent(664);
deepJS.enrollStudent(375);

deepJS.printCurrentEnrollment();
console.log("----");
deepJS.enrollPaidStudents();
console.log("----");
deepJS.remindUnpaidStudents();

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/


// ********************************

function defineWorkshop() {
	var currentEnrollment = [];
	var studentRecords = [];

	var publicAPI = {
		addStudent,
		enrollStudent,
		printCurrentEnrollment,
		enrollPaidStudents,
		remindUnpaidStudents,
	};
	return publicAPI;


	// ********************************

	function addStudent(id,name,paid) {
		studentRecords.push({ id, name, paid, });
	}

	function enrollStudent(id) {
		if (!currentEnrollment.includes(id)) {
			currentEnrollment.push(id);
		}
	}

	function printCurrentEnrollment() {
		printRecords(currentEnrollment);
	}

	function enrollPaidStudents() {
		currentEnrollment = paidStudentsToEnroll();
		printCurrentEnrollment();
	}

	function remindUnpaidStudents() {
		remindUnpaid(currentEnrollment);
	}

	function getStudentFromId(studentId) {
		return studentRecords.find(matchId);

		// *************************

		function matchId(record) {
			return (record.id == studentId);
		}
	}

	function printRecords(recordIds) {
		var records = recordIds.map(getStudentFromId);

		records.sort(sortByNameAsc);

		records.forEach(printRecord);
	}

	function sortByNameAsc(record1,record2){
		if (record1.name < record2.name) return -1;
		else if (record1.name > record2.name) return 1;
		else return 0;
	}

	function printRecord(record) {
		console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
	}

	function paidStudentsToEnroll() {
		var recordsToEnroll = studentRecords.filter(needToEnroll);

		var idsToEnroll = recordsToEnroll.map(getStudentId);

		return [ ...currentEnrollment, ...idsToEnroll ];
	}

	function needToEnroll(record) {
		return (record.paid && !currentEnrollment.includes(record.id));
	}

	function getStudentId(record) {
		return record.id;
	}

	function remindUnpaid(recordIds) {
		var unpaidIds = recordIds.filter(notYetPaid);

		printRecords(unpaidIds);
	}

	function notYetPaid(studentId) {
		var record = getStudentFromId(studentId);
		return !record.paid;
	}
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

### this Exercise Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

// ********************************

var deepJS =  {
	currentEnrollment: [],
	studentRecords: [],
	addStudent(id,name,paid) {
		this.studentRecords.push({ id, name, paid, });
	},
	enrollStudent(id) {
		if (!this.currentEnrollment.includes(id)) {
			this.currentEnrollment.push(id);
		}
	},
	printCurrentEnrollment() {
		this.printRecords(this.currentEnrollment);
	},
	enrollPaidStudents() {
		this.currentEnrollment = this.paidStudentsToEnroll();
		this.printCurrentEnrollment();
	},
	remindUnpaidStudents() {
		this.remindUnpaid(this.currentEnrollment);
	},
	getStudentFromId(studentId) {
		return this.studentRecords.find(matchId);

		// *************************

		function matchId(record) {
			return (record.id == studentId);
		}
	},
	printRecords(recordIds) {
		var records = recordIds.map(this.getStudentFromId.bind(this));

		records.sort(this.sortByNameAsc);

		records.forEach(this.printRecord);
	},
	sortByNameAsc(record1,record2){
		if (record1.name < record2.name) return -1;
		else if (record1.name > record2.name) return 1;
		else return 0;
	},
	printRecord(record) {
		console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
	},
	paidStudentsToEnroll() {
		var recordsToEnroll = this.studentRecords.filter(this.needToEnroll.bind(this));

		var idsToEnroll = recordsToEnroll.map(this.getStudentId.bind(this));

		return [ ...this.currentEnrollment, ...idsToEnroll ];
	},
	needToEnroll(record) {
		return (record.paid && !this.currentEnrollment.includes(record.id));
	},
	getStudentId(record) {
		return record.id;
	},
	remindUnpaid(recordIds) {
		var unpaidIds = recordIds.filter(this.notYetPaid.bind(this));

		this.printRecords(unpaidIds);
	},
	notYetPaid(studentId) {
		var record = this.getStudentFromId(studentId);
		return !record.paid;
	}
};

deepJS.addStudent(311,"Frank",/*paid=*/true);
deepJS.addStudent(410,"Suzy",/*paid=*/true);
deepJS.addStudent(709,"Brian",/*paid=*/false);
deepJS.addStudent(105,"Henry",/*paid=*/false);
deepJS.addStudent(502,"Mary",/*paid=*/true);
deepJS.addStudent(664,"Bob",/*paid=*/false);
deepJS.addStudent(250,"Peter",/*paid=*/true);
deepJS.addStudent(375,"Sarah",/*paid=*/true);
deepJS.addStudent(867,"Greg",/*paid=*/false);

deepJS.enrollStudent(410);
deepJS.enrollStudent(105);
deepJS.enrollStudent(664);
deepJS.enrollStudent(375);

deepJS.printCurrentEnrollment();
console.log("----");
deepJS.enrollPaidStudents();
console.log("----");
deepJS.remindUnpaidStudents();

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/

{% endhighlight %}
{% endcapture %}{% include details.html %}

Q: Would you [instructor] use this type of namespace object with so many functions in practice?

A: If I am going to create a namespace(d) object, the only reason I am going to use this approach (instead of the module approach) is when I know that I have two or three objects that I want to link through a prototype chain and have them work with each other.

Q: What is the rule for binding `this`?

A: You only need to bind `this` if the method is a this-aware function.

### ES6 class Keyword

The class pattern is by far the most prevalent used in JavaScript. The class system is syntactic sugar layered on top of the prototype system. The class pattern looks like this:

{% highlight javascript %}

class Workshop {
    constructor(teacher) {
        this.teacher = teacher;
    }
    ask(question) {
        console.log(this.teacher, question);
    }
}

var deepJS = new Workshop("Kyle");
var reactJS = new Workshop("Suzy");

deepJs.ask("Is 'class' a class?");
// Kyle is 'class' a class?

reactJS.ask("Is this class OK?");
// Suzy Is this class OK?

{% endhighlight %}

Classes don't have to be statements, they can be expressions and they can be anonymous. Classes can be defined with or without an extends clause. In the above code a class is being defined, nothing is being extended. You can choose to define a `constructor` and you can add methods (no comma needed). If you want to extend a class, it could look something like this:

{% highlight javascript %}

class Workshop {
    constructor(teacher) {
        this.teacher = teacher;
    }
    ask(question) {
        console.log(this.teacher, question);
    }
}

class AnotherWorkshop extends Workshop {
    speakUp(msg) {
        this.ask(msg);
    }
}

var JSRecentParts = new AnotherWorkshop("Kyle");

JSRecentParts.speakUp("Are classes getting any better?");
// Kyle Are classes getting any better?

{% endhighlight %}

If you have a child class that extends the a method of the same name in its parent class, you can refer to the parent from the child by using `super.`; i.e. `super.ask...`. If you pay attention to the [JavaScript] spec, classes have a lot of features coming down the pipeline, almost making them a language inside of a language, not just syntactic sugar. Class methods are not auto-bound to the `this` keyword. The entire class system is built on the idea that your methods do not exist on their instances, but on your prototypes. 

### Fixing this in Classes

There is a proposal for `@bound` which would auto-bind `this` in classes, but here's why that is considered to be aa *bad* idea. Any 'solution' to 'auto-bind' `this` to a class is not what the intended behavior of classes in JavaScript is. [Check out this gist to see how it could be done - see 2.js](https://gist.github.com/getify/86bed0bb78ccb517c84a6e61ec16adca) The whole purpose of `this` aware functions is so that they can be dynamic. Forcing them into another mode of working, which is like classes in other languages, is how you end up with 'hacky' solutions like the Gist.

### class Exercise

#### `class`

In this exercise, you will refactor some code that manages student enrollment records for a workshop, from the namespace pattern to the `class` pattern.

#### Instructions

1. Define a class called `Helpers` that includes the functions that are not `this`-aware.

2. Define a class called `Workshop` that extends `Helpers`, which includes all the other functions. Hint: `constructor()` and `super()`.

3. Instantiate the `Workshop` class as `deepJS`.

{% capture summary %}Work from this code{% endcapture %}
{% capture details %}  
{% highlight javascript %}

var deepJS = {
	currentEnrollment: [],
	studentRecords: [],
	addStudent(id,name,paid) {
		this.studentRecords.push({ id, name, paid, });
	},
	enrollStudent(id) {
		if (!this.currentEnrollment.includes(id)) {
			this.currentEnrollment.push(id);
		}
	},
	printCurrentEnrollment() {
		this.printRecords(this.currentEnrollment);
	},
	enrollPaidStudents() {
		this.currentEnrollment = this.paidStudentsToEnroll();
		this.printCurrentEnrollment();
	},
	remindUnpaidStudents() {
		this.remindUnpaid(this.currentEnrollment);
	},
	getStudentFromId(studentId) {
		return this.studentRecords.find(matchId);

		// *************************

		function matchId(record) {
			return (record.id == studentId);
		}
	},
	printRecords(recordIds) {
		var records = recordIds.map(this.getStudentFromId.bind(this));

		records.sort(this.sortByNameAsc);

		records.forEach(this.printRecord);
	},
	sortByNameAsc(record1,record2){
		if (record1.name < record2.name) return -1;
		else if (record1.name > record2.name) return 1;
		else return 0;
	},
	printRecord(record) {
		console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
	},
	paidStudentsToEnroll() {
		var recordsToEnroll = this.studentRecords.filter(this.needToEnroll.bind(this));

		var idsToEnroll = recordsToEnroll.map(this.getStudentId);

		return [ ...this.currentEnrollment, ...idsToEnroll ];
	},
	needToEnroll(record) {
		return (record.paid && !this.currentEnrollment.includes(record.id));
	},
	getStudentId(record) {
		return record.id;
	},
	remindUnpaid(recordIds) {
		var unpaidIds = recordIds.filter(this.notYetPaid.bind(this));

		this.printRecords(unpaidIds);
	},
	notYetPaid(studentId) {
		var record = this.getStudentFromId(studentId);
		return !record.paid;
	}
};


// ********************************

deepJS.addStudent(311,"Frank",/*paid=*/true);
deepJS.addStudent(410,"Suzy",/*paid=*/true);
deepJS.addStudent(709,"Brian",/*paid=*/false);
deepJS.addStudent(105,"Henry",/*paid=*/false);
deepJS.addStudent(502,"Mary",/*paid=*/true);
deepJS.addStudent(664,"Bob",/*paid=*/false);
deepJS.addStudent(250,"Peter",/*paid=*/true);
deepJS.addStudent(375,"Sarah",/*paid=*/true);
deepJS.addStudent(867,"Greg",/*paid=*/false);

deepJS.enrollStudent(410);
deepJS.enrollStudent(105);
deepJS.enrollStudent(664);
deepJS.enrollStudent(375);

deepJS.printCurrentEnrollment();
console.log("----");
deepJS.enrollPaidStudents();
console.log("----");
deepJS.remindUnpaidStudents();

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/

{% endhighlight %}
{% endcapture %}{% include details.html %}

### class Exercise Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

class Helpers {

    sortByNameAsc(record1,record2){
		if (record1.name < record2.name) return -1;
		else if (record1.name > record2.name) return 1;
		else return 0;
	}

	printRecord(record) {
		console.log(`${record.name} (${record.id}): ${record.paid ? "Paid" : "Not Paid"}`);
	}
}

class Workshop extends Helpers {
    constructor() {
        super();
        this.currentEnrollment = [];
        this.studentRecords = [];
    }
    addStudent(id,name,paid) {
		this.studentRecords.push({ id, name, paid, });
	}
	enrollStudent(id) {
		if (!this.currentEnrollment.includes(id)) {
			this.currentEnrollment.push(id);
		}
	}
	printCurrentEnrollment() {
		this.printRecords(this.currentEnrollment);
	}
	enrollPaidStudents() {
		this.currentEnrollment = this.paidStudentsToEnroll();
		this.printCurrentEnrollment();
	}
	remindUnpaidStudents() {
		this.remindUnpaid(this.currentEnrollment);
	}
	getStudentFromId(studentId) {
		return this.studentRecords.find(matchId);

		// *************************

		function matchId(record) {
			return (record.id == studentId);
		}
	}
	printRecords(recordIds) {
		var records = recordIds.map(this.getStudentFromId.bind(this));

		records.sort(this.sortByNameAsc);

		records.forEach(this.printRecord);
	}
	
	paidStudentsToEnroll() {
		var recordsToEnroll = this.studentRecords.filter(this.needToEnroll.bind(this));

		var idsToEnroll = recordsToEnroll.map(this.getStudentId);

		return [ ...this.currentEnrollment, ...idsToEnroll ];
	}
	needToEnroll(record) {
		return (record.paid && !this.currentEnrollment.includes(record.id));
	}
	getStudentId(record) {
		return record.id;
	}
	remindUnpaid(recordIds) {
		var unpaidIds = recordIds.filter(this.notYetPaid.bind(this));

		this.printRecords(unpaidIds);
	}
	notYetPaid(studentId) {
		var record = this.getStudentFromId(studentId);
		return !record.paid;
	}
}

var deepJS = new Workshop();

// ********************************

deepJS.addStudent(311,"Frank",/*paid=*/true);
deepJS.addStudent(410,"Suzy",/*paid=*/true);
deepJS.addStudent(709,"Brian",/*paid=*/false);
deepJS.addStudent(105,"Henry",/*paid=*/false);
deepJS.addStudent(502,"Mary",/*paid=*/true);
deepJS.addStudent(664,"Bob",/*paid=*/false);
deepJS.addStudent(250,"Peter",/*paid=*/true);
deepJS.addStudent(375,"Sarah",/*paid=*/true);
deepJS.addStudent(867,"Greg",/*paid=*/false);

deepJS.enrollStudent(410);
deepJS.enrollStudent(105);
deepJS.enrollStudent(664);
deepJS.enrollStudent(375);

deepJS.printCurrentEnrollment();
console.log("----");
deepJS.enrollPaidStudents();
console.log("----");
deepJS.remindUnpaidStudents();

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/

{% endhighlight %}
{% endcapture %}{% include details.html %}

## Prototypes

### Prototypes

Now that we have learned what the syntactic sugar layer looks like, lets look under the hood and find out how the prototype system that classes are layered on top of actually works. First observation: Objects that exist in our programs that we can see, have created, or that we interact with are always created by 'constructor calls' (via `new`). When you use `new` in front of a function call, JavaScript is constructing an object to be used for `this` binding of that function call. The following statement is not *entirely* correct:

*A constructor call makes an object based-on its own prototype*

Let's learn more about classes from a Computer Science[CS] perspective to understand why 'based-on' in the above statement is incorrect. The most common way in CS to describe the difference between a class and an instance is that a class is the abstract pattern for a thing, like a blueprint. The instance is similar to when an architect takes the blueprint and builds the thing. Class-oriented development is fundamentally a copy operation. Continuing on the blueprint / thing being built analogy, what would happen if after you've completed the blueprint and built the thing, you went back to the blueprint and added something, would it then be reflected in the thing that was built? Or how about the other way around? If you added something to the thing, would it be reflected in the blueprint? The answer to both is **no**. The moment the thing is instantiated from the blueprint, the relationship between the two ceases to exist. The instantiation creates a 'copy' and everything is inherited.

Speaking of inheritance, a parent / child relationship between classes is also fundamentally a copy operation as previously described. One small caveat to the idea of creating a copy... JavaScript doesn't do any copying... To properly describe what is happening when a constructor call makes an object, it doesn't make it 'based-on' the prototype, it makes it **linked to** the prototype. Some would argue that copy vs link is just two sides of the same coin, but copying and linking are fundamentally opposite to one another. The difference between them can completely change based on whether your mental model is all about copying vs linking. The difference matters because when your program breaks, why did it break? It broke because you had a divergence from what you thought your program was doing, your mental model, and what the system was actually doing. If you are thinking copying and it is doing linking, what do you think is going to happen? BUGS!

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