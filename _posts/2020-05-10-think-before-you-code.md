---
layout: post
title: "Think before you code"
comments: true
---

I used to be the biggest opponent of designing your app ahead-of-time. I was a firm believer the only right way to build great software was to get on the keyboard and just start writing it. As Linus Torvalds put it, "Talk is cheap. Show me the code".[^1]

<!-- more -->

It seemed to me that a lot of organisations where wasting their time with endless user stories, kanban boards and pointless requirements. I could've implemented half the features in the time it takes them to prepare their next Agile sprint.[^2]

I was going through the [Learning How To Learn][lhtl] free online course when suddenly things started to click. I began to see the huge importance of thinking ahead and designing your product before rushing in to code it.

In the course they introduce the concepts of a _diffuse_ mode, where we are creative and easily create new connections, and a _focused_ mode, activated when we need to solve a problem or draw on already known concepts and patterns.

Here are some things you definitely **don't** want to do while coding:

- Don’t choose data structures while coding. Prefer thinking about your data flow first. If you think beforehand what data you need and how you will store and process it, you will avoid hassle later on. You don’t want to store all that important data in JSON files when you needed a relational database, and you don’t want to fire up MongoDB to store two or three values.

- Don’t pick frameworks or libraries while coding. When in problem solving mode, you focus on what you perceive gets your problem solved fastest, even if you could be more creative and come with a better solution.

A lot of great programmers recommend first envisioning what your code should do (how its API should be) and then flushing out the required functions.[^3]

[lhtl]: https://www.coursera.org/learn/learning-how-to-learn

[^1]: You can find the [quote](https://www.goodreads.com/quotes/437173-talk-is-cheap-show-me-the-code) on GoodReads
[^2]: Paul Graham [wrote](http://paulgraham.com/wealth.html) about this before; it's of no surprise that small teams or individual hackers are able to code up a product much faster than a big corporation.
[^3]: Also known as [top-down programming](https://www.pcmag.com/encyclopedia/term/top-down-programming)
