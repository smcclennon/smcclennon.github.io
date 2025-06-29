---
title: Davinci Resolve Linux Troubleshooting
description: >-
  A quick reference guide for using DaVinci Resolve on Fedora Linux, including download links and solutions for common dependency issues, such as symbol lookup errors caused by outdated libraries.
author: smcclennon
date: 2024-04-07 00:46:00 +0000
last_modified_at: 2024-04-07 00:46:00 +0000
categories: [Solutions, System Administration]
tags: [linux, fedora, command-line]
---

## Links
- Latest DaVinci Resolve download links: [DaVinci Resolve and Fusion Support](https://www.blackmagicdesign.com/support/family/davinci-resolve-and-fusion)

## Fedora Linux dependency issues

### resolve: symbol lookup error
- Example 1: `/lib64/libpango-1.0.so.0: undefined symbol: g_string_free_and_steal`
- Example 2: `/lib64/libgdk_pixbuf-2.0.so.0: undefined symbol: g_task_set_static_name`
- **Explanation**: Blackmagic bundles outdated Glib with Resolve
- **Solution**: Backup Resolve library folder and delete outdated libraries (`libglib`, `libgio`, `libgmodule`, `libgobject`) from Resolve libraries folder so the application falls back to updated system libraries
- **Command**: `sudo cp -r /opt/resolve/libs /opt/resolve/libs_backup && sudo rm /opt/resolve/libs/{libglib-2.0.so,libgio-2.0.so,libgmodule-2.0.so,libgobject-2.0.so}*`
- Source: [r/Fedora 2023-07](https://www.reddit.com/r/Fedora/comments/12z32r1/davinci_resolve_libpango_undefined_symbol_g/)
