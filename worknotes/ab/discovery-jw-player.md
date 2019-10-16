---
title: AB JW Player Discovery
description: These are discovery notes for AB JW Player.
permalink: /worknotes/ab/jw-player

layout: post
---

## Discovery - JW Player

The scope of this story is to gain a better understanding of capabilities and integrations needed to implement JW Player on the site.

[JW Player Docs](https://beta-developer.jwplayer.com/jwplayer/docs)

In addition to a player, JW Player offers a CDN. Preliminary findings conclude that AB is using JW Player to host video content via JW Players CDN, see the following links (requires login?) and markup:

[Introduction to US Health Care Providers](https://www.advisory.com/research/health-care-industry-committee/members/resources/2019/introduction-to-us-health-care-providers)

{% highlight html %}
<div id="jwplayer-playlist" class="jwplayer jw-reset jw-state-idle jw-stretch-uniform jw-flag-aspect-mode jw-breakpoint-5 jw-floating-dismissible jw-flag-user-inactive" tabindex="0" aria-label="Video Player" role="application" style="width: 100%;" aria-describedby="jw-shortcuts-tooltip-explanation">...</div>
{% endhighlight %}

Example of video source link:

https://videos-a.jwpsrv.com/content/conversions/Ao1JBOZN/videos/EHD5VDzg-3206359.mp4-35.ts?hdntl=exp=1571249846~acl=/*~data=hdntl~hmac=b9349a3dbaa7f519ce3c8e1bef5c32d9e784321d201113033dd4e25730886162

[Everything You Need to Know About Medicare in 13 Minutes](https://www.advisory.com/research/health-care-industry-committee/multimedia/everything-you-need-to-know-about-medicare-in-13-minutes)

Furthermore, there appears to be a script and associated styling placed inline of the markup:

![alt text](../../assets/img/ab/ab-jw-player-inline-script.png "JW Player Inline Script in Markup")

![alt text](../../assets/img/ab/ab-jw-player-inline-style.png "JW Player Inline Style in Markup")


### JW Player Documentation

Styling appears to be loaded with JW Player and not embedded in any of the existing stylesheets provided by the client. The [Player CSS skin reference](https://beta-developer.jwplayer.com/jwplayer/docs/jw8-css-skin-reference) contains all of the information about styling the player.

Playlists are created within the JW Player platform. Playlist information can be [found here in the Player configuration reference playlist section](https://beta-developer.jwplayer.com/jwplayer/docs/jw8-player-configuration-reference#section-playlists)

### What We Need to Implement JW Player

A log of existing pages where JW Player is currently in use could be helpful, as pages without JW Player hosted videos do not load the JavaScript or Stylesheets needed for the player.

Access to AB JW Player account OR set up a [free developer account](https://www.jwplayer.com/pricing/) for development purposes (developer account on JW Player is free for 1 month).

### Sitecore Specific JW Player Links

[Integrating JW Player RTE](https://www.tadigital.com/blog/integrating-jw-player-rich-text-editor/)

Addressing [JW Player causing rendering not to load in Sitecores Page Editor](https://stackoverflow.com/questions/28545873/jwplayer-causes-rendering-not-to-load-in-sitecores-page-editor)