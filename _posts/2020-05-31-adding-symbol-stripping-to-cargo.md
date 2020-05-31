---
layout: post
title: "Adding symbol stripping to Cargo"
comments: true
---

My pull request adding a new Cargo option to strip symbols from binaries was recently merged. I wanted to share the story of how this contribution came to be, as well as provide some tips for prospective contributors.

<!-- more -->

## Find something to work on

I was browsing the Cargo issue tracker, looking through issues from [oldest to newest](https://github.com/rust-lang/cargo/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-asc). I picked up this triaging strategy from contributing to [gfx-rs](https://github.com/gfx-rs/gfx/).

Older issues could be classified as:
- **outdated/no longer applicable**: leave a comment asking the maintainers if the issue is still relevant or should be closed.
- **not very clear**: if the issue description is terse, or there's not a lot of discussion around it, or you're just not completely sure what the issue is about, it's best to leave a comment asking for clarifications.
- **lacks an actionable item**: this happens especially when you're not very familiar with the project or the concepts involved, you could leave a comment asking what exactly should be done. Someone might even take some time to give you step-by-step instructions.
- **has a proposed solution**: these are the best when just starting out. They might not be labeled as _good first issue_, but they shouldn't be too hard to make some progress on.

The last scenario was the case of the symbol stripping issue I started to work on. Somebody left a [quick workaround](https://github.com/rust-lang/cargo/issues/3483#issuecomment-431209957) in a comment: just add the `-s` flag to the linker. This works only on platforms which use `gcc` for linking, but it's a start.

## Get ready

Before you can start working on the issue you picked, you need to get a local development environment set up, then compile and run the tests. Cargo's [README](https://github.com/rust-lang/cargo/) is a good starting point. They also have some [contributing instructions](https://github.com/rust-lang/cargo/blob/master/CONTRIBUTING.md), and a high-level [overview](https://github.com/rust-lang/cargo/blob/master/ARCHITECTURE.md) of the code.

## First attempt

I wanted to add support for a `strip = true` option in `Cargo.toml`, which would pass the hard-coded `-s` flag to the linker. With the help of [ripgrep](https://github.com/BurntSushi/ripgrep), I was able to find the structures for parsing and storing the Toml data, and even some lines similar to what I needed. A few copy & pastes later, I had a pull request [submitted](https://github.com/rust-lang/cargo/pull/8191).

[Alex Crichton](https://github.com/alexcrichton) helpfully [suggested](https://github.com/rust-lang/cargo/pull/8191#issuecomment-622427985) that support should be first added as a compiler flag to `rustc`, since it has more information about the target and the linker. Cargo could then just pass the right flag.

So that's what I did. I opened an [issue](https://github.com/rust-lang/rust/issues/71757) on [rust-lang/rust](https://github.com/rust-lang/rust/) to discuss this with the compiler team.

## Help from others

At this point, I was getting ready to clone and build the Rust compiler locally. Procrastinating for a few days meant this feature [was implemented](https://github.com/rust-lang/rust/pull/71825) by [contrun](https://github.com/contrun) (thanks!).

Important point to remember when trying to solve an issue: you’re not alone! There are plenty of maintainers, reviewers and contributors, and each of them can help you in a different way.

## Second attempt

After a nightly with the compiler changes get released, I brushed off my old code and opened a [new pull request](https://github.com/rust-lang/cargo/pull/8246). With helpful feedback from [Joseph Richey](https://github.com/josephlr) and Alex Crichton, I've fixed a bug and added a few tests. The commits were soon merged into `master`!

I've also [added a comment](https://github.com/rust-lang/cargo/issues/3483#issuecomment-631395566) describing the fix back on the original issue, in case somebody stumbles across it on Google and wants to know how to strip symbols from their binaries.

## Conclusion

Wikipedia puts it best: [be bold](https://en.wikipedia.org/wiki/Wikipedia:Be_bold)! Don't be afraid to contribute to open source projects, no matter how complicated they might seem. Especially when you use such an empowering language as Rust. And there are always people who can point you in the right direction if anything goes wrong.

Big or small, every contribution is appreciated 🙂 Small improvements compound over time, leading to great software.
