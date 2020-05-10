---
layout: post
title: "How to become an open source developer"
comments: true
---

Do you want to be an open source software developer? To send _pull requests_ and _solve issues_ or _review code_ on [GitHub](https://github.com/)? Are you looking to add some _practical experience_ to your CV while writing code for the benefit of all? Then I can help you get started. And the best part about open source development is **the community you become a part of**.

This article describes how to choose the projects you contribute to, how to start contributing and how to become an active developer.

<!-- more -->

I've added links in this article to most technologies and keywords I mention. In your learning journey, if you ever encounter something you don't understand you **shouldn't be afraid to use Google or StackOverflow** to learn more about it.

## How to Choose a Project

Once you've decided you are ready to contribute to an open source project, you should decide on which project to contribute to and what issue to fix. My most important point is to **choose a project you are really passionate about**.

Don't worry if **you are not familiar with the programming language or technologies involved** in the project. You're not expected to know all the frameworks and languages mentioned in a tag line. But try picking a project you find _cool_ to start with. If you care about good looking websites developed with clean code, try **contributing to [React](https://github.com/facebook/react)**, a project which uses [modern JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) and [functional reactive programming](https://www.freecodecamp.org/news/functional-reactive-programming-frp-imperative-vs-declarative-vs-reactive-style-84878272c77f/). Or how about **contributing to [Servo](https://github.com/servo/servo)**, the new and upcoming browser engine behind [Firefox](https://www.mozilla.org/en-US/firefox/), written in [Rust](https://www.rust-lang.org/).

That being said, you should balance your passion for an idea with the difficulty associated with contributing to the project. **The maintainers should make it easy to contribute**. If a certain project makes you feel unwelcome, then avoid it. For example, old-school open source projects which still use [mailing lists](https://www.sback.it/publications/msr2013.pdf) and [cgit](https://git.zx2c4.com/cgit/) instead of moving to something like [GitLab](https://about.gitlab.com/) or [Phabricator](https://www.phacility.com/), deserve the lack of new/young contributors they have. Times change, and while I understand the supporters of mailing lists, **I prefer having an interface** to send my pull requests instead of preparing and mailing patches. I did [once](https://lists.freedesktop.org/archives/mesa-dev/2018-August/203644.html) send a contribution to a mailing list and the experience sucks. Gmail with 2FA isn't very easy to configure as a Git mail client either.

## Getting Your Feet Wet

Start by **fetching the project's source code**. Nowadays almost everybody uses [Git](https://www.git-scm.com/), but if they use something like [Subversion](https://subversion.apache.org/) or [Mercurial](https://www.mercurial-scm.org/) it should be just as simple. It goes without saying that a project lacking any sort of version control is a **big red flag**. If the project is hosted on some platform like Bitbucket or GitHub, you should also **fork the original repository** and clone your fork locally. This implies getting a bit acquainted with the Git workflow, including things like *commits*, *branches* and *merging*. This is a whole subject in itself, but the [Pro Git book](https://git-scm.com/book/ro/v1) or this [first contributions guide](https://github.com/firstcontributions/first-contributions) will help get you on your feet. Sadly, there's no getting around not using Git; familiarity with a version control system is a required skill, just like the ability to work in a team.

Then you should try **building the code** (if it's written in a compiled language) and **run all the tests**.  The project you're working on has automated tests, doesn't it? Most repos you'll find have a `CONTRIBUTING.md`  (or similar) file which describes the steps you need to take, and you can always raise an issue with the maintainers if building doesn't work (it's their responsibility to keep the code compilable, and if anything goes wrong they're probably more familiar with the build system than you are).

And the final step to actually contributing is to **pick an issue** and fix it. It's better not to send random pull requests, but to fix an existing bug or implement a much-requested feature. As for how to actually solve the issue, **read the issue's description**. But if you seem to be making no progress, try asking for clearer instructions on the issue page or asking on a project's chat. You'll always find someone more experienced who can help you when you're stuck.

In parallel with all the above steps you should try becoming familiar with a project's layout. **Code is the single source of truth** for a computer program, so you have no excuse not to understand it. Reading all of the source files of a big project would take ages and not help you much; focus on determining where are the files you need to modify to fix the issue, as well as where to add new tests.

After you're done, write a nice commit description and send the pull request to the original project. You will probably undergo **your first code review**. Do not worry too much about negative comments or feel personally attacked; feedback is important and you should see this as an opportunity to improve the quality of your code.

## Become a Part of the Community

Once your first PR gets accepted, you should _already_ start thinking about your second contribution. Undoubtedly you have a busy schedule and work to do, but you'll see that **putting aside a few minutes every day** or every few days can nevertheless make you pretty active.

To avoid burnout, try to **diversify your contributions**. Don't get stuck in a single tech stack or one organization. Find what dependencies a project has and contribute to those. If you've only sent improvements to **libraries**, try finding an open source **application** to work on. You should also try **writing documentation**, **helping new users** by being active on a project's [Discord](https://discordapp.com/)/[Zulip](https://zulipchat.com/) channel and so on. The possibilities for making a positive change are _endless_.

## Conclusion

I hope that the last few paragraphs gave you an idea of what being an OSS developer implies. It's quite different from the software development process taking place in most companies, but seeing how your contributions fit into the larger picture to build a wonderful project is the best feeling in the world.

I'll close by recalling Wikipedia's [advice for new editors](https://en.wikipedia.org/wiki/Wikipedia:Be_bold): **be bold**. Just because it's the first time you're contributing to a certain project (or the first time in general), you shouldn't be afraid to tackle more difficult issues such as adding new features or fixing crashes. Adding tests or improving the documentation is appreciated, but you have to gain the courage to take on more challenging tasks as well.
