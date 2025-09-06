---
# the default layout is 'page'
icon: fas fa-info-circle
order: 4
title: Hello there 👋
---

I'm Shiraz, a broadcast IT engineer 📡 by day and a systems administrator & cybersecurity enthusiast by night <i class="fa-solid fa-moon"></i> This site is where I document the interesting projects I work on, share solutions to tricky problems, and collect technical resources that I've found genuinely useful.

## What You'll Find

A mix of practical guides, project write-ups, troubleshooting solutions, and reference materials covering broadcast engineering, networking, systems administration, and software development. Think of it as my digital workshop notes, the stuff I actually use and refer back to.

## How It's Organised

I've structured everything using a two-tier category system to help you find what you're looking for:

### Content Types
- **[Guides][guides]** - Step-by-step instructions for getting things done
- **[Projects][projects]** - Documentation of my software and hardware adventures
- **[Reference][reference]** - Cheat sheets, lookup tables, and technical specs I keep handy
- **[Solutions][solutions]** - Fixes for problems that made me want to throw my laptop out the window

### Technical Areas
- **[Broadcast Engineering][broadcast-engineering]** - TV infrastructure, equipment, and standards
- **[Software Development][software-development]** - Programming projects and development tools
- **[System Administration][system-administration]** - OS management, configuration, and keeping servers happy
- **[Networking][networking]** - Network protocols, configurations, and architecture
- **[Web Tools][web-tools]** - Browser-based utilities and web technologies

## Get in Touch

{% assign email = site.social.email | split: '@' %}
You can find me on [GitHub][github] where I share my open source work, connect with me on [LinkedIn][linkedin], or drop me an <a href="javascript:location.href = 'mailto:' + ['{{ email[0] }}','{{ email[1] }}'].join('@')">email</a> for anything else.

## Technical Bits

This site runs on Jekyll and works as a progressive web application. Pages you visit get cached for offline reading (handy for reference materials). There's also a comment system powered by Giscus if you want to discuss the technical content or share your own experiences.

[categories]: /categories
[guides]: /categories/guides
[projects]: /categories/projects
[reference]: /categories/reference
[solutions]: /categories/solutions
[broadcast-engineering]: /categories/broadcast-engineering
[software-development]: /categories/software-development
[system-administration]: /categories/system-administration
[networking]: /categories/networking
[web-tools]: /categories/web-tools
[github]: https://github.com/smcclennon
[linkedin]: https://www.linkedin.com/in/smcclennon
