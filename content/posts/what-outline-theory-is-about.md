---
title: What Outline Theory is about
date: 2026-11-26
description: A research series on editing outlines that are stored as plain text. Where the questions come from, what a post is, and what the coming posts cover.
tags:
  - about
---

An outliner looks simple. Bullets nest under bullets, and a few keys move them around. Building one on top of plain text raised questions that the code could not settle. Which keys are enough? One outline can be written as many different texts, so which text should an edit write? What happens when a sync changes the note in the middle of an edit? What should undo bring back?

Outline Theory is where we work through those questions, one per post. We write the posts for ourselves first, as a way to go through the research one question at a time, and for anyone who cares how outliners and text editors work.

## Where the questions come from

The series grew out of [True Outliner](https://github.com/laughedelic/obsidian-true-outliner), an outliner plugin for Obsidian. Obsidian keeps a note as a Markdown file, so the plugin never owns the outline. It reads the text, shows it as an outline and writes text back. Other programs read and write the same file: Obsidian's own editor, a sync service, git, a script.

Other fields met this arrangement long ago. Database researchers described it in 1981 as the problem of updating a view. Operational transformation, the method behind many shared text editors, was first written in 1989 for GROVE, which was a shared outline editor. Structure editors, which keep a document's structure while people type into it, go back to at least 1981. Each field gave the problem its own names and found its own partial answers.

So the research has two halves. We read what those fields found, 333 sources so far across ten areas of research. And we measure what can be measured: counts over every small outline, runs of the plugin's own code, and a corpus of 3,737 real notes from public repositories.

The aim is a foundation: statements about editing an outline that are precise enough to check, and that the plugin's behaviour can be held to.

## What a post is

Each post takes one question and answers it as far as the evidence goes. A post is meant to be 600 to 1,200 words around one figure that works in the page, so a count can be tried and not only read. [[four-keys-reach-every-outline|Four keys reach every outline]] is a fair sample. It asks whether four keys can turn any outline into any other, and answers by counting every outline of up to five bullets.

Every post ends with a section called *How we know*, which sorts its claims into three kinds.

- *Measured*: we counted it or ran it, and the post says on what.
- *Reported*: a paper or a specification says it, and the post says which.
- *Our reading*: an explanation or a judgement that is ours.

The three are easy to blur. A count over five bullets is not a study of people. A result about databases from 1981 is not a result about Markdown. An explanation that fits the numbers is still an explanation.

## What the series is not

It is not a manual for the plugin, and it does not announce releases. Two limits also apply almost everywhere. The models are small, usually outlines of five or six bullets, because every case can then be counted. And we have run no studies with people. Where a post says what people do, it reports someone else's study, or it is a calculation and says so.

## What is coming

The plan has seven groups of posts.

- **An outline as a place you move through.** The four outline keys, counted. After [[four-keys-reach-every-outline|the first post]] come the sets of keys that are enough, what outdent takes along with it, when a key stops being the fastest way to move a bullet, and what happened when we ran the plugin's own code against the model. One post is a game, Outline Golf.
- **Two devices, one note.** A merge sees three texts and no history, so nothing tells it that a bullet moved. These posts cover what git does with two moves of the same bullet, two moves that are each allowed and together make a loop, and the ways to settle a collision, with who loses in each.
- **Editing through a view.** This is the idea the rest leans on: the outline is a view of the note's text. The posts cover the two promises every edit keeps, the one we do not keep, and what "change no more than is needed" means once it has to be measured.
- **Undo.** The same keys give three different histories, depending on what an editor does with a step that was undone. The posts also cover what people expect when asked to undo an early step, and what editors do.
- **Structure editors.** Twenty-three editors from 1981 to 2026 answer the same seven questions, such as which one is the file and what the editor says when it says no.
- **The evidence itself.** What 3,737 real Obsidian notes contain, how they differ from other Markdown, and how the ten areas we read share their sources.
- **Lost gems.** Short round-ups of findings from old papers that deserve a second look. In 1962 Engelbart tied a pencil to a brick to see what a worse writing tool does to writing. In 1990 Kellogg found that idea maps gave students more ideas and outlines gave them better essays.

The plan will change as we write. Some posts wait on choices the plugin has not made yet.

New posts appear in [the feed](../index.xml).

## How we know

- *Measured*: the counts of notes, editors, sources and areas are counts of our own material.
- *Reported*: the problem of updating a view, from François Bancilhon and Nicolas Spyratos, "Update semantics of relational views", *ACM Transactions on Database Systems* 6(4), 1981. GROVE, from Clarence Ellis and Simon Gibbs, "Concurrency control in groupware systems", SIGMOD 1989. The 1981 structure editor is the Cornell Program Synthesizer, from Tim Teitelbaum and Thomas Reps, "The Cornell Program Synthesizer: a syntax-directed programming environment", *Communications of the ACM* 24(9), 1981. The pencil and the brick, from Douglas Engelbart, *Augmenting Human Intellect: A Conceptual Framework*, SRI, 1962. The essays, from Ronald Kellogg, "Effectiveness of prewriting strategies as a function of task demands", *The American Journal of Psychology* 103(3), 1990.
- *Our reading*: that these fields met the same problem an outliner on plain text has.
