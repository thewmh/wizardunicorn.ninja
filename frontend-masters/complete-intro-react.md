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

* Typing in the input field triggers a re-render, `SearchParam` re-renders
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