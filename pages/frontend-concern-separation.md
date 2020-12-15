---
title: Frontend Concern Separation
description: After finishing up a project, these are some thoughts on the separation of concerns from a frontend perspective.
permalink: /frontend-concern-separation

layout: default
---

### TLDR; Uniquely, and in a sensible manner, name your components and containers, know your project well or be able to identify a person who does, avoid working on the same things another developer is working on at the same time as them. Doing these things will make your projects for great success.

**Running into styling conflicts? Are your designs not using components consistently across pages? You've got problems!**

I recently (11/2020) was asked to join a project for a week to cover while a team member was out of office and had a ton of 'fun'. The short list is:

🚩 reused components not clearly identified

🚩 containers using components not uniquely named

🚩 overall lack of knowledge about the components amongst the development team

🚩 multiple developers asked to fix different bugs on the same components

At the end of the week we had a mix of 'this is complete' and 'why is this super basic thing not complete?', which should have pointed to some of the above issues with our team / development processes, but I was off the project... We had a handoff for the returning developer who admitted that these were not new issues 🚩.

Generally, our component-based approach to development is well thought out and executed, but somehow in this project it was not the case. Reflecting on these issues, I would attribute at least part of them to an agile workflow. But since I was not on this project from the beginning, it's hard to say if that is truly the case. Either way, it would appear to me that at some point a decision was made to alter the functional requirements of *some* components but we did not modify the markup or styling to reflect the new iteration of these components.

An example of this would be a component that was once a banner with two cards. Along the way, it was decided that this component should be a carousel. It appeared (according to the codebase) that the banner component was finished and we were now trying to modify that component as minimally as possible to match another carousel that had also already been developed. Fine. But not. There were classes no longer needed (that were affecting proper styling) and their associated styling could GTFA as well. Some basic fixes and that was complete.

In another case, there was a component that was used within two other components. Again, this should not be a problem, generally the reused component would have a class; i.e. `.ultra-cool-button` and then you could place that in any other container (itself having a unique class) with no conflict. Seems fine and normal? Well it is, but for this project someone decided that we didn't need unique container names, *and* that the `.ultra-cool-button` should appear at the top of one component and at the bottom of the other. 🤔 At the end of the day, the joke was on me, there were in fact unique container names, but this was not readily apparent. We often use container agnostic classes to control spacing and alignment and it appeared that these 'unique' class names were just being used for spacing or alignment. The classes were:

`component container col-12 author-center-container author-detail-center-wrapper center-container`

`component container col-12 author-center-container center-container`

One of the above was to be used on a blog page, the other on an author page. Can you tell which is which? Hint: `author-detail-center-wrapper` is the component container used on the blog pages. 😞

Personally, I would have gone with `... author-center-container ...` and `... author-center-container blog...` or `... author-center-container--blog...` because `author-detail-center-wrapper` doesn't really tell me anything about **anything**.

The final issue we came across was related to having too many people touching the same files at the same time. I'm not sure why, but it seemed that the existing team which I joined was worried about giving me (or the other developer) too many tasks. So they split them. Seems reasonable? Yes, but no... The splitting was fine, but the way it was done was not. At this point in the project / sprint they were on, the team was predominantly focused on bug remediation, so most tasks were bug centric. Most of the bugs had been found in one or two components.

To me it would have made the most sense to say, "developer 1 take all the bugs related to this component, developer 2 take all the bugs related to the other component", but instead it was, "developer 1 take this mix of bugs related to these two components, developer 2 do the same, but with different bugs". So then we're working on different bugs but same components. We had our changes overwritten by each others work, which led to rework, which led to frustration amongst the team, which led to 'why is this super basic thing not complete?'. No bueño. This issue was brought to the teams attention during scrum, but the task assignments did not change. By the end of the week, the other frontend developer and myself were just reassigning tasks to each other to avoid conflicts.

All of these issues have simple fixes, but it does take consensus amongst the team to resolve them. When it comes to class names and the refactoring of components, the onus largely falls on the frontend team to lead the way to clarity. For potentially conflicting tasks, that falls on everyone. The PM should have heard the concerns being voiced and taken the time to respond to them, the backend developers should have done the same. While the final answer (frontend developers reassigning tasks) worked, it was basically a band aid for a broken process. It can be difficult to address these issues while a project is 'in-flight', but there is an opportunity to speak to them during retrospectives and make clear plans and process updates to avoid such issues in future projects.

This is not intended to be an exercise in finger pointing, but a reminder that we may not be the only people to touch a project throughout its development, so we should be clear in our approach with well thought out naming and documentation. Additionally, even if we are approaching a deadline, we should take the time to address the concerns of our teammates. The brief amount of time required to regroup is definitely worth the positive benefits it could have on the remainder of the project.

🎉