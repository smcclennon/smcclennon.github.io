---
title: Reverse engineering Bose speaker connector to use as a test amplifier
description: >-
  Investigating a strange distortion in my new bookshelf speakers by reverse engineering a Bose home entertainment system's proprietary speaker connectors to use as a test amplifier.
author: smcclennon
date: 2025-10-26 22:23:00 +0100
last_modified_at: 2025-10-26 22:23:00 +0100
categories: [Projects, Electronics]
tags: [repair, hardware]
media_subpath: '/posts/20251026'
image:
  path: scope_between_ms.webp
  alt: 'Mordaunt-Short MS3.10 speakers either side of Zoyi ZT-703S oscilloscope measuring 200Hz off of Bose speaker connector'
---

## My first bookshelf speakers!

I had recently bought my very first pair of bookshelf speakers, a second-hand pair of Mordaunt-Short MS3.10 speakers, and a cheap SPL300 amplifier to power them.

I was really enjoying the sound of the speakers, a huge improvement from the the 2 pairs of cheap Logitech computer speakers I had been running off a minijack splitter for years prior.

### The heartbreak

However, as I went through rediscovering my music collection through these Mordaunt-Shorts, I began noticing a strange distortion in certain parts of certain songs. Panning the audio in either direction seemed to remove the distortion, so I began to suspect that my amplifier was unable to drive both speakers at the same time, despite it being rated for 150W per channel (though no mention of this was RMS or peak power).

But unfortunately, as this was my first time dabbling in the world of passive speakers, I didn't have a spare amplifier to test this theory. I was thinking of speaking to my wonderful audio engineering colleagues at work to see if they had any spare portable amplifiers I could borrow, but work has been unusually busy so this was not yet possible.

## Bose DVD player

And then it hit me. There's an old Bose 3-2-1 home entertainment system in the living room, which is essentially a DVD player, subwoofer and two small midrange speakers. That DVD player is probably an amp, right?

![](bose_dvdplayer_rear.webp)
*Bose DVD player rear panel. Please excuse the dust*

Turns out, no, it's not. And it doesn't even look like it's got a power input... What?

Well you see that very proprietary-looking connector labelled 'Acoustimass Module' on the back of the DVD player? That goes to the subwoofer, supposedly providing audio to it. And taking power from it. The digital signal processor (DSP) (part that makes the tiny Bose speakers sound not terrible) could be within the subwoofer too as the stereo speakers are fed by the subwoofer via a D9 breakout cable into yet more proprietary connectors.

![](bose_subwoofer_rear.webp)
*Bose subwoofer rear. Yes I know this is a silly angle.*

This proprietary connector is what I was most interested in today, as if it can drive the Bose speakers, it may be able to drive my Mordaunt-Shorts too.

Here's the connector, a simple 4-pin design:

![](bose_speaker_connector.webp)
*Proprietary Bose 4-pin speaker connector*

The keen-eyed amongst you may have noticed that the connector actually looks like it has 8 female pins. However, in testing only the top 4 larger holes carry any signal and are also the ones which mate with the male pins on the speaker.

But even so, why 4 pins? I was concerned that two may be to power a little amplifier within the speaker, and the other two to carry a line-level audio signal, meaning no way to drive my Mordaunt-Shorts.

However, luckily this was not the case. Instead, each pair of pins actually carries speaker-level audio signals to the two drivers within the speaker.

![](bose_speaker.webp)
*Bose speaker (2 drivers beneath the grill)*

I tested this by using a signal generator app on my phone to produce a 200Hz sine wave (initially tried a lower frequency, but the cutoff from the subwoofer is quite high so 200Hz was necessary to get a strong signal).

![](tsg_200hz.webp)
*[Signal Generator](https://f-droid.org/packages/org.billthefarmer.siggen/) Android app producing 200Hz sine wave audio tone*

This was then connected to one of the Bose DVD player's inputs, that input was selected and voilà, the amplifier (presumably within the subwoofer) sent a speaker-level 200Hz sine wave up to the speaker which I read with an oscilloscope by inserting a couple of breadboard jumper wires into the speaker connector. And then made all the other findings about the speaker connector which I have just told you about :)

![](bose_speaker_connector_200hz.webp)
*Zoyi ZT-703S oscilloscope measuring 200Hz sine wave off of Bose speaker connector*

![](scope_200hz.webp)
*Screenshot of Zoyi ZT-703S oscilloscope measuring 200Hz sine wave off of Bose speaker connector*

Using some more jumper wires, I was able to connect the Bose speaker connector to my Mordaunt-Short speakers and as I had hoped, I heard the 200Hz sine wave!

To tell the truth, I didn't measure the impedance of the Bose speakers and compare it to the impedance of my Mordaunt-Shorts beforehand, but was careful with the amplifier level to avoid blowing anything up.

![](bose_speaker_connector_ms.webp)
*Bose speaker connector connected to Mordaunt-Short MS3.10 speakers via breadboard jumper wires*

I then connected the other Mordaunt-Short speaker to the other Bose speaker connector and began to listen to some music.

## Findings

Unfortunately, the distortion was still present, and with this better listening position in the living room, I could much more easily identify another issue in the stereo imaging. The right channel had no highs.

Upon further investigation, I found that the right channel's tweeter was not working, and that the left channel's tweeter had a crack in it, likely causing the distortion at certain frequencies.

Sorry for doubting you, SPL300 amplifier!

![](ms_tweeter_damage.webp)
*Mordaunt-Short MS3.10tweeter damage*

## Closing thoughts

One day I may attempt to reverse engineer the Acoustimass connector to truly understand what is handled by the DVD player and what is handled by the subwoofer. But for now, I'm happy to know my SPL300 amplifier is probably not the problem, and that I can always use this old home entertainment system as a test amplifier in future. Goodbye Mordaunt-Shorts, I'll never forget you!
