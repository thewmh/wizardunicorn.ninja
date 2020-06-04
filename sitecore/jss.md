---
title: "Sitecore - JSS Collection"
description: These are notes from Sitecore's Training Program on JSS.
permalink: /sitecore/jss

layout: page
---

## Introduction

JSS can be used to create a headless omnichannel customer experience, that is reliable and easy to use. As a developer, JSS will enable you to build your websites using your favorite JavaScript framework (React, Angular, Vue) using any operating system. 

## Determine Methods for Using JSS

### Identify Types of CMSs

The modern web content management system (CMS) is used for creating, managing, and optimizing your customers’ digital experience. CMSs are generally the best way to organize and deliver content through a web service. There are three types of CMSs for you to identify in this track: traditional, headless, and Sitecore Omni™.

A traditional CMS displays web content from a front-end delivery layer. This content is created in a front-end WYSIWYG editor such as Joomla! or WordPress and then saved to a back-end database. 

A headless CMS decouples the CMS's back-end content functions (e.g. creation, management, and storage) from front-end functions (e.g. presentation and delivery). This decoupling allows developers to render the content with different heads to serve the various content devices or applications (also known as channels). This multi-channel setup is also called the omnichannel. Examples of different channels include websites, mobile apps, and smartwatches. 

Sitecore Omni is a headless CMS architecture that includes the easy editing ability found in a traditional CMS but uniquely offers personalization on any device or application. This approach is great for both back-end and front-end developers because the two roles can work in parallel. 

For example, Sitecore developers can focus on applying their programming language expertise, while JavaScript developers can build the look, feel, and functionality of user experiences using the tools they know well (e.g. JavaScript libraries and frameworks). Developers can then push content out to any device or application using the latest APIs.

Sitecore has 5 offerings in its Omni Product family, described as:

* Sitecore GraphQL - an efficient front-end-driven query language that only returns a query’s requested data. Queries are graph traversal for expressive queries.

* Sitecore Services Client - offers industry standard services to access Sitecore content.

* Sitecore Experience Accelerator (SXA) - offers multiple options to deliver personalized, decoupled content management, delivery, and presentation via JSON.

* Universal Tracker - a scalable tracking service based on Web API technology.

* JavaScript Services (JSS) - a software development kit (SDK) that creates a seamless omnichannel customer experience in a headless CMS.

### Explore Sitecore JSS Capabilities

Now that you can identify the the different types of CMSs, you will explore Sitecore JSS and its capabilities. JSS is a software development kit and one of the Sitecore Omni products you can use to create JavaScript applications, or apps, for a headless omnichannel customer experience. Any server running server-side JavaScript can host the apps. JSS offers several capabilities to front-end developers, including:

* Inline editing

* Multi-language

* Analytics

* Personalization

* Integrations

You can build apps with these types of capabilities independently or disconnected from Sitecore and by using your favorite JavaScript framework (Angular, React, or Vue). Once you deploy your app to Sitecore, you'll be able to manage the application in the Sitecore Experience Platform (XP) enterprise backend.

* Code-First Workflow - Use the code-first workflow to develop in your preferred OS, completely disconnected from Sitecore.

* Application Integration - With Sitecore's application integration, JSS takes care of generating all necessary artifacts.

* Cross-Platform Support - The JSS SDK includes cross-platform support to deploy your app 'headlessly' to any platform that runs server-side JavaScript.

* Ease of Use - The JSS SDK provides easy web app deployment and management as a nimble, self-contained JS bundle.

* Application Scalability - You can use CDNs, proxies, and a Node.js server to scale your applications.

* Headless Server-Side Rendering - You can use any service that supports hosting Node.js applications for headless server-side rendering.

To better understand how to implement the JSS capabilities, you'll want to be familiar with the four JSS features. Let’s take a closer look at this set of features and their functions.

* JSS Library - a series of npm packages that facilitate working with Sitecore data and presentation in JavaScript.

* Sitecore Layout Service - provides composition of pages and data needed for each component. In disconnected mode, the mock Layout Service emulates the data you would receive from the actual Sitecore Layout Service.

* JavaScript View Engine - allows Sitecore to perform server-side rendering of JavaScript applications.

* Application Import - allows you to apply a code-first approach.

### Examine the Code-First Approach

Now that you know about the JSS capabilities and features that help front-end developers create JSS apps, you will examine how initial JSS app development can be done while disconnected from Sitecore, which is the code-first approach. The code-first approach allows developers to create and deploy apps in their preferred environment.

*Code-First Details and Benefits*

* Designing with Code-First Workflow -

Choose the code-first approach when:

* You need to design an early prototype.

* You do not have a Sitecore instance available to deploy to.

* You need to work on a non-Windows operating system.

* JavaScript developers are your primary designers.

* Your app will be relatively simple from a content perspective.

* You are hiring an external front-end agency to build your app.

The benefits of the code-first approach include:

* Being able to develop apps in your preferred OS.

* Being able to disconnect completely from Sitecore.

* Working with the JSS SDK without a Sitecore server install.

* Implementing UX Design Strategies - Consider a scenario where front-end JavaScript developers must work with UX designers to implement omnichannel UX wireframe designs. JSS is the perfect option to develop such designs because it can help ensure the required collaboration between UX and JavaScript designers. Such collaboration will provide the means to implement the essential elements of “flexibility, exploration, and pre-decision timing.”

* Considering UX Designer Role - As a general practice, UX designers provide JavaScript developers with their wireframes in a visual representation tool such as Visio, OmniGraffle, or InDesign for very large projects. Alternatively, UX designers might provide JavaScript developers with an integrated or separate code approach for less complex sites or simple redesigns.

Either way, the designer and developer need to collaborate. This collaboration between them ensures they focus on the correct level of detail for the types of content and format in the site’s design.

* Designing with No Limitations - Prior to JSS, creating rich Internet applications and creative sites was not easily done with the traditional Sitecore platform or Sitecore Experience Accelerator. However, now with JSS, a UX designer has no technical limitations. Their wireframes are not dependent on the JavasScript developer’s chosen framework or its available components.

## Build a JSS Application in a Local Development Environment

### Identify JSS Requirements

Before you create an app, first make certain you meet the experience and Sitecore requirements discussed below. These requirements identify the necessary skills to use Sitecore JSS.

*Experience Requirements*

To create and build Sitecore JSS apps, you should have experience with the following applications to ensure you have the necessary skills:

* Modern JavaScript compiler

* JavaScript programming

* JSS-supported client framework (Angular, React, or Vue)

* Node JS

* YAML or JSON (to store route data in files)

*Sitecore Requirements*

In addition to having experience with the above applications, you also need to ensure you've done the following:

* You've completed the eLearning Sitecore Developer Foundations course OR

* You're a Certified Sitecore Developer

### Explore the JSS CLI

Now that you understand the requirements, you are ready to set up a local development environment with the JSS command line interface (CLI) tool to create JSS apps. This track includes the following steps:

1. Explore the purpose of the JSS CLI

Sitecore JSS includes the JSS CLI, which is a node-based command line tool with development scripts. The JSS CLI is the base tool for the code-first workflow. You use it to:

* Create, maintain, and run JavaScript apps.

* Scaffold components.

* Deploy apps to Sitecore.

To learn more about the JSS CLI and available scripts you can use, see [JSS CLI Scripts](https://jss-docs-preview3.herokuapp.com/docs/fundamentals/cli).

2. Install and run the JSS CLI

1. Install the JSS CLI with your command line tool of choice (e.g. bash, PowerShell, cmd prompt, or Node JS cmd prompt):

`npm install -g @sitecore-jss/sitecore-jss-cli`

*Parts of the JSS CLI Command*

`npm` - Node Package Manager

`install` - Install command

`-g` - Flag that enables the jss command to run from any directory (global)

`@sitecore-jss/sitecore-jss-cli` - Package name of the JSS CLI

2. To verify that your CLI installation was successful, enter the command:

`jss --help`

The `jss` commands change when running within a JSS apps' directory. The `--help` option will always show the currently available commands.

