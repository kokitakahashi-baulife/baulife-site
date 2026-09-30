---
title: From idea to the App Store in 31 days — then rebuilding my photo-coloring app's positioning two weeks later
date: 2026-09-30
summary: How Artherapy, an adult coloring app I built solo, went from researching paint-by-number kits to a live App Store app in 31 days — and why, two weeks after launch, I rebuilt it around who it's for instead of what it does. What I dropped, and what I refused to compromise on.
project: Artherapy
tags: [ios, indie-dev, app-store, buildinpublic, product]
numbers:
  - Idea to launch | 31 days | first submission on day 26
  - Name changes | 5 | working title → final name
  - Photo conversion | ~25s → 0.8–1.8s | moved from server to on-device
---

**Artherapy**, an adult coloring app for iPhone, started on August 13, 2026 with some research into custom paint-by-number kits made from your own photos. Thirty-one days later, on September 13, it was live on the App Store. Two weeks after that, I rebuilt its positioning from scratch. This is the path.

![Artherapy timeline from idea to launch to repositioning](/images/blog/2026-09-30-artherapy-journey/timeline_en.png)

## TL;DR — the calls that mattered

1. **Build an app you can play with yourself, not a physical kit.** No inventory, no shipping, and you find out right away whether coloring it is actually fun
2. **Never regenerate the photo with generative AI.** It changes facial expressions. Classic image processing keeps the coloring page faithful to the photo
3. **Judge quality by how it looks next to the original photo** — not by numbers like region counts or averages
4. **Put no walls in front of coloring.** Charge for things around it; all art media stay free; paid coloring pages were dropped
5. **After launch, switch the starting point from "what it does" to "who it's for."** "Turns your photo into a coloring page" is easy for any app to copy, so it shouldn't be the headline

## Context for this case — and what to adapt

- **Setup**: an iPhone app built by one person plus AI (Claude). About a month from idea to launch. Design, code and App Store submission all done together with AI. No marketing budget
- **When it fits**: you're looking at an existing product or service (here, photo-based paint-by-number kits) and wondering whether an app could deliver the same experience cheaply
- **What to adapt**: swap in your own non-negotiable. For this app it was "the person in the picture must never look like someone else"
- **When it doesn't fit**: if you want thorough user research before building. This approach is "ship, listen, fix"

## 1. From kit research to an app (Aug 13)

I was looking at another company's made-to-order paint-by-number kits built from customers' photos, and sensed some synergy with another business of mine.

While talking it through with my team, "a version you color on a screen" merged with "turn the whole coloring session into a timelapse video," and it became an app that same day:

> "Looks like we've got an app idea."

The research showed physical kits work financially but carry inventory and logistics with limited upside. An app, on the other hand, we could build and try ourselves immediately:

> "Let's just build it, play with it ourselves, make our own UGC and post that."

## 2. Never regenerate the photo (Aug 13–25)

The first rule: don't redraw the photo with generative AI.

Looking at other companies' products, I noticed they didn't seem to redraw the photo — because redrawing shifts the facial expression a little.

For an app where you color your family and pets, a changed expression is fatal. So the core became classic image processing — reduce the colors and split the photo into regions. Coloring had to feel like painting with a brush, not just tapping to fill:

> "I want it to feel like painting with a brush. Just tapping doesn't feel like a hobby you'd enjoy."

The one thing not up for compromise was how easy it is to color:

> "How the regions are split and how easy they are to color matter most. Don't compromise there."

I built a "detailed" and a "simplified" mode, but the difference wasn't visible, so we kept one:

> "No, we don't need the simplified mode either. Let's go with detail only."

On August 25, photo conversion moved from a server onto the iPhone itself — a server dependency would have blocked App Store review and cost money. Conversion time dropped from about 25 seconds to 0.8–1.8 seconds.

## 3. Quality = how it looks next to the original (Sep 1)

While tuning conversion quality with AI, I was only being shown the output and some numbers:

> "Honestly, I can't give good direction on quality unless you show me the original image alongside it."

Side by side, differences the numbers missed jumped out — my dog's pink tongue had turned brown, for example. Once that was fixed, the standard was set:

> "The quality of this finished coloring is great! It's not about whether there are fewer regions — if the finished result looks good, that's OK."

Art media followed the same logic. The first oil paint didn't look real, so I studied real brushstrokes and rebuilt a single stroke before scaling up.

![Left: the first oil-paint stroke. Right: a stroke rebuilt from studying real brushstrokes](/images/blog/2026-09-30-artherapy-journey/oil_en.jpg)

## 4. No walls in front of coloring (Aug 15 – Sep 13)

Early on, I put the paid part outside of coloring itself:

> "Pricing should scale with canvas generation. All art media can be free."

Right after launch, paid coloring pages went too:

> "For now, please remove the paid coloring pages."

Later I also decided on no ads before, during, or after coloring (not yet in the live version).

## 5. Five name changes

| When | Name |
|---|---|
| Aug 13 | PBN Paint (working title) |
| Aug 20 | Memory Canvas |
| Aug 29 | OshiColor |
| Aug 31 | MyAtelier |
| Sep 8 | **Artherapy** |
| Sep 27 | **大人の塗り絵 Artherapy** ("Adult Coloring Artherapy") |

Artherapy — from "Art is therapy" — was decided the night I first submitted:

> "Artherapy is better. Let's go with that."

You can't change an app's name while it's in review, so I pulled my own fresh submission, renamed it, and resubmitted the next day.

For the icon, I insisted it show at a glance that a photo becomes a coloring page. AI's versions kept dropping the arrow, so I made the final one myself. The subject is my dog.

![The Artherapy icon: a photo of a dog turning into a numbered coloring page](/images/blog/2026-09-30-artherapy-journey/icon.png)

## 6. Submission to launch (Sep 8–13)

- **Sep 8, evening**: first submission. Bounced right away by a privacy configuration error; fixed and resubmitted the same night
- **Sep 8–9**: pulled it myself to rename, resubmitted the next day
- **Sep 9**: Apple asked for more information — not a rejection. I sent a screen recording from a real device and answers to their questions
- **Sep 13, morning**: approved and released

26 days from idea to first submission, 31 to launch.

![App Store screenshots for version 1.0 (in Japanese): your photo becomes a coloring page / place colors by number / paint that builds up / your coloring time becomes a video / line art and blank canvases too](/images/blog/2026-09-30-artherapy-journey/store_1_0.jpg)

## 7. Real users overturned my own judgment (Sep 14–16)

Feedback arrived right after launch. The heaviest:

- Trying to move the picture with one finger paints it instead — people panicked

During development I'd decided that since you can pan with two fingers, one-finger panning wasn't needed. Real users didn't get that.

> "The user's point #2 (one finger paints, people panic) — I think that's the top priority."

We added a hand tool (pan with one finger, no painting) and an eraser, and reconsidered which pages to cut:

> "Pages with few regions aren't a problem. The bigger issue may be that most pages have so many regions that users can't finish them."

Version 1.1 with these changes was submitted on September 16.

## 8. Rebuilding the positioning (Sep 27–29)

Even before launch, I'd felt that shipping as-is meant offering "almost the same value as the competition." Two weeks after launch, I went back to it:

> "Turning photos into coloring pages is something any app could copy quickly if they wanted to. It's not very original."

And then to the question that matters most:

> "It's not clear who's going to pay. We started with the concept of turning photos into coloring pages, but that need is probably pretty small."

What came out of it:

- **Name**: 大人の塗り絵 Artherapy — "Adult Coloring" first, since that's what people search for
- **One line**: 10 minutes a day to unwind, with coloring
- **Who**: women in their 30s to 50s who play puzzle games on their phones — turning idle time into time that rests the mind
- **Promises**: lots of pages you can finish in 10 or 20 minutes / real paint-by-numbers from your own photos / no ads while you color

Photo conversion came off the headline but stayed as one of the promises. Instead of rebuilding the app, a "10-minute session" now wraps around the coloring screen.

## What's left after the journey

- **Dropped**: physical kits, regenerating photos, dual modes, paid pages, and "turns your photo into a coloring page" as the headline
- **Kept**: the person must never look like someone else, easy coloring, and nothing that interrupts coloring time

Next: how I plan to grow it with this positioning, without paid ads — [Growing a coloring app with zero ad spend: the plan](/en/blog/2026-09-30-artherapy-growth-plan)
