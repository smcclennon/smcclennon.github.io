---
title: How to Bulk Download Tracks from Hearthis.at
description: >-
  Learn how to efficiently bulk download music tracks, mixes, and podcasts from Hearthis.at using a simple browser script. This guide walks you through the process step-by-step, explains why it works, and covers important ethical considerations for responsible downloading.
author: smcclennon
date: 2025-04-23 00:02:00 +0000
last_modified_at: 2025-04-23 00:02:00 +0000
categories: [Guides, Web Tools]
tags: [javascript, automation, browser-tools, audio, web-scraping, downloading]
media_subpath: '/posts/20250423'
---

Looking to download your favourite DJ's entire mix collection or archive a podcast series for offline listening? This guide will show you how to efficiently download content from [Hearthis.at][hearthis] in just a few clicks.

> This guide only works for tracks where artists have enabled downloads. Use for personal purposes only.
{: .prompt-info }

## What is Hearthis.at?

[Hearthis.at][hearthis] is a German music hosting and streaming service for independent musicians, DJs, and podcasters. With over 1.1 million audio files from more than 350,000 registered users worldwide[^acrcloud_blog_hearthis], it has become a valuable alternative to mainstream platforms, particularly for content like DJ mixes, radio shows, and live recordings.

Unlike Spotify, Apple Music, and other major streaming services that typically restrict downloading[^drm_restriction], Hearthis.at takes a more open approach by allowing creators to enable direct downloads of their work. This creator-friendly policy makes it an important platform in the electronic music community and for content creators who want more control over how their work is distributed.

## Why Bulk Download from Hearthis.at?

Hearthis.at already offers a download feature for tracks that creators have made available for download. However, this native functionality only allows you to download one track at a time. This becomes incredibly tedious if you're trying to:

- Archive an artist's entire catalogue of potentially hundreds of mixes
- Download an entire podcast series with multiple episodes
- Back up all of your own uploaded content
- Save a curated playlist for offline listening while travelling
- Create a collection of reference tracks for research or DJ sets

> Unlike services with DRM[^drm_restriction], Hearthis.at allows truly unrestricted downloads of enabled tracks. You own the file.
{: .prompt-tip }

The bulk download method we'll be exploring simply automates what you could do manually by clicking each download button, saving you considerable time and effort.

## Who This Guide Is For

This guide will be particularly useful for:

- Music enthusiasts who want to archive collections from favourite artists
- Podcast listeners looking to download series for offline consumption
- Researchers collecting audio content for academic purposes
- DJs creating personal archives of inspiration material
- Content creators backing up their own uploaded material

> Always follow Hearthis.at's [Terms of Service][hearthis_tos][^hearthis_tos] when using this method.
{: .prompt-danger }

## Step-by-Step Guide to Bulk Downloading from Hearthis.at

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- Basic comfort with using browser developer tools
- Sufficient storage space on your device

### The Process

1. **Navigate to the Artist's Profile**
   
   First, visit Hearthis.at and navigate to the profile page of the artist whose content you wish to download.

2. **Load All Content**
   
   Scroll down to the bottom of the page until all tracks are loaded. This is important as the script we'll use can only download content that's visible on the page.

   > For artists with many uploads, you may need to scroll several times until no more tracks appear.
   {: .prompt-info }

3. **Open Browser Console**
   
   Press `F12` on your keyboard to open the browser's developer tools, then click on the 'Console' tab.

4. **Run the Download Script**
   
   Copy and paste the following JavaScript code into the console, then press Enter:

   ```js
   // Get all elements containing download links
   dl_elements = document.getElementsByClassName('no-ajaxloader download_fct playlist_fct download_payed')

   // Click all download links
   for (var i = 0; i < dl_elements.length; i++) {dl_elements[i].click();}
   ```

   > This script may stop working if Hearthis.at changes their site design. Last tested: April 2025.
   {: .prompt-warning }


   
   > If nothing happens, check for a popup blocking notification in your browser.
   ![Browser popup blocking notification](prevented-pop-up.png)
   *Example of a browser blocking downloads as popups*
   {: .prompt-warning }

## Important Considerations

### File Management

Depending on the number of tracks you're downloading, you may want to create a specific folder to organise the files. Most browsers will download to your default downloads folder, which can quickly become cluttered.

### Bandwidth and Storage

Be mindful of the size of the files you're downloading. Audio files, especially high-quality ones, can quickly consume storage space and bandwidth. Ensure you have sufficient space on your device before initiating a bulk download.

### Handling Large Collections

If an artist has hundreds of tracks, you might want to consider:
- Downloading in smaller batches to manage the load on your browser
- Using a download manager to organise the process
- Setting up a dedicated folder structure to keep content organised

> If your browser becomes unresponsive during large download batches, try reducing the number of tracks loaded on the page before running the script.
{: .prompt-warning }

## Why This Works: Technical Explanation

For the more technically inclined, this method works because Hearthis.at doesn't implement DRM protection on downloadable content. While the platform provides download buttons for tracks that creators have made available, it doesn't offer a 'download all' or batch download option.

The JavaScript snippet we're using doesn't bypass any restrictions or access protected content. Instead, it:

1. Identifies all elements on the page with specific class names (`no-ajaxloader download_fct playlist_fct download_payed`) that correspond to the standard download buttons
2. Programmatically 'clicks' each button in sequence
3. Allows your browser to handle the downloads through its normal download mechanism

This automation simply saves you from having to manually click dozens or hundreds of download buttons individually. The script respects the platform's intended functionality while making it more efficient for legitimate use cases.

## Conclusion

Bulk downloading from Hearthis.at can be a useful way to archive content for legitimate personal use. Our approach simply extends the existing download functionality of the platform by automating the otherwise tedious process of clicking individual download buttons.

This is particularly valuable when:
- You're trying to archive the complete works of a favourite artist
- You need offline access to a large collection of tracks
- You want to back up your own uploads for safekeeping

> If you enjoy an artist's work, please support them through plays, follows and purchases.
{: .prompt-info }

I hope this guide helps you better manage and enjoy your audio collection. Happy listening!

## References & Notes
[^acrcloud_blog_hearthis]: Based on statistics from a [post by Benedikt Groß][acrcloud_blog_hearthis], founder of Hearthis.at.
[^drm_restriction]: These platforms use Digital Rights Management (DRM) technology to prevent files from being transferred between devices or used outside the official app. This means 'downloaded' content can only be accessed through the platform's application and cannot be moved to other devices or media players. This is restrictive for DJs and producers who need to use tracks in their software, performances, or projects, especially when they need to modify tracks.
[^hearthis_tos]: The full terms of service can be found at the [Hearthis.at legal page][hearthis_tos].

[acrcloud_blog_hearthis]: https://blog.acrcloud.com/avoid-copyright-infringement-generate-tracklist-mixes-mashups-music-streaming-services
[hearthis]: https://hearthis.at
[hearthis_tos]: https://hearthis.at/impressum
