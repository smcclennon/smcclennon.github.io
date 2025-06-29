---
title: Byobu Keyboard Shortcuts Cheat Sheet
description: >-
  Complete keyboard shortcuts reference for byobu terminal multiplexer, organised by function for efficient terminal session management.
author: smcclennon
date: 2025-06-24 04:17:00 +0100
last_modified_at: 2025-06-24 04:17:00 +0100
categories: [Reference, System Administration]
tags: [terminal, keyboard-shortcuts]
media_subpath: '/posts/20250624'
image:
  path: 'byobu-split.png'
  alt: 'Byobu split pane example'
---

[Byobu](https://www.byobu.org/) is a GPLv3 open source text-based window manager and terminal multiplexer that provides elegant enhancements to GNU Screen and Tmux. Originally designed for Ubuntu server distribution, byobu now works across most Linux, BSD, and Mac distributions, offering system status notifications, convenient keybindings, and configuration utilities.

## Why Choose Byobu?

**Over Standard Terminal/SSH:**
- **Multiple sessions in one terminal** - Run multiple commands simultaneously without opening new terminal windows
- **Persistent sessions** - Sessions survive network disconnections and can be reattached later
- **System monitoring** - Built-in status bars showing CPU, memory, network, and system information
- **Enhanced productivity** - Quick window/pane switching, copy/paste functionality, and session management

**Over Plain Screen/Tmux:**
- **Pre-configured** - Works out of the box with sensible defaults and attractive status bars
- **User-friendly** - F-key shortcuts instead of complex key combinations
- **Status notifications** - Real-time system information without additional configuration
- **Modern interface** - Clean, informative display with customisable colours and layouts

## Installation

Byobu is available in most major Linux distributions:

| Distribution  | Install Command              |
| ------------- | ---------------------------- |
| Debian/Ubuntu | `sudo apt-get install byobu` |
| Fedora/RHEL   | `sudo dnf install byobu`     |
| Arch Linux    | `sudo pacman -S byobu`       |
| Alpine Linux  | `apk add byobu`              |
| macOS         | `brew install byobu`         |
| FreeBSD       | `sudo pkg install byobu`     |

Basic usage:

| Command        | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| `byobu`        | Launch byobu manually                                                |
| `byobu-enable` | Enable byobu by default for SSH sessions (adds `byobu` to `.bashrc`) |

## Keyboard Shortcuts Reference

> Byobu's default escape sequence is `Ctrl+a`. If you've customised yours, replace `Ctrl+a` throughout this guide. Check current setting: `F9` → 'Change escape sequence'.
{: .prompt-info }

### Help & Information

| Shortcut   | Action       | Notes                               |
| ---------- | ------------ | ----------------------------------- |
| `Shift+F1` | Display help | Show most common keyboard shortcuts |

### Window Management

| Shortcut                          | Action                      | Notes                           |
| --------------------------------- | --------------------------- | ------------------------------- |
| `F2`                              | Create new window           | Opens a new terminal window/tab |
| `F8`                              | Rename current window       | Change the window title         |
| `Ctrl+Shift+F3` / `Ctrl+Shift+F4` | Move a window               | Reorder windows left/right      |
| `Ctrl+a k`                        | Kill current window         | Closes the active window        |
| `Alt+F11`                         | Expand split to full window | Convert pane to separate window |

### Window Navigation

| Shortcut     | Action                   | Notes                             |
| ------------ | ------------------------ | --------------------------------- |
| `F3` / `F4`  | Move focus among windows | Cycle through windows             |
| `Ctrl+a 0-9` | Switch to window N       | Direct window access by number    |
| `Ctrl+a "`   | List all windows         | Interactive window selection menu |

### Session Management

| Shortcut              | Action                       | Notes                             |
| --------------------- | ---------------------------- | --------------------------------- |
| `Ctrl+Shift+F2`       | Create new session           | Start a new byobu session         |
| `Ctrl+F8`             | Rename current session       | Change the session name           |
| `Alt+Up` / `Alt+Down` | Move focus among sessions    | Switch between byobu sessions     |
| `F6`                  | Detach session and logout    | Leave session running, exit shell |
| `Shift+F6`            | Detach session, don't logout | Leave session running, keep shell |

### Split Management (Panes)

| Shortcut                       | Action                            | Notes                           |
| ------------------------------ | --------------------------------- | ------------------------------- |
| `Shift+F2`                     | Create horizontal split           | Create pane below current pane  |
| `Ctrl+F2`                      | Create vertical split             | Create pane beside current pane |
| `Ctrl+F6`                      | Kill split in focus               | Close the active pane           |
| `Ctrl+F11`                     | Join window into vertical split   | Convert window to split         |
| `Ctrl+F3` / `Ctrl+F4`          | Move a split                      | Reposition current pane         |
| `Shift+Alt+Left/Right/Up/Down` | Resize a split                    | Adjust pane boundaries          |
| `Shift+F8`                     | Toggle through split arrangements | Cycle through layout presets    |
| `Ctrl+Shift+F8`                | Save current split-pane layout    | Store layout for later          |
| `Alt+Shift+F8`                 | Restore a split-pane layout       | Load previously saved layout    |

### Split Navigation

| Shortcut                   | Action                  | Notes                              |
| -------------------------- | ----------------------- | ---------------------------------- |
| `Shift+F3` / `Shift+F4`    | Move focus among splits | Navigate between panes             |
| `Shift+Left/Right/Up/Down` | Move focus among splits | Arrow key navigation between panes |
| `Shift+F11`                | Zoom into/out of split  | Toggle pane maximisation           |
| `Ctrl+a Tab`               | Focus next split        | Alternative pane switching         |
| `Ctrl+a o`                 | Focus next split        | Screen-style pane switching        |
| `Ctrl+a z`                 | Toggle pane zoom        | Alternative zoom (tmux backend)    |

### Profile & Status Management

| Shortcut        | Action                            | Notes                            |
| --------------- | --------------------------------- | -------------------------------- |
| `F5`            | Reload profile, refresh status    | Update configuration and display |
| `Shift+F5`      | Toggle through status lines       | Cycle status bar visibility      |
| `Ctrl+F5`       | Reconnect SSH/GPG/D-Bus sockets   | Refresh authentication           |
| `Ctrl+Shift+F5` | Change status bar colour randomly | Randomise status bar appearance  |

### Copy & Paste Mode (Scrollback)

| Shortcut                | Action                            | Notes                                             |
| ----------------------- | --------------------------------- | ------------------------------------------------- |
| `F7`                    | Enter scrollback history          | Navigate terminal history                         |
| `Alt+PgUp` / `Alt+PgDn` | Enter and move through scrollback | Alternative scrollback access                     |
| `Shift+F7`              | Save history to file              | Export scrollback to `$BYOBU_RUN_DIR/printscreen` |
| `Space`                 | Start text selection              | Begin highlighting text (in copy mode)            |
| `Enter`                 | Copy selected text                | Copy highlighted text to buffer                   |
| `Alt+Insert`            | Paste copied text                 | Insert previously copied text                     |
| `Ctrl+a ]`              | Paste copied text                 | Alternative paste method                          |

### Configuration & Advanced Commands

| Shortcut   | Action                     | Notes                                                                |
| ---------- | -------------------------- | -------------------------------------------------------------------- |
| `F9`       | Launch byobu-config        | Access settings and options                                          |
| `Ctrl+F9`  | Run command in all windows | Execute command across all windows and last focused split per window |
| `Shift+F9` | Run command in all splits  | Execute command across all panes on current window                   |
| `Alt+F9`   | Toggle input to all splits | Send keystrokes to all panes on current window simultaneously        |

### Legacy Screen-Style Commands

| Shortcut   | Action            | Notes                        |
| ---------- | ----------------- | ---------------------------- |
| `Ctrl+a c` | Create new window | Screen-style window creation |
| `Ctrl+a n` | Next window       | Screen-style navigation      |
| `Ctrl+a p` | Previous window   | Screen-style navigation      |
| `Ctrl+a A` | Rename window     | Alternative rename method    |

## Workflow Tips

### Efficient Split Management
1. **Create your layout**: Use `Shift+F2` and `Ctrl+F2` to create your desired pane layout
2. **Focus navigation**: Use `Shift+F3`/`Shift+F4` to move between panes quickly
3. **Zoom when needed**: Press `Shift+F11` to focus on one pane, then `Shift+F11` again to return to splits
4. **Clean up**: Use `Ctrl+F6` to remove unwanted panes or `Shift+F11` to combine all

### Session Persistence
1. **Detach safely**: Use `F6` to detach while keeping everything running
2. **Reattach later**: Run `byobu` to reconnect to your session
3. **Multiple sessions**: Use `byobu -S session_name` to create named sessions

### Copy/Paste Workflow
1. **Enter copy mode**: Press `F7` or `Alt+PgUp`
2. **Navigate**: Use arrow keys or Page Up/Down to find content
3. **Select text**: Press `Space`, highlight with arrows, press `Enter`
4. **Paste**: Use `Alt+Insert` or `Ctrl+a ]`


## Customisation

Byobu configuration files are stored in `~/.byobu/`:
- `keybindings.tmux` - Custom key mappings for tmux backend
- `statusrc` - Status bar configuration
- `color.tmux` - Colour scheme customisation

Access the configuration menu with `F9` for guided setup options.

## References

- [Byobu Official Website](https://www.byobu.org/)
- [Byobu Downloads & Installation](https://www.byobu.org/downloads)
- [Byobu Source Code](https://launchpad.net/byobu)
- [Screen Documentation](https://www.gnu.org/software/screen/manual/screen.html)
- [Tmux Documentation](https://github.com/tmux/tmux/wiki)
