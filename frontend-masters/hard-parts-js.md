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

[The link to the course document is here](https://static.frontendmasters.com/resources/2019-09-18-javascript-hard-parts-v2/javascript-hard-parts-v2.pdf)

The instructor breaks down the difference between Junior, Mid and Senior-Level developers, and the purpose of the course for the differenc levels of developers.

## JavaScript Principles

### Thread of Execution

When JavaScript runs, it:

* Goes through code line-by-line and runs/'executes' each line - known as the thread of execution

* Saves 'data' like strings and arrays so we can use that data later - in its memory

* We can even save code (functions)

{% highlight javascript %}

const num = 3; // define a variable and assign it the number 3

function multiplyBy2 (inputNumber) { // defining the function
    const result = inputNumber*2; 
    return result;
}

const output = multiplyBy2(num); // declare a constant and define it to a function call
const newOutput = multiplyBy2(10); // declare a constant and define it to a function call

{% endhighlight %}

Memory is the place in which we store data.

### Functions

A function being run is like a miniature program. We need the code and the memory to run a function.

A function is code we save ('define') functions & can use (call/invoke/execute/run) later with the functions name & ()

Execution context is created to run the code of a function. It has 2 parts:

* Thread of execution

* Memory

The first thing that happens when a function is run is a new execution context is established and the parameters and their arguments are stored in local memory. i.e. `inputNumber: 3`

JavaScript contains a single thread of execution, which means that you can only do one thing at a time (unless you are running your code asynchronously).

### Call Stack

* JavaScript keeps track of what function is currently running. i.e. where is the thread of execution

* Run a function - add to call stack

* Finish running the function - JS removes it from the call stack

* Whatever is at the top of the call stack is the function that is currently being run

## Functions & Callbacks

### Generalized Functions

{% highlight javascript %}

function tenSquared() {
    return 10*10
}

{% endhighlight %}

The above function is not generic enough, if we wanted to square other numbers, we would have to rewrite the function for each number we would want to square.

Don't Repeat Yourself!

How could we make the function more generic?

{% highlight javascript %}

function squareNum(num) {
    return num*num
}

{% endhighlight %}

With the above function, you could now pass any number and it would return the square of that number `num*num`

Generalizing functions:

'Parameters' (placeholders) mean we don't need to decide what data to run our functionality on until we run the function

* Then provide an actual value ('argument') when we run the function

Higher order functions follow the same principle

* We may not want to decide exactly what some of our functionality is until we run our function

### Repeating Functionality

This lesson walks through a function, further driving home the points above about execution context and return values being passed to global memory.

### Higher Order Functions

A better, more general, way to implement a function could be:

{% highlight javascript %}

function copyArrayAndManipulate(array, instructions) {
    const output = [];
    for (let i = 0; i < array.length; i++) {
        output.push(instructions(array[i]));
    }
    return output;
}

function multiplyBy2(input) { return input * 2; }
const result = copyArrayAndManipulate([1, 2, 3], multiplyBy2);

{% endhighlight %}

### Higher Order Functions Example

The example used in the section is the above codeblock. Just walking through each step of the execution context from global through the call stack as it is updated by calling functions.

### Higher Order Functions Q&A

No notes

### Callbacks & Higher Order Functions

Functions in JavaScript are first class objects. They can coexist with and be treated like any other JavaScript object:

1. Assigned to variables and properties of other objects

2. Passed as arguments into functions

3. Returned as values from functions

A callback function is a function that is placed inside of a Higher Order Function.

A Higher Order Function is defined as: A function that takes in OR passes out (returns) a function.

Callbacks and Higher Order Functions simplify code and keep it DRY

* Declarative, readable code: Map, filter, reduce - the most readable way to write code to work with data

* Asynchronous JavaScript: Callbacks are a core aspect of async JavaScript and are under the hood of promises, async/await

### Arrow Functions

Arrow functions are a shorthand way to save functions

{% highlight javascript %}

function multiplyBy2(input) { return input * 2; }

//  in an arrow function, becomes

const multiplyBy2 = input => input*2

{% endhighlight %}

Under the hood, JavaScript will put in parenthesis, curly brackets, and a return statement if your function only has one return.

Anonymous and arrow functions

* Improve the immediate legibility of code

* ...but they are merely 'syntatic sugar'

* Understanding how they work 'under the hood' is vital to avoid confusion

### Pair Programming

Pair programming is the most effective way to grow as an engineer, because:

* You get to tackle blocks (issues) with a partner

* Stay focused on the problem

* Refine technical communication

* Collaborate to solve the problem

## Closure

### Closure Introduction

* Closure is the most esoteric of JavaScript concepts - If you really understand it, you understand JavaScript well

* Enables powerful 'pro-level' functions like 'once' and 'memoize'

* Many JavaScript design patterns including the module pattern use closure

* Build iterators, handle partial application, and maintain state in an asynchronous world

Everytime a function gets invoked, it creates a new store of memory (in its execution context)...but

Functions with memories!

* When our function gets called, we create a live store of data (local memory/variable environment/state) for that functions execution context

* When the function finished executing, its local memory is deleted (except for the returned value)

* But what if the function could hold on to live data between executions?

* This would let function definitions hace an associated cache/persistent memory

* But it all starts with returning a function from another function

### Returning Functions

Returning a function from another function

{% highlight javascript %}

function createFunction() {
    function multiplyBy2 (num) {
        return num*2;
    }
    return multiplyBy2;
}

const generatedFunc = createFunction();
const result = generatedFunc(3); // 6

{% endhighlight %}

### Nested Function Scope

Calling a function in the same function call as it was defined:

{% highlight javascript %}

function outer() {
    let counter = 0;
    function incrementCounter () {
        counter ++;
    }
    return incrementCounter;
}

outer();

const myNewFunction = outer();
myNewFunction();
myNewFunction();

{% endhighlight %}

### Retaining Function Memory

In the above function definition, when `myNewFunction` is assigned to `outer()`, the inner function `incrementCounter()` is saved to it, including the parent scope of `outer()`, which allows access to the variable `counter`.

### Function Closure

Continuing on with the function defined above in the 'Nested Function Scope' section, more about calling a function outside of the function call it was assigned is discussed.

### Closure Q&A

If you define variables within the parent function and they are not referenced in the child function, does memory retain those variables? No, the child function will only retain (in global scope) those variable(s) which are directly referenced within the child function definition. Otherwise, there would be memory leaks.

### Closure Technical Definition & Review

Recommended reading: 'If Hemmingway Wrote JavaScript'

Where you save your function determines what data it will have access to when it is run.

Persistent Lexically Scoped Referenced Data (P.L.S.R.D) is the term used to describe a child functions access to its parent scope, AKA closure.

### Multiple Closure Instances

If you store a returned function definition in a variable, you are creating unique instances and (future; at run-time) execution contexts for that function. Following the above example, if you set `var anotherVariable = outer();`, anotherVariable would have its own execution context separate from myNewFunction. 

### Practical Applications

Closure gives our functions persistent memories and an entirely new toolkit for writing professional code

* Helper functions: Everyday professional helper functions like 'once' and 'memoize'

* Iterators and generators: Which use lexical scoping and closure to achieve the most contemporary patterns for handling data in JavaScript

* Module pattern: Preserve state for the life of an application without polluting the global namespace

* Asynchronous JavaScript: Callbacks and Promises rely on closure to persist state in an asynchronous environment

### Closure Exercises

[Closure exercises are here](http://csbin.io/closures)

## Asynchronous JavaScript

### Single Threaded Execution Review

Promises, Async, and the Event Loop

- Promises - The most significant ES6 feature

- Asynchronicity - The feature that makes dynamic web applications possible

- The Event Loop - JavaScript's triage

- Microtask queue, Callback queue, and Web Browser features (APIs) - [here's an article that goes into further detail](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

JavaScript is a synchronous language. This means that only one task can be run at a time, or only one line of code is executed at a time.

### Asynchronicity in JavaScript

Asynchronicity is the backbone of modern web development in JavaScript yet...

JavaScript is:

- Single threaded (one command runs at a time)

- Synchronously executed (each line is run in the order it appears in the code)

So what if we have a task:

- Accessing Twitter's server to get new tweets that takes a long time

- Code we want to run using those tweets

Challenge: We want to wait for the tweets to be stores in tweets so that they're there to run displayTweets on - but no code can run in the meantime

{% highlight javascript %}

// Slow function blocks further code from running

const tweets = getTweets("http://twitter.com/potus")

// 350ms wait while the request is sent to Twitter servers

displayTweets(tweets)

// more code to run

console.log('I am waiting for getTweets...')

{% endhighlight %}

JavaScript is not enough - we need new pieces (some of which are not JavaScript at all)

Our core JavaScript engine has 3 main parts:

- Thread of execution

- Memory / Variable Environment

- Call stack

We need to add some new components:

- Web Browser APIs / Node background APIs

- Promises

- Event Loop, Callback / Task queue, and micro task queue

### Asynchronous Browser Features

ES5 Solution: Introducing Callback Functions and Web Browser APIs

Web Browsers have Dev Tools (Console), Sockets, the ability to make Network Requests, and they can Render the HTML DOM (Document Object Model). We cannot (in JavaScript) code for these directly, but JavaScript can interface with them. JavaScript has 'labels' for each of the web browser 'features', that allow JavaScript to interact with them. i.e. setTimeout can use the browsers 'timer' function. 'document' is another web browser feature that allows JavaScript to interact with it.

### Web API Example

This section is focused on setTimeout which is not a feature of JavaScript, but a way for JavaScript to interface with a web browser(s) `timer` API - [more details on MDN](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)

`setTimeout` takes a number of arguments, but this focused on passing in a function and a number which represents the amount of time, in milliseconds, before the function will run i.e. `setTimeout(myFunction, 1000)`

`setTimeout` will start a timer at 0s and when it meets the argument `1000(ms)`, it will invoke the function `myFunction`

### Web API Rules

This section quickly talks about there being rules between JavaScript and how the browser interacts with it. They are defined as being quite strict and the following JavaScript was displayed as an example to consider:

{% highlight javascript %}

function printHello(){console.log("Hello"); }
function blockFor1Sec(){
    // blocks the JavaScript Thread of Execution for 1 second, maybe with a for loop?
}

setTimeout(printHello,0);

blockFor1Sec();
console.log("Me first!");

{% endhighlight %}

What will happen?!

### Callback Queue & Event Loop

Walking through the above JavaScript, this is what happens:

1. Define function `printHello`
2. Define function `blockFor1Sec`
3. Run `setTimeout` Browser Feature, passing in the `printHello` function with `0ms` passed in as the time argument. This adds the `printHello` function into the Callback Queue
4. Call `blockFor1Sec` function
5. The `console.log` prints
6. Finally, the `printHello` function is executed

The Callback Queue is not allowed to run all regular code is run first. JavaScript checks if the Call Stack is empty before checking the Callback Queue. This is known as the [Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop).

### Callback Queue & Event Loop Q&A

Q: Does the Event Loop constantly run?

A: Yes, the Event Loop is constantly running for the duration of the applications lifecycle

### Callback Hell & Async Exercises

ES5 Web Browser APIs with Callback Functions

Problems:

* Our response data is only available in the callback function - Callback Hell (where we are doing all of our work on some data inside of a function)

* Maybe it feels a little odd to think of passing a function into another function only for it to run much later

Benefits:

* Super explicit once you understand how it works under-the-hood

[Exercises](csbin.io/async)

## Promises

### Promises Introduction

ES6+ Solution (Promises)

Using two-pronged 'facade' functions that both:

* Initiate background web browser work

* Return a placeholder object (promise) immediately in JavaScript

In ES6, `fetch` is the replacement for `xhr`, but unlike `xhr`, `fetch` (referred to above as a 'two-pronged' facade function) will both initiate a Web Browser function and in the JavaScript environment create a placeholder object called a `promise object`. When the network request completes, the object will be filled in with the result. The Web Browser function and the placeholder object are intrinsically linked.

ES6+ Prmoises

{% highlight javascript %}

function display(data){
    console.log(data)
}

const futureData = fetch('https://twitter.com/username/tweets/1')
futureData.then(display);

console.log('Me first!');

{% endhighlight %}

### Promises Example: fetch

In the example above, the following is happening:

1. Declare a function `display`

2. Declare a constant `futureData` and store the result of `fetch(...)`. This will immediately return a 'Promise Object' with two properties; {value: undefined, onFufilled: []} and store it in the `futureData` constant. The other consequence of `fetch(...)` will be in the Web Browser in the form of a Network Request. The Network Request requires the URL and path, which is defined. The Network Request defaults to a `GET` request, but you can pass in (as an argument) another type of request, i.e. `POST`. The response from the Network Request gets stored in the `futureData` object that was created, specifically in the `value` property of that object.

### Promises Example: then

3. The `onFulfilled` array in the `futureData` object contains a number of [hidden] methods (which are 'directly' inaccessible), but can be accessed with 'key' words, in this case `then`. passing the `display` function into `futureData.then()` will automatically pass the content of `futureData.value` into the `display` function defined on the first line.

4. The `console.log('Me first!')` will finally run and print `Me first!` in the console.

5. The Network Request has sucessfully completed and the response is stored in `futureData.value`. This will trigger the `...then(display)` and pass in `futureData.value` as the argument for the `display` function. A new execution context is created for the `display` function. `futureData.value` will be stored as `data` in the `display` function.

### Web APIs & Promises Example: fetch

It is important to understand how promise-deferred functionality gets back into JavaScript to be run

{% highlight javascript %}

function display(data){console.log(data)}
function printHello(){console.log("hello");}
function blockFor300ms(){// blocks js thread for 300ms}

setTimeout(printHello, 0);

const futureData = fetch('https://twitter.com/username/tweets/1')
futureData.then(display)

blockFor300ms()
console.log("Me first!");

{% endhighlight %}

*The `then` method and its functionality to call on completion*

* Any code we want to run on the returned data must also be saved on the promise object

* Added using the `.then` method to the hidden property `onFulfillment`

* Promise objects will automatically trigger the attached function to run (with its input being the returned data)

Asynchronous JavaScript is defined as executing code out of the order in which it was written.

### Web APIs & Promises Example: then

Walking through the above JavaScript block, the `.then` eventually 'GET(s)' data back from its request and...

### Web APIs & Promises Example: Microtask Queue

When finally, all of the code in the global scope has executed, the Event Loop checks the Callback and Microtask Queue(s) for additional tasks waiting to be run. `fetch` placed the Network Reques into the Microtask Queue, which is where the Event Loop first checks for tasks, which then triggers the `.then`. Finally, the Event Loop is able to reach the Callback Queue which contains the `setTimeout`. So while the `setTimeout` function was called first, it in fact gets run last because of the order of the Call Stack, Event Loop, Microtask Queue, and Callback Queue(s). Any function that is attached to a promise object gets stored in the Microtask Queue, which is the first Queue that the JavaScript Event Loop checks, before the Callback Queue.

### Promises and Asynchronous Q&A

[List of Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)

Specific to this section, the [WorkerGlobalScope Web API](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope) contains `fetch`.

The Microtask Queue, once the Event Loop enters it, will continue to run any functions that are waiting in the queue until there are not functions left to run.

Any function that is attached to a promise object gets pushed into the Microtask Queue, any function that is directly tied to a Browser Feature or returns a function, gets pushed into the Callback Queue.

### Promises Review

Problems:

* 99% of developers have no idea how they're working under the hood

* Debugging becomes super-hard as a result

* Developers fail technical interviews

Benefits:

* Cleaner readable style with pseudo-synchronous style code

* Nice error handling process

*We have rules for the execution of asynchronously delayed code*

* Hold promise-deferred functions in a microtask queue and callback function in a task queue (Callback queue) when the Web Browser Feature (API) finishes

* Add the function to the Call stack (i.e. execute the function) when:

 - The Call stack is empty AND all global code has run (the Event Loop checks this condition)

* Prioritize functions in the microtask queue over the Callback queue

*Promises, Web APIs, the Callback & Microtask Queues, and Event Loop enable:*

* Non-blocking applications: This means we don't have to wait in the single thread and don't block further code from running

* However long it takes: We cannot predict when our Browser feature's work will finish so we let JavaScript handle automatically running the function on its completion

* Web applications: Asynchronous JavaScript is the backbone of the modern web - letting us build fast 'non-blocking' applications

## Classes & Prototypes

### Class & OOP Introduction

*Classes, Prototypes - Object Oriented JavaScript*

* An enormously popular paradigm for structuring complex code

* Prototype chain - the feature behind-the-scenes that enables emulation of OOP but is a compelling tool in itself

* Understanding the difference between `_proto_` and `prototype`

* the `new` and `class` keywords as tools to automate our object and method creation

One of the most popular interview questions for mid to senior-level developers is what is the keyword `new` doing under-the-hood

*Core of development (and running code)*

1. Save data (e.g. in a quiz game the scores of user1 and user2)

2. Run code (functions) using that data (e.g. increase user2's score)

So what?!

In a quiz game you need to save lots of users, but also admins, quiz questions, quiz outcomes, league tables - all have data and associated functionality

In 100,000 lines of code...

* Where is the functionality when I need it?

* How do I make sure the functionality is only used on the right data?

*Code should be:*

1. Easy to reason about - Easy to figure out what is going on

2. Easy to add features to (new functionality)

3. Nevertheless efficient and performant

The Object-oriented paradigm aims to achieve all these goals

### Object Dot Notation

How can you store the following data in an app?

user1:
    - name: 'Tim'
    - score: 3

user2:
    - name: 'Stephanie'
    - score: 5

In an object!

Objects store functions with their associated data.

This is the principle of encapsulation - and it is going to transform how we can 'reason about' code

{% highlight javascript %}

const user1 = {
    name: "First Name",
    score: 7,
    increment: function() { user.score++; }
};

user1.increment(); // user1.score -> 8

{% endhighlight %}

### Factory Functions

What is a built-in function of JavaScript whos output will be an empty object?

`Object.create` which will provide fine-grained control over the object later on.

A potential solution to avoid repeating yourself when creating multiple users would be as follows:

{% highlight javascript %}

function userCreator(name, score) {
    const newUser = {};
    newUser.name = name;
    newUser.score = score;
    newUser.increment = function() {
        newUser.score++;
    };
    return newUser;
}

const user1 = userCreator("Viljar", 3);
const user2 = userCreator("Yep", 5);
user1.increment();

{% endhighlight %}

The instructor says not to use the above code in practice. The usable version is to follow.

### Factory Functions Example

Instructor walks through the above example and mentions that they all share the increment function and if you wanted to add another key value pair to all of the user objects (imagine you have more than 2, but hundreds or more), this would not be practical.

### Prototype Chain

The 'better' way to solve the problem would be to use the Prototype Chain.

Store the increment function in just one object and have the interpreter, if it does not find the function on `user1`, look up to that object to check if it is there.

Link `user1` and `functionStore` so the interpreter, on not finding `.increment`, makes sure to check up in `functionStore` where it would find it

Make the link with `Object.create()` technique.

Expanding on what we've seen above, consider the following:

{% highlight javascript %}

function userCreator(name, score) {
    const newUser = Object.create(userFunctionStore); // the argument passed into Object.create creates the 'link' to the object that is passed in as an argument
    newUser.name = name;
    newUser.score = score;
    return newUser;
}

const userFunctionStore = {
    increment: function(){this.score++;},
    login: function(){console.log("logged in");}
};

const user1 = userCreator("Viljar", 3);
const user2 = userCreator("Yep", 5);
user1.increment();

{% endhighlight %}

[MDN Object.create() documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

### Prototype Chain Example: Prototypal Link

This section walks through the above code.

### Prototype Chain Example: Implicit Parameters

### hasOwnProperty Method

### this Keyword

### Arrow Function Scope & this

### Prototype Chain Review

### new Keyword

### new Keyword Example

### class Keyword

## Wrapping Up