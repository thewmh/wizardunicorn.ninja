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

[Link to the course exercise files](https://static.frontendmasters.com/resources/2019-05-06-functional-light-v3/functional-light-v3.zip)

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

What is a function? Let's start with this inflammatory statement: "Functional programming is not all about the function keyword". Consider the following:

{% highlight javascript %}

function addNumbers(x = 0, y = 0, z = 0, w = 0) {
    var total = x + y + z + w;
    console.log(total);
}

function extraNumbers(x = 2, ...args) {
    return addNumbers(x, 40, ...args)
}

extraNumbers(); // 42
extraNumbers(3, 8, 11); // 62

{% endhighlight %}

Is `addNumbers` a function? What about `extraNumbers`? Are either of them functions? If they are not functions, why not?

`addNumbers` clearly takes some inputs (`x, y, z, w`) and it clearly does something with those inputs, so it is at least kind of like a function, right? Nope. The bar for being a function is a bit higher than that. So... what is it then? The best term that we could use to describe `addNumbers` is that it is a 'procedure'. A procedure is a collection of operations, a collection of things that you need to do in a program. Just because it uses the function keyword does not make it a function. Procedures can take inputs, they can return outputs, they can print to the console, they can be called multiple times. There are a lot of benefits to procedures, but this course is not about procedural programming (yes, its a thing). 

Wonderful, but... what is a function? To start, a function not only has to take some input, it also has to return some output. Not just print something to the console, if it does not have the `return` keyword, it is most definitely not a function! So any 'function' that does not have a `return` keyword is a procedure and a function is more than what we've covered so far, we will expand on what a function **is** as we move through this workshop. Oooook, so `addNumbers` isn't a function, it's a procedure. What about `extraNumbers`? `extraNumbers` **has** a `return` keyword! `extraNumbers` is function? 😞 No.

`extraNumbers` is not a function, because; expanding on the definition of what a function **is**, a function can only call other functions. Functions cannot call procedures (`addNumbers`), if they do, they themselves become procedures. Number one in functional programming is that you can't do functional programming with a thing that is not a function; it has to be a function for you to take advantage of functional principles. So, neither `addNumbers` nor `extraNumbers` qualify as functions because they both violate what we have so far learned about what a function is. They are procedures.

How about this:

{% highlight javascript %}

function tuple(x, y) {
    return [x + 1, y -1];
}

var [a, b] = tuple(...[5, 10]);

a; // 6
b; // 9

{% endhighlight %}

In JavaScript, a tuple is basically two values in an array. The function `tuple` has inputs, uses the `return` keyword to return outputs, it is a function?

### Function Naming Semantics

Long story short, yes, `tuple` was a function. But if you took that `tuple` function and it required the inputs `x` and `y`, but instead of returning those as outputs returned the number 40, would it still be a function? Not really. To better understand what makes a function a function, lets look at some maths:

> f(x) = 2x<sup>2</sup> + 3

The above might look familiar from some math you may have learned in (not college) school and, unless you were using a graphing calculator, you may recall not really understanding that math in any real concrete sense. The reality of the math above is that you are taking an input value, x, putting it into a function `x`. The output value will be the `y` coordinate, when you combine `x` with `y`, you will see a 'u' shape on a graph! Uh huh... But what is a function? A function is a relationship between the input and the output. If you were to write the above maths as a JavaScript function, it might look something like this:

{% highlight javascript %}

function parabola(x) {
  return 2 * Math.pow(x, 2) + 3;
}

{% endhighlight %}

In functional programming, it matters that there is an obvious relationship between the input and output of a function. Again, a function is the semantic relationship between input and computed output. Here's another example:

{% highlight javascript %}

function shippingRate(size, weight, speed) {
  return ((size + 1) * weight) + speed;
}

{% endhighlight %}

### Side Effects

In functional programming there should not be any side effects in functions. But what is meant by side effects? Indirect inputs or outputs. Like this:

{% highlight javascript %}

function shippingRate() {
  rate = ((size + 1) * weight) + speed;
}

var rate;
var size = 12;
var weight = 4;
var speed = 5;
shippingRate();
rate; // 57

size = 8;
speed = 6;
shippingRate();
rate; // 42

{% endhighlight %}

The above code has no direct relationship between the input and output values, and therefore is not considered a function. If however, we made some changes and made the code look like this:

{% highlight javascript %}

function shippingRate(size, weight, speed) {
  return ((size + 1) * weight) + speed;
}

var rate;

rate = shippingRate(12, 4, 5); // 57
rate = shippingRate(8, 4, 6); // 42

{% endhighlight %}

Now in the above code, the (direct) relationship between the input and output values has been created and this qualifies as a function? Yes! The important thing to consider when talking about whether or not a function is a function is to look at where was the function called, which needs to avoid creating or using side effects. But w hat really are the side effects that we need to be concerned about? 

* I/O (console, files, etc) - Any logs or something dealing with files are considered side effects on the system
* Database Storage
* Network Calls
* Reading from / Writing to the DOM
* Timestamps
* Generating a Random Number
* CPU Heat? - Any program will cause a CPU to compute which in turn will cause it to generate heat which is a side effect
* CPU Time Delay

Not only is it impractical to avoid all side effects, but it is theoretically impossible to avoid all side effects. So really, what is meant when it is suggested to avoid side effects is to minimize them. A program with no side effects would be no different than if the program did not exist at all, you couldn't even prove it existed! The necessity of side effects is undeniable, but we need to make certain that we are as intentional as possible about them and make them obvious. 

### Pure Functions & Constants

Continuing to build on our definition of what a function in functional programming is, a 'pure function' is one that takes direct inputs and provides direct outputs and has no side effects. Also, as mentioned previously, it is where the function is called that will be the determining factor as to whether or not the function is a function and whether or not it is pure. Consider this code:

{% highlight javascript %}

// pure
function addTwo(x, y) {
  return x + y;
}

// impure
function addAnother(x, y) {
  return addTwo(x, y) + z;
}

{% endhighlight %}

Because `addAnother` relies on `z`, which would be a value that is potentially unknown at the time of the function call, it is considered impure. But what if the code looked like this:

{% highlight javascript %}

const z = 1;

function addTwo(x, y) {
  return x + y;
}

function addAnother(x, y) {
  return addTwo(x, y) + z;
}

addAnother(20, 21); // 42

{% endhighlight %}

Now, `z` is defined as a `const` and we could surmise that its value would not change throughout the life of the program, is that valid? Well, it is still consistent with functional principles. But what if you used `var` instead of `const`? Would that invalidate the above code as being in line with functional programming? No, `var` or `const` the above code would still be following / consistent with functional principles. The reason being that in the above code block, `z` is never being reassigned and is therefore serving the purpose of a constant value in the application. If you are using something as a constant in your program, it is best to make it as obvious as possible that is what you are doing. It is important for the reader of our code, yes even if that person is ourselves, to know that they do not need to worry whether something will change, this improves code readability.

### Reducing Surface Area

{% highlight javascript %}

function addAnother(z) {
  return function addTwo(x, y) {
    return x + y + z;
  };
}

addAnother(1)(20, 21); // 42

{% endhighlight %}

Now the codes 'surface area' has been reduced. There are only 2 possible places where the value of `z` could be reassigned (inside of the addAnother function before the return statement, and inside of the addTwo function also before the return statement). This should have the effect on the reader of making them confident that when they pass a value into the `addAnother` function it will stay the same as the value they passed in. The constant nature of the `z` variable is happening via closure. The above code is both a pure function and a pure function call; they both have predictability which is needed and expected out of pure functions.

### Same Input, Same Output

What about this code?

{% highlight javascript %}

function getId(obj) {
  return obj.id;
}

{% endhighlight %}

Would you consider `getId` to be a pure function in the sense that if passed the same object it would always return the same id? What if there was more to the program and it looked like this:

{% highlight javascript %}

function getId(obj) {
  return obj.id;
}

getId({
  get id() {
    return Math.random();
  }
});

{% endhighlight %}

With the revised code, your confidence level of whether you would get the same id from passing in the same object should have gone to zero. In determining whether or not a function is pure, it is important to see all relevant parts of the program. The more that you can use the techniques outlined in this workshop, to reduce the surface area of where non-functional things can occur, the easier it will be for somebody to read, understand, and ultimately rely upon. We want all readers of our code, again including our future selves, to know from reading our code that they can 'trust' it. Pure function calls act in isolation. i.e given the same inputs they should always produce the same output. A pure function is one that whenever it is executed with the same input, it will always give the same output. The goal in functional programming is to design our functions so that as many of the functions as possible will always return the same output when provided the same input, i.e. pure functions.

### Level of Confidence

The point of function purity in JavaScript is; how confident are we, the reader, in any given functions behavior? When asked whether or not a function is pure, a binary answer of yes or no will not suffice. The question is not a yes or no question, but one of level of confidence. Something along the lines of "I have a high level of confidence that this function will behave pure" or "I have a low level of confidence that this is a pure function" is more appropriate. The goal being to shift the balance of confidence, as much as possible, to a high degree of confidence in the purity of our functions. And remember that the determining factor, in JavaScript, of whether or not a function behaves pure is at the function call, not the function definition. 

### Extracting Impurity

If a function is not pure for whatever reason, what are our options? An obvious option would be to leave it as it is; i.e. maybe it must write to a database, this is a side effect and an impurity, but sometimes it has to happen. What you can do is make it obvious that the procedure will have side effects; name it in a way that conveys this, add a comment. The reason for being obvious is to make it easier to maintain the code. Another option would be to look at any given impure function and ask: Is there some way for me to rearrange the way this function works and extract out the impurity, leaving just a pure function in place? This does not mean to remove the impure functionality from your application, but to put the impurity in a place that makes it more obvious. Here is some code to look over:

{% highlight javascript %}

function addComment(userID, comment) {
  var record = {
    id: uniqueID(),
    userID,
    text: comment
  };
  var elem = buildCommentElement(record);
  commentList.appendChild(elem);
}

addComment(42, "This is my first comment!");

{% endhighlight %}

In the above code block, both the function definition and the function call are impure as the function definition will modify the DOM when called, and the function call... modifies the DOM. An additional side effect above is the id being generated by `uniqueID()`. Is it possible to extract the impurities? We could change it to look like this:

{% highlight javascript %}

function newComment(userID, commentID, comment) {
  var record = {
    id: commentID,
    userID,
    text: comment
  };
  return buildCommentElement(record);
}

var commentID = uniqueID();
var elem = newComment(
  42,
  commentID,
  "This is my first comment!"
);

commentList.appendChild(elem);

{% endhighlight %}

The above does not get rid of any side effects, but extracts them to leave a pure function whenever possible.

### Containing Impurity

If you cannot extract impurities, another way to handle impurities is to contain them. The goal here is not to have no impurity, but to handle impurity so that it does not have any effect on other parts of the application. If you can reduce the surface area of impurities, this will make your codebase more manageable. Looking at the following code, try to identify impurities and consider how to better contain them:

{% highlight javascript %}

var SomeAPI = {
  threshold: 13,
  isBelowThreshold(x) {
    return x <= SomeAPI.threshold;
  }
};
var numbers = [];

function insertSortedDesc(v) {
  SomeAPI.threshold = v;
  var idx = numbers.findIndex(SomeAPI.isBelowThreshold);
  if (idx == -1) {
    idx = numbers.length;
  }
  numbers.splice(idx, 0, v);
}

insertSortedDesc(3);
insertSortedDesc(5);
insertSortedDesc(1);
insertSortedDesc(4);
insertSortedDesc(2);
numbers; // [ 5, 4, 3, 2, 1 ]

{% endhighlight %}

In the above code, `insertSortedDesc` modifies the global `numbers` variable. How could that function be modified to contain the impurity? Wrap it in another function!

{% highlight javascript %}

var SomeAPI = {
  threshold: 13,
  isBelowThreshold(x) {
    return x <= SomeAPI.threshold;
  }
};
var numbers = [];

function getSortedNums(nums, v) {
  var numbers = nums.slice();
  insertSortedDesc(v);
  return numbers;

  function insertSortedDesc(v) {
    SomeAPI.threshold = v;
    var idx = numbers.findIndex(SomeAPI.isBelowThreshold);
    if (idx == -1) {
      idx = numbers.length;
    }
    numbers.splice(idx, 0, v);
  }
}

numbers = getSortedNums(numbers, 3);
numbers = getSortedNums(numbers, 5);
numbers = getSortedNums(numbers, 1);
numbers = getSortedNums(numbers, 4);
numbers = getSortedNums(numbers, 2);
numbers; // [ 5, 4, 3, 2, 1 ]

{% endhighlight %}

Now that `insertSortedDesc` is wrapped in `getSortedNums`, the `numbers` variable is restricted to the function scope of `getSortedNums`. The side effect of modifying the `numbers` array still exists, but it is now contained within a function scope instead of global scope, effectively reducing the impurities surface area. But there is still one additional impurity... `SomeAPI.threshold = v;` is modifying the value of `threshold` in the `SomeAPI` object. How can that be contained? We likely cannot wrap it in another function because this is likely a third-parties API service who's code we do not have access to modify. Containment of this impurity might look like this:

{% highlight javascript %}

var SomeAPI = {
  threshold: 13,
  isBelowThreshold(x) {
    return x <= SomeAPI.threshold;
  }
};
var numbers = [];

function insertSortedDesc(v) {
  SomeAPI.threshold = v;
  var idx = numbers.findIndex(SomeAPI.isBelowThreshold);
  if (idx == -1) {
    idx = numbers.length;
  }
  numbers.splice(idx, 0, v);
}

function getSortedNums(nums, v) {
  var [origNumbers, origThreshold] = [numbers, SomeAPI.threshold]; // capture original values
  numbers = nums.slice(); // numbers is a copy of the nums array
  insertSortedDesc(v); // call the function that has all the side effects
  nums = numbers; // capture the changed state of the insertSortedDesc function call
  [numbers, SomeAPI.threshold] = [origNumbers, origThreshold]; // reset values to original value
  return nums; // return the state
}

numbers = getSortedNums(numbers, 3);
numbers = getSortedNums(numbers, 5);
numbers = getSortedNums(numbers, 1);
numbers = getSortedNums(numbers, 4);
numbers = getSortedNums(numbers, 2);
numbers; // [ 5, 4, 3, 2, 1 ]

{% endhighlight %}

The above code is a very 'brute force' way of dealing with side effects which would get very unmanageable very quickly, especially if we were dealing with a more complex set of state; i.e. the DOM. Capturing the current state of the DOM, modifying it, then resetting it is very hard. Same for a database. Again, all of this is just an attempt to reduce the surface area of side effects, ideally improving code readability and maintainability. 

### Impurity Exercise: Wrappers & Adapters

Instructions:

This is a two-part exercise to practice two techniques for containing function impurity.

Instructions (Part 1)

In this part of the exercise, you will contain the function impurity of `sortStudentsByName(..)` using a wrapper function.

**NOTE:** Do not modify the contents of `sortStudentsByName(..)` for this exercise.

1. Move and modify `getStudentsByName(..)` so that it wraps around `sortStudentsByName(..)` (and calls it internally).

2. `getStudentsByName(..)` should receive the current list of students, and return a new sorted list of students.

3. Make sure that calling `getStudentsByName(..)` doesn't have a side-effect of modifying the global `students` array.

4. The `studentsTest1` and `studentsTest3` tests at the bottom of the exercise should all print `true`.

Instructions (Part 2)

In this part of the exercise, you will contain the function impurity of `sortStudentsByID(..)` using an adapter function.

**NOTE:** Do not modify the contents of `sortStudentsByID(..)` for this exercise.

1. Modify `getStudentsByID(..)` so that it is an adapter that calls `sortStudentsByID(..)`.

2. `getStudentByID(..)` should receive the current list of students, and return a new sorted list of students.

3. Make sure that calling `getStudentsByID(..)` doesn't have a side-effect of modifying the global `students` array.

4. All tests (`studentsTest1`, `studentsTest2`, and `studentsTest3`) at the bottom of the exercise should all print `true`.

Code to work from:

{% highlight javascript %}

"use strict";

var students = [
	{ id: 260, name: "Kyle" },
	{ id: 729, name: "Susan" },
	{ id: 42, name: "Frank" },
	{ id: 74, name: "Jessica" },
	{ id: 491, name: "Ally" }
];

function sortStudentsByName() {
	// Don't modify this function
	students.sort(function byName(s1,s2){
		if (s1.name < s2.name) return -1;
		else if (s1.name > s2.name) return 1;
		else return 0;
	});
	return students;
}

function sortStudentsByID() {
	// Don't modify this function
	students.sort(function byID(s1,s2){
		return s1.id - s2.id;
	});
	return students;
}

// *************************************

// modify/move this function
function getStudentsByName() { return students; }

// modify/move this function
function getStudentsByID() { return students; }

// *************************************

var studentsTest1 = getStudentsByName(students);
console.log(studentsTest1[0].name === "Ally");
console.log(studentsTest1[1].name === "Frank");
console.log(studentsTest1[2].name === "Jessica");
console.log(studentsTest1[3].name === "Kyle");
console.log(studentsTest1[4].name === "Susan");

var studentsTest2 = getStudentsByID(students);
console.log(studentsTest2[0].id === 42);
console.log(studentsTest2[1].id === 74);
console.log(studentsTest2[2].id === 260);
console.log(studentsTest2[3].id === 491);
console.log(studentsTest2[4].id === 729);

var studentsTest3 = students;
console.log(studentsTest3[0].id === 260 && studentsTest3[0].name === "Kyle");
console.log(studentsTest3[1].id === 729 && studentsTest3[1].name === "Susan");
console.log(studentsTest3[2].id === 42 && studentsTest3[2].name === "Frank");
console.log(studentsTest3[3].id === 74 && studentsTest3[3].name === "Jessica");
console.log(studentsTest3[4].id === 491 && studentsTest3[4].name === "Ally");

{% endhighlight %}

### Impurity Solution: Wrappers

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

"use strict";

var students = [
	{ id: 260, name: "Kyle" },
	{ id: 729, name: "Susan" },
	{ id: 42, name: "Frank" },
	{ id: 74, name: "Jessica" },
	{ id: 491, name: "Ally" }
];

function getStudentsByName(students) { 
  students = students.slice();
  return sortStudentsByName();

  function sortStudentsByName() {
    // Don't modify this function
    students.sort(function byName(s1,s2){
      if (s1.name < s2.name) return -1;
      else if (s1.name > s2.name) return 1;
      else return 0;
    });
    return students;
  }
}

function sortStudentsByID() {
	// Don't modify this function
	students.sort(function byID(s1,s2){
		return s1.id - s2.id;
	});
	return students;
}

// *************************************

// modify/move this function
function getStudentsByID() { return students; }

// *************************************

var studentsTest1 = getStudentsByName(students);
console.log(studentsTest1[0].name === "Ally");
console.log(studentsTest1[1].name === "Frank");
console.log(studentsTest1[2].name === "Jessica");
console.log(studentsTest1[3].name === "Kyle");
console.log(studentsTest1[4].name === "Susan");

var studentsTest2 = getStudentsByID(students);
console.log(studentsTest2[0].id === 42);
console.log(studentsTest2[1].id === 74);
console.log(studentsTest2[2].id === 260);
console.log(studentsTest2[3].id === 491);
console.log(studentsTest2[4].id === 729);

var studentsTest3 = students;
console.log(studentsTest3[0].id === 260 && studentsTest3[0].name === "Kyle");
console.log(studentsTest3[1].id === 729 && studentsTest3[1].name === "Susan");
console.log(studentsTest3[2].id === 42 && studentsTest3[2].name === "Frank");
console.log(studentsTest3[3].id === 74 && studentsTest3[3].name === "Jessica");
console.log(studentsTest3[4].id === 491 && studentsTest3[4].name === "Ally");  

{% endhighlight %}
{% endcapture %}{% include details.html %} 

### Impurity Solution: Adapters

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

"use strict";

var students = [
	{ id: 260, name: "Kyle" },
	{ id: 729, name: "Susan" },
	{ id: 42, name: "Frank" },
	{ id: 74, name: "Jessica" },
	{ id: 491, name: "Ally" }
];

function getStudentsByName(students) { 
  students = students.slice();
  return sortStudentsByName();

  function sortStudentsByName() {
    // Don't modify this function
    students.sort(function byName(s1,s2){
      if (s1.name < s2.name) return -1;
      else if (s1.name > s2.name) return 1;
      else return 0;
    });
    return students;
  }
}

function sortStudentsByID() {
	// Don't modify this function
	students.sort(function byID(s1,s2){
		return s1.id - s2.id;
	});
	return students;
}

function getStudentsByID(currentStudents) {
  var origStudents = students.slice(0);
  students = currentStudents;
  var newStudents = sortStudentsByID();
  students = origStudents;
  return newStudents; 
}

// *************************************

// *************************************

var studentsTest1 = getStudentsByName(students);
console.log(studentsTest1[0].name === "Ally");
console.log(studentsTest1[1].name === "Frank");
console.log(studentsTest1[2].name === "Jessica");
console.log(studentsTest1[3].name === "Kyle");
console.log(studentsTest1[4].name === "Susan");

var studentsTest2 = getStudentsByID(students);
console.log(studentsTest2[0].id === 42);
console.log(studentsTest2[1].id === 74);
console.log(studentsTest2[2].id === 260);
console.log(studentsTest2[3].id === 491);
console.log(studentsTest2[4].id === 729);

var studentsTest3 = students;
console.log(studentsTest3[0].id === 260 && studentsTest3[0].name === "Kyle");
console.log(studentsTest3[1].id === 729 && studentsTest3[1].name === "Susan");
console.log(studentsTest3[2].id === 42 && studentsTest3[2].name === "Frank");
console.log(studentsTest3[3].id === 74 && studentsTest3[3].name === "Jessica");
console.log(studentsTest3[4].id === 491 && studentsTest3[4].name === "Ally");  

{% endhighlight %}
{% endcapture %}{% include details.html %} 

## Argument Adapters

### Function Arguments

Shifting from to the arguments that functions receive. Parameter and argument are generally used interchangeably, but they are technically different. The generally accepted definition is that a parameter is the 'thing' in the function definition and an argument is the value that gets passed in when you call the function. Put more simply, arguments get assigned to parameters. And to throw some confusion in there, both parameters and arguments can be considered inputs. Here's some code to look at:

{% highlight javascript %}

// unary
function increment(x) {
  return sum(x, 1);
}

// binary
function sum(x, y) {
  return x + y;
}

{% endhighlight %}

Throughout the remainder of this course, the instructor will be describing the 'shape' of functions which will speak to the number and kinds of things that get passed into and returned from functions. In the above code block, the 'shape' of the two functions is described in the comment above each of the respective function definitions; unary and binary. The shape of a function is quite critical and functional programmers are obsessed with the shape of functions. For functions that we create, it is important to be cognizant of their shape; what arguments will they receive, what will they return. Functional programmers tend to prefer unary functions; those with a single input and a single output, followed by binary functions; two inputs, single output. The more inputs a function has, the harder it is to make it work with other functions, the harder it is to get the shapes to fit.

### Arguments Shape Adapters

We can adapt the shape of functions, have a look at this code:

{% highlight javascript %}

function unary(fn) {
  return function one(arg) {
    return fn(arg);
  };
}

function binary(fn) {
  return function two(arg1, arg2) {
    return fn(arg1, arg2);
  };
}

function f(...args) {
  return args;
}

var g = unary(f);
var h = binary(f);

g(1, 2, 3, 4); // [1]
h(1, 2, 3, 4); // [1, 2]

{% endhighlight %}

Let's talk about higher order functions. A higher order function is a function that either receives, as its inputs, one or more functions, and/or returns one or more functions. In the above code, the variables `g` and  `h` are creating copies of the `unary` and `binary` functions respectively, with the function definition `f` being passed in as an argument. So, when `g(1, 2, 3, 4)` is called, it only returns the first number in the supplied arguments, effectively limiting, or adapting, the shape of `f` to the definition of `unary`; only takes (and returns) a single argument. Adapter and higher order functions are at the core of functional programming. 

### Flip & Reverse Adapter

Let's look at a couple of adapter functions; flip and reverse. Starting with `flip`:

{% highlight javascript %}

function flip(fn) {
  return function flipped(arg1, arg2, ...args) {
    return fn(arg2, arg1, ...args);
  };
}

function f(...args) {
  return args;
}

var g = flip(f);

g(1, 2, 3, 4); // [2, 1, 3, 4]

{% endhighlight %}

`flip` is a function that...flips the order of some of the supplied arguments; in the above example, `flip` flips the first two of the supplied arguments. `flip` is a common method that you might find in utility libraries. A somewhat less common example that you may come across is a reverse arguments method. That looks something like this:

{% highlight javascript %}

function reverseArgs(fn) {
  return function reversed(...args) {
    return fn(...args.reverse());
  };
}

function f(...args) {
  return args;
}

var g = reverseArgs(f);

g(1, 2, 3, 4); // [4, 3, 2, 1]

{% endhighlight %}

This may not be a situation you come across, but the above will reverse the supplied arguments that are passed in. When you find yourself struggling to 'fit' together functions that have different shapes, can you refactor the functions to make them better fit one another or do you need to write an adapter function to make them fit? While it is possible to make a variety of utility functions to modify the shape of other functions, it is best practice to try and write your functions as close to a familiar functional programming approach as possible so that it is familiar at a glance without some reader of your code having to trace all of the transformations and shape changes.

### Spread Adapter

Another of shape adaptation that commonly occurs in functional programming is having a function that takes numerous individual arguments, but you want to call that function with an array. To do this, we can use the spread operator:

{% highlight javascript %}

function spreadArgs(fn) {
  return function spread(args) {
    return fn(...args);
  };
}

function f(x, y, z, w) {
  return x + y + z + w;
}

var g = spreadArgs(f);

g([1, 2, 3, 4]); // 10

{% endhighlight %}

The spread operator is the same as JavaScrips's `.apply` method; it 'spreads' the array out so that each value becomes it's own value, separate from the array. 

## Point Free

### Equational Reasoning

What is point-free? Point-free is a way of defining a function without actually writing anything in the function; a way of making a function by making it with other functions. More specifically, point-free is a way of defining a function without needing to define its 'points', aka, its inputs. Check out this code:

{% highlight javascript %}

getPerson(function onPerson(person) {
  return renderPerson(person);
})

{% endhighlight %}

The above code has a callback passed in `onPerson` which passed on the `person` input to another function, in the above case; `renderPerson`. The input, `person`, is the 'point'. What if you could define the `onPerson` function without needing to list the 'point' at all? Since `onPerson` and `renderPerson` have the same 'shape', you could just pass `renderPerson` as the argument to `getPerson`; i.e.

{% highlight javascript %}

getPerson(renderPerson);

{% endhighlight %}

Doing the above is called equational reasoning. Equational reasoning means reason about this thing and say that it is equationally, not equal in the identity sense, but equal in the shape sense with another thing. Equational reasoning is just one aspect of the 'family' called point-free, and in the next few sections it might become increasingly difficult to follow, but don't despair. Try the things and they will become more familiar and easier to understand. Once you do understand how to implement point-free, try not to go overboard, it can have the unintended side-effect of making your code less readable which is not the point of functional programming.

### Point Free Refactor

Our goal is to make the shape of our functions similar, let's look at some code:

{% highlight javascript %}

function isOdd(v) {
  return v % 2 == 1;
}

function isEven(v) {
  return !isOdd(v);
}

isEven(4); // true

{% endhighlight %}

In the above code, `isEven` is defined in terms of `isOdd`, specifically checking whether `v % 2 == 1` returns false. This is beneficial for the sake of readability and to create the relationship between the `isOdd` and `isEven` function definitions. Going further, would it be possible to define `isEven` in a point-free way? Before we do that, what even is the point of point-free? Point-free moves us closer to a declarative style of code. The approach we are going to take is to implement another Higher Order Function (HOF) as we had done in a previous section. Like so:

{% highlight javascript %}

function not(fn) {
  return function negated(...args) {
    return !fn(...args);
  };
}

function isOdd(v) {
  return v % 2 == 1;
}

var isEven = not(isOdd);

isEven(4); // true

{% endhighlight %}

The refactored code makes more obvious the relationship between `isEven` and `isOdd` which arguably improves readability in the code.

### Point Free Exercise

This is an exercise to practice point-free style.

Instructions

1. Refactor the `output(..)`, `printIf(..)`, and `isLongEnough(..)` functions to use point-free style.

2. Hints:
- Some browsers require `console.log(..)` to run against the `console` context , so `f = console.log; f(..)` fails (because of lost `this` binding).

Use `.bind(..)` to be safe.

- `printIf(..)` can be expressed in terms of a `when(..)` that looks like:

{% highlight javascript %}

function when(fn) {
  return function(predicate){
    return function(...args){
      if (predicate(...args)) {
        return fn(...args);
      }
    };
  };
}

{% endhighlight %}

- `isLongEnough(..)` is the negation of `isShortEnough(..)`.

Code:

{% highlight javascript %}

"use strict";

function output(txt) {
	console.log(txt);
}

function printIf(shouldPrintIt) {
	return function(msg) {
		if (shouldPrintIt(msg)) {
			output(msg);
		}
	};
}

function isShortEnough(str) {
	return str.length <= 5;
}

function isLongEnough(str) {
	return !isShortEnough(str);
}

var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf(isShortEnough)(msg1);		// Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2);		// Hello World

{% endhighlight %}

### Point Free Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

"use strict";

var output = console.log.bind(console);

function when(fn) {
  return function(predicate) {
    return function(...args) {
      if (predicate(...args)) {
        return fn(...args);
      }
    };
  };
}

var printIf = when(output);

function isShortEnough(str) {
	return str.length <= 5;
}

function not(fn) {
  return function negated(...args) {
    return !fn(...args);
  }
}

var isLongEnough = not(isShortEnough);

var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf(isShortEnough)(msg1);		// Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2);		// Hello World 

{% endhighlight %}
{% endcapture %}{% include details.html %} 

### Advanced Point Free

We'll cover these advanced point-free techniques later in this workshop, but here is a preview:

{% highlight javascript %}

function mod(y) {
  return function forX(x) {
    return x % y;
  };
}

function eq(y) {
  return function forX(x) {
    return x === y;
  };
}

{% endhighlight %}

The above methods are something that you could find in a functional programming utility library, but we'll break them down. Both the `mod` and `eq` functions take two arguments, first `y`, then `x`. This might seem strange, but it makes them more predictable. In functional programming, the order of parameters is important and should be considered. Adding on to the above code, let's stub out an `isOdd` function that uses both `mod` and `eq`:

{% highlight javascript %}

function mod(y) {
  return function forX(x) {
    return x % y;
  };
}

function eq(y) {
  return function forX(x) {
    return x === y;
  };
}

var mod2 = mod(2);
var eq1 = eq(1);

function isOdd(x) {
  return eq1( mod2( x ) );
}

{% endhighlight %}

In the above code, specifically in the `isOdd` function definition, you may notice that the return value of executing `mod2` is immediately passed in to `eq1`, this is known as composition. Now let's make `isOdd` into a point-free function:

{% highlight javascript %}

function mod(y) {
  return function forX(x) {
    return x % y;
  };
}

function eq(y) {
  return function forX(x) {
    return x === y;
  };
}

var mod2 = mod(2);
var eq1 = eq(1);

function compose(fn2, fn1) {
  return function composed(v) {
    return fn2( fn1( v ) );
  };
}

var isOdd = compose(eq1, mod2);

{% endhighlight %}

We've added a `compose` function which will compose two functions for us, but there is still an additional measure we could take to make our code more implicit and get rid of the `var mod2` `var eq1` variables:

{% highlight javascript %}

function mod(y) {
  return function forX(x) {
    return x % y;
  };
}

function eq(y) {
  return function forX(x) {
    return x === y;
  };
}

function compose(fn2, fn1) {
  return function composed(v) {
    return fn2( fn1( v ) );
  };
}

var isOdd = compose(eq(1), mod(2));

{% endhighlight %}

All of this was achieved using equational reasoning which is the core of being able to do point-free style code. This may feel way too advanced and more confusing that helpful, but the point is exposure and the real understanding and comfort with this paradigm will come from practice and from being able to speak to your code which will reinforce your knowledge and comfort level. 

## Closure

### Closure

We've already used/seen closure a few times in this workshop, but let's get a definition for exactly what closure is. It is virtually impossible to be any good at functional programming without a solid understanding of what closure is.

> Closure is when a function "remembers" the variables around it even when that function is executed elsewhere.

Here is an example of closure:

{% highlight javascript %}

function  makeCounter() {
  var counter = 0;
  return function increment() {
    return ++counter;
  };
}

var c = makeCounter();

c(); // 1
c(); // 2
c(); // 3

{% endhighlight %}

The example above clearly illustrates closure, but when `c` is set to `makeCounter` than repeatedly called, are the function calls; `c()`, pure function calls? Nope. Every time `c()` is called, it returns a different value. The takeaway of which is; closure is not necessarily functionally pure. This isn't to suggest that closure cannot be used in functional theory, it can. Here are some examples of using closure in a way that is consistent with functional style, that produces a pure function.

{% highlight javascript %}

function unary(fn) {
  return function one(arg) {
    return fn(arg);
  };
}

{% endhighlight %}

In the above `unary` function, the `one` function retains access to the `fn` parameter, This is closure and it is considered in functional programming to be pure. Here's another example we have already seen:

{% highlight javascript %}

function addAnother(z) {
  return function addTwo(x, y) {
    return x + y + z;
  };
}

{% endhighlight %}

In the above, `addTwo` is 'closed' over the `z` variable, which it is able to use in the final return statement; `return x + y + z`. Both the `unary` function  and the `addAnother` function reference variables that are outside of themselves, but it is 'safe' from a functional programming perspective because the values of the referenced variables do not change.

### Closure Exercise

This is an exercise to practice closure.

Instructions

1. Modify `strBuilder(..)` so that it can take a string and return back a function.

	**Note:** For purposes of this exercise, assume that `strBuilder(..)` itself is always called with a string initially.

2. For each call to a function here, if a string is passed, a function should be returned.

3. If a non-string is passed (such as passing no argument), a string value should be returned, which is the concatenation of all the passed in strings.

4. Hints:
	- You can use `typeof foo == "string"` to test if `foo` is a string.

	- Look at the test cases at the bottom of the exercise file to clarify any questions about expected behavior.

	- Ensure your function(s) are pure. Avoid mutating a closed over variable, which would be a side-effect.

Here's the code to work from:

{% highlight javascript %}

"use strict";

function strBuilder(str) {
	return strBuilder;
}

var hello = strBuilder("Hello, ");
var kyle = hello("Kyle");
var susan = hello("Susan");
var question = kyle("?")();
var greeting = susan("!")();

console.log(strBuilder("Hello, ")("")("Kyle")(".")("")() === "Hello, Kyle.");
console.log(hello() === "Hello, ");
console.log(kyle() === "Hello, Kyle");
console.log(susan() === "Hello, Susan");
console.log(question === "Hello, Kyle?");
console.log(greeting === "Hello, Susan!");

{% endhighlight %}

### Closure Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

"use strict";

function strBuilder(str) {
  return function concat(str2) {
    if(typeof str2 == "string") {
      return strBuilder(str + str2);
    }
    return str;
  };
}

var hello = strBuilder("Hello, ");
var kyle = hello("Kyle");
var susan = hello("Susan");
var question = kyle("?")();
var greeting = susan("!")();

console.log(strBuilder("Hello, ")("")("Kyle")(".")("")() === "Hello, Kyle.");
console.log(hello() === "Hello, ");
console.log(kyle() === "Hello, Kyle");
console.log(susan() === "Hello, Susan");
console.log(question === "Hello, Kyle?");
console.log(greeting === "Hello, Susan!");

{% endhighlight %}
{% endcapture %}{% include details.html %}

### Lazy vs Eager Execution

{% highlight javascript %}

function repeater(count) {
  return function allTheAs() {
    return "".padStart(count, "A");
  };
}

var A = repeater(10);

A(); // "AAAAAAAAAA"
A(); // "AAAAAAAAAA"

{% endhighlight %}

As long as the `A` variable retains its relationship to the `repeater` function with the argument of 10; i.e. it is not reassigned, it will always return `AAAAAAAAAA`. The function call is when the 'work' of making the string of A's happens, this is considered to be deferred or lazy. But why would you want to defer the work? You would want to defer the work of a function if you are uncertain the frequency at which that function will be used; i.e. maybe you only need to call a function 10% of the time, it would not make sense to have it always run. The downside of this lazy or deferred approach is having to call the function and do the work every time it is called. The opposite approach to lazy is eager, which would look like this:

{% highlight javascript %}

function repeater(count) {
  var str = "".padStart(count, "A");
  return function allTheAs() {
    return str;
  };
}

var A = repeater(10);

A(); // "AAAAAAAAAA"
A(); // "AAAAAAAAAA"

{% endhighlight %}

Now, the work of the `repeater` functions execution has moved to when it is assigned to the variable `A` instead of when `A()` is called, meaning that the return value of executing the function has already been stored in `A` at the time of its declaration. The benefit of the eager approach is that the work is only done once. The downside of the eager approach is that `A` may never get called in which case we've 'wasted' having done the work up-front for storing a value that is never used. In these examples the 'cost' of executing vs. not is trivial, but if one were doing more intensive and complex executions, the value of choosing lazy over eager (or vice versa) would become a more important decision. Either approach is possible thanks to closure.

### Memoization

What if we want to do the work of the function in the last section, but only want to do the work when it has been asked for and we want to do it only once? Maybe we could have a way to detect whether or not the work had been done, and if it had been done, not do it again? That approach might look like this:

{% highlight javascript %}

function repeater(count) {
  var str;
  return function allTheAs() {
    if (str == undefined) {
      str = "".padStart(count, "A");
    }
    return str;
  };
}

var A = repeater(10);

A(); // "AAAAAAAAAA"
A(); // "AAAAAAAAAA"

{% endhighlight %}

Now, the only time `str` will be undefined is at the first call, in which case the work will execute. Once it has executed once, `str` will no longer be undefined and it will just return `str` instead of doing the work again. The only 'problem', from a functional programming perspective, is that the `str` variable changes over time from undefined to whatever the eventual string is. The function call itself is pure, but the function definition is not obviously pure. Functional programming is not useful unless it is both readable and pure. In other words, the style of this code produces a low-degree of confidence in the mind of a functional programmer. What if there was a way of achieving the performance benefit of having a lazy function that only executes once when called, but does so in a declarative way? There's a utility for that! The utility is called `memoize`.

{% highlight javascript %}

function repeater(count) {
  return memoize(function allTheAs() {
      return "".padStart(count, "A");
    });
}

var A = repeater(10);

A(); // "AAAAAAAAAA"
A(); // "AAAAAAAAAA"

{% endhighlight %}


`memoize` is built into all the functional programming utility libraries. `memoize` maintains an internal cache, which if the same input is passed to a function, it will just return the previously cached result. Memoization allows us to write more declaratively, which makes the code more obviously pure. Since memoization maintains an internal cache, is it necessary to wrap all of your functions in it? It depends on whether your function will be called repeatedly with the same or different inputs. If the input will always be the same, this is a good use case for memoization, otherwise, you'd use up a lot of memory for all of the memoization from calling a function with different inputs, in which case this would not be a good use of it. Memoize if you would benefit from the usage pattern of the performance improvement.

### Referential Transparency

We're finally ready to get to the complete definition of what a pure function is! We started with a pure function needs to take some inputs and return an output. We then added to that a pure function actually needs to have a relationship between the inputs and outputs, which is better but still not good enough. We then added that the input and output need to be direct, still incomplete. We then said that the inputs do not have to be direct, but do need to be unchanging. The definition then evolved to focus on the function call which stated that when the function is called with the same inputs we should be able to expect the same output. All of this builds on the previous, but yet incomplete, definition of what a pure function is, but is still incomplete. Here is the canonical definition of what a pure function is. If at the point of a function call you could replace the value with what is returned from the function call and it would not change anything else in the entire program, that is considered a pure function. This is referential transparency.

A function call is pure if it has referential transparency. Referential transparency means that a function call can be replaced with its return value and not affect any of the rest of the program. The real benefit of referential transparency is to the reader of the code. If the reader of your code can realize that a function call will always return the same result, this reduces the cognitive overhead to trace through the entirety of your code every time they see a function call. You cannot have anything else in functional programming unless you understand the value and importance of function (call) purity.

### Generalized to Specialized

Moving from generalized functions to ones that are more specialized is a key concept in functional programming. Imagine you have the following code:

{% highlight javascript %}

function ajax(url, data, cb) { /*..*/ }

ajax(CUSTOMER_API, {id: 42}, renderCustomer);

{% endhighlight %}

There is nothing inherently wrong with the above code, but there may be some details in the function call that are unnecessary. How can we make that cleaner?

{% highlight javascript %}

function ajax(url, data, cb) { /*..*/ }

ajax(CUSTOMER_API, {id: 42}, renderCustomer);

function getCustomer(data, cb) {
  return ajax(CUSTOMER_API, data, cb);
}

getCustomer({id: 42}, renderCustomer);

{% endhighlight %}

We've introduced an intermediary function, `getCustomer`, which only requires `data` and `cb` arguments. The `getCustomer` function call becomes easier to understand than the `ajax` function call. One of the reasons that you make something into a function is so the code is more semantic. The name of a function call describes its purpose, which is the key thing that we want to describe to our codes readers. Considering this, it may be beneficial to push this even further towards specialization adding additional benefit in the way of readability. Here's that same code further expanded upon:

{% highlight javascript %}

function ajax(url, data, cb) { /*..*/ }

ajax(CUSTOMER_API, {id: 42}, renderCustomer);

function getCustomer(data, cb) {
  return ajax(CUSTOMER_API, data, cb);
}

getCustomer({id: 42}, renderCustomer);

function getCurrentUser(cb) {
  return getCustomer({id: 42}, cb);
}

getCurrentUser(renderCustomer);

{% endhighlight %}

`getCurrentUser(renderCustomer);` is more descriptive than `getCustomer({id: 42}, renderCustomer)` is more descriptive than `ajax(CUSTOMER_API, {id: 42}, renderCustomer)`. None of the functionality has changed, the stylization of the code has changed to be more semantic. This is great, but we've kind of cluttered up our code. Is there a way that we could define these more specialized versions of functions without having to define manually pointed functions? Of course there is! But before we jump into what that looks like, it is important to reiterate that the order of parameters in our function definitions is important! Parameters should be ordered from most general to most specialized and you will see this being the case if you take a look at functional programming utility libraries.

### Partial Application & Currying

The first approach we could take to refactoring the code in the last section would be partial application:

{% highlight javascript %}

function ajax(url, data, cb) { /*..*/ }

var getCustomer = partial(ajax, CUSTOMER_API);

var getCurrentUser = partial(getCustomer, {id: 42});

getCustomer({id: 42}, renderCustomer);

getCurrentUser(renderCustomer);

{% endhighlight %}

`partial` is a utility method provided by all the functional libraries which takes a function as its first input, and then it takes as its next input a set of arguments to pass along to that function at some point. Another, more common, way of specialization is currying. When it comes to (function) specialization, partial application and currying are kind of like cousins, related in the sense that they both accomplish the same end goal; specializing a generalized function, but they both go about it in a different way. Let's look at how we could specialize our functions with currying.

{% highlight javascript %}

function ajax(url) {
  return function getData(data) {
    return function getCB(cb) { /*..*/ };
  };
}

ajax(CUSTOMER_API)({id: 42})(renderCustomer);

{% endhighlight %}

The `ajax` function call is actually being called three separate times, with an argument supplied for each 'level' of the function; `url`, `data`, and `cb`; this could be considered a manual form of currying. This allows us to get specialization like so:

{% highlight javascript %}

function ajax(url) {
  return function getData(data) {
    return function getCB(cb) { /*..*/ };
  };
}

ajax(CUSTOMER_API)({id: 42})(renderCustomer);

var getCustomer = ajax(CUSTOMER_API);
var getCurrentUser = getCustomer({id: 42});

{% endhighlight %}

We can now get the more specialized function calls without having to leverage a utility such as `partial`. It would be nice if there were a utility that could further simplify the currying for us! Well there is:

{% highlight javascript %}

var ajax = curry(
  3,
  function ajax(url, data, cb) { /*..*/ }
);
var getCustomer = ajax(CUSTOMER_API);
var getCurrentUser = getCustomer(id: 42);

{% endhighlight %}

The `curry` utility adapts the passed in function into one that only accepts one input at a time. In other words, it creates a wrapper adapted function who's job it is to keep returning a new function that expects another input, until you have provided the specified number of inputs; in the above code that'd be 3.

### Partial Application & Currying Comparison

So we have the same output with currying that we had with partial application. The major difference is that with partial application we had to call the `partial` utility function numerous times versus currying where we only had to call the utility function for currying once. Functional programmers prefer currying over partial application because they tend to prefer unary functions; single input, single output; which currying is. Here's a summary of partial application versus currying:

1. Both are specialization techniques

2. Partial Application presets some arguments now, receives the rest on the next call

3. Currying does not preset any arguments, receives each argument one at a time

If you're ever asked in an interview what's the difference between partial application and currying, the answer is; both of them specialize, but they do it differently; partial application takes some input now, the rest later, currying takes no input now, each input one at a time.

Q: Why does Partial Application still exist in functional programming?

A: Because, aside from it being a part of the historic canonical definition of functional programming, there are some cases where it would be more convenient to do Partial Application over Currying. For example, consider you have a function that starts out expecting five inputs, and you want to produce another function that expects three inputs, i.e. you only want to preset two of the inputs. If you were to curry this, you'd have to call it twice, and the function that you get back would not be one that is expecting three inputs, but a curried function of three more chains, which might not be the shape of function that you want to pass around. In this case, it might be that Partial Application produces a more preferable shape.

### Changing Function Shape with Curry

Consider the following code:

{% highlight javascript %}

function add(x, y) { return x + y; }

[0, 2, 4, 6, 8].map(function addOne(v) {
  return add(1, v);
});

// [1, 3, 5, 7, 9]

{% endhighlight %}

Why in the above `.map` could you not directly pass the `add` function instead of how it is implemented above? Because they have different shapes. `add` is a binary function while `map` is expecting a unary function. In the above code, `addOne` is changing the shape by pre-specifying one of the inputs. But it might be even better to have a curried version like so:

{% highlight javascript %}

function add(x, y) { return x + y; }

[0, 2, 4, 6, 8].map(function addOne(v) {
  return add(1, v);
});

// [1, 3, 5, 7, 9]

add = curry(add);

[0, 2, 4, 6, 8].map(add(1));

// [1, 3, 5, 7, 9]

{% endhighlight %}

While both function the same, using `curry` is arguably better for readability, and this is an extremely common pattern in functional programming. You will see this all the time if you are working in a functional programming environment. The `curry` function above is something that would be provided by a functional programming utility library and is out of the scope of this workshop to show / describe.

## Composition

### Composition Illustration

Composition is the idea of one functions output becoming the input to another function. Here's an example of some code that could benefit from composition:

{% highlight javascript %}

function minus2(x) { return x - 2; }
function triple(x) { return x * 3; }
function increment(x) { return x + 1; }

// add shipping rate
var tmp = increment(4);
tmp = triple(tmp);
totalCost = basePrice + minus2(tmp);

{% endhighlight %}

Although we do not see what `basePrice` is, the code is easy enough to follow. Could it be improved? We will expand on this while working through what composition is. In the above code, there are a couple of things happening that we could abstract further; the calculation of the shipping rate and the calculation of the `totalCost`. But what is abstraction? The original idea of abstraction was to tease apart two things which were otherwise intertwined together, so that they are separate, and by way of separation, we insert between them a semantic boundary. Abstraction is not about hiding anything, but about separation. The idea behind separation is that we should be able to look at the pieces of our code and understand them as individuals. But how could we abstract(separate) the above code? Well, since you asked... We could do something like this:

{% highlight javascript %}

function minus2(x) { return x - 2; }
function triple(x) { return x * 3; }
function increment(x) { return x + 1; }

// add shipping rate
totalCost = basePrice + minus2(triple(increment(4)));

{% endhighlight %}

Notice how we are now nesting the function calls which allows us to get rid of the `tmp` variable. The nested function calls are a form of composition. This works, but the separation(abstraction) is still incomplete; the shipping is being calculated within the `totalCost` variable. What if there were a shipping cost function?

{% highlight javascript %}

function minus2(x) { return x - 2; }
function triple(x) { return x * 3; }
function increment(x) { return x + 1; }

function shippingRate(x) {
  return minus2(triple(increment(x)));
}

// add shipping rate
totalCost = basePrice + shippingRate(4);

{% endhighlight %}

The above result is definitely cleaner, because the concerns have been separated. AKA abstraction. The semantic boundary that we've inserted is the function name `shippingRate`.

### Declarative Data Flow

So far, the abstraction and composition of our code has progressed nicely, but what if there were numerous shipping rates to handle? Could we further modify our code to accommodate them? Well, currently, the `shippingRate` function is essentially handling the execution of 3 different functions, maybe we could create a utility function that could accommodate this.

{% highlight javascript %}

function composeThree(fn3, fn2, fn1) {
  return function composed(v) {
    return fn3(fn2(fn1(v)));
  }
}

{% endhighlight %}

Now, with our new utility function, we can refactor our code to look like so:

{% highlight javascript %}

function minus2(x) { return x - 2; }
function triple(x) { return x * 3; }
function increment(x) { return x + 1; }

var shippingRate = composeThree(minus2, triple, increment);

// calculate and add shipping rate
totalCost = basePrice + shippingRate(4);

{% endhighlight %}

Using the utility function, `shippingRate` can change according to what functions are passed into `composeThree`. Composition works from right to left, which is why in the utility function definition we've structured the arguments from fn3 to fn1, because they will execute in the 'reverse' or right to left order. Composition is critical to functional programming because the entire point of any program is to have data flow; something coming in and something being returned out. The `composeThree` utility function that we 'created' is actually present in functional programming utility libraries, typically named `compose` which has the ability to compose however many functions you need.

### Piping vs Composition

To illustrate the importance of function order and the right to left execution of composed functions, take a look at this:

{% highlight javascript %}

function minus2(x) { return x - 2 };
function triple(x) { return x * 3 };
function increment(x) { return x + 1 };

var f = composeThree(minus2, triple, increment);
var p = composeThree(increment, triple, minus2);

f(4); // 13
p(4); // 7

{% endhighlight %}

`f(4)` will first increment 4 making its value 5, then triple 5 becoming 15, finally minus2 returning the value 13.

`p(4)` will first minus2 making the return value 2, then triple 2 becoming 6, finally incrementing by 1 returning the value 7.

Considering composition, this should not come as a surprise. But what if we wanted to have the functions passed in as arguments to something like compose and executed in left to right instead of compose's right to left? Pipes do that! 

{% highlight javascript %}

function minus2(x) { return x - 2 };
function triple(x) { return x * 3 };
function increment(x) { return x + 1 };

var f = composeThree(minus2, triple, increment);
var p = composeThree(increment, triple, minus2);

f(4); // 13
p(4); // 7

var g = pipeThree(minus2, triple, increment);

g(4) // 7

{% endhighlight %}

### Piping & Composition Exercise

This is an exercise to practice composition.

Instructions

1. Define a `compose(..)` that takes any number of functions (as individual arguments) and composes them right-to-left.

2. Define a `pipe(..)` that takes any number of functions (as individual arguments) and composes them left-to-right.

{% highlight javascript %}

"use strict";

function increment(x) { return x + 1; }
function decrement(x) { return x - 1; }
function double(x) { return x * 2; }
function half(x) { return x / 2; }

function compose() { return compose; }
function pipe() { return pipe; }

var f1 = compose(increment,decrement);
var f2 = pipe(decrement,increment);
var f3 = compose(decrement,double,increment,half);
var f4 = pipe(half,increment,double,decrement);
var f5 = compose(increment);
var f6 = pipe(increment);

console.log( f1(3) === 3 );
console.log( f1(3) === f2(3) );
console.log( f3(3) === 4 );
console.log( f3(3) === f4(3) );
console.log( f5(3) === 4 );
console.log( f5(3) === f6(3) );

{% endhighlight %}

**Hint:** you only need to implement one of the two functions `compose` or `pipe`. Once you've completed one of them, you can simply pass whatever is being passed to the other function but reverse it. i.e. complete `pipe`, then in `compose` you would just need to return `pipe(functions.reverse())`.

### Piping & Composition Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

"use strict";

function increment(x) { return x + 1; }
function decrement(x) { return x - 1; }
function double(x) { return x * 2; }
function half(x) { return x / 2; }

function compose(...fns) { 
    return pipe(...fns.reverse()); // reverse the fns array of arguments and pass them to the `pipe` function
}
function pipe(...fns) { // ...fns gathers all arguments into an array
  return function piped(result) { // return a function
    for(let fn of fns) { // loop over arguments
      result = fn(result); // store result
    }
    return result; // return result
  };
}

var f1 = compose(increment,decrement);
var f2 = pipe(decrement,increment);
var f3 = compose(decrement,double,increment,half);
var f4 = pipe(half,increment,double,decrement);
var f5 = compose(increment);
var f6 = pipe(increment);

console.log( f1(3) === 3 );
console.log( f1(3) === f2(3) );
console.log( f3(3) === 4 );
console.log( f3(3) === f4(3) );
console.log( f5(3) === 4 );
console.log( f5(3) === f6(3) );

{% endhighlight %}
{% endcapture %}{% include details.html %}

### Associativity

Associativity is a mathematical concept, but composition is also associative. Meaning that if you have a list of functions that need to be composed, you can compose them in any grouping and get the same result. Here is some code which illustrates associativity:

{% highlight javascript %}

function minus2(x) { return x - 2};
function triple(x) { return x * 3};
function increment(x) { return x + 1};

function composeTwo(fn2, fn1) {
  return function composed(v) {
    return fn2(fn1(v));
  };
}

var f = composeTwo(
  composeTwo(minus2, triple),
  increment
);

var p = composeTwo(
  minus2,
  composeTwo(triple, increment)
);

f(4); // 13
p(4); // 13

{% endhighlight %}

Associativity is useful because it means that we are able to do currying and partial application on compositions. 

### Composition with Currying

With the following code, how could we combine composition and currying?

{% highlight javascript %}

function sum(x, y) { return x + y; }
function triple(x) { return x * 3; }
function divBy(y, x) { return x / y; }

divBy( 2, triple( sum(3, 5) ) ); // 12

{% endhighlight %}

So far, we've seen composition only with unary functions; functions that take and return a single value. Why would it be that we would only compose unary functions? Primarily because of the differing shapes of unary and binary functions. Again, how would it be possible to compose the three functions in the code above? Possibly something like this which basically turns the binary functions into unary functions:

{% highlight javascript %}

function sum(x, y) { return x + y; }
function triple(x) { return x * 3; }
function divBy(y, x) { return x / y; }

divBy( 2, triple( sum(3, 5) ) ); // 12

sum = curry(2, sum);
divBy = curry(2, divBy);

composeThree(
  divBy(2),
  triple,
  sum(3)
)(5);

{% endhighlight %}

Now that we've seen composition and currying together in action, let's take another look at point free, with this before seen example:

{% highlight javascript %}

var mod2 = mod(2);
var eq1 = eq(1);

function isOdd(x) {
  return eq1( mod2(x) );
}

{% endhighlight %}

If we wanted to transform the above code for the `isOdd` function into one that is point free, we could again use the `compose` style of function to do just that:

{% highlight javascript %}

var mod2 = mod(2);
var eq1 = eq(1);

function isOdd(x) {
  return eq1( mod2(x) );
}

function composeTwo(fn2, fn1) {
  return function composed(v) {
    return fn2( fn1( v ) );
  };
}

var isOdd = composeTwo(eq1, mod2);
var isOdd = composeTwo(eq(1), mod(2));

{% endhighlight %}

The above is another example of taking binary functions and composing them into unary functions.

## Immutability

### Immutability

Immutability implies that something is not going to change, but that does not fully encompass what this section of the workshop will cover. It isn't only that things do not change, but that they do not change unexpectedly. In programs, there is a lot of state change, which is arguably the point of them, for state to change over time and with state change being the point, you don't really want to stop that from happening. There's really no such thing as making an immutable program because that program would not have any point or reason to exist. The point of immutability is that change which needs to occur, needs to do so in an intentional manner. How do we control mutation and change? There are a couple of types of immutability that we will look at, the first being assignment immutability.

Assignment immutability is the idea that when you assign something to a variable or property that it is no longer allowed to be reassigned to another value. Here's an example to consider:

{% highlight javascript %}

var basePrice = 89.99;
const shippingCost = 6.50;

// more code

basePrice += 5.00; // allowed

// more code

shippingCost *= 1.04; // nope

{% endhighlight %}

In the above code, `basePrice` and `shippingCost` are both variables, rather a symbolic representation in memory, the difference between the two being how they will handle reassignment. With `var` or `let`, you can reassign them, no problem. But if you try to reassign something that has been declared as a `const`, you will get an error saying that it is not allowed. Another caveat about `const` is that it cannot be declared without an assignment. You may have heard of the 'temporal dead zone' or TDZ which is all about preventing us, the developers, from seeing a `const` ever in an in-between state where it is undefined. So... then why should we use `const` in our applications? The greatest support for having `const` as a variable type in JavaScript comes from the functional programming community.

Let's look at some more code:

{% highlight javascript %}

var basePrice = 89.99;
const shippingCost = 6.50;

function increasePrice(price) {
  return price + 5.00;
}

increasePrice(basePrice); // 94.99

function increaseShipping(shipping){
  return shipping * 1.04;
}

increaseShipping(shippingCost); // 6.76

{% endhighlight %}

Notice now that we are merely computing values as opposed to reassigning values to existing variables. This is typical of functional programming where most will tell you to try and avoid assignment at all costs. Which is suspicious as to whether or not `const` is as useful as it is proclaimed to be.

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
