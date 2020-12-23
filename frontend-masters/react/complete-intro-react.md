---
title: "Complete Intro to React, v5"
description: These are notes from the 'Complete Intro to React, v5' course on Frontend Masters.
permalink: /frontend-masters/complete-intro-react

layout: default
pagenav:
  - name: Introduction
    href: introduction
  - name: Pure React
    href: pure-react
  - name: Tools
    href: tools
  - name: JSX
    href: jsx
  - name: Hooks
    href: hooks
  - name: Effects
    href: effects
  - name: Dev Tools
    href: dev-tools
  - name: Async & Routing
    href: async--routing
  - name: Class Components
    href: class-components
  - name: Error Boundaries
    href: error-boundaries
  - name: Context
    href: context
  - name: Portals
    href: portals
  - name: Wrapping Up
    href: wrapping-up
---

[Link to Course Github Repository](https://github.com/btholt/complete-intro-to-react-v5)

[Link to Course Notes](https://bit.ly/react-v5)

<!-- [Link to Completed Workshop Project](complete-intro-react/) -->

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

Q: Why is there still a `<div id="root">` in the markup and why does it no longer appear in the DOM?

A: Because React. You don't need to have any content in the `<div>`, but I (Brian) do it so that I know my JavaScript is loading.

Q: In `App`, you have a return statement for `React.createElement`, but then you pass *another* `React.createElement` inside of that?

A: `React.createElement` takes three parameters:

1. What kind of tag is it; i.e. "div"

2. An object, which is currently an empty object. But, this could contain all of the attributes that you would like your component / DOM element that you are creating to have.

3. The children. In our case, it is another element (an h1). You could pass in an array of elements, or not an array of elements, but imagine it as an array of elements because we will not continue writing React in this way.

### Reusable Components

Writing this component inside of a script tag is absolutely disgusting, so lets not do that anymore. Make a new file in your `src` directory and name it `App.js`. React is extremely flexible, it's not very prescriptive at all about pretty much anything. This is nice because it allows you to make technical decisions for yourself. Grab all the things from within your script tag and put it into the `App.js` file. Back in `index.html` add `src="./App.js"` to your now empty script tag; i.e. `<script src="./App.js"></script>`

Now we are going to create another component. Make this:

{% highlight javascript %}

const Pet = () => {
    return React.createElement("div", {}, [
        React.createElement("h1", {}, "Theodore"),
        React.createElement("h2", {}, "Cat"),
        React.createElement("h2", {}, "Tuxedo"),
    ]);
};

{% endhighlight %}

You can change the text of each element to reflect your pets information or just make something up. We've now created a new 'stamp', now we need to use it. Add three instances of `React.createElement(Pet)` to the `App` component, like this:

{% highlight javascript %}

const App = () => {
    return React.createElement(
        "div",
        {},
        [
            React.createElement("h1", {}, "Adopt Me!"),
            React.createElement(Pet),
            React.createElement(Pet),
            React.createElement(Pet)
        ]
    )
};

{% endhighlight %}

Now, if you refresh the index.html page in your browser, you should see 3 instances of your `Pet` component! This highlights the reusability of components, but in this case, the component is not at all flexible. Apparently, not all cats have the same name or are the same color, so lets make it a more flexible component.

### Passing in Component Props

Let's take another look at the `Pet` component and see if we can pass in some data to make it more flexible. Update all three instances where `Pet` is called in `App` to the following:

{% highlight javascript %}

//..
React.createElement(Pet, {
    name: "Theodore",
    animal: "Cat",
    breed: "Tuxedo"
}),
//..

{% endhighlight %}

Update the last two instances of `Pet` to have unique attributes (name, animal, breed). Now you have new information being passed into the `Pet` component, but now it needs to be put to use. Update the `Pet` component as follows:

{% highlight javascript %}

const Pet = props => {
    return React.createElement("div", {}, [
        React.createElement("h1", {}, props.name),
        React.createElement("h2", {}, props.animal),
        React.createElement("h2", {}, props.breed)
    ]);
};

{% endhighlight %}

Now all of the unique animal information will be used by the `Pet` component when it is called from within the `App` component!

### Destructuring Props

Writing `props.` over and over is going to become cumbersome as the app grows, so lets destructure the props. Update the `Pet` component like so:

{% highlight javascript %}

const Pet = ({ name, animal, breed }) => {
    return React.createElement("div", {}, [
        React.createElement("h1", {}, name),
        React.createElement("h2", {}, animal),
        React.createElement("h2", {}, breed)
    ]);
};

{% endhighlight %}

This concludes the first section, which is in fact what most of React is. If you were watching the video for this on Frontend Masters and fell behind, which you should not because you can pause it, you can skip to the first commit in the courses GitHub repository and be all caught up. Next, we are going to get some tooling set up to make React much easier to write, because the way we've done it so far is not the way. Don't worry, Brian knows the way. This introduction was to introduce the core concepts of what React is to you, the reader!

## Tools

### npm & Generating a package.json File

So far, we've been just straight up writing React. No one actually uses React like that, there is always some tool involved. Brian comes from front end infrastructure, so he is going to subject you to his madness, which is that you also need to understand the tools just like you understand the framework. Brian claims that he will keep it as *light* as possible and will give you his opinion about some of the better ways to write React.

The first tool we are going to look at is npm, which does not stand for Node Package Manager, but kind of does stand for Node Package Manager. npm will allow us to install node from the registry instead of grabbing it from a CDN, which is nice because we can then include it in our package instead of having to rely on whether or not unpkg is 'up'. unpkg is good for testing things out, but not reliable for production. So... open up your terminal, if you are using VS Code, you can press 'control+`' to open it. First thing, in the terminal, check if you have node installed by typing 'node -v'. If you do not, [check out these instructions for how to install node](https://nodejs.org/en/). As long as you have node 8 or greater, you should be fine to continue, if you do not...

Node comes with npm. Once you have node and npm, (still in the terminal) go into the root of your project directory and type `npm init` which will 'initiate' a new project for you. If you are lazy like Brian, instead of `npm init`, type `npm init -y` and you can skip over all of the questions that you would have been asked (otherwise there would have been an interactive prompt asking a bunch of questions about your project). You will now find a new file in your project directory, `package.json`.

Inside of the `package.json` file, you can find details about your project, but Brian doesn't care about what's in the file and he doesn't care if you care either. But any project dependencies will be tracked in the  `package.json` file, so anytime Brian says `npm install...`, a new dependency will be tracked in the `package.json` file.

### Prettier

The next tool we are going to look at, as you may have guessed by the title of this section, is 'Prettier'. It will help us maintain 'high-quality' code. In the terminal (it should still be open and in the root directory of your project, if not, make it...) type `npm i -D prettier` ( `i` is shorthand for 'install' and `-D` is for Developer, which means that this [prettier] will not 'ship' with your production app ). If you check the `package.json` file again, you will see prettier listed in the 'devDependencies'. At the time when this course was filmed, prettier 1.17.0 installed for Brian, and at the time these notes were written, prettier 2.2.1 installed, you, human from the future may get a newer version.

Prettier will help you to format the code of your project in a consistent manner. Prettier will remove the need to discuss tabs vs spaces, trailing commas, and all the nitpicky things that developers like Brian spend time talking about. Prettier aims to cease conversation about these trivial matters, get everyone on the same page, and unify the format(ting) of your code. Brian actually does not care what his code looks like as long as it is well formatted. Be like Brian.

Prettier, similar to the Dank Mono font that gives Brian monetary kickbacks, reduces cognitive load because you don't need to think about formatting your code, Prettier does it for you. Use it.

### npm Scripts

Inside of the `package.json` file, there is a 'scripts' section, initially with only a 'test' script. This section of the `package.json` file allows you to add 'scripts' to run your project. You can define new scripts by following the format of the 'test' script that is in that file, i.e. `"name": "do something"` (don't forget to add a comma at the end of the line unless it is the last one...). Make a new script to use prettier to format your code:

{% highlight json %}

"scripts": {
    "format": "prettier \"src/**/*.{js,html}\" --write",
    "test"...
}

{% endhighlight %}

The 'format' script from above will run prettier on any .js or .html file in any directory. This is a nice way to force team members to use your workflow. 

### Prettier Setup

Brian doesn't use Prettier in the above way, but as a VS Code extension which runs every time you hit save (Pro tip: make VS Code autosave). Install the 'Prettier - Code formatter' extension (if you are using VS Code). Once installed, go to your 'Settings' and search for 'format on save', check the box 'Editor: Format On Save', then search for 'require config' and check the box under 'Prettier: Require Config'. The 'require config' will make Prettier run only on projects that it is installed on (which is a good thing because we don't want Prettier to run on projects that it is not installed on so that it does not format all the code in a project that is not using it which would result in probably every file being changed which would be bad when you commit something and every file has changed when you maybe only worked in one file and then you will git blamed and that is not fun).

Now, the project currently has no configuration file for Prettier, so one should be made. In the root directory of your project, make a new file `.prettierrc`. Brian had no idea what the 'rc' at the end of the file name stands for, but a quick search looks like it stands for 'run commands', 'resource control', 'run control', or 'runtime configuration' ([see this stack overflow post for the deets](https://stackoverflow.com/questions/11030552/what-does-rc-mean-in-dot-files)). In your `.prettierrc` file, add an empty object `{}`. There are some things that you can configure, but Brian doesn't care, he just wants it to work. The empty object will just give you the default configuration for prettier. [Here's the Prettier configuration documentation](https://prettier.io/docs/en/configuration.html)

If you go back to one of your .js or .html files and ruin a bunch of formatting, then save the file, Prettier should fix the formatting for you. 

### ESLint Setup

Back in the terminal (yes, still in the root directory of your project) type `npm i -D eslint eslint-config-prettier`. This will install 2 things, ESLint, which is a code linter*, and the prettier config for ESLint which will let ESLint ignore the mechanical formatting things that Prettier does.

To verify that the 2 packages have installed, check the `package.json` file.

In the projects root directory, make a `.eslintrc.json` file.

Q: Why is there a `package-lock.json` file in my project folder?

A: The `package-lock.json` file 'locks' the versions of the dependencies for your project so that what you run locally is the same as what you run in production.

\* Code linters are concerned with code style as opposed to code formatting (prettier). Style includes; methods, accessibility, syntax, etc.

### ESLint Configuration

In the `.eslintrc.json` file, add the following:

{% highlight json %}

{
    "extends": ["eslint:recommended", "prettier", "prettier/react" ],
    "plugins": [],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    }
}

{% endhighlight %}

In the above, 'extends' is how you can extend the configuration of ESLint. 'eslint:recommended' is the bare-minimum set of recommended rules for ESLint, which Brian thinks everyone should be running all the time **and** he does not believe it to be a controversial opinion. Ok Brian. There are alternatives to 'recommended', i.e. standard or airbnb, which are much more opinionated. 'recommended' will catch bugs, but won't force you to write code in a specific way, which is a kind way to make sure that there are some standards in place without being overbearing. Then 'prettier' and 'prettier/react' tells ESLint to use prettier...

'plugins' is set but undefined for now, we will add to it later. The 'parserOptions' object sets the latest supported version of ecma, 2018 (which includes support for async/await), the 'sourceType' to module (because we are using import and export, i.e. ES Modules), and 'ecmaFeatures' 'jsx' to true (so that ESLint understands the jsx we are about to be writing).

Finally, the 'env' object is telling ESLint to allow ES6 syntax, 'browser' tells ESLint that `setTimeout`, `window, etc... are ok to use, and 'node' we will write later, so we don't want ESLint to choke on `http` and `require`.

The above ESLint configuration is Brian's base configuration, he likes it.

Now, open up your `package.json` file and add the following to your scripts:

{% highlight json %}

//..
"lint": "eslint \"src/**/*.{js,jsx}\" --quiet",
//..

{% endhighlight %}

The above will lint any files with the `.js` or `.jsx` extensions and `--quiet` will make ESLint... quiet. Right now if you were to run the `lint` script `npm run lint`, you would see a bunch of `error 'React' is not defined`, which is what is expected because ESLint does not know what React is, yet. Those errors will be fixed soon. Brian does not run the `lint` command often, but he does use the ESLint VS Code extension. If you install the ESLint VS Code extension, you will see the ESLint errors inside of your editor without having to run the `lint` script we just made for our project.

Brian then goes on to explain how awesome and useful ESLint is. Use it. Additionally, ESLint is very extendible, you (and Brian) can write custom ESLint rules. There are other tools out there that can lint your code; JSHint and JSLint were mentioned.

### gitignore

In your projects root directory, create a `.gitignore` file. The purpose of the `.gitignore` file is to let git know what files you would like to exclude from your project repository. Add the following to the `.gitignore` file:

{% highlight markdown %}

node_modules/
.DS_Store
.cache/
dist/
coverage/
.vscode/
.env

{% endhighlight %}

### Parcel

In a previous iteration of this workshop, Brian taught React v3 with Webpack. Webpack is cool, but he is now using Parcel because it is hands off, i.e. easier to use which makes it simpler for the purposes of this workshop. We will simply point Parcel at a file and there is no additional configuration required. With power comes complexity, so we (Brian) leave(s) Webpack out of this workshop now. In your terminal, type the following: `npm i -D parcel-bundler`.

It may take a while to install. Parcel, when installed, is super simple, just point it at your index.html file and it will do the rest. Once Parcel is installed, jump back to your `package.json` file and add another script:

{% highlight json %}

//...
"dev": "parcel src/index.html",
//...

{% endhighlight %}

If you run your new script, `npm run dev`, you will see that there is now a `.cache` and a `dist` directory. Those directories can be ignored for now and you should also see in the terminal that your app is being served at a local host address. Click it and open the browser to see your app being served by Parcel! Now, whenever you make changes to your files, Parcel will run and update your page.

### Installing React & ReactDom

Time to fix the ESLint `error 'React' is not defined` errors. In the terminal, stop the Parcel server by hitting `control+c`, then type `npm i react react-dom` which will install the 2 packages that we have been using from unpkg from the npm registry. In your projects `index.html` file, delete the following lines:

{% highlight html %}

<script src="https://unpkg.com/react@16.8.4/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16.8.4/umd/react-dom.development.js"></script>

{% endhighlight %}

In the `App.js` file, add:

{% highlight javascript %}

import React from 'react';
import { render } from 'react-dom';

{% endhighlight %}

The above will import the default export from the React package and 'render' from the React DOM package. Now at the bottom of the `App.js` file, delete `React.` from the last line. Brian encourages you to use the named exports, i.e. `import { render }...`, from packages you are using so that only the code you are using gets included. Run your dev script again, `npm run dev`, and you will find that your project still runs!

### Separate App into Modules

Now that we have a bundler, we can start to separate our `App.js` file into modules! Brian has no idea why you would ever have more than one component per file, so we will fix that. If you are using VS Code, highlight the `Pet` component in `App.js` and you should see a little 💡 appear. Click the 💡 and select the 'Move to a new file' option. VS Code will make a new file from the `Pet` component and add an import statement for it in `App.js`. It's pretty magical, and you can thank TypeScript, which VS Code is constantly running against your code even though this project is not using it.

Update the import statement in `App.js` to:

{% highlight javascript %}

import Pet from "./Pet";

{% endhighlight %}

And update `Pet.js` to:

{% highlight javascript %}

import React from "react";

export default function Pet({ name, animal, breed }) {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, name),
    React.createElement("h2", {}, animal),
    React.createElement("h2", {}, breed),
  ]);
};

{% endhighlight %}

Brian makes the above edits because it is a pattern he follows and he also claims that it is a fairly common pattern, but says that you can do whatever you want YMMV. With the above changes, your app should still be working as it was, but these changes will make everything easier to maintain.

## JSX

### Converting to JSX

So far, we've been writing React without any transpilation, but now we will start to work with JSX. Because we are using Parcel, we can now use JSX. Parcel will do transformations to our code using a project called Babel. Writing React as we've done so far has required us to think about what HTML we want then translate that to React / JavaScript. JSX will allow us to write something closer to HTML without having to think about how the HTML needs to be translated to React / JavaScript which will make our coding easier. Update `Pet.js` like so:

{% highlight javascript %}

import React from "react";

export default function Pet({ name, animal, breed }) {
    return (
    <div>
      <h1>{name}</h1>
      <h2>{animal}</h2>
      <h2>{breed}</h2>
    </div>
  );
}

{% endhighlight %}

The above code, at transpilation, will actually become what it once was `React.createElement...`, but this [JSX] is arguably much easier to write.

### Configuring ESLint for React

Now that we've started using JSX, ESLint is upset because `React.createElement...` no longer appears in the `Pet.js` file, even though once our code is transpiled by Parcel / Babel it will in fact be using `React.createElement...`. Let's fix this. Back in the terminal, in the root directory for your project, type: `npm install -D babel-eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react` (if the Parcel server is still running, hit `control+c`). All of these tools will allow ESLint to correctly understand React.

`babel-eslint` allows ESLint to be augmented by Babel, a transpiler.
`eslint-plugin-import` gives you some new rules around importing and exporting things, so you have some good habits...
`eslint-plugin-jsx-a11y` is a bunch of no-brainer things for accessibility, i.e. don't make divs clickable, this will help you catch the easy accessibility things you should be doing.
`eslint-plugin-react` will help with some additional React rules that we need.

Once those things are installed, go to the `.eslintrc.json` file and update it so it looks like this:

{% highlight json %}

{
    "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier",
        "prettier/react"
    ],
    "rules": {
        "react/prop-types": 0,
        "no-console": 1
    },
    "plugins": ["react", "import", "jsx-a11y"],
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}

{% endhighlight %}

The new 'extends' are sets of rules and the 'plugins' are new abilities for ESLint. The order of the 'extends' is not important, only that the two for prettier come at the end of the list. 'rules' set a couple of rules for things we want or not and ESLint requires information about the version of React you are using, so the 'settings' object is needed, in which we are telling ESLint to figure out what version of React we are using by itself (ESLint will figure it out from the `package.json` file). This ESLint configuration is what Brian uses for basically all of his React projects. Now that the ESLint config has been updated, ESLint will no longer complain about React being imported when you are writing your code in JSX (not explicitly calling `React.`).

### JSX Composite Components & Expressions

Now, let's update `App.js` to also use JSX. Open `App.js` and make it look like this:

{% highlight javascript %}

import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Pet name="Theodore" animal="Cat" breed="Tuxedo" />
      <Pet name="Kuma" animal="Dog" breed="Doberman" />
      <Pet name="Salvador" animal="Cat" breed="Fake Russian Blue" />
    </div>
  );
};

render(<App />, document.getElementById("root"));

{% endhighlight %}

In the above code, feel free to use whatever pet name, animal, and breed you like. 

## Hooks

### Creating a Search Component

According to 2019 Brian, hooks were considered a new feature to React. Guess I'm pretty late to the party 🎉. While hooks are optional to learn, Brian is going to learn us on em. Classes are also a need to know which we will get into later. If you are only here to learn hooks, [check out this 'Hooks In Depth' section from the 'Intermediate React, v2' course](https://btholt.github.io/complete-intro-to-react-v5/hooks-in-depth). Make a new component (in the `src` directory), `SearchParams.js` . In the `SearchParams.js` file, add this:

{% highlight javascript %}

import React from "react";

const SearchParams = () => {
  const location = "Seattle, WA";

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input id="location" value={location} placeholder="Location" />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;

{% endhighlight %}

The API that we are going to be using is restricted (by Brian) to Seattle, WA and San Francisco, CA, so use one of those. You'll notice that instead of `class` in the `div`, we are using `className`. This is due to the fact that `class` is used in JavaScript, so we have to use the DOM API version for declaring a class(Name) in JSX (similarly, you couldn't do something like `const let = "newLet";`, because `let` is a part of the JavaScript language and you cannot redeclare what it is). The rest of the markup should be familiar enough, the only real oddity being the `{location}`, which is grabbing the value that was assigned to the location variable in the above code.

Now that we've made the `SearchParams` component, update `App.js` to use it, like this:

{% highlight javascript %}

import React from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
    </div>
  );
};

render(<App />, document.getElementById("root"));

{% endhighlight %}

Check your page w/ the Parcel server, either open your browser if it's already running or open terminal and type `npm run dev` then open [your browser] to see the changes.

### Setting State with Hooks

While checking out the awesome changes you've made to your app, try to change the text in the input box. I'll wait. Couldn't change it? Congrats, you've broken the DOM. This was actually the same exact problem that many before you have run into when working with React, and the issue is, "why has something that used to be so simple to implement now been made so hard?". The issue is based in how React works, it goes something like this:

* React hits `App.js` which renders whatever components are in it, in this case `App.js` and `SearchParams.js`
* When you type even a single character into the `SearchParams.js` input field, a render is triggered
* React finds a `const location` and uses that value as it is assigned, to the input field

Two-way data binding is not automatic in React. Brian makes the case for this being a benefit in React, the fact that it is more verbose. While you do have to type more to achieve what may seem to be more simple in another framework, such as Angular, the end result is that your code is more explicit and readable. To fix the issue with not being able to type anything into the input field for the `SearchParams.js` component, update the `SearchParams.js` component like this:

{% highlight javascript %}

import React, { useState } from "react";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;

{% endhighlight %}

We're importing `useState` from React, updating the `const location` variable, and adding an `onChange` event with a wee little function to the input element (which takes an e(vent) and updates the input with the event.target.value). Now whenever something is typed in the input field, the `onChange` is triggered, which will then call `setLocation` to update `location` with whatever is in the input field. Check your page to verify that the change works. Here's how it works:

* Typing in the input field triggers a re-render, `SearchParams` re-renders
* `[location, setLocation]` location is the current state of location, setLocation is an 'updater' for that piece of state
* Every time the `onChange` event happens, `e` will represent the event which then calls `setLocation` with the value of what was typed in the input field
* The state is updated and when another re-render occurs, the 'state' of location will be whatever it has been updated to ("Seattle, WA" is the default state of the input field)

With that being said, you can see that there is going to be a fair amount of re-rendering happening with this component, so it is important to keep what you are updating fairly narrow in its scope, because your component function will be re-rendered (run again) whenever its state changes. This line is the hook:

{% highlight javascript %}

//...
const [location, setLocation] = useState("Seattle, WA");
//...

{% endhighlight %}

The important thing to note about hooks is that they all begin with 'use'. `useState`, `useEffect`, `useCallback`, `useMemo`, all hooks begin with 'use'. Hooks is how you get 'stateful logic' with React.

[check out the useState hook in the React docs](https://reactjs.org/docs/hooks-reference.html#usestate)

### Best Practices for Hooks

Hooks **never** go inside of `if` statements and they **never** go inside of `for` loops or anything like that. But why Brian? Basically, the way that hooks work is that they are keeping track of the order that you are creating hooks. So... **if** you put a hook inside of an `if` statement, the first time the condition may be true, so your hook would work, but what if on the second run of the `if` statement, the condition is not true? Your hook would not work. Don't do it. Brian will help us set up an ESLint rule to prevent us from being so dumb in a minute. BTW, this is also mentioned in the React docs and applies to all hooks, not just `useState`.

### Configuring ESLint for Hooks

Open up your console and type `npm i -D eslint-plugin-react-hooks`. This will install the official (ESLint) rules from the React team about writing hooks. Open up the `.eslintrc.json` file and add the following:

{% highlight json %}

"rules": {
    //...
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-depths": 1
},
"plugins": ["react", "import", "jsx-a11y", "react-hooks"],

{% endhighlight %}

`"react-hooks/exhaustive-depths": 1` will *force* you to do something that has to do with effects, Brian will talk about it later. The numbers in the rules stand for:

0 - turn off
1 - warn
2 - throw error

### Calling the Pet API

We need to install a new client library to make requests against an API. To do that, add the following line to the `SearchParams.js` file:

{% highlight javascript %}

import { ANIMALS } from '@frontendmasters/pet';

{% endhighlight %}

We've not installed that library, but Parcel will do it for us! If you feel more comfortable installing that package through the terminal, run `npm i @frontendmasters/pet`.

Still in `SearchParams.js` declare another `const` below the one for location:

{% highlight javascript %}

//...
const [animal, setAnimal] = useState("dog");

{% endhighlight %}

AND add this JSX (just below the `</label>` so we can use the const:

{% highlight javascript %}

//...
</label>
<label htmlFor="animal">
    Animal
    <select
        id="animal"
        value={animal}
        onChange={e => setAnimal(e.target.value)}
        onBlur={e => setAnimal(e.target.value)}>
        <option>All</option>
        {ANIMALS.map(animal => (<option value={animal}>{animal}</option>))}
    </select>
</label>
//...

{% endhighlight %}

That's a bunch of things! Due to A11y, if the `onBlur` were not a part of our `<select>`, A11y would complain that the `<select>` would not be accessible. The `{ANIMALS.map(animal => (<option value={animal}>{animal}</option>))}` will allow us to take the array of strings which comes from the API and convert them into an `<option>` for each element (string) that is in the array. If you check your browser, you should now see the new select menu with all the animal types, but there is an error...

### Unique List Item Keys

The error that you may have seen is React complaining that it needs a `key`. The `key` is an identifier that React uses to determine if something already existed or not. If a thing did not previously exist or has changed, then a re-render should trigger, but if the thing already existed and/or didn't actually change in any way, we don't necessarily want to trigger a re-render and the provision of a `key` is how we can prevent that from unnecessarily happening. Add a key to the `{ANIMALS.map...}` like so:

{% highlight javascript %}

//...
    {ANIMALS.map(animal => (<option key={animal} value={animal}>{animal}</option>))}
//...

{% endhighlight %}

The `key` does need to be a unique identifier, in the case of the pet API, we know that the type of each animal is unique, so using `{animal}` will work.

[Read more about keys in the official React documentation](https://reactjs.org/docs/lists-and-keys.html)

### Breed Dropdown

Now we're basically going to repeat what we just did, but for breeds. Add this below the `</label>` that we just made:

{% highlight javascript %}

//...
<label htmlFor="breed">
    Breed
    <select 
        id="breed"
        value={breed}
        onChange={e => setBreed(e.target.value)}
        onBlur={e => setBreed(e.target.value)}
        disabled={!breeds.length}
        >
        <option>All</option>
        {breeds.map(breedString => (
            <option key={breedString} value="{breedString}">{breedString}</option>
            ))}
        </select>
</label>
//...

{% endhighlight %}

And add these 2 `const` variables just after the others in `SearchParams.js`:

{% highlight javascript %}

//...
const [breed, setBreed] = useState("");
const [breeds, setBreeds] = useState([]);
//...

{% endhighlight %}

We'll get this wired up with a custom hook next.

### Custom Hooks

So far, the `htmlFor...` 'animal' and 'breed' are quite similar. Brian thinks it would be nice if there was some way to make them a reusable something for them. Let's do that! Make a new file `useDropdown.js` and drop in the following code:

{% highlight javascript %}

import React, { useState } from "react";

const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const Dropdown = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={state}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
        disabled={options.length === 0}
      >
        <option>All</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState];
};

export default useDropdown;

{% endhighlight %}

Ok... Let's try to walk through that. `import React...` we've seen. Every 'component' has to have that line, we're also grabbing the `{ useState }` function hook. `const Dropdown`, that's the component declaration, with 3 parameters being passed in; `label`, `defaultState`, `options`. `const [state, setState]...` is the same pattern that was initially set up for the 'animal' and 'breed' drop downs, but abstracted here. `const id...` is establishing a unique 'id' that can be used for the `htmlFor` and `<select>` 'id(s)' and removing any spaces, then converting the entire string to lowercase (`.toLowerCase()`). `const Dropdown...` is effectively the Class that we are going to (re)use to make this drop down component flexible enough to be used with different data sets. The structure of it is just like the 'animal' and 'breed' drop downs we've already created. `return...` will 'return' an array containing; 'state', the 'Dropdown' Class, and 'setState'. Finally, `useDropdown` is exported so we can then import it in another component file.

If you have any questions about that... drop me a line.

Now we can update the `SearchParams.js` component to use our fancy new custom hook! Open `SearchParams.js` and get it updated to look like this:

{% highlight javascript %}

import React, { useState } from "react";
import { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown] = useDropdown("Breed", "", breeds);

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;

{% endhighlight %}

Yeah! First is the new `import` statement for the `useDropdown.js` component we just made. Need that. Then, the `const(s)` have been updated to use the new hook; `useDropdown`. You can see we are passing in the 'label', 'defaultState', and the 'options' as defined inn `useDropdown.js`. Finally, we can get rid of all the 'animal' and 'breed' `<label>...</label>` JSX and replace it with `<AnimalDropdwn />` and `<BreedDropdown />` respectively. Refresh your browser and while nothing (visually) has changed, we are now using a custom hook!

This pattern is quite useful for testing and helps us to be D.R.Y. Brians favorite!

## Effects

### Effects

Now we are going to start reading live data from an API. The data will be coming from PetFinder, which is one of the easiest ways to find pets to adopt. Let's look at how to handle asynchronous code with React. The API is still restricted to 'Seattle, WA' and 'San Francisco, CA' because Brian / Frontend Masters only has one API key and they don't want to hammer the API with requests and get restricted. Open up `SearchParams.js` and update the file like this:

{% highlight javascript %}

import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown] = useDropdown("Breed", "", breeds);

  useEffect(() => {
    pet.breeds("dog").then(console.log, console.error);
  });

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;

{% endhighlight %}

We've updated the `import { ANIMALS }...` statement to include the `pet` object, and the `import React...` statement to also import `useEffect`. `useEffect` takes place of several lifecycle hooks, including; `componentDidMount`, `componentWillUnmount`, and `componentDidUpdate`. Let's look at this line in a bit more depth:

{% highlight javascript %}

//...
useEffect(() => {
    pet.breeds("dog").then(console.log, console.error);
});
//...

{% endhighlight %}

In effect, `useEffect` is 'scheduling' an event, in this case a function, to run after the (component) render happens. The `SearchParams.js` component will render before the `useEffect` function is run. But why Brian? Why would we want to do this? Using `useEffect` for asynchronous code will help to not slow the render down, so the user can see something immediately. If you refresh your page and check the console, you should be able to see the breeds returned from the API. Now we can set `setBreeds` to be all the various breeds of dogs that we have received from the API! Update the `useEffect` to this:

{% highlight javascript %}

//...
useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
        const breedStrings = breeds.map(({ name }) => name);
        setBreeds(breedStrings);
    }, console.error);
});
//...

{% endhighlight %}

Now, whenever `useEffect` is triggered, we'll clear out the 'breeds' array to an empty one, and reset the 'breed' string to an empty string, then set breeds to the strings of the breed names by using `.map`. 

### Declaring Effect Dependencies

With `useEffect`, you have to declare your dependencies. Currently, without any dependencies listed, `useEffect` will run every time something is typed into the input field. We do not want this, it is too frequent. Update the `useEffect` in `SearchParams.js` to this:

{% highlight javascript %}

//...
useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
        const breedStrings = breeds.map(({ name }) => name);
        setBreeds(breedStrings);
    }, console.error);
}, [animal, setBreed, setBreeds]);
//...

{% endhighlight %}

The array `[animal, setBreed, setBreeds]` at the end of the `useEffect` will be the conditions that are checked against to determine whether or not `useEffect` needs to run again and trigger a render. If something that is not defined within the array of dependencies changes (location?), `useEffect` will not run. If you refresh your browser, you can see that typing in the input field will no longer cause React to retrieve breeds, only when you change the animal 'type' (dog, cat, etc.) will the `useEffect` get triggered to retrieve the breeds associated with the supplied animal. 

### Effect Lifecycle Walkthrough

There has been a lot of things happening since we've started to use `useEffect`. Let's walk though exactly what is happening with that.

In `SearchParams.js`, first we declare the component `SearchParams`, then set state for a number of hooks (location, breeds, animal, breed). The `useEffect` is 'scheduled', but not triggered on the initial render of the `SearchParams` component. Then, all of the markup is going to be `return`ed, which is then rendered to the DOM for the user to 👀. Then, the `useEffect` can be run. `useEffect` will `setBreeds` to an empty array, `setBreed` to an empty string, and will then hit the API to get the `breedStrings`.

Now, if you update the location in the input field, will `useEffect` run again? Nope, because we have defined the dependencies for `useEffect` and location is not one of them, a re-render / re-run of `useEffect` will not be triggered. If you then change the animal, to say 'cat', `useEffect` will be triggered. It will call the API and get the breeds for 'cat' back and `setBreeds` to be an array of strings of breeds.

### Run Only Once

What happens if you only want the `useEffect` to run when the component mounts and then never run again? Just give the `useEffect` and empty array `[]` as its dependencies and it will run once and never again. An example use case could be when you need to do something once and not again, say when you are setting up D3.js. If you remove the `, []`, you will trigger an infinite loop which will endlessly call the API. Do not do that, Brian pays for access to the API and, even with all of his kickbacks, is not made of money.

### Hooks Review and Q&A

Q: Why is `breeds` not a dependency of `useEffect`?

A: Because the `breeds` in the `useEffect` is not the same as the `breeds` defined in the const above it. The `breeds` in `useEffect` could be renamed to remove confusion.

Q: Was there any problem with the `componentDidMount` or `componentDidUnmount` lifecycle methods, why did hooks get created?

A: There is a belief that hooks are simpler than having to learn the lifecycle of components and having to understand context and such. But Brian has his doubts about which is better, we will look more closely at this when we look at Class. But the short answer is that people think hooks are easier.

`useState` and `useEffect` are the most commonly used hooks and will constitute about 90% of your use of hooks. `useRef` also on occasion. There are many other hooks that you may never have to know which are covered in the Intermediate React workshop.

## Dev Tools

### Environment Variables & Strict Mode

It is important to note that you need to set `NODE_ENV` to `development` or `production` depending on which environment you are building for. Parcel will handle that for you, but Webpack requires you to be more explicit and actually set it. When you are in development mode, React will provide more descriptive errors and help you along the way. In production mode, React drops all the debugging code, making your application smaller and faster. Slack famously messed this up and were shipping the dev environment / code for a long time 🤣.

You can wrap your entire application in `<React.StrictMode></React.StrictMode>` which will give you additional warnings about things you shouldn't be doing. It will 'future proof' your application in the sense that when features of React are being deprecated, you will receive warnings for those features if they are being used. `React.StrictMode` doesn't render anything or add any additional code, so this is fine to keep even when you are shipping your application(s).

### React Browser Dev Tools

Do yourself a favor and get React Dev Tools for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) or [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en). Brian has them and so shall you. All the other browsers didn't have React Dev Tools in 2019. Maybe you, reader from the future, may have better luck.

The tool is useful in that you can inspect the React DOM of your application, something that you cannot do with the normal browser inspect tool. Cool thing:

In both the standard browser and React inspector tools, if you highlight a DOM element, then switch to the console, you can type `$0` or `$r` respectively to manipulate the currently highlighted DOM element.

## Async & Routing

### Asynchronous API Requests

Our app currently has all the search facets that we will need to search for pets, but we are not actually using that to hit the API yet, so let's set that up! Open up `SearchParams.js` and update it to look include this code:

{% highlight javascript %}

// inside of SearchParams after the other const declarations
const [pets, setPets] = useState([]);

async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

// replace <form> with this
<form
    onSubmit={(e) => {
        e.preventDefault();
        requestPets();
    }}
>

{% endhighlight %}

In the above code, we've already seen and learned about the `const` and `useState`. `async` is new, so let's look at that. The `const { animals }` inside of `requestPets()` will only be set once the `await` resolves. If `await` returns nothing, `setPets` will be set to an empty array `[]`. Then the `<form>` element is updated to call the `requestPets` function on submit. Because we don't want to trigger the default behavior of the submit button, we also add `e.preventDefault();`.

Then Brian says that we should update the `package.json` file with browsers that we would like Parcel to target, [here is the information about that in the course notes](https://btholt.github.io/complete-intro-to-react-v5/async)... and it looks like you actually need to do that, otherwise Parcel will break the `async / await` 🤬. Add this to `package.json` (anywhere is fine, I put mine at the bottom of the file):

{% highlight json %}

,
  "browserslist": ["last 2 Chrome versions"]

{% endhighlight %}

Now Parcel won't break the `async / await` and if you check the 'Network' tab in your browsers Developer Tools, you should be able to select an animal, a breed, and click 'Submit' and see that the network request to the API occurs. Amazing.

### Using the Fallback Mock API

I am not going to do this Brian. If you, the reader of these notes, are interested, you can check out [this section of Brian's notes](https://btholt.github.io/complete-intro-to-react-v5/effects). The specific section that he goes over starts at:

"Since this Petfinder is a real service and we don't want to hammer their API, we've built a client that heavily caches responses and limits your..."

Apparently you can do this entire workshop offline.

### One-Way Data Flow

If you've got this far, we're now receiving results from the API. Let's get them to display! Add this to `SearchParams.js`:

{% highlight javascript %}

// after import pet, ...
import Results from "./Results";

// after </form>
<Results pets={pets} />

{% endhighlight %}

But I don't have a `Results.js` component yet! Ok... make a `Results.js` file inside of `src` and add this to it:

{% highlight javascript %}

import React from "react";
import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {pets.length === 0 ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.type}
            key={pet.id}
            name={pet.name}
            breed={pet.breeds.primary}
            media={pet.photos}
            location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;

{% endhighlight %}

Once you have the above code, you should now be able to refresh your browser, select something about an animal and breed, hit Submit and see some results. We're using a component that we created early on, `Pet.js`, to display the data and setting up a bunch of attributes on that component from within `Results.js` such as, animal, key, name, breed, etc... We will refactor the `Pet.js` component in a moment to use the additional attributes.

### Reformatting the Pet Component

Open up `Pet.js` and replace the code with this:

{% highlight javascript %}

import React from "react";

export default function Pet({ name, animal, breed, media, location, id }) {
  let hero = "http://placecorgi.com/300/300";
  if (media.length) {
    hero = media[0].small;
  }
  return (
    <a href={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </a>
  );
}

{% endhighlight %}

`Pet.js` will now use those additional attributes that were set up in the `Results.js` component. First, if there is no image, the `let hero=...` statement will provide a default image from Brians favorite image placeholder site, otherwise, if there is an image, the small image for the pet will be used. Then in the `return` statement, the JSX has been updated to use all of the additional attributes / data that we will receive from any given result. First wrapping everything in an `<a>` tag (which we will set up in a moment) and then a couple of divs which use the remaining information that we will receive for any given pet. Check out the result in your browser and see if you
can spot the (default) corgi images.

### Reach Router

There's React Router, Navi Router, and Reach Router. Reach Router is Brian's fave because it handles a lot of the accessibility things for you. Make your life easier, use Reach Router™️. We are now going to implement Reach Router, but Brian also would like you to know that just because *we* are going to make a Single Page Application does not mean that **every** app needs to be one. Think about the ideal set up for your application, don't always make a Single Page Application because not every application should be one. Brian always takes the fun out of everything 😞.

Make a new file in the `src` directory, `Details.js`. In that file add:

{% highlight javascript %}

import React from 'react';

const Details = () => {
    return <h1>hello</h1>;
};

export default Details;

{% endhighlight %}

Put whatever you like in the `<h1>`, we'll be replacing that with other stuff eventually. Have some fun! Just kidding... instead of having fun, install Reach Router. You can add this to the top of your `App.js` file and have Parcel do it for you `import { Router } from "@reach/router";` **or** you can use the terminal and type `npm i @reach/router` if you don't trust Parcel ✋. Once you have Reach Router installed, update `App.js` so that it looks like this:

{% highlight javascript %}

import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <Router>
        <SearchParams path="/" />
        <Details path="/details/:id" />
      </Router>
    </div>
  );
};

render(<App />, document.getElementById("root"));

{% endhighlight %}

You tell me what any of that is... Ok fine, I'll tell you. There's 2 new `import` statements, one for Reach Router, one for the `Details.js` file we **just** created. Then in the `App` `return` statement, the JSX is updated to use Reach Router by wrapping the `SearchParams` and `Details` in a `Router`. Note that both `SearchParams` and `Details` also have `path="..."`, these will be the actual routes that we will hit, so `SearchParams` will live at the root of our application and the `Details` 'pages' will live at `/details/:id` where `:id` will depend on the 'id' of the pet (which is included in the updates we made to the `Pet.js` component). Boom! Refresh your page and watch the magic, or rather, do the things to get a list of pets to display, then click one, or alternatively add `/details/1` (or whatever number you feel like typing) to the end of the URL in your browser and you should see the `Details.js` component appear!

### Debugging & Reach Router Link

Back in `Details.js`, let's look at what 'props' our component is getting. Update the file like this:

{% highlight javascript %}

import React from "react";

const Details = props => {
  return (
      <pre>
          <code>{JSON.stringify(props, null, 4)}</code>
      </pre>
  );
};

export default Details;

{% endhighlight %}

`JSON.stingify` is going to take the `props` and render them on the page in a 'Pretty Printed' kind of way. If you go to a details page, you will be able to see all of the things that are coming from the (Reach) router. You should see something like this:

{% highlight json %}

{
    "path": "/details/:id",
    "id": "41569882",
    "uri": "/details/41569882",
    "location": {
        "pathname": "/details/41569882",
        "search": "",
        "hash": "",
        "href": "http://localhost:1234/details/41569882",
        "origin": "http://localhost:1234",
        "protocol": "http:",
        "host": "localhost:1234",
        "hostname": "localhost",
        "port": "1234",
        "state": null,
        "key": "initial"
    }
}

{% endhighlight %}

The above is also a nice technique to use with 'state' to be able to see (in the DOM) how state changes over time. You can also just use React Dev Tools. Now that you've seen that little gem, let's make the 'Adopt Me!' logo take us back to the home page when it's clicked! To do that, we'll use React Router's `<Link>` tag. Update `App.js` so that it looks like this:

{% highlight javascript %}

import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";

const App = () => {
  return (
    <div>
      <header>
        <Link to="/">Adopt Me!</Link>
      </header>
      <Router>
        <SearchParams path="/" />
        <Details path="/details/:id" />
      </Router>
    </div>
  );
};

render(<App />, document.getElementById("root"));

{% endhighlight %}

We've added an additional import to Reach Router; `Link` and have replaced the `<h1>` with the `<header>` element and all the things inside of it. Now your 'Adopt Me!' logo will take you back to the home page! That's the bulk of what we will directly learn about Reach Router, but Brian may sprinkle some more in throughout the rest of the course.

## Class Components

### Class Components

So far, all we've covered is hooks. How to do state with hooks, which used to be called stateless functional components, now called function components, meaning a function that is not a Class. Brian will now show the *other way*  of making components, which is... Class components. Class components function similarly to stateless functional components, but in some ways they function differently. Let's update `Details.js` to be a Class component. Update `Details.js` like this:

{% highlight javascript %}

import React from "react";
import pet from "@frontendmasters/pet";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }
  render() {
      return;
  }
}

export default Details;

{% endhighlight %}

🤦🏻‍♂️ Brian, you have given me a lot to explain...

Top to bottom:

Added an `import` statement for the `pet` API.

Made a `class`, `Details`, which extends `React.Component`. This will give us access to a bunch of useful things that `React.Component` has.

Added a `constructor` inside of `Details`. This is what allows the `Details` component to have state for itself, which no other component can touch. Parents pass props to children that the children cannot change. Children cannot pass props to their parents.

`componentDidMount()` this is one of the things we get from `React.Component`. It is a lifecycle method and will only run once, when the component mounted. Hooks gave us `useState`, but we cannot use any hooks in a Class component (not sure why I keep capitalizing Class...). So, `componentDidMount()`... [Here's a list of React's lifecycle methods, starting with componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount). Inside of this lifecycle method we are going to hit the `pet` API and update state with the result.`setState` is a 'shallow merge' meaning any top-level properties in the state will be overwritten if they exist, other non-duplicate properties will remain untouched, and nested objects will not be included. Keep your state flat like Florida. Throw a lazy `console.error` in there and we're good to go.

The only thing we didn't do was **actually** render this component. Hang tight, we will do that next.

### Rendering the Component

Let's update the `render()` for `Details.js`. Make the `render()` inside of `Details.js` look like this:

{% highlight javascript %}

//...
render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }
    const { animal, breed, location, description, name } = this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
//...

{% endhighlight %}

Walking through the updated render, if `loading` is `true`, which it will be on page load until the detail data about a pet is returned, show 'loading ...'. You can try this out by going to a (detail) page that is not real; i.e. /details/1 should work. Then Brian destructures state to make the 'calling' of the parts of state he will work with easier / less verbose to access (I also like this approach). The rest of the JSX should be familiar at this point, we're just building out the thing to show the stuff. Go to the home page of your application, search for some animals, click one to get to its detail page and see the result!

Classes are how React was (originally) built (before hooks), and while they may appear to be a more difficult way of writing React, there are currently no plans to deprecate them.

### Configuring Babel for Parcel

It would be a bit simpler if instead of this:

{% highlight javascript %}

constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

{% endhighlight %}

We could write this:

{% highlight javascript %}

state = { loading: true };

{% endhighlight %}

The second way, as of 2018?, ~~was a proposal~~ for JavaScript and ~~isn't actually a~~ **is a** thing (yet), but with Babel we can make it work! So if you are in 2018 and reading these notes follow along, otherwise skip to the next section!

Open your console and type (or just copy / paste) this: `npm install -D babel-eslint @babel/core @babel/preset-env @babel/plugin-proposal-class-properties @babel/preset-react`.

WHAT?! All of this stuff is built into Parcel which has been handling this for us. But we have custom needs, so installing all these things will allow us to use a custom config instead of Parcel's. In the root of the project, make a new file, `.babelrc`. Then drop this into that file:

{% highlight json %}

{
    "presets": [ "@babel/preset-react", "@babel/preset-env" ],
    "plugins": [ "@babel/plugin-proposal-class-properties" ]
}

{% endhighlight %}

`@babel/preset-react` provides all the things we need to transpile React; JSX and Flow (which is not something that we are using, but it is included).

`@babel/preset-env` will transpile your code for the environment that you specify, which we've already done in `package.json` (browserslist). `@babel/preset-env` can also take an export from your Google Analytics which it will then use to transpile your code so that it functions for 99% of your users 🔥.

`@babel/plugin-proposal-class-properties` allows you to use the syntax that started us on this journey. Again, this syntax should already be usable for you by now.

Finally, add this line to your `.eslintrc.json` file:

{% highlight json %}

//...
"parser": "babel-eslint",
//...

{% endhighlight %}

This will allow Babel to understand the new syntax that we are trying to use. Now you can use that new syntax that you could already use.

### Creating an Image Carousel

Make a new file in the `src` directory called `Carousel.js` because we want to make a happy little carousel for the people to be able to see the various different pictures of the animals. Add this to `Carousel.js`:

{% highlight javascript %}

import React from "react";

class Carousel extends React.Component {
    state = {
        photos: [],
        active: 0
    };
    static getDerivedStateFromProps({ media }) {
        let photos = ['http://plaacecorgi.com/600/600'];

        if (media.length) {
            photos = media.map(({ large }) => large);
        }

        return { photos };
    }

    render() {
        const { photos, active } = this.state;

        return (
            <div className="carousel">
                <img src={photos[active]} alt="animal" />
                <div className="carousel-smaller">
                    {photos.map((photo, index) => (
                        <img
                        key={photo}
                        onClick={this.handleIndexClick}
                        data-index={index}
                        src={photo}
                        className={index === active ? "active" : ""}
                        alt="animal thumbnail"
                    ))}
                </div>
            </div>
        )
    }
}

export default Carousel;

{% endhighlight %}

Another Class component! Now that we are in the future and can use the `state = {};` syntax, our component is a bit cleaner! Let's break down the new bits:

`static getDerivedStateFromProps` - This will allow our component to access its parent props and use them for something, in this case we are capturing the `media` and updating the `photo` property in our components state, then returning that from `getDerivedStateFromProps` so that the carousel component can use em. [Here's React's documentation on getDerivedStateFromProps which is way better than my explanation](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)

The rest of the carousel component set up is JSX, the only part left unhandled is the `onClick` event. Please hold.

### Context

Still inside of `Carousel.js`, add this:

{% highlight javascript %}

handleIndexClick = event => {
    this.setState({
        active: +event.target.dataset.index
    });
};

{% endhighlight %}

That will be the event that gets triggered when an image is clicked. It is important to note that we are using an arrow function here so that `this` is bound to the context of the Carousel class that it is in. Brian recommends:

> Whenever you are writing an event listener, use an arrow function. Your `this` will be correct.

### Index Click Q&A

Q: Could you explain the `+` in front of `event.target...`?

A: The `+` there is to turn the string that is returned from `event.target.dataset.index` into a number. It is called the unary plus operator. [See MDN for more information about the unary plus operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus). Another approach to this event handler could look like this:

{% highlight javascript %}

//...
handleIndexClick = (index) => {
    this.setState({
        active: index
    })
}
//...
onClick={this.handleIndexClick.bind(this, index)}
//...

{% endhighlight %}

Why we didn't go straight to that method is because `bind` used to be very 'expensive' to use. It used to be one of the slowest things you could do in Chrome. It has been fixed, but in old browsers, using the above example is really slow, so the best recommended practice is to not do it that way.

### Carousel Implementation

Open up `Details.js` and add this:

{% highlight javascript %}

//...
import Carousel from "./Carousel";
//... add media
const { animal, breed, location, description, name, media } = this.state;
//... place this just inside of the <div className="details">
<Carousel media={media} />
//...

{% endhighlight %}

In `Details.js` we've imported the Carousel component, added `media` to our state, and finally added the Carousel component to the render. If you refresh or load a details page, you should be able to see all of the images for any given pet, displayed in a carousel-like format. Here's the entire `Details.js` file in case something is not working:

{% capture summary %}Click to view the current state of `Details.js`{% endcapture %}
{% capture details %}  
{% highlight javascript %}

import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";

class Details extends React.Component {
  state = { loading: true };
  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }
  render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }
    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;

{% endhighlight %}
{% endcapture %}{% include details.html %}

## Error Boundaries

### Error Boundaries

Error boundaries is one of the things that hooks cannot do, you cannot do error boundaries without using classes. This is especially critical in React applications where we are using state, let's have a look at how to make it. Make a new file `ErrorBoundary.js`. This is mostly code from the React documentation. Thanks Brian... Make your `ErrorBoundary.js` file like this:

{% highlight javascript %}

import React, { Component } from "react";
import { Link } from "@reach/router";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to go back to the home page or wait five seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

{% endhighlight %}

Here's an attempt to explain what is happening above. `import` React and Component from React, `import` Link from React Router. Make a class component called ErrorBoundary and give it some state, `hasError`, set to false. Set up `getDerivedStateFromError` to update `hasError` to true if an error exists. Then if there is an error `this.state.hasError`, render some text with a link back to the home page, otherwise, render the children.

### Error Boundary Middleware

The first component that we want to wrap with `ErrorBoundary.js` is the Details component. In `Details.js`, first import `ErrorBoundary`: `import ErrorBoundary from "./ErrorBoundary";`, then update the export statement at the bottom of `Details.js` to this:

{% highlight javascript %}

export default function DetailsWithErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    )
}

{% endhighlight %}

Now when your application has an error, you *should* see the `<h1>` from the ErrorBoundary component render on the page. Doesn't work for me (when there is an API error), so I clearly did something wrong 😩. But I was able to update the error handling like this:

{% capture summary %}Click to view the updated error handling I came up with for `Details.js`{% endcapture %}
{% capture details %}  
{% highlight javascript %}

import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  componentDidMount() {
    pet
      .animal(this.props.id)
      .then(({ animal }) => {
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      })
      // this catch helped to set a new property to state which the
      // ErrorBoundary component can then use when a render is triggered
      .catch((e) => {
        this.setState({
          hasError: true,
        });
      });
  }
  render() {
      // added && !this.state.hasError which is initially unset,
      // so you will see loading ...
      // when the catch statement fails, hasError will then exist
      // which negates the statement and loads the ErrorBoundary component
    if (this.state.loading && !this.state.hasError) {
      return <h1>loading ...</h1>;
    }
    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

### 404 Page Redirect

Let's update the `ErrorBoundary.js` file with ~~`componentWillUpdate`~~ (deprecated) `componentDidUpdate` which will run every time the component receives new state or props. Update `ErrorBoundary.js` so that it looks like this:

{% highlight javascript %}

import React, { Component } from "react";
import { Link, Redirect, navigate } from "@reach/router";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true, redirect: false };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => navigate("/"), 5000);
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to go back to the home page or wait five seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

{% endhighlight %}

We added some imports to the React Router, `Redirect` (not needed if using `navigate`) and `navigate`. I could not get the Redirect to work by using `setState`, but it did work fine using `navigate`. The Redirect with `setState` looks like this:

{% highlight javascript %}

componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
//...
render() {
if (this.state.redirect) {
      return <Redirect to="/" />;
    }
//...

{% endhighlight %}

### Lifecycle Methods & Error Boundary Q&A

Q: Can you talk a bit about the `componentDidUpdate` lifecycle method?

A: `componentDidUpdate` is going to get called when state or props change, similar to `useEffect`.

Q: Could you talk more about `getDerivedStateFromError`? How does that get called, how does React know to run that function?

A: `getDerivedStateFromError` gets called whenever there is an error... Because it is a static method, it can call it on the class and not on the instance.

Q: If there's an error in production that has not been handled, what does React do?

A: It unmounts and takes the entire thing (component) out of the DOM.

Q: Can Error Boundaries be used with functional hooks?

A: No, because `getDerivedStateFromError` has no equivalent with a hook.

## Context

### React Context

Sometimes you have global application state, an example of which would be user login information. As you navigate from route to route, each view is going to use that data. So far, we've not really seen how to do this, but we could pass props from parent to child to child to child until the component that requires those props has them. This is kind of an annoying pattern, enter context. Previously, this level of state management has been handled with Redux, [check out the Redux docs here](https://redux.js.org/). Redux is hard, and often overkill for basic applications. Again, enter context... [Read the Context docs here](https://reactjs.org/docs/context.html). Let's actually see how to work with Context. Make a new file, `ThemeContext.js` and drop in the following code (you can pick your favorite CSS color, I chose `lawngreen`):

{% highlight javascript %}

import { createContext } from "react";

const ThemeContext = createContext(["lawngreen", () => {}]);

export default ThemeContext;

{% endhighlight %}

`createContext` has a hook-like structure to it, [read more about `createContext` in the React docs](https://reactjs.org/docs/context.html#reactcreatecontext). Let's use this now, inside of `App.js` import `ThemeContext` and update `App.js` like so:

{% highlight javascript %}

import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const themeHook = useState("orange");
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));

{% endhighlight %}

In addition to importing `ThemeContext.js`, we've also made a new `setState` hook for it (and added that to the import statement from react). Then, we've created the `themeHook` variable which instead of an array with specified values, we are just using the entire array, whatever its contents may be. Finally, we've wrapped all of `App` with `<ThemeContext.Provider value={themeHook}>...</ThemeContext.Provider>`. This will allow all of `App` to have access to the state from `ThemeContext`.

### Context with Hooks

Now, let's actually use the `ThemeContext`. Open up `SearchParams.js` and update it to look like this:

{% highlight javascript %}

import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";
import ThemeContext from "./ThemeContext";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button style={ { backgroundColor: theme } }>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

{% endhighlight %}

What changed? We added `useContext` to the React imports, imported `ThemeContext`, added a new variable; `const [theme] = useContext(ThemeContext);`, and updated the button to use the new variable with an inline style declaration. This is pretty powerful behavior and much easier than having to pass props down to child components! If you have React Dev Tools installed, you can check out all the things that Reach Router is doing to our application and notice that they use a ton of Context throughout the implementation of their router. BTW, in case you were wondering, `useContext` is a hook!

[Read more about the `useContext` hook here in the React docs](https://reactjs.org/docs/hooks-reference.html#usecontext)

Q: To use the `useContext` hook, the Provider has to be a parent?

A: Yep.

### Context with Classes

Let's try out our `ThemeContext` in `Details.js`. Open up `Details.js`. But wait... `Details` is a class and we can't use hooks with classes 😞. Anyway, import `ThemeContext` in `Details`: `import ThemeContext from "./ThemeContext";` and update the button like this:

{% highlight javascript %}

<ThemeContext.Consumer>
    {(themeHook) => (
        <button style={ { backgroundColor: themeHook[0] } }>
        Adopt {name}
        </button>
    )}
</ThemeContext.Consumer>

{% endhighlight %}

Keep in mind that any function that returns markup is a React component. So in the above code, we're essentially just creating a small component inside of the `<ThemeContext.Consumer>...</ThemeContext.Consumer>`. `themeHook[0]` might seem weird, so we can destructure that like this:

{% highlight javascript %}

<ThemeContext.Consumer>
    {([theme]) => (
        <button style={ { backgroundColor: theme } }>
        Adopt {name}
        </button>
    )}
</ThemeContext.Consumer>

{% endhighlight %}

Now if you need to change the color of your button elements, you can update the state in `App.js` and see the changes reflected in your application!

Q: How can you pass multiple parameters to `useContext`?

A: Use an object! Something like this:

{% highlight javascript %}

const themeHook = useState({
    buttonColor: "orange",
    linkColor: "yellow"
});

{% endhighlight %}

Then when you need to grab one of the color options from `theme`, instead of just using `theme`, you would use `theme.buttonColor`.

### Persisting State with Context Hooks

We've seen how to implement a theme, but how can we update it?! Open `SearchParams.js`. We're going to make another dropdown. Add `setTheme` to the `const [theme]` array: `const [theme, setTheme] = useContext(ThemeContext);`. Underneath the `<BreedDropdown />` add this:

{% highlight javascript %}

<label htmlFor="theme">
    Theme
    <select
    value={theme}
    onChange={(e) => setTheme(e.target.value)}
    onBlur={(e) => setTheme(e.target.value)}
    >
    <option value="lawngreen">Lawn Green</option>
    <option value="rebeccapurple">Rebecca Purple</option>
    <option value="chartreuse">Chartreuse</option>
    <option value="aqua">Aqua</option>
    </select>
</label>

{% endhighlight %}

Check out the result in your browser. The home page should have a new dropdown with the options that we just added. If you change the theme and then search for pets, click a pet to go to its detail page, you will see that the theme setting does not persist. The problem is in `Pet.js`, we never updated the link to the pets detail page to use Reach Router. So... update `Pet.js` so that it looks like this:

{% highlight javascript %}

import React from "react";
import { Link } from "@reach/router";

export default function Pet({ name, animal, breed, media, location, id }) {
  let hero = "http://placecorgi.com/300/300";
  if (media.length) {
    hero = media[0].small;
  }
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
}

{% endhighlight %}

We added a new import of `Link` from Reach Router and updated the `<a href...>` to `<Link to...>`. Now try to set the theme and navigate to a pet detail page. The theme state should persist. 

## Portals

### Modal Dialog with Portals

Time to make a modal! Because it might be nice, in the case of this application we've been building, to make sure that when someone clicks 'Adopt ${pet.name}' that they actually do in fact want to do that before they continue. Open up the `src/index.html` file and add this:

{% highlight html %}

//...
<body>
    <div id="modal"></div>
//...

{% endhighlight %}

Now, make a new file `Modal.js` and add this:

{% highlight javascript %}

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;

{% endhighlight %}

Brian does not explain a lot of the first few lines of the above code, but we have a couple of imports for things that are being used in the component. Then, the component itself, `Modal`, which gets `children` passed in. `useRef` will allow us to 'clean up' the 'garbage' (Modal) that we will be creating in the DOM. If we did not clean up the markup after closing the modal, we would just keep creating new, additional, DOM elements, which is effectively a memory leak and we don't want those. The `if` statement checks if there is in fact an `elRef` before it creates an element and it will always point to the correct `<div>`, which is what we want.

In the `useEffect` hook, we are defining `modalRoot` to equal the DOM element that we just placed in `src/index.html`, then appending `elRef.current` to it. Brian withheld from us the fact the `useEffect` has a special feature which is if you return a function, that is the 'clean up' function, which will run when the component unmounts. In our case, we are removing the `<div>` that we created. Garbage cleaned up! Oh and the `, []` is important to make `useEffect` only run once.

In `createPortal`, we return the children and `elRef.current`, which Brian fails to explain 😞. But from the React docs: "Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component." [Here's the link to the Portals documentation in the React docs](https://reactjs.org/docs/portals.html)

### Displaying the Modal

Hop on over to `Details.js` and make it look like this:

{% highlight javascript %}

import React from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import Modal from "./Modal";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, showModal: false };
  }
  componentDidMount() {
    pet
      .animal(this.props.id)
      .then(({ animal }) => {
        this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      })
      .catch((e) => {
        this.setState({
          hasError: true,
        });
      });
  }
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);
  render() {
    if (this.state.loading && !this.state.hasError) {
      return <h1>loading ...</h1>;
    }
    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={ { backgroundColor: theme } }
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No, I'm a monster</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

{% endhighlight %}

We added these 2 imports:

{% highlight javascript %}

import { navigate } from "@reach/router";
import Modal from "./Modal";

{% endhighlight %}

Added `showModal: false` to `this.state`, which will be the boolean that we use to determine whether the modal should be shown or not. In the API call, we added `url: animal.url,` to capture the pets adoption url. 

We added these 2 functions:

{% highlight javascript %}

toggleModal = () => this.setState({ showModal: !this.state.showModal });
adopt = () => navigate(this.state.url);

{% endhighlight %}

`toggleModal` will toggle the `showModal` boolean. `adopt` uses `navigate` to update the url to that of the pet.

We added the `onClick` event to the `Adopt {name}` button. Finally, we added this:

{% highlight javascript %}

{showModal ? (
    <Modal>
        <div>
        <h1>Would you like to adopt {name}?</h1>
        <div className="buttons">
            <button onClick={this.adopt}>Yes</button>
            <button onClick={this.toggleModal}>No, I'm a monster</button>
        </div>
        </div>
    </Modal>
) : null}

{% endhighlight %}

Using our friend the ternary operator, we will check the `showModal` piece of state, which if true, will display the modal, otherwise... nothing. And now you have a flexible modal that is able to 'appear' outside of #root, which is pretty funderful (I could see Brian using a word like that...).

## Wrapping Up

### Wrapping Up

Congrats! You've learned about 95% of React! 🎉