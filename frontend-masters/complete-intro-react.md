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

### A Note on the Course Font

## Pure React

### Getting Started with Pure React

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