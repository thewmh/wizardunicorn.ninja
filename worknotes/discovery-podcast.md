---
title: AB Podcast
description: These are discovery notes for the AB Podcast component.
permalink: /worknotes/ab/podcast

layout: post
---

## Discovery - Podcast

Podcasts are currently iframed in from Soundcloud.  The scope of this story is to determine what options we have for layout and styling.  We’ll then connect on this in deisgn studio and work it into our overall design and implementation plan.

### Current State

Currently, AB is using Soundcloud to host podcasts.

### Initial Findings

Soundcloud is not very customizable. A few links below detail what is available.

### Soundcloud Options

[Soundcloud Pure Player](https://github.com/OpenA/soundcloud-pure-player) - This project is a fork of the one below. It aims to provide a pure JavaScript option to a customizable player. Last commit is from [Jan 8th, 2019](https://github.com/OpenA/soundcloud-pure-player/commit/97ae13dc30a66a8eaa8b4e285b097eb16f564226)

This (along with the link below) is the most customizable option of the 3.

[Soundcloud Custom Player](https://github.com/soundcloud/soundcloud-custom-player) - A jQuery plugin that allows you to create easily customizable, HTML/CSS/JS based audio players. It uses the official SoundCloud Flash widget for the audio streaming and widget API for it's control or native HTML5 streaming. Supports iPad, iPhone OS4, Palm Pre etc.

This project has not received any updates for numerous years, and is therefore not recommended.

[Soundcloud HTML5 Widget API](https://developers.soundcloud.com/blog/html5-widget-api) and [Soundcloud Widget API Playground](https://w.soundcloud.com/player/api_playground.html) detail all of the available options for embedded Soundcloud players.

This is the native Soundcloud player embedding. This is the most straightforward and least customizable option. For more information about player embeds, check out the [Embedding a track or playlist](https://help.soundcloud.com/hc/en-us/articles/115003568008-Embedding-a-track-or-playlist-) post from Soundcloud.

There are 3 available players to embed, only 2 of which are available with a standard Soundcloud FREE membership. The 3rd and more customizable option (which is still more limited that the first two links), is only available with a Pro membership.