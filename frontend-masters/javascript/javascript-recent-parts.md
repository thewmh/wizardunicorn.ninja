---
title: "JavaScript: The Recent Parts"
description: These are notes from the 'JavaScript':' The Recent Parts' course on Frontend Masters.
permalink: /frontend-masters/javascript-recent-parts

layout: default
pagenav:
  - name: Introduction
    href: introduction
  - name: Strings
    href: strings
  - name: Array Destructuring
    href: array-destructuring
  - name: Object Destructuring
    href: object-destructuring
  - name: Further Destructuring
    href: further-destructuring
  - name: Array Methods
    href: array-methods
  - name: Iterators & Generators
    href: iterators--generators
  - name: Regular Expressions
    href: regular-expressions
  - name: Async Await
    href: async-await
  - name: Wrap-Up
    href: wrap-up
---

[Link to the workshop exercise files](https://static.frontendmasters.com/resources/2019-03-09-js-recent-parts/js-recent-parts.zip)

## Introduction

### JavaScript New Feature Process

JavaScript fatigue? The language changes so fast it seems like every few months, theres some new blog post about some new feature. How can I possibly keep up?! Don't be afraid of the changes! It is important to remember that from 1999 to 2009 there were essentially no changes made to JavaScript. There was a period of stagnation in various areas of the web, which actually brought about new browsers. But in 2009, unity was found amongst the authors of the JavaScript spec, at which point the landscape had changed dramatically. ES5 signaled that everyone was going to get back on track and work together. But then... 2010, 2011, 2012, 2013... Nothing about JavaScript changed. Until ES6 / ES2015. 6 more years passed before any update was made to JavaScript.

And when ES6 did land, there were over 300 new features which definitely led to some blowback within the [JavaScript] community. This brought about the question of, 'how can we not stagnate and also not just show up with a massive load of changes to dump on the community?'. So it was decided that the best thing for the JavaScript language was to move forward little by little. Now, on an annual basis, updates are pushed to the language. This decision is reflected in the updated naming of the releases; ES2016, ES2017, ES2018, ES2019...

There are four stages to releasing a new feature in JavaScript. Stage 4 means that it is done, finished, and shipped. Now, in the current state of JavaScript releases and workflow, there are annual updates to the language.  Some are small, others are large, but overall, the updates are more manageable for the end users. Nonetheless, the fatigue felt amongst the community is understandable, but the annual updates to the language are necessary or else the language will get surpassed by something else.

### Declarative JavaScript

There are some important narratives happening with the evolution of JavaScript, the most important (in the instructors opinion) of those being a more declarative language. Declarative as in, declarative vs. imperative. Declarative meaning we declare the outcome, the what, and we allow the abstractions of the language to handle the how, so that the reader is more focused on the what, the outcome, and even more importantly, the why. This makes code able to communicate better. Generally speaking, more declarative code communicates better.

An example would be using the `spread operator` over `.apply` or `.slice`. The outcome is the same, but you can do it in a much cleaner and more communicative way. You'll see throughout this course that some examples are imperative or declarative, but the overarching theme will be that the updates coming to the language are being implemented in such a way that it is as clear, concise, and communicable a way as possible.

### Browser Support & Transpilers

Browser support should not be overlooked. There are still developers today who are not using things that landed, in JavaScript, in 2009! The reason being that they may have to support a legacy browser which does not support modern syntax, so they 'take comfort' in not *having* to learn the new things. But you can learn the things! Transpilers to the rescue! Babel is probably the most known transpiler which allows you to write [JavaScript] in the most current syntax, which Babel can then compile to a syntax that is supported by older browsers.

There will likely always be a gap between what you need to support and what are the most current features of the language. It is important to stay on top of the most current features! You don't have to learn and master every new feature the day it comes out, but you should be aware of them and keep your 'finger' on the 'pulse' of the language. Yes, the transpilers can be intimidating, but they are what help us to stay on top of the language updates. Don't allow the intimidation to keep you from learning about all the things. Welcome the transpiling overlords and write the new things!

### Course Overview

We are not going to cover the 300+ updates that came out of ES6, but we will look a subset of features from:

* ES6 / ES2015
* ES2016
* ES2017
* ES2018
* ES2019

Your beloved instructor believes that the things contained within this workshop are the things that you should focus on first. And those features are:

* Template Strings
* String padding / trimming
* Destructuring - by far the most complex and lengthy portion of this workshop, but totally worth it
* Array find() / includes()
* Array flat() / flatMap()
* Iterators, Generators
* RegExp Improvements
* async .. await
* async* .. yield await

The last three items in this course point to the maturation of the language in respect to asynchronous programming, which is a big thing that has been quite far behind in JavaScript for quite a long time. We'll find some exercises along the way to play with these features to develop a deeper understanding of them. This workshop will not make you an expert on any of these features, it will be up to you to go back to your codebase and try to implement these features in your code! 

## Strings

### Template Strings

Template Strings, aka Interpolated Literals, aka "Interpoliterals" (yeah right). Initially, Kyle do not like them, but over time, he do like them, interpoliterals may be one of the most important and useful features released in ES6! Ah, so Interpolated Literals is Kyle's mental model for Template Strings, because a template implies that you can reuse or re-render something over and over again, which is what Template Strings are not... Stick with calling them Template Strings so that people understand what you are talking about, but if you want to sound smart about them, use one of the above terms which no one will understand.

Anywho... what problem are template strings trying to solve? Consider this primitive looking code:

{% highlight javascript %}

var name = "Your Name";
var email = "youremail@domainaddress.com";
var title = "Your Title";

var msg = "Welcome to the things! Your " + title + " is " + name + ", contact: " + email + ".";

// Welcome to the things! Your Your Title is Your Name, contact: youremail@domainaddress.com.

{% endhighlight %}

Awful 🤦🏻‍♂️, but concatenation, am I right? Ok... so string concatenation with data is actually called interpolation, Kyle's terminology is starting to look less crazy CS guy-ish. The above code is fine, it will work as intended, but as an imperative approach to implementing a string interpolated with data, it can be cumbersome to wrap your head around what the final output would be, well at least harder than using a Template String. Here's that same code, but implemented with a template sting:

{% highlight javascript %}

var name = "Your Name";
var email = "youremail@domainaddress.com";
var title = "Your Title";

var msg = `Welcome to the things! Your ${title} is ${name}, contact: ${email}.`;

// Welcome to the things! Your Your Title is Your Name, contact: youremail@domainaddress.com.

{% endhighlight %}

Way more better! Inside of the `${...}` can be an entire JavaScript program if you like, but it will often just be a variable. Kyle thinks the best mental model for thinking about template strings is to consider them like an IIFE, an immediately invoked function expression, i.e. you describe what string you want and JavaScript immediately goes and constructs and builds that string and drops it in (to your program).

The result of a template string is an [actual] primitive string! Side note: Kyle is frustrated with JavaScript's implementation of template strings because he wrote his You Don't Know JS book series in Markdown and in Markdown if you want to highlight code, it is hard to show a template string because backticks is how Markdown delimits a code block.

Template strings will allow you to enter a return / line break without a special character! 

### Tagged Templates

Template strings have a feature that allows you to more fully control their pre-processing, with something called a tagged literal. Here is an example of that in action:

{% highlight javascript %}

var amount = 12.3;

var msg = 
    formatCurrency
`The total for your
order is ${amount}`;

// The total for your
// order is $12.30

{% endhighlight %}

`formatCurrency` is actually a function call, called a tagged template literal. The `formatCurrency` function looks like this:

{% highlight javascript %}

function formatCurrency(strings, ...values) {
    var str = "";
    for (let i = 0; i < strings.length; i++) {
        if (i > 0) {
            if(typeof values[i-1] == "number") {
                str += `$${values[i-1].toFixed(2)}`;
            }
            else {
                str += values[i-1];
            }
        }
        str += strings[i]
    }
    return str;
}

{% endhighlight %}

The above is a function that Kyle wrote for this workshop. `strings` will provide an array of all the individual strings in and then all the values that you've interpolated in another array. So then you will have 2 separate arrays and it is up to you to decide how you put them together. JavaScript will always provide an additional position in the strings array to guarantee that when you interpolate your two arrays together that there is no conflict, that they interpolate as expected. Some other use-cases for a tag function could  be; internationalization, preventing cross-site scripting, and escaping of characters. You don't even necessarily have to write these functions because there are tons of them available already written.

[Here's an example of some tag functions that I found on GitHub](https://github.com/zspecza/common-tags)

### Applying Tagged Templates

Kyle has written his own tag function for objects and error logging. Instead of `console.log` writing `[object, object]`, Kyle's tag function will stringify the object and print it to the console, he's also written in a way to log his errors so that he can see the stack trace 🔥. A tag function doesn't have to return a string. Another useful tag function is one for RegEx which allows you to have a multi-line regular expression with comments. The RegEx tag function will parse the template string and return an actual regular expression, not a string. It's almost as if you can write an entire language inside of a template literal and have a tag function interpret it. Actually, you can do exactly that. There are tag functions for JSX which allows you to write JSX and include whatever variables you want and the return or output is actual DOM elements, just like JSX, but in JavaScript!

### Tagged Template Exercise

In this exercise we are going to be building out own tagged function called `upper`, the purpose of which is to uppercase the values. The goal is to write `upper` and get the `console.log` statement to print `true`. 

{% highlight javascript %}

function upper(strings,...values) {}

var name = "kyle",
	twitter = "getify",
	topic = "JS Recent Parts";

console.log(
	`Hello ____ (@____), welcome to ____!` ===
	"Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
);

{% endhighlight %}

### Tagged Template Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

function upper(strings,...values) {
    var str = "";
    for (let i = 0; i < strings.length; i++) {
        if (i > 0) {
                str += String(values[i-1]).toUpperCase();
            }
        str += strings[i];
        }
    return str;
}

var name = "kyle",
	twitter = "getify",
	topic = "JS Recent Parts";

console.log(
	upper `Hello ${name} (@${twitter}), welcome to ${topic}!` ===
	"Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
);

{% endhighlight %}
{% endcapture %}{% include details.html %} 

### Padding & Trimming

Kyle says that it's almost a rite of passage for developers learning JavaScript to have to learn how to write some sort of small function to add or remove characters from strings. No more! The string prototype has padding and trimming built into it. Padding was released with ES2017 and trimming with ES2019. But when thinking about padding or trimming, from which side of the string are we performing the action? From left to right or from right to left? To think in terms of left or right is inappropriate for internationalization purposes (think languages that read right to left). So what did we end up with then?

`padStart` - takes 2 arguments, the first is required, the second is optional. The first argument tells it to what length you would like to 'pad to'. Here's a few examples showing how `padStart` works:

{% highlight javascript %}

var str = "Hello";

str.padStart(5);
// "Hello"

str.padStart(8);
// "   Hello"

str.padStart(8, "*");
// "***Hello"

str.padStart(8, "12345");
// "123Hello"

str.padStart(8, "ab");
// "abaHello"

{% endhighlight %}

As you can see from the above examples, if your string is already 5 characters long and you supply 5 as the argument to `padStart`, nothing happens. If you supply 8, `padStart` adds 3 spaces. If you supply '*' as the second argument to `padStart`, 3 asterisks will be 'padded' to the string. In the last two examples, you can see what happens when you supply multiple characters as the second argument, where either the list of characters is not entirely used or starts to get repeated if needed. Similar to `padStart` is `padEnd`. I'm not going to show you the example here because it is literally the same as `padStart`, but instead of padding the start of the string, `padEnd` pads the end of the string according to the supplied arguments. BTW, padding methods do detect whether the language is LTR or RTL, but the second argument always uses the provided characters LTR.

Similar to padding, there are `trimStart` and `trimEnd`, but also a plain `trim` method exists. `trim` trims both sides of a string and `trimStart` / `trimEnd` trim either the start or end of a string. All 3 trim methods only trim white space from the sides of the string and they take no arguments. 

## Array Destructuring

### Destructuring

Destructuring

>  **de**composing a **structure** into its individual Parts

This next section is going to be pretty heavy on the typing, so it's a good thing that I am watching a recording that I can pause frequently, so that you can read along at your own pace.

When it comes to destructuring, there are certainly a lot of nuances, but it is not some sort of black box that you will never understand. It will take some time, but you (and I) **can** do it! These next sections that focus on destructuring should be super helpful in your code, this is why they were included in this workshop.

[here's a link to the Mozilla Developer Network's documentation on destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

First and foremost, you should understand that the purpose of destructuring as a feature, is to assign individual parts from a larger structure. Assign to individual variables, assign to individual properties, etc... Imagine you are pulling in a large JSON object from an API, and it looks something like this:

{% highlight javascript %}

var tmp = getSomeRecords();
// imaginary API call

var first = tmp[0];
var second = tmp[1];

var firstName = first.name;
var firstEmail = first.email !== undefined ?
    first.email : "nobody@none.tld";

var secondName = second.name;
var secondEmail = second.email !== undefined ?
    second.email : "nobody@none.tld";

{% endhighlight %}

The above may look familiar, maybe you've even written something similar while getting some data from an API? The above is functional, in the sense that it mechanically works, but it is far from ideal in terms of communicating what is happening. Without knowing exactly what the above does at first glance, it still takes a considerable amount of effort to figure out the code. It is fairly common that one would provide a large set of comments to explain what is expected to be returned from the API as well as what the code is actually doing. Comments are useful, but the problem with code comments is that they get out of date; either the API changes or the code changes, but your comments do not change, it can be misleading. Fear not! This is **the** use case, this is why destructuring was created. Destructuring this imaginary JSON object that was returned from an API call is the more declarative way to approach the 'problem'. We'll dig deeper into exactly how all of this works, but for now, take a look at the same code that utilized destructuring to accomplish the same thing:

{% highlight javascript %}

var [
    {
        name: firstName,
        email: firstEmail = "nobody@none.tld"
    },
    {
        name: secondName,
        email: secondEmail = "nobody@none.tld"
    }
] = getSomeRecords();

{% endhighlight %}

Notice in the above code that on the left-hand side of the `=` sign that we have what essentially looks like a JSON object. That is not what it is... It is not an array of objects. Because it's on the left-hand side of the `=` sign, it is not a value at all. It's actually a 'pattern'. It is a syntax that is describing the value that is expected from the right-hand side, where the `getSomeRecords` function is called. A pattern to describe what kind of value we are expecting to get, the purpose of which is not just to describe it, but to assign the individual values as needed; i.e. `name: firstName,` 'describes' that we want to assign the value of the property `name` from the first object in the array of objects returned from the `getSomeRecords` API call to the `firstName` variable. The same 'description' happens for `firstEmail`, `secondName`, and `secondEmail`, but the email(s) are unique in that they are using what is called a 'default value expression' which will set the value to `"nobody@none.tld"` if there is no property for `email` returned from the API call.

The destructuring pattern you write does not have to account for the entirety of the value. The pattern only has to account for the part of the value that you care about at whatever point you need it. The other takeaway here is that this code is essentially self-documenting because of it's declarative nature. Because in a sense, we are documenting with syntax what we can expect the value returned from the API call to be. Next, we'll be doing some (as promised) 'live-coding', so get your code editor open and type the things you're reading here because that's about how interactive we can get! 👀

### Refactoring Code Using Destructuring

Destructuring has a processing model to it and the goal of looking at pre-destructured code alongside destructured code is to solidify the mental model. Since we're not actually 'live-coding' here, I will place the final code, both non-destructured and destructured, for you to compare. Hopefully, both examples should be enough to help you compare the differences, but if not, hit me up! Starting pretty basic here, but here is an example of some code that could benefit from destructuring:

{% highlight javascript %}

function data() {
    return [1,2,3];
}

var tmp = data();
var first = tmp[0];
var second = tmp[1];
var third = tmp[2];

{% endhighlight %}

Kyle admittedly says that the `tmp` variable was probably not even necessary, but whatever... Here's the same thing, but using destructuring:

{% highlight javascript %}

function data() {
    return [1,2,3];
}

var [
    first,
    second,
    third
] = data();

{% endhighlight %}

Again, as we've seen with destructuring in the intro, there is a pattern to the left-hand side of the `=`, which is essentially the same as the imperative approach, but now implemented declaratively! What happens, to either example, if you reference a value that does not exist? The variable would have `undefined` assigned to it. How about if your 'data' has an extra value that you do not use, what happens? If you do not use that additional value, nothing happens... What happens if a value in your 'data' is already `undefined`? If you reference it, whatever variable that value was assigned to will have a value of... `undefined`. But what if a value is `undefined` and you don't actually want any of your variables to be undefined, what would you do then? The imperative approach would be to use a ternary operator, like this:

{% highlight javascript %}

//..
var second = tmp[1] !== undefined ? tmp[1] : 10;
//..

{% endhighlight %}

Using destructuring, the equivalent of the ternary operator is the 'default value expression', which looks like this:

{% highlight javascript %}

//..
    second = 10,
//..

{% endhighlight %}

You can use a 'default value expression' for any of the element positions in your destructuring. A 'default value expression' will only be applied when the value is `undefined`. What if you have an unknown amount of data that you want to collect into an array? How would you do that?

Imperatively:

{% highlight javascript %}

//..
    return [1,2,3,4,5];
//..
var fourth = tmp.slice(3);
//..

{% endhighlight %}

Destructuring:

{% highlight javascript %}

//..
    return [1,2,3,4,5];
//..
...fourth
//..

{% endhighlight %}

Imperatively, using `.slice(3)` will grab everything according to the 'array' position specified, while using `...` in destructuring will 'bundle' all of the remaining data after the last declaration.

### Spread Operator & Declaring Destructured Arrays

In the final examples of the previous section, what would `.slice(3)` or `...` return, or what would you expect it to return, if no value existed? `.slice` should return an array no matter what, and the 'spread operator' should do the same. In destructuring, the 'spread operator' needs to be at the end of your 'pattern', because it gathers all remaining values. I suppose if you were dealing with nested arrays you could probably use it within a nested pattern to retrieve and assign that data, but it would still appear at the end of each segment? There is one fundamental difference between the imperative and destructured approach that we've not looked at yet which is the `tmp` declaration. How could we get the same result, a variable that holds the entire set of data, using destructuring? Like this:

{% highlight javascript %}

//..
var [
//..
] = tmp = data();

{% endhighlight %}

At the end of the declarations for `first`, `second`, `third`... we've added another equals sign and `tmp`. `tmp` will now equal whatever `data()` returns!

### Declaration & Assignment

Destructuring is about the value assignment to a variable, not the declaration. i.e. you could have declared all of the variables ahead of time. **Any valid left-hand side target** can have a value assigned to it. This could be an object, an array, etc. The point again being that destructuring is just the assignment, not the declaration. 

### Comma Separation

What if you would like to ignore a value while using destructuring on an array? Imperatively, it would look like this:

{% highlight javascript %}

just don't declare it!
// var second = tmp[1];

{% endhighlight %}

Using destructuring:

{% highlight javascript %}

//..
first,
,
third,
//..

{% endhighlight %}

Above, adding an additional comma will effectively 'skip' over a value in the array, so if the array were `[1,2,3]`, we'd get `[1,,3]`. It's recommended that if you are going to destructure an array and skip values using commas that you put each value, whether skipped or used, on it's own line for readability sake.

Have you ever needed to swap the values of two variables before and perhaps wrote something like this?

{% highlight javascript %}

var x = 10;
var y = 20;

{
    let tmp = x;
    x = y;
    y = tmp;
}

{% endhighlight %}

With destructuring, we can do that same swap with shortened syntax:

{% highlight javascript %}

var x = 10;
var y = 20;

[y,x] = [x,y];

{% endhighlight %}

### Parameter Arrays

If we can do array destructuring on our assignment list, we can also do [destructuring] in parameter positions. For example, you could do something like this:

{% highlight javascript %}

function data(tmp) {
    var [
        first,
        second,
        third
    ] = tmp;
}

{% endhighlight %}

Or, you could actually destructure the `tmp` parameter, like this:

{% highlight javascript %}

function data([
    first,
    second,
    third
]) {
    //..
}

{% endhighlight %}

The above (beyond the data being an array) cares less about what is being passed in and more about naming the first three index positions of the array as: first, second, third. The multiline formatting of the function signature is for readability. Do it.

What would happen if the `data()` function had a return value of `null`? Whether using destructuring or not, you would end up with a 'type error'. The point being that destructuring is essentially syntactic sugar for the imperative approach, meaning that it is the same as the imperative approach, but potentially more declarative and readable. So, how could we 'build-in' a fallback for the variables so they end up `undefined` rather than `null` or as an empty array? By providing an empty array as the fallback! Imperatively: `var tmp = data() || [];`, using destructuring: `//.. ] = tmp = data() || [];`... the two are essentially the same...

What about when it is a parameter that we are passing in? How do we make sure that there is a default value for a parameter being passed into a function? By using a 'default parameter value'! Like so:

Imperatively: `function data(tmp = []) {...`

Destructuring: `function data([//..] = []) {//..}`

It is recommended to get in the habit of providing default values so that your destructuring patterns fallback to undefined rather than throwing a type error. AND, you may also want your variables to have default values... define them; i.e. `first = 10, second = 20, third = 30...` or whatever you may need them to be.

### Nested Array Destructuring

How do you pull the values out of nested arrays? Here's how that could look with an imperative approach:

{% highlight javascript %}

function data(){
    return [1, [2, 3], 4];
}

var tmp = data() || [];

var first = tmp[0];
var tmp2 = tmp[1];
var second = tmp2[0];
var third = tmp2[1];
var fourth = tmp[2];

{% endhighlight %}

😞 Kind of not enjoyable, but that is how it is done. How about with destructuring?

{% highlight javascript %}

function data() {
    return [1, [2, 3], 4];
}

var tmp;
var [
    first,
    [
        second,
        third
    ],
    fourth
] = tmp = data() || [];

{% endhighlight %}

But what if the value in index position 1 of the array is actually `undefined`? How can you provide a default value so that your things do not explode?! Like this:

Imperatively: `var tmp2 = tmp[1] || [];`

Destructured: `//.. [ second, third ] = [], //..`

Doing the above, will provide graceful fallback for your variables. ❤️

## Object Destructuring

### Object Destructuring

More destructuring! This may look pretty similar to the array destructuring that was just covered, but read on just in case there are some hidden 💎s (hint: there will be). Look at the following:

{% highlight javascript %}

function data() {
    return { a: 1, b: 2, c: 3};
}

var tmp = data();
var first = tmp.a;
var second = tmp.b;
var third = tmp.c;

{% endhighlight %}

Here is its destructured equivalent:

{% highlight javascript %}

function data() {
    return { a: 1, b: 2, c: 3};
}

var {
    a: first,
    b: second,
    c: third
} = data();

{% endhighlight %}

Notice the destructuring pattern for an object is `source: variableName`, this already looks a little different than array destructuring! And since we are working with an object, which requires the source, the order of assignment is whatever you like; i.e. you could order your destructuring pattern backwards `c: third, b: second, a: first` and the result would be the same.

Similar to working with arrays, if you attempt to assign a variable a value which does not exist, it will be assigned `undefined`. Also similar to what we saw with arrays, if there is anything extra that is not used, it is basically ignored. Dissimilar to working with arrays, if you want to gather up the remaining values from an object, it is not as simple as using `.slice()`, but looping over the object using `object.keys` and finding the things you are already capturing, ignoring them, and bundling the rest up in a new object... at least in an imperative approach. With destructuring, use 'object rest'! Object rest is exactly the same as we have seen with array destructuring, `...variableName` will capture any remaining unaccounted for values from the object you are destructuring and place them into a new object for you.

Another similarity to array destructuring, if we need to have default values for variables in the case that a specific parameter does not exist, in object destructuring you can set a default like this:

{% highlight javascript %}

//..
a: first = 42,
//..

{% endhighlight %}

Of course w/ an imperative approach, we'd still be using the long-in-the-tooth ternary operator (re-read the array destructuring for an example of that).

Kyle goes on to explain how he had trouble understanding object destructuring at first, because of the `source: target = default` format, and then explains how it now makes sense to him which did not make any sense whatsoever to me, so I ran off to MDN and found their explanation, I recommended reading it: [Mozilla Developer Network - Object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring)

### Object Assignment Destructuring

Another non-surprise, but if you have already declared your vars, you do not need to redeclare them when destructuring, or when not destructuring for that matter. However, if you have no declarator, JavaScript will view your object as a block and not an object. This is not your fault, it is JavaScript's. Fear not, wrap everything in parenthesis and you'll be destructuring objects using already declared vars in no time! Here's an example:

{% highlight javascript %}

function data() {
    return { b: 2, c: 3, d: 4};
}

var first, second;

({
    b: second,
    a: first
} = data());

{% endhighlight %}

Notice how the entire statement is wrapped, not just the pattern. Another approach, which we technically covered w/ arrays but I may have conveniently glossed over / left out... is if you need to store all of whatever would be returned from `data()`, say `var tmp = data();`, with destructuring, we could do something like this:

{% highlight javascript %}

//..
var tmp;
//..
tmp = {
    b: second,
    a: first
} = data();

{% endhighlight %}

Now that we've included `tmp =...`, there is no way that JavaScript could confuse our 'undeclared' object as anything other than a destructuring pattern.

### Object Default Assignment

Similar to array destructuring, if what gets returned does not exist, aka returns null or undefined, we can set a default assignment:

{% highlight javascript %}

function data() {
    return;
}

var {
    b: second,
    a: first
} = data() || {};

{% endhighlight %}

Additionally, (and unrelated?) if the target and source are the same name, you only need to list it once, like this:

{% highlight javascript %}

function data() {
    return;
}

var {
    a,
    b
} = data() || {};

{% endhighlight %}

### Nested Object Destructuring

Consider this:

{% highlight javascript %}

function data() {
    return {
        a: 1,
        b: {
            c: 3,
            d: 4
        }
    };
}

var tmp = data() || {};
var a = tmp.a;
var b = tmp.b;
var c = b.c;
var d = b.d;

{% endhighlight %}

And using destructuring:

{% highlight javascript %}

function data() {
    return {
        a: 1,
        b: {
            c: 3,
            d: 4
        }
    };
}

var {
    a,
    b: {
        c,
        d
    } = {}
} = data() || {};

{% endhighlight %}

Pretty similar to nested array destructuring? Yeah... I went ahead and threw in the default value for `b` for the event that it doesn't exist, it will be set to an empty object `{}`. Kyle admits that it is extremely difficult to remember to set defaults, especially in nested destructuring patterns, so he recommends to use a linter, surprisingly, ESLint, which in a previous course of his, he was quite strongly against and was so against that he was making his own. It is dead now... use ESLint!

### Default Assignment Q & A

Q: I've seen people use a placeholder like 'default object' that includes the entire 'tree' instead of an empty object, is that overkill?

A: Yes. It is recommended to place the default values inside of the destructuring pattern and **only** use an empty object `{}` for the fallback.

### Parameter Objects

Don't do this:

{% highlight javascript %}

function data(tmp = {}) {
    var {
        a,
        b
    } = tmp;
    //..
}

{% endhighlight %}

Do this!

{% highlight javascript %}

function data({
    a,
    b
} = {}) {
    //..
}

{% endhighlight %}

That is to say... If you do not need access to the entire object, the proper way to destructure a parameter object is shown in the second example. Otherwise, you should probably stick with the imperative approach and destructure off of `tmp` inside of the function.

### Nested Object & Array Destructuring

Something unique about object destructuring over array destructuring is that we have access to the objects properties and can use them more than once in a destructuring pattern, whereas with array destructuring, we cannot. 😞 Check it out!

{% highlight javascript %}

var obj = {
    a: 1,
    b: 2,
    c: 3
};

var {
    a,
    b: b,
    b: w,
    c
} = obj;

{% endhighlight %}

The above is especially useful when dealing with nested objects. i.e. if you wanted to capture the entirety of `b` and then capture a nested property, something like:

{% highlight javascript %}

var obj = {
    a: 1,
    b: {
        x: 2
    },
    c: 3
};

var {
    a,
    b: b,
    b: {
        x: w
    },
    c
} = obj;

{% endhighlight %}

You can also have arrays nested within objects, and destructure them...

{% highlight javascript %}

var obj = {
    a: 1,
    b: [42, 187],
    c: 3
};

var {
    a,
    b: b,
    b: [
        W,
        X
    ] = [],
    c
} = obj;

{% endhighlight %}

You can effectively have any [nested] combination of arrays and objects and destructure them. Don't forget your defaults!

## Further Destructuring

### Named Arguments

### Destructuring & Restructuring

### Destructuring Exercise

### Destructuring Solution

## Array Methods

### find, findIndex, & includes

### flat & flatMap

## Iterators & Generators

### Iterators

### Declarative Iterators

### Data Structure without Iterators

### Generators

### Iterator & Generator Exercise

### Iterator & Generator Solution

## Regular Expressions

### Look Ahead & Behind

### Named Capture Groups

### dotall Mode

### Regex Exercise

### Regex Solution

## Async Await

### Async Functions

### Async Await Exercise

### Async Await Solution

### Async Iteration

### Async Function Problems

### Async Generators with yield

### Async Generators Iteration

## Wrap-Up

### Wrap-Up