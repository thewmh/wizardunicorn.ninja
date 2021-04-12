---
title: "Structure and Interpretation of Computer Programs"
description: These are notes from Computer Science 61A 'Structure and Interpretation of Computer Programs' (SICP) lectures with Brian Harvey at UC Berkeley.
permalink: /computer-science/structure-interpretation-computer-programs

layout: default
pagenav:
  - name: Lecture 1 - Functional Programming 1
    href: lecture-1---functional-programming-1-1
---

## Lecture 1 - Functional Programming 1

### Lecture 1 - Functional Programming 1

This course will be using a programming language called Scheme and while this course is not about Scheme, we'll learn all about it in this first lecture. The particular implementation of Scheme that this course uses is called STK. The way Scheme works is you ask it a question, it tells you the answer; i.e. if you type `6`, STK will 'return' `6`, if you type `(+ 6 8)`, STK will return `14`. The syntax for addition as just seen is so that Scheme can use the notation uniformly. In math there is 'in-fix', 'prefix', and 'post-fix' notation, and in the case of the root symbol 'all around' notation. None of these work very well if there are more than 2 operands. Again, for uniformity, the operator, in this case the `+`, will come first in Scheme.

Here are the outputs of some operations in Scheme:

{% highlight scheme %}

STK> (+ 4)
4
STK> (+)
0
STK> (*)
1 // 1 is the value of the multiplication symbol in Scheme
STK> (/)
Error // This operator always requires arguments
STK> +
#[closure arglistargs 8177524]

{% endhighlight %}

As seen in the final output above, the value of the symbol `+` is a function. To print a value in STK, a single quote (otherwise known as an apostrophe) symbol should precede the desired output; i.e. `'hello world`. Functions can be composed in Scheme like so:

{% highlight scheme %}

STK> (+ (* 3 7) (* 10 10))
121

{% endhighlight %}

This first few examples of Scheme covers about 90% of the language. Congratulations! You know Scheme. But not all functions and use-cases are numeric. Here's some examples of other functions:

{% highlight scheme %}

STK> (first 'hello)
h
STK> (last 'hello)
o
STK> (butfirst 'hello)
ello
STK> (butlast 'hello)
hell
STK> (bf 'scheme) // abbreviated function call for `butfirst`
cheme
STK> (word 'now 'here)
nowhere
STK> (sentence 'now 'here)
(now here) // notice how this does not concatenate the words
STK> '(magical mystery tour)
(magical mystery tour) // the apostrophe functions as the sentence function functions
STK> (first '(got to get you into my life))
got // prints first word of provided sentence
STK> (bf '(the fool on the hill))
fool on the hill // prints all but the first word of provided sentence
STK> (first (bf '(a hard days night)))
hard // operates 'butfirst' on provided sentence; 'hard days night'; then 'first' on 'hard days night'; returns 'hard'
STK> (first (first (bf '(she loves you))))
l // 'butfirst' on sentence; 'loves you'; first on 'loves you'; 'loves'; first on 'loves'; 'l'

{% endhighlight %}

This handout gets handed out: [CS 61A: Structure and Interpretation of Computer Programs General Course Information](https://people.eecs.berkeley.edu/~bh/61a-pages/first-day-handout.pdf)

Scheme also allows the definition of new things; i.e.

{% highlight scheme %}

STK> (define pi 3.141592654)
pi
STK> pi
3.141592654
STK> (* pi 5 5)
78.53981635 // the area of a circle with a radius of 5

{% endhighlight %}

Scheme also allows for the definition of procedures:

{% highlight scheme %}

STK> (define (square x)
        (* x x))
square
STK>

{% endhighlight %}

In the code examples so far, you may have noticed that when creating a definition, Scheme will print the name of the definition after it has been created. If you did not notice that...Scheme prints the name of the definition after it has been created. Now that the procedure `square` has been created, you could call it like so: `(square (+ 2 3))` In what order would that evaluate? Well, first the subexpression `(+ 2 3)` would evaluate to `5`, then that `5` would be used as the argument for the `square` procedure we defined; `(* 5 5)` or `5*5`, which would return 🥁 `25`.