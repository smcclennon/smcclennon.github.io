---
title : Davinci Resolve Notes
feed: show
date : 06-04-2024
---

## Fedora Linux dependency issues

- Error 1: `/opt/resolve/bin/resolve: symbol lookup error: /lib64/libpango-1.0.so.0: undefined symbol: g_string_free_and_steal`
- Error 2: `/opt/resolve/bin/resolve: symbol lookup error: /lib64/libgdk_pixbuf-2.0.so.0: undefined symbol: g_task_set_static_name`...
- **Explanation**: Blackmagic bundles outdated Glib with Resolve
- **Solution**: Backup Resolve library folder and delete outdated libraries (`libglib`, `libgio`, `libgmodule`, `libgobject`) from Resolve libraries folder so the applicataion falls back to updated system libraries
- **Command**: `sudo cp -r /opt/resolve/libs /opt/resolve/libs_backup && sudo rm /opt/resolve/libs/{libglib-2.0.so,libgio-2.0.so,libgmodule-2.0.so,libgobject-2.0.so}*`
- Source: [r/Fedora 2023-07](https://www.reddit.com/r/Fedora/comments/12z32r1/davinci_resolve_libpango_undefined_symbol_g/)