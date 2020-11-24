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

**Code-First Details and Benefits**

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

**Experience Requirements**

To create and build Sitecore JSS apps, you should have experience with the following applications to ensure you have the necessary skills:

* Modern JavaScript compiler

* JavaScript programming

* JSS-supported client framework (Angular, React, or Vue)

* Node JS

* YAML or JSON (to store route data in files)

**Sitecore Requirements**

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

### Create a JSS Application

Now that you have the JSS CLI installed, you are ready to create your sample JSS app.

**Steps to Create Sample JSS App**

1. Identify Framework Options

With the JSS CLI installed, you are now ready to create applications. The first step is to identify the template that matches your framework (Angular, React, or Vue).

Each sample app includes the mocked Sitecore Layout Service so you can develop without the need to connect to a Sitecore installation.

* Go to [GITHUB TEMPLATES](https://github.com/Sitecore/jss/tree/master/samples/) to locate sample apps with the code for each template.

* Go to [TEMPLATE INFO](https://jss.sitecore.com/docs/getting-started/quick-start#step-3-choose-a-jss-application-template) to learn more about template options.

2. Create a Sample Application

* Open a command prompt.

* Type the create app command for your framework/library in the form:
`jss create <your-app-name> <app-template-name>`

For example:
`jss create my-first-jss-app angular`
`jss create my-first-jss-app react`
`jss create my-first-jss-app vue`

* Change to your app's directory. For example:
`cd my-first-jss-app`

* Type the command to start the app in disconnected mode (which uses the defined content located on the local development server):
`jss start`

3. Inspect the App Viewer Feature

The app viewer is a local webpack-dev-server feature to view your app in a browser without importing any items to Sitecore. After the JSS start command runs, this feature automatically launches your app in the default browser, http://localhost:3000. 

This app includes a website with all the JSS resources you need to develop your site without publishing them first. Resource items include different dates, time, languages, multiple device view settings, and more.

## Create JSS Routes to Host Components and Their Data

### Maintain App Directories

Now that you know how to create a JSS app, you need to understand routes. The first step in understanding routes is to examine how the JSS app directory structure works. Understanding the app directory will be important when you customize your apps with new routes from templates to host components and their data.

To maintain your site’s directory structure, you will use various tools that are described below.

* npm / Node JS - JSS SDK includes a series of npm packages that facilitate working with Sitecore data and layouts in JavaScript. Use Node JS to create one parent or master folder that will contain each individual JSS project. Use npm to create a JSS project with the proper folder structure.

* Visual Studio Code - Visual Studio Code is a source code text editor that supports hundreds of languages, syntax highlighting, bracket-matching, auto-indentation, box-selection, JS typings, snippets, and other components. Use Visual Studio Code to maintain site content, route (layout) data, and component registrations.

* Framework-specific SDKs - Framework-specific SDKs provide Sitecore's dynamic placeholder layout system and helpers. Use these to render Sitecore fields so they can be editable by Sitecore authors.

The following five topics will help you learn how to use the tools described above to maintain your app directories. Each topic includes examples that demonstrate using or applying these tools.

1. An app's project folder in Explorer

Visual Studio Code's Explorer window lists the following folders created by the JSS CLI when you made your app:

* A node modules folder stores all your JavaScript libraries and commands to support multiple apps with different JSS versions

* A config file generates the site definition for the route items and the database

2. An app's project folder in a CLI

You can also view your site contents in PowerShell / Terminal. 

1. From Visual Studio Code's Explorer window, you should:

* Locate your master folder

* Press the Control and Minus keys `Ctrl + -` anywhere

* Select `Open in Terminal`

You’ll automatically be in the Master Folder directory.

2. From PowerShell / Terminal, you can ensure the `PATH` environment variable lists the global `npm cachefolder`. 
Type the command:
`npm –version`

3. The role of the manifest API

The JSS app is a repository structure. In disconnected mode, use the manifest application programming interface (API) to do the following:

* Define the structure of your JSS site

* Run the site with mock data

* Import the site into Sitecore

To see the list of available manifest objects, see [Manifest Objects](https://jss.sitecore.com/docs/techniques/working-disconnected/manifest-api#manifest-objects).

4. Directory organization

The way you organize a site correlates with your content needs. In disconnected mode, the manifest API creates a manifest of the JSS app’s content. With respect to this content, the manifest does the following:

* Includes content data and data schema with both components and routes from a set of files;

* Enables the JSS app to execute with local mock content, without a Sitecore instance

* Assigns the JSS app as the master copy of all artifacts

5. An app’s main directory elements

There are three types of directory items specific to Sitecore terminology you'll want to know: arbitrary content, routes, and components. Continue below to look at each one in more detail. 

**Arbitrary Content:** 

* They are not used as pages or datasources

* They are referred to as “lookups” or “list items"

* They cannot be viewed directly in browsers because they don’t have any layout data

* They are usually used for restricting values of route-level or component-level fields to a limited set of options such as sharing content across routes (e.g. an author's bio)

**Routes:**

* These items are “pages” since they can be viewed in browsers using unique URLs. They contain route-level fields and instructions for how to lay out the route’s components

* Site implementations may need multiple route types to capture route-level fields. Examples include article route, product route, and location route. In Sitecore terminology, route types are “templates” 

**Components:**

* These are “rendering datasources,” where a datasource is comprised of a component name plus its field

* They contain component-level fields. These items cannot be viewed in browsers directly because they don’t have any layout data; they are simply building blocks for route presentation

### Create a Route in an App

Routes are important because they are needed to display component content and their data.

1. Purpose of routes - JSS extends Sitecore's dynamic, component-based layout model to the frontend. With JSS's layout model, you create routes so the components can display content.

**Compare How Routes Work**

* Routes in a Traditional JavaScript App - Each route hosts known components. The components are static. A static component does not have a datasource and displays non-customizable data (e.g. a layout component that adds columns or a component that pulls data from a third-party service that has no customization options).

* Routes in a Sitecore JSS App - The disconnected data define a route's components and their data when applicable. JSS extends Sitecore's dynamic, component-based layout model to the frontend. Route data is typically retrieved from static YAML or JSON files or simple JavaScript files. The sample app you created earlier in this course defines route data in YAML files located in the `/data/routes` directory. For more details explaining route data, see [Defining route data](https://jss.sitecore.com/docs/techniques/working-disconnected/manifest-api#defining-route-data), [Understanding layout](http://jss.sitecore.net/docs/fundamentals/understanding-layout), and [Route + State Management](https://jss.sitecore.com/docs/client-frameworks/react/sample-app#routing--state-management).

> _NOTE when connecting a JSS app to Sitecore:_

> _* After importing an app to Sitecore, Sitecore then defines the data dynamically. The route data is retrieved using calls to the Sitecore Layout Service—via HTTP or in-process for integrated mode server-side rendering (SSR). SSR is the process of taking a client-side JavaScript framework website and rendering it to HTML and CSS on the server._ 

> _* Prior to JSS, Sitecore did not render data. Instead, you added the rendering code to the .cshtml file or the .ascx file. Also before JSS, to define what renderings to add to a placeholder in Sitecore, you needed to set the Allowed Controls on Placeholder Settings in the Sitecore Experience Editor._

2. What JSS needs to create routes - JSS relies on two features to create routes. They are:

* **A JSS Library** - This is a series of npm packages that facilitate working with Sitecore data and presentation in JavaScript.

* **The Layout Service** -  This is the presentation layer that provides the composition of pages and the data needed for each component.

3. Mock Layout Service - This third topic about understanding routes covers the mock Layout Service. The mock Layout Service emulates the data you would receive from the actual Sitecore Layout Service, while also preparing your JSS app for code-first deployment.

> **Why It's Important:**

> * The mock Layout Service provides a consistent API to create a complex single-page JSS application that includes components, routes, and custom route types as well as the needed data for each component.

> * The mock Layout Service also provides integration with Sitecore.

**Three Notable Factors for the Layout Service Process:**

* Your disconnected JSS app is essentially built to consume and render a data-driven layout made available via the mock Layout Service

* Normally, the component data is a set of fields from the datasource item.

* When the mock or Sitecore Layout Service renders a page, it returns a JSON representation of the layout of the route and the data for each component.

> _NOTE when connecting a JSS app to Sitecore:_

> _* Currently, there are no tools built into the JSS SDK to retrieve and store Sitecore-connected Layout Service data as files._ 

> _* Should you later import your JSS app to Sitecore and no longer need the mock Layout Service that the sample apps use, you can instead save Layout Service data queried from Sitecore in a JSON file._

> _* Once you have that data locally (i.e., you're disconnected), you might consider building your own service layer to fetch "raw" Layout Service data from the JSON file(s) you saved._

4. Routes and templates

* **Templates:** You put a template with static component data in the `data/component-content` folder of the sample library to share static component data. Therefore, if you want to add components to multiple routes while reusing the same data, you put that component data into `component-content`.

* **Routes vs. Templates:**
    
    * Routes are items in a page that map, or correspond, to a route. The page-level items that correspond to the route are expected to have conventional presentation details set on them.

    * Templates do not have presentation as they are arbitrary content. They’re just used for datasources or to populate fields.

    * Every file under `routes` becomes a page. Routes are made from templates, but since they have presentation, they're called pages or routes.

5. Fields on routes vs. components - For our fifth topic, we'll consider whether to add fields to a route or to a component. To help you decide, you want to consider how the page will be used. For most sites, you will likely want to have different types of pages that include product-specific fields. Each JSS app has one default route template, `routes.sitecore.js`, which is automatically set as a base template for any route types defined in the app’s manifest.

In general, you want to:

* Add fields to components when they are generic fields. With this method, you can have component datasource items shared by multiple components on multiple pages.

* Add fields to routes if you'll be doing a lot of filtering and searching in order to more easily query your pages.

> _* If you use the same default template and put all data into components, it will be difficult to query these pages._

> _NOTE when connecting a JSS app to Sitecore:_

> _* For integrated or connected mode, A GraphQL query accesses the page's field, while a search by fields of components requires looking deep into the nested folder structure._ 

> _* The JSS import process will always generate a route template for each app._

JSS extends Sitecore's dynamic, component-based layout model to the frontend. With the layout model, you create routes so the components can display content. Now, let's see how we'll go about actually making routes.

**Steps to Create a Route**

1. Add a Route Type

In Visual Studio Code's Explorer window, browse to where you define/add your routes, `\sitecore\definitions\routes.sitecore.js`, and then create a `routes` folder.

* Copy and paste the `routes.sitecore.js` file (or any future routes file you create in `sitecore\definitions\routes`).

* Rename to `[Pagename]Route.sitecore.js`.

* Remove any unneeded content. The unneeded content includes fields that are not relevant to your new route.

In this new route file, use the `addRouteType` function as seen in the example code below. The `addRouteType` function is important because:

* It’s an API method to call for new routes.

* It’s how you add a route type with a name and fields.

* It can add inherited data. However, by default, we inherit the addRoute function, which adds an app route data definition. Therefore, the addRoute function does not need to be called out explicitly.

{% highlight javascript %}

import { CommonFieldTypes, Manifest } from '@sitecore-jss/sitecore-jss-manifest”;

export default function (manifest) {
    manifest.addRouteType({
    name: 'MyRoute',
    displayName: "My Route",

  fields: [
    {
    name: "description",
    type: CommonFieldTypes, RichText,
    displayName: "My Route",
    required: false
    },
    ]
  });
}

{% endhighlight %}

2. Add a Template Property

Continue in this new route file `[Pagename]Route.sitecore.js` to add a template property.

Use the example code below, which matches the route name, to tell JSS that a page should use the custom route.

**Tip:** If you are pulling route data from files, you may want to apply this dynamically, especially if all your routes utilize the same type.

{% highlight javascript %}

{
    "name": "route",
    "template": "MyRoute",
    "displayName": "MyRoute",
    "placeholders": {
        // ...
    }
}

{% endhighlight %}

### Inspect JSS App Templates

Now that you have some experience using directories and creating routes, you are ready to inspect how to use an application template for your preferred framework (Angular, React, or Vue).

**Step 1: Identify Template Contents**

To create an app for your framework with JSS, you need an application template. The application template contains:

* All the boilerplate code in the configuration to get up and running with a project on one of those frameworks.

* A sample website to get you started with JSS, which is a Styleguide for all the JSS field types inside Sitecore.

**Step 2: Examine Role of JSS CLI**

1. First, the JSS CLI creates your app with your framework’s application template, each of which is housed in the Sitecore’s JSS Github repository.

2. Then, the JSS CLI extracts the template on your file system in the folder with your application's name, where it installs the package using the package manager, Yarn.

3. Once the app is created, you can check the Visual Studio Code console to verify the local development server compiled the application successfully at `http://localhost:3000`.

**Step 3: View Sample Site**

When the app build is complete, the app’s site automatically opens in a browser to `http://localhost:3000`. There, you can view the sample site. This site’s homepage includes the following important documentation links:

* [Sitecore JSS documentation page](https://jss.sitecore.com)

* Styleguide page for your framework, `http://localhost:3000/styleguide`

* Sitecore GraphQL resources; note that GraphQL is only available in integrated and connected modes

## Determine JSS Content Presentation

### Define Component Rendering

In order to determine content presentation, you need to first understand what rendering components is and why it's important. Rendering JSS components is the same as rendering the components in your framework (e.g. Angular, React, or Vue). You render your built component by adding it to a placeholder on the page using a route. To draw an analogy, a component in React represents a rendering with the same name in Sitecore.

[JSS injects the content data](https://sitecore.stackexchange.com/questions/16559/sitecore-jss-react-overview-create-pages) from the mock or Sitecore Layout Service to a page. A component in the framework template is a rendering of the JSS component that uses the [router library](https://redux.js.org/advanced/usage-with-react-router) to [sync](https://github.com/reactjs/react-router-redux) the framework library (e.g.  [React Router Redux](https://github.com/reactjs/react-router-redux)) and allows navigation between pages.

### Examine How Rendering Works

Now that you understand what rendering is, you will learn how it works. Rendering is important because it is how you display content in your app like text and images.

**1. Learn Layout Service's process in rendering**

As we switch between pages, the router requests the content from a corresponding item (page) in the mock or Sitecore Layout Service. These fields are stored in a database. Then the Layout Service processes the request.

An item is basically just a collection of fields, or an item might also represent a webpage. In a typical Sitecore site, every page is an item, but the reverse is definitely not true. 

There are many items that may represent page content but are not necessarily a page themselves. For example, the item might be used as a datasource or a field source, or it might just represent a configuration setting.

**2. View Output Data**

Next, you will look at an example of a JSON file's output data to see how content items might be represented.

{% highlight javascript %}

{
    "context": {
        "pageEditing": false,
        "site": { "name": "MyApplication" },
        "language": "en",
        "currentContact": null
    },
    "name": "Home",
    "displayName": "Home",
    "fields": {
        "Metadata Keywords": {
            "value": "",
            "editable": ""
        },
    }
}

{% endhighlight %}

The above includes context data that is common for each of the following:

* Request,

* Fields of a requested item, and

* List of placeholders defined for the item (using the placeholders property).

Here's another section of a JSON file's output data:

{% highlight javascript %}

"placeholders": [
    {
        "name": "Main",
        "path": "Main",
        "elements": [
            {
                "componentName": "serviceScreen",
                "renderingName": "Service Screen",
                "renderingParams": {},
                "uid": "261adcfd-6ca7-4d60-aa37-d92a11c49594",
                "dataSource": "{9F2C1F61-FE87-4BC0-B223-8289A81912C1}",
                "placeholders": [].
                "name": "code",
                "type": "data/json",
                "contents": {
                    "path": "/special service plan",
                    "fields": {
                        "ServiceDiscount": {
                            "value": "0",
                            "editable": "0"
                        }
                    }
                }
            }
        ]
    }
]

{% endhighlight %}

The above rendering takes place inside the **elements** property. Rendering includes:

* All datasource fields assigned to it

* Each element's **componentName** property

* A framework component name that should be rendered in this place. This component will use data from the **contents** property as contextual data to render

[Download the complete output data file described in the section above](https://scorm.servicerocket.io/packages/61059053-c658-49c3-91c6-90c76c2afc0d/scormcontent/assets/fZL2PoSRTJVP456e_zxRzj1N3KuIXh_pG-output-data.txt)

**3. Identify How to Render a Component**

In the previous procedure, you explored an example of components being rendered in the JSON output file. You learned earlier in this track that you render a component to display its content in your app. Now, in order to render a component, you first you add your component to a page and then you add your content into fields on the component. The JSS SDK provides framework-specific field helpers to render fields so authors can edit them in Sitecore's Experience Editor after connecting your app to Sitecore.

### Render Components

Now that you understand what component rendering is and how it works, you are ready to render components.

**1. Register a Component**

* Compare Scaffolding Types
    
    * JSS scaffolding differs from traditional Sitecore scaffolding

        * In a Sitecore-first application, the task of adding a new component involves a repetitive set of steps (e.g. creating a rendering item, datasource template item, and datasource location folders and then linking them together).

        * Whereas in JSS, scaffolding creates the framework component (e.g. React) and the disconnected component definition files first and then provides helpful feedback about what to do to make your component work.

    * Identify Scaffolding Scripts

        The scaffolding script is located in `scripts/scaffold-component.js` and is fully customizable to suit your needs and patterns. In this same file, you can customize the manifest definition scaffolding as well.

        You'll likely also want to change the component factory generation script `scripts/generate-component-factory.js` (if you plan to use it) to match the nested structure of your components.

        In JSS, this layout is used just to indicate that you’re using JSS and points to an empty Razor view. Whereas in traditional Sitecore, the layout is pointing to a **cshtml** file, which contains the scaffolding of the presentation.

        To learn more about server-side JavaScript rendering, see this [view engine](https://jss.sitecore.com/docs/fundamentals/services/view-engine) topic.

    * Explore Component Definitions

        You create the component definitions and their files in JSS to export to Sitecore.

        When you create a content field, you are defining data to the datasource. To learn more, see details on:

        * [Client-side Routing](https://jss.sitecore.com/docs/client-frameworks/react/sample-app#client-side-routing)

        * [Manifest Instanc Methods](https://jss.sitecore.com/docs/techniques/working-disconnected/manifest-api#manifest-api-instance-methods)

        * [Manifest Objects](https://jss.sitecore.com/docs/techniques/working-disconnected/manifest-api#manifest-objects)

    * Register a Component

        When you register a component, you:

        * Create the component manifest definition file, e.g. **OurNewComponent.sitecore.js**. This is where you define fields and placeholders

        * Allow JSS to detect the component

        * Enable adding component instances to routes

        The recommended way to create and register new components is to use the `jss scaffold` command. For example:

        1. Type the `jss scaffold OurNewComponent` command at a command line interface window prompt

        2. After you correctly enter your `scaffold` command code, you can see the result of your command line interface window

**2. Add a Field to a Component**

