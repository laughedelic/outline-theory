---
title: Four keys reach every outline
date: 2026-11-25
description: Indent, outdent, move up and move down connect every arrangement of five bullets. We counted how many presses each rearrangement takes.
tags:
  - keyboard
  - measured
---

An outliner gives a bullet four keys to move with: indent, outdent, move up and move down. Two questions follow from that short list. Can those keys turn any outline into any other? And how many presses does it take? For small outlines neither question needs an argument, because every case can be counted.

## What each key does

The drawings are Markdown source, two spaces per level. A key acts on one bullet and takes everything under that bullet along. Here are the four keys on bullet `c`.

before

```
- a
  - b
  - c
  - d
- e
```

after ⇥ (indent): `c` becomes the last child of the bullet above it.

```
- a
  - b
    - c
  - d
- e
```

after ⇧⇥ (outdent): `c` moves to just after its parent, and its later sibling `d` comes along as its child.

```
- a
  - b
- c
  - d
- e
```

after move up: `c` swaps with the sibling above it.

```
- a
  - c
  - b
  - d
- e
```

after move down: `c` swaps with the sibling below it.

```
- a
  - b
  - d
  - c
- e
```

A key can also do nothing. In the first drawing, move up on `b` and move down on `d` are refused, because neither has a sibling on that side. Indent on `b` is refused because no bullet sits above it in its list, and outdent on `a` because `a` is already at the top level.

## An outline is a place, a key press is a step

Take five bullets named `a` to `e`. They can be arranged into 5,040 different outlines. Think of each outline as a place, and of each key press that changes something as a step from one place to another. The two questions become questions about a map: is every place connected to every other, and how long are the routes?

The map below draws that space in the page, for three, four or five bullets. It opens on four, where the 336 outlines are still easy to tell apart. The start sits in the middle, each ring is one more press away, and each dot is an outline. Switch a key off to see which outlines can no longer be reached.

<iframe src="../static/lab/keys-to-anywhere.html#fig1" title="Every outline of up to five bullets, by key presses from the start" loading="lazy" style="width:100%;height:1440px;border:0"></iframe>

[Open the whole page: Keys to Anywhere](../static/lab/keys-to-anywhere.html)

## The counts

**Every outline is reachable from every other.** This holds for all outlines of three, four and five bullets (30, 336 and 5,040 of them). Alan Dix called this property strong reachability in 1991 and glossed it as "you can get anywhere from anywhere".

**Moving one bullet takes 2.54 presses on average.** A move here means taking one bullet out, with everything under it, and putting it back anywhere else. Five bullets allow 149,280 such moves. One press is enough for 20.3% of them, and none takes more than five. Here is one that takes all five. From a flat list, making `a` a child of `e` needs move down ×4 and then ⇥.

before

```
- a
- b
- c
- d
- e
```

after move down ×4 ⇥

```
- b
- c
- d
- e
  - a
```

**Changing the whole outline can take 12.** Between two arbitrary outlines of five bullets the average is 6.75 presses and the longest route is 12. One pair that needs all 12 is a fully nested chain and its near reversal.

from

```
- a
  - b
    - c
      - d
        - e
```

to

```
- e
  - d
    - c
    - b
      - a
```

## Which keys could go

Every outline stays reachable with three of the four keys, as long as the one dropped is move up or move down. Moving `c` below `d` gives the same outline as moving `d` above `c`, so one direction can stand in for the other at the price of more presses. Drop both and the bullets keep their order from top to bottom for good, since indent and outdent never reorder them. Drop indent and no bullet can ever go deeper. Drop outdent and none can come back up.

The page also models five keys that outliners sometimes add: an outdent that leaves the later siblings where they were, move up and move down that carry a bullet out of its list at the list's end, and move to top and to bottom. Of the 511 combinations of those nine keys, 237 reach every outline from every other, and every one of the 237 contains indent. The reason shows on a flat list, where indent is the only key of the nine that gives any bullet a child.

## Is the model the plugin?

The counts come from a small model of bullets and keys written for the page. A model can be wrong about the thing it models, so we ran True Outliner's own code against it. For every outline of three, four and five bullets, every bullet and each of the four keys, we compared the outline the model gives with the outline the plugin's code gives. That is 106,536 key presses, and the two agree on all of them (plugin commit `4f06fe3`).

## What this does not say

- The outlines are bullets only. Headings, paragraphs, folds and typing are not in the model, and a real note has all of them.
- A press is counted as a press. Nothing here measures time, effort or surprise.
- Five bullets is the limit of the count, because the number of outlines grows fast: six bullets have 95,040.

The count of presses for a move is also a way to compare sets of keys, which is the subject of a later post. In the meantime, [Outline Golf](../static/lab/outline-golf.html) turns the same map into a puzzle: reach a target outline in as few presses as the search found.

## How we know

- *Measured*: every number above, by a script over the model, and the agreement with the plugin's code.
- *Reported*: strong reachability, from Alan Dix, *Formal Methods for Interactive Systems*, Academic Press, 1991, §2.7, p. 42.
- *Our reading*: the two explanations of which keys could go. The counts show that the key sets fail or succeed. The reasons are ours.
