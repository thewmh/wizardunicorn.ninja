---
title: "Complete Intro to React, v5"
description: These are notes from the 'Complete Intro to React, v5' course on Frontend Masters.
permalink: /frontend-masters/complete-intro-react

layout: page
---

[Link to Course Github Repository](https://github.com/btholt/complete-intro-to-react-v5)

[Link to Course Notes](https://bit.ly/react-v5)

## Introduction

### Introduction

This course covers the entirety of how to write (with?) React. Going over all of React's features, hooks, context, and portals. This course also covers some of the other (React) APIs such as classes and life cycles. It is not required that you've taken previous versions of this course, it is V5 as in this is its fifth iteration. But JK... V3 is useful if you need to look at Webpack or React Router. This course is meant to be mostly modular, you can skip from lesson to lesson if you want, but the way that you have to do that is moving between git commits, because each section of this course is equal to a commit in the course repo.

It is recommended to get Sourcetree, which I already use for work, because it provides you with a visual commit history that you can right click on to check out a specific commit 🔥. In the same repo for this course are the branches for the intermediate course, which is also available on Frontend Masters. If you prefer to use the command line for git, you can do that as well. If you find any issues with any of the course materials, you are invited to open a pull request (PR) [on this branch](https://github.com/btholt/complete-intro-to-react-v5/tree/gh-pages-src) or [file an issue](https://github.com/btholt/complete-intro-to-react-v5/issues) in the repo.

Blah blah blah, background information about how awesome the instructor Brian Holt is.

This course is open source, so share the links above to everyone in existence. Also, don't just take, share your ❤️ by giving the repo for this course a ⭐️. Doing so will help further the course's reach and Brian will feel even more awesome.

### Project Setup

When Brian first see React, he do not like it. HTML in JavaScript? Disgusting. Why would anyone ever want to have an additional transpiled language? Fear not, (go see your therapist if you are having feelings about it) we start with no weirdness, we start with

🖤🖤🖤 **RAW JAVASCRIPT REACT!** 🖤🖤🖤

JSX and React are not doing any sort of black magic, its just JavaScript function calls. It is good to understand your tooling, otherwise you will resent them and be right back at your therapist. So, understand the problems that your tools are solving and embrace their complexity because it will give you ease of use.

Brian admittedly resented JSX because he did not understand it, it doesn't have to be this way for you. Lets learn what it does and why it exists, because writing React in raw JavaScript React is annoying. Finally actually getting started, make a new folder in your preferred location to make new folders. Brian prefers to make folders of the same name in his Desktop directory, try to choose a name that isn't already taken or [use this name generator](http://sph.mn/dynamic/svn) (I just picked the first one that came up in a ~~Google~~ search) if you are having trouble (Brian chose 'adopt-me'). Oh wait, we are actually building a pet adoption app, so... Now open your empty folder in VSCode or whatever editor you use.

In your code editor, create a new folder in your project folder, here the name is important, call it `src`. JK, it is not required to name it `src`, but Brian said to do it anyway. In the `src` folder, create a new file `index.html`. In the `index.html` file, start typing `html:5` and our digital friend Emmet will offer some help, accept Emmet's help by pressing the 'tab' key on your keyboard. Emmet will 'scaffold' an HTML page for you. This is better than remembering what is supposed to go in an HTML file, but in case you're wondering what Emmet builds for you, it should look like this:

{% highlight html %}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>

{% endhighlight %}

You can see the entire Emmet cheatsheet at [emmet.io](https://emmet.io). And Emmet is not just for VS Code, you can use Emmet with Sublime and maybe other editors as well. Update the `<title>` of your page to 'Adopt Me!' (or whatever you like). Inside the `<body>` of you page, add:

{% highlight html %}

<div id="root">not rendered</div>
<script src="https://unpkg.com/react@16.8.4/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16.8.4/umd/react-dom.development.js"></script>
<script>
    // your code will go here, for now
</script>

{% endhighlight %}

BTW Emmet is a very powerful tool, but Brian mostly uses the lazy abbreviations; to make the `<div>` with the 'root' id, just type `#root` and hit tab, Emmet will do the rest. The 'not rendered' text in the root div is there to let you know if there is an issue with React, because if everything is working as expected, the contents of that div should be replaced. The first script tag is grabbing React from unpkg's CDN so you can have access to React as a top-level variable, AKA you can use React. The second script tag grabs React DOM which allows you to render React to the browser. But why are there two packages? Because React Native and React DOM both share the React package.

And the final script tag is an example of something that you should never do, write JavaScript directly inside of your HTML, but Brian wants you to do this so that you can see how bare-bones you can implement React. Open the index.html file in your favorite browser. You should see 'not rendered' appear. Cool. If you check the console in the browser and type `React` or `ReactDOM` you will be able to see the objects that were received from the files that were downloaded from the CDN.

Surprisingly, this course is not about CSS, so there is a pre-made CSS file for you to use for this workshop, you can [grab the CSS file here](https://raw.githubusercontent.com/btholt/complete-intro-to-react-v5/master/src/style.css). Save that CSS file in your `src` folder (the easiest way being to hit ⌘+A to select all, ⌘+C to copy it, make a `style.css` file in your `src` folder, then ⌘+V to paste the copied CSS into the `styles.css` file). Now add it to the `<head>` of your `index.html` file:

{% highlight html %}

<link rel="stylesheet" href="style.css">

{% endhighlight %}

If you reload the `index.html` file in your browser, you will see the CSS has made your page look pretty!

### A Note on the Course Font

Time to put some code in those empty script tags! Write the following: 

{% highlight html %}

<script>
    // your code will go here, for now
    const App = () => {
            
    }
</script>

{% endhighlight %}

If you were watching this course, Brian goes on a tangent about font ligatures.

> *"It's pretty, that's why I do it"*

There may also be an argument for reducing cognitive overhead, because ligatures combine character pairs, making them into one character instead of two... Anyway, Brian is using the font called 'Dank Mono'. He did not name it. Before we continue, head off to ~~[dank.sh](https://dank.sh)~~ [gumroad?](https://gumroad.com/l/dank-mono) and buy their 'Dank Mono' font. It will only set you back ~$50, but the upside is you get an awesome font and Brian gets a nice little kickback (even though he insists he does not). If you don't want to shell out ~$50, you can get a free font that has ligatures, [FiraCode](https://github.com/tonsky/FiraCode). Then Brian shows you how to install and use your fancy new font and what happens if you disable ligatures. 🤯

## Pure React

### Getting Started with Pure React

Ok, for real this time, put this into the inline `<script>` tag in your `index.html` file:

{% highlight html %}

<script>
    const App = () => {
        return React.createElement(
            "div",
            {},
            React.createElement("h1", {}, "Adopt Me!")
        )
    };
</script>

{% endhighlight %}

What we've done is create a component called 'App'. In this case, the component is just returning a function, in this case the result of `React.createElement`. But what is `createElement`? What is `App`? Think of `App` as if it were a rubber stamp. If used, our 'rubber stamp' can make many impressions of the design that is carved on it, if not used, it is just a rubber stamp. So far, all we have done is create the 'rubber stamp'. `.createElement` is like stamping something; i.e. anytime `App` gets called, `.createElement` is going to 'stamp` a `<div>` and inside of that `.createElement` is going to 'stamp` an `<h1>`. And that is the basis of everything in React, it is just returning markup. So now that we have `App`, we need to actually use it somewhere. So add this to the bottom of your script tag:

{% highlight html %}

<script>
    //...
    ReactDOM.render(React.createElement(App), document.getElementById("root"));
</script>

{% endhighlight %}

The new line we've just added will actually 'stamp' our `App` into the DOM. `React.createElement` can either take in a component, as we've seen with the last thing added to the `<script>` tag, or it can take a series of arguments to output to the DOM, as was the case with the first part of the `<script>` tag at the beginning of this section. If you now check your `index.html` file in your browser, you will see a fancy logo. Don't be too confused by how fancy the `<h1>` is, the CSS file wee downloaded earlier is doing some magic to replace the original text with a logo.

Brian declares this workshop is over and walks off camera. JKLOL.

At its simplest, this is really what React is; taking a component and using it. The power here is that you can make components that you put inside of components that you put inside of components that you put inside of components. React gives you a composability model.

### createElement Arguments

### Reusable Components

### Passing in Component Props

### Destructuring Props

## Tools

### npm & Generating a package.json File

### Prettier

### npm Scripts

### Prettier Setup

### ESLint Setup

### ESLint Configuration

### gitignore

### Parcel

### Installing React & ReactDom

### Separate App into Modules

## JSX

### Converting to JSX

### Configuring ESLint for React

### JSX Composite Components & Expressions

## Hooks

### Creating a Search Component

### Setting State with Hooks

### Best Practices for Hooks

### Configuring ESLint for Hooks

### Calling the Pet API

### Unique List Item Keys

### Breed Dropdown

### Custom Hooks

## Effects

### Effects

### Declaring Effect Dependencies

### Effect Lifecycle Walkthrough

### Run Only Once

### Hooks Review and Q&A

## Dev Tools

### Environment Variables & Strict Mode

### React Browser Dev Tools

## Async & Routing

### Asynchronous API Requests

### Using the Fallback Mock API

### One-Way Data Flow

### Reformatting the Pet Component

### Reach Router

### Debugging & Reach Router Link

## Class Components

### Class Components

### Rendering the Component

### Configuring Babel for Parcel

### Creating an Image Carousel

### Context

### Index Click Q&A

### Carousel Implementation

## Error Boundaries

### Error Boundaries

### Error Boundary Middleware

### 404 Page Redirect

### Lifecycle Methods & Error Boundary Q&A

## Context

### React Context

### Context with Hooks

### Context with Classes

### Persisting State with Context Hooks

## Portals

### Modal Dialog with Portals

### Displaying the Modal

## Wrapping Up

### Wrapping Up