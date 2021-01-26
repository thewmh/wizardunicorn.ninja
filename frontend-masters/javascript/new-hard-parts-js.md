---
title: "JavaScript: The New Hard Parts"
description: These are notes from the 'JavaScript':' The New Hard Parts' course on Frontend Masters.
permalink: /frontend-masters/new-hard-parts-js

layout: default
pagenav:
  - name: Introduction
    href: introduction
  - name: Asynchronous JavaScript
    href: asynchronous-javascript
  - name: Promises
    href: promises
  - name: Iterators
    href: iterators
  - name: Generators
    href: generators
  - name: Final
    href: final
---

[Workshop slides are here](https://static.frontendmasters.com/resources/2018-05-23-javascript-new-hard-parts/new-hard-parts-slides.pdf)

## Introduction

### Introduction

The instructor for this course, Will Sentance, is the founder of [Codesmith](https://codesmith.io/). He lets everyone know how amazing it is and that the graduates of his program earn a reasonable salary at big tech companies. Great. More importantly, the content covered in this workshop is what job seekers get asked the most in interviews. Event loop and closure are two of the very important topics. Also, here is a list of things that companies look for in mid - senior level candidates:

* Analytical problem solving with code

* Technical communication (can I implement your approach just from your explanation)

* Engineering best practices and approach (debugging, code structure, patience, and reference to documentation)

* Non-technical communication (empathetic and thoughtful communication)

* Language and computer science experience

### JavaScript Code Execution

If you've already taken / read my notes on, Javascript: The Hard Parts, this next bit may look familiar, but a refresher never hurt. It is important to understand how the JavaScript engine executes code, having this understanding will make it easier to comprehend the content of this workshop.

What happens when JavaScript executes (runs) my code?

{% highlight javascript %}

const num = 3;
function multiplyBy2 (inputNumber) {
    const result = inputNumber*2;
    return result;
}

const name = "Will";

{% endhighlight %}

When JavaScript code is executed, a 'global execution context' is created and two things happen when JavaScript executes the above (or any...) code. One, a 'thread of execution' is created which parses and executes the code line by line. Two, a live memory of variables with data (known as a 'global variable environment') is created. In the above code, the **only** thing 'happening' is 3 pieces of data are being stored in the 'global variable environment' aka memory; num, multiplyBy2, name. Adding on to the above example:

{% highlight javascript %}

const num = 3;
function multiplyBy2 (inputNumber) {
    const result = inputNumber*2;
    return result;
}

const output = multiplyBy2(4);
const newOutput = multiplyBy2(10);

{% endhighlight %}

Now with `output` and `newOutput`, we are actually storing the result of the multiplyBy2 function. To do that, a new execution context is created for each, `output` and `newOutput`, with their own separate local memory / variable environments, within the global execution context. Walking through `output`, would be something like this:

* New (local) execution context is created
* Local memory is created, storing the function's parameter `inputNumber` with the passed in argument value of 4
* A label for `result` is created in local memory in which is stored the value of `inputNumber` * 2... 8
* Finally, the value of `result` is returned out to the global execution context's variable environment memory

While setting the value of `outuput` by running `multiplyBy2`, `newOutput` will have an undefined value because JavaScript can only execute one thing at a time. Also, once the value of `output` is set, the local execution context that was created to run `multiplyBy2` is 'garbage collected' (deleted).

The last thing that is important to know about in this foundational review of JavaScript, is the call stack. Imagine JavaScript is like a stack of plates, with the global execution context being the first (or bottom) plate, while each additional execution context gets placed on top of the stack of plates in the order in which it was called. i.e. a new function call creates a new execution context which gets added to the call stack of plates, when that execution context is exited, the plate gets removed and JavaScript returns to the execution context that it was previously in, in this case the global execution context. Adding to the call stack(s) technical term is 'push', removing from the call stack(s) technical term is 'pop'... similar to arrays.

## Asynchronous JavaScript

### Introducing Asynchronicity

Asynchronicity is the backbone of modern web development in JavaScript. JavaScript is single threaded and has a synchronous execution model. But what if we need to wait until we get some data back from an API? It would be nice to be able to wait for some code to execute, but not block the entire execution thread from executing any other code while it is also waiting... It is also important to note that there are a ton of features that JavaScript has access to but are not directly within the language itself; i.e. 'speaking to the internet', this is a browser feature. Take a look at this code:

{% highlight javascript %}

function display(data) {
    console.log(data);
}

const dataFromAPI = fetchAndWait('https:/twitter.com/viljar/tweets/1')

//... user can do NOTHING here 😞
//... could take 300ms, could never finish
//... they're clicking and getting nothing until it finishes

display(dataFromAPI);

console.log("Run me later!");

{% endhighlight %}

Executing the above code goes like so: Declare `display` function, set `dataFromAPI` to result of `fetchAndWait`, execute `display` function with `dataFromAPI` as its argument, console.log 'Run me later!'. It's pretty straightforward, but the wrench in the flow is `dataFromAPI`. While that is being set, we have no idea how much time will pass before it is complete and it will block the rest of our code from executing until it is finished...

The above code 'works', but in a synchronous manner. If we didn't care about the functionality of our application it would be fine. But we do care about the functionality of our application and we need to have the ability asynchronously execute code.

### Asynchronous Web Browser APIs

In order to get some asynchronous features, we need to interface with external environments to introduce them. Let's look at how the web browser helps with asynchronicity. One feature that the web browser 'lends' to JavaScript is the DOM (Document Object Model) which are the elements on the 'page' that JavaScript can interact with. Console is another web browser feature that is outside of JavaScript. Local storage, ability to speak to the internet, XHR; all of these are not JavaScript features. To bring asynchronicity to JavaScript, we need [Web Browser APIs](https://developer.mozilla.org/en-US/docs/Web/API) / Node Background Threads. Take a look at this code and then we'll walk through it / break down what it is doing. 

{% highlight javascript %}

function printHello() {
    console.log("Hello");
}

setTimeout(printHello, 1000);

console.log("Print me first!");

{% endhighlight %}

Here's how the above code executes:

* Declare a function called `printHello`
* Call `setTimeout` with the arguments `printHello` and `1000` (milliseconds) - `setTimeout` is not a feature / function which exists in JavaScript, but rather is a 'Web Browser feature'. Calling `setTimeout` will 'spin up' an instance of a 'Timer' which in this case will take a reference to the `printHello` function and be set to 1000ms
* Console `log` "Print me first!", which will immediately print to the console
* After ~1001ms, `setTimeout` will have finished and `printHello` will be pushed to the call stack and executed, printing "Hello" to the console.

### Asynchronous Web Browser APIs Q&A

Q: How do you work with 'layers'? i.e. if the function called in the `setTimeout` had another `setTimeout` in it?

A: We'll come back to that.

Q: What happens if I am actively executing something on the call stack, when will the `setTimeout` be 'allowed' on the call stack?

A: Good question.

Come on Will... You literally did not answer these questions.

### Calling the Outside World

Here's another look using the Web Browser API `setTimeout` and another blocking function:

{% highlight javascript %}

function printHello() {
    console.log("Hello");
}

function blockFor1Sec() {
    // blocks JavaScript thread of execution for 1 second
}

setTimeout(printHello,0);

blockFor1Sec();

console.log("Print me first");

{% endhighlight %}

Here's what will happen:

* Declare `printHello`

* Declare `blockFor1Sec` - this is probably a loop of some sort that takes 1sec

* Call `setTimeout` with `printHello` and `0` as the arguments - it is technically ready, but cannot be run yet

* Put `blockFor1Sec` on the call stack and execute it

* Print 'Print me first' to the console

* `printHello` is allowed to run

Why does `printHello` not get run until the end?! There is another component to JavaScript that we've not yet seen, the  Callback Queue. When the `setTimeout` is ready, the function is first put in the Callback Queue. The Callback Queue checks the Call Stack to see if it can add to it, which it is allowed to do only when the Call Stack is empty and all of the Global Execution Context code is finished running. The process of checking the Call Stack and the Global Execution Context is called the Event Loop. 

### Calling the Outside World Q&A

Q: Where is the Callback Queue? Is it a Web Browser feature?

A: That is a JavaScript engine feature.

Q: How are is the Callback Queue prioritized? i.e. what if you have more than one `setTimeout`?

A: They are put in the Callback Queue as they are ready. (not clear if it functions like the call stack, or if they are placed in the order that they are ready...)

Q: Is the Callback Queue a stack?

A: It is a queue. It is a 'first in, first out' queue. If you have `printHello`, then `printGoodbye`, then `printNothing`, if they were added to the Callback Queue in that order, they would be executed in that same order.

Q: What does `setInterval` do?

A: It is similar to `setTimeout`, in that it is another Web Browser API.

Q: Is there a limit to the size of the Callback Queue?

A: The function is not actually stored in the Callback Queue, it is stored in JavaScript memory, so the question more technically is, "Is there a to JavaScript memory for function definitions?". The answer to which is, yes...

Q: Is the Event Loop a part of the JavaScript engine?

A: Yes.

Q: What happens when you pass an anonymous function to `setTimeout`?

A: Even without a 'label', function definitions are stored in memory with a position. 

### Wrapping Up Web Browser APIs

What are the problems of Web Browser APIs?

- None - It is super intuitive

- Response data is only available in the callback function AKA callback hell

- Maybe  it feels odd to think of passing a function into another function only for it to run later

Benefits?

- Super explicit once you understand how it works under-the-hood

### Asynchronous Exercises

There is no better way to grow as a software engineer than pair programming. If you are just watching video workshops or reading articles, you are likely not hitting any of the 'blocks' that require you to try hard to get through which is what allows you to grow as an engineer. Code challenges, difficult projects, pair programming all help you grow. Pair programming is especially important as you have a navigator who's job it is to verbalize precisely how the program should function and a driver who is required to make the implementation of the code. The navigator is not allowed to ever touch the keyboard, so they are 'forced' to use technical communication to effectively communicate their 'vision'. [Here's some more details about pair programming](https://en.wikipedia.org/wiki/Pair_programming). Ideally with a partner, answer these questions:

* I know what a variable is

* I've created a function before

* I've added a CSS style before

* I have implemented a sort algorithm (bubble, merge, etc)

* I can add a method too an object's prototype

* I understand the event loop in JavaScript

* I understand callback functions

* I've implemented `filter` from scratch

* I can handle collisions in hash tables

Great! Now go to [http://csbin.io/promises](http://csbin.io/promises) and do the things! (still with a partner if possible)

[Here's the solutions, no peeking](https://gist.github.com/aegorenkov/2ae91cabf21223bddca8c5b3ef3ec6f6#file-promises-js)

## Promises

### Introducing Promises

Promises are special objects built into JavaScript that get returned immediately when we make a call to a web browser API / feature (i.e. `fetch`) that's set up to return promises (not all are). Promises act as a placeholder for the data we hope to get back from the web browser feature's background work. We also attach the functionality we want to defer running until that background work is done (using the built-in `.then` method). Promise objects will automatically trigger that functionality to run. The value returned from the web browser feature's work will be that function's input / argument. 

### Promises

Now that we have seen the promise of promises, let's look at a third approach to asynchronous code, which is a two-pronged 'facade' function  that both initiates background web browser work *and* returns a placeholder object (a promise) immediately in JavaScript:

{% highlight javascript %}

function display(data) {
    console.log(data);
}

const futureData = fetch("https://twitter.com/viljar/tweets/1");

futureData.then(display); // attached display functionality

console.log("Print me first!");

{% endhighlight %}

As usual, here's a breakdown of how the above code executes:

* declare `display` function

* declare `const` `futureData`, `fetch` function starts to run

* 

### Promises Q&A

### Promises & Microtask Queue

### Wrapping Up Promises

## Iterators

### Returning Function Inside a Function

### Return Next Element with a Function

### Iterator Function

### Iterators Exercise

## Generators

### Generators

### Generator Functions with Dynamic Data

### Generators Q&A

### Introducing Async Generators

### Async Generators

### Async Generators Q&A

## Final

### Async Await

### Wrapping Up