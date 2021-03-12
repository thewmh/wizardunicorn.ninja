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

* declare `const` `futureData`, `fetch` function starts to run. `fetch` triggers the web browser feature `XMLHttpRequest` and immediately returns an object with a property on it called `value`. The object would look something like this:

{% highlight javascript %}

{
    value: undefined,
    onFulfillment: [...]
}

{% endhighlight %}

When the web browser feature completes the request, `value` in the above object will be updated with the result of the request. *And*, when the `value` gets 'filled in', the `onFulfillment` array (which is an array of functions) gets triggered / run. `fetch` defaults to `GET` which means that it is retrieving data as opposed to sending data. 

* `futureData.then` is how 'we' are able to 'store' a function in the `onFulfillment` property of the promise object returned from `fetch`. So `futureData.then(display)` is effectively 'storing' the `display` function (or rather a reference to it) in the `onFulfillment` property (which is  an array) of the promise object returned from `fetch`.

* Now, the `console.log` prints 'Print me first!', which completes all of the synchronous code in our program. But there is still an unfulfilled process happening in the background...

* The unfulfilled process is the XHR browser feature that was triggered by `fecth`. Imagine that request is now complete and the `value` property of the promise object gets updated. Now, the `onFulfillment` array of functions gets automatically triggered, which in our code contains the `display` function.

* The `display` function will `console.log` the data that was returned from the `fetch`.

Finally, with this approach, we are able to start a task that takes a long time, continue running through our JavaScript code, and when the data comes back, we were able to 'auto-trigger' functionality (that we set; `display` function) on the returned data. 🔥

### Promises Q&A

Q: Does `fetch` use the event loop?

A: Yes, but in a really interesting way 🤦🏻‍♂️

Q: Does the (XHR) web browser feature directly set memory or does it use the event loop?

A: Will Sentance refuses to answer...

Q: Why are we using `const` for the variable that will eventually get updated when the `fetch` operation is complete? I thought that `const` was not able to be modified?!

A: For primitive values stored in a `const`, they are unable to be changed. Objects and arrays though... they can be modified as long as you do not get rid of the object or array... i.e. you can add properties to the object or positions to the array.

Q: If the `onFulfillment` 'function' triggered by JavaScript or the web browser?

A: JavaScript.

### Promises & Microtask Queue

How does the promise deferred functionality get back into JavaScript to be run?! Let's break down the following code to get a comprehensive understanding of how asynchronous code works:

{% highlight javascript %}

function display(data){
    console.log(data);
}

function printHello() {
    console.log("Hello");
}

function blockFor300ms() {
    // blocks js thread for 300ms with long for loop
}

setTimeout(printHello, 0);

const futureData = fetch('https://twitter.com/viljar/tweets/1');

futureData.then(display);

blockFor300ms();

// which will run first?

console.log("Print me first!");

{% endhighlight %}

And... here's how the above code executes:

* define `display`, `printHello`, and `blockFor300ms` as functions stored in global memory

* `printHello` is passed to `setTimeout` which a 'timer' value of 0 (zero). 0 does not tell us when `printHello` will run, but for how long will the 'timer' of the `setTimeout` run for... When `printHello` actually executes is not known. But, `printHello` does get added to the Callback Queue. 

* The `const` `futureData` is declared, but remains `undefined` until a moment later when it is set to a (Promise) object like this: `{value: undefined, onFulfillment: [...]}` - when the web browser feature (XHR) completes, `value` will get updated with the result which then triggers any functions in the `onFulfillment` array of the Promise object. The web browser feature (XHR) needs a URL, path, and a method (auto-defaults to `GET`).

* `futureData.then` is passed the `display` function which 'adds' a `display` function reference to the array stored in the  `onFulfillment` property of the `futureData` Promise object.

* `blockFor300ms` gets run; however it works, it is blocking any additional code for 300ms. While that function is running, the XHR web browser feature completes and receives back a response, which is then updates the `value` property of the `futureData` Promise object, this triggers the `display` in the `onFulfillment` array. The `display` function is added to the Microtask / Job Queue.

* The `console.log("Print me first!")` is executed.

* The Event Loop prioritizes tasks in the Microtask Queue, so even though `printHello` has been waiting in the Callback Queue since the beginning of time, `display`, which is in the Microtask Queue, gets run first! `display` `console.log`(s) the value that was returned from the `fetch`.

* **Finally**, all of the synchronous code has executed and the Microtask Queue is empty, `printHello` is able to be run.

### Microtask Queue Q&A

Q: Are there any other browser features that use the Microtask Queue instead of the Callback Queue?

A: Yes, but you would need to check the JavaScript specification docs to find exactly which ones. Job queue = Microtask queue, Task queue = Callback queue. Keep in mind that the spec is not necessarily how JavaScript gets implemented. For a long time, browsers other than Chrome put `fetch` into the Callback Queue...

Q: How was the `value` property of the Promise object updated? It seems like it skipped over the Callback Queue, Call Stack, Event Loop, etc...

A: The assignment of `value` is 'likely' not set until the Call Stack is empty, but the important thing is that `value` being set triggers the functions in the `onFulfillment` array...

Q: If `value` gets updated again and triggers the functions stored in the `onFulfillment` array, do they (the functions) get added to the Microtask queue?

A: Yes, you can starve the Callback queue if the Microtask queue is never emptied.

There is a third property on the Promise object; that is the `status` property. The `status` property is actually what triggers the functions in the `onFulfillment` array. `status` can be: pending, resolved, or rejected. When status is resolved is actually what triggers the `onFulfillment` array of functions. AND there is a fourth property on the Promise object; `onRejected`, which is another array of functions for when the `fetch` fails... You can pass functions into the `onRejected` array as a second argument in a `.then(onF, onR)` or use `.catch()` to only specify a function in the event of an error.

### Wrapping Up Promises

Now, with the Microtask queue, JavaScript can be an asynchronous language. And thanks to web browsers, there are a ton of asynchronous features available to JavaScript. 99% of developers have no idea how Promises work under the hood, but if you have read the above, you do understand. If you do not understand them, Promises make debugging harder. If you do understand Promises, you end up with a cleaner and more readable style of code with a pseudo-synchronous style to it AND a nice error handling process.

In summary... Promises, Web APIs, the Callback & Microtask Queues, and the Event Loop allow us to defer actions until the 'work' (an API request, timer, etc) is completed and continue running our code in the meantime. Asynchronous JavaScript is the backbone of the modern web - letting us build fast and in a 'non-blocking' way.

## Iterators

### Returning Function Inside a Function

It is often the case that we have some data in our application that we need to update, but it is not often the case that the data is a single item, but usually a collection of some sort... an array, object, etc... So the updating of data, the finding of the correct element to update is of itself a task. Also, you generally just want a specific element, then the next one, then the next, and so on. How that happens doesn't really matter... Imagine that your data is a stream that is coming towards you and this is a way of accessing the next element in that flow. So instead of your data being a static source, imagine it being a flow that you could turn on and off to get the next element as needed 🤯

Before we look at this 'new way' of working with / iterating over data, let's look at the 'old way'.

{% highlight javascript %}

const numbers = [4, 5, 6];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

{% endhighlight %}

And... here is how that executes:

* Declare `const` `numbers` and assign an array to it containing the numbers; 4, 5, 6

* The `for` loop then executes... it is essentially checking if `i` is less than `numbers.length` and while that condition returns true; `console.log(numbers[i])`, `i++`

Great... The eventual 'new way' that we get to will be way better. Until then, let's read this:

Programs store data and apply functionality to it. But there are two parts to applying functions to collections of data:

1. The process of accessing each element
2. What we want to do to each element

Iterators automate the accessing of each element - so we can focus on what to do to each element - and make it available to us in a smooth way

Imagine if wee could create a function that stored `numbers` and each time we ran the function it would return out an element (the next one) from `numbers`. NOTE: It would have to remember which element was next somehow.

BUT... this would let us think of our array/list as a 'stream' or flow of data with our function returning the next element from our 'stream' - this makes our code more readable and more functional.

**But it starts with us returning a function from another function**

🤔 some of that seems like we've already read it before... 🤷‍♂️ guess it doesn't hurt to iterate over the subject of iteration?

One of the most powerful features of JavaScript is returning a function from another function and we'll see why in just a moment. Consider this bit of code:

{% highlight javascript %}

function createNewFunction() {
    function add2(num) {
        return num+2;
    }
    return add2;
}

const newFunction = createNewFunction();

const result = newFunction(3);

{% endhighlight %}

How can we run/call `add2` now? Outside of `createNewFunction`?

I imagine we will answer those question(s) if we walk through the code... Here's that:

* Define `createNewFunction` and store it in global memory

* Declare `const` `newFunction`, the value of which is set to the return value of `createNewFunction`. This creates a new execution context.

* Moving inside of `createNewFunction`, a new function `add2` is created in the local memory of `createNewFunction`. `add2` is returned from `createNewFunction` into `newFunction` and the `createNewFunction` execution context is 'garbage collected' (removed from memory).

* Declare `const` `result`, the value of which is set to the return value of `newFunction(3)` (which invokes `newFunction`, creating a new execution context).

* Inside of the new execution context created by `newFunction` and inside of that execution contexts local memory, the `num` parameter is stored with the argument of 3. `num` + 2 is returned out to `result`. 

### Return Next Element with a Function

Wonderful... now we can set the value of a variable to be the return value of a function (which is another function), but why would that be of any use?! Why not just define `add2` globally?! Because when you return a function from another function, you get... Damnit Will, the rhetorical question lead-ins always trip me up. Before we talk about the benefits of returning a function from a function, lets look at some more code!

{% highlight javascript %}

function createFunction(array) {
    let i = 0;
    function inner() {
        const element = array[i];
        i++;
        return element;
    }
    return inner;
}

const returnNextElement = createFunction([4, 5, 6])

{% endhighlight %}

^ ^ How can we access the first element in the list?! By walking through the code line-by-line!

* Define a function, `createFunction`, in global memory

* Define a `const`, `returnNextElement`, in global memory. Its value defaults to `undefined` until `createFunction` is executed and returns a value.

* Calling `createFunction` makes a new execution context, the array; [4, 5, 6] is stored in local memory, `i` is set to 0, and the function `inner` is declared and stored in local memory. `inner` is returned from `createFunction` and stored in `returnNextElement`. The execution context of calling `createFunction` is removed from memory.

Now, hopefully... we should be able to call `returnNextElement` and 'get' the *next* element returned. Yes, that's exactly how it works... `returnNextElement()`, `returnNextElement()`, `returnNextElement()`

With each call of `returnNextElement`, a new execution context is created in the local memory of which is declared the `const` `element` which is set to `array[i]`... but what is the value of either `array` or `i`?! Well, initially, JavaScript will check local memory and when `array` and `i` are not found, where does JavaScript check next? Global? no... Even though the execution context of `createFunction` was removed, `returnNextElement` does retain the data that was stored in the local memory of `createFunction`... so the next place that `returnNextElement` looks for `array` and `i` is technically itself? Yep. The function definition did retain `array` and `i`. So in this way, we are able to 'iterate' over the array and get the correct next element from repeatedly calling `returnNextElement`.

### Iterator Function

The 'backpack' of (referenced) data that we get when returning a function from a function is known as:

* Persistent Lexical Scope Referenced Data - This is a **very** literal way of defining what the referenced data *could* be called. Perhaps impressive, but not colloquial

* Closed Over Variable Environment - C.O.V.E.

* The Backpack - Makes some sense, as the data is 'on' / 'attached to' the surrounding function that returned the function... The instructor is trying to hard sell on using 'The Backpack' as the best name

* The Closure - Most engineers call it this, but the whole concept of functions retaining their lexical environment reference is known as closure, not just the referenced data from the original lexical scope

Any function that when called gives out the next element from a flow of data is known as an iterator. Iterators turn data into 'streams' of actual values that can be accessed one after the other.

Now we have functions that hold an underlying array, the current position in the array, and `return` out the next item in the 'stream' of elements from the array when run.

This allows us to have loops that show us the element itself in the body on each loop and *more deeply* allows us to rethink arrays as flows of elements themselves which we can interact with by calling a function that switches that flow on to give us the next element (in the array).

This 'decouples' the process of accessing each element from what we want to do to each element. 

### Iterators Exercise

Go to [https://csbin.io/iterators](https://csbin.io/iterators) and do the exercises (but not 7, 8, 9 yet). [Solutions are here](https://gist.github.com/aegorenkov/2ae91cabf21223bddca8c5b3ef3ec6f6)

## Generators

### Generators

Once we start thinking of our data as flows (where we can pick an element one-by-one) we can rethink how we produce those flows; JavaScript now lets us produce the flows using a (generator) function to set what individual element will be returned next 🎉

{% highlight javascript %}

function *createFlow() {
    yield 4
    yield 5
    yield 6
}

const returnNextElement = createFlow();
const element1 = returnNextElement.next();
const element2 = returnNextElement.next();

{% endhighlight %}

What do we hope `returnNextElement.next()` will return? But how?

By reiterating what we've already covered!

JavaScript's built-in iterators are actually objects with a `next` method that when called return the next element from the 'stream' / flow - with some slight restructuring to make sure that we are truly clear on how iterators work.

### Generator Functions with Dynamic Data

### Generators Q&A

### Introducing Async Generators

### Async Generators

### Async Generators Q&A

## Final

### Async Await

### Wrapping Up