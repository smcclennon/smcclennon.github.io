---
title: Windows Cheat Sheet
description: >-
  A quick reference for Windows tools and commands used for troubleshooting and system management.
author: smcclennon
date: 2023-08-23 13:43:00 +0000
last_modified_at: 2025-10-19 22:43:00 +0100
categories: [Reference, System Administration]
tags: [windows, command-line]
---

There are several constants in our universe, such as the gravitational constant, the speed of light, and Windows' search returning results inversely proportional to their relevance.

To bypass this eternal frustration, here's a collection of commands to help you quickly access Windows configuration tools and get things done.

## GUI

Commands to directly open Windows management graphical interfaces and panels which usually require lots of navigation to get to. It is recommended to launch these via Run (`Win`+`R`) to avoid the start menu launching an unhelpful Bing search.

| Executable                 | Name                         | Purpose                                                                                 |
| -------------------------- | ---------------------------- | --------------------------------------------------------------------------------------- |
| `mmc.exe`                  | Microsoft Management Console | Launch 'Device Manager', 'Group Policy Editor', 'Services', 'Task Scheduler'            |
| `devmgmt.msc`              | Device Manager               | View and manage device hardware settings and driver software installed on your computer |
| `gpedit.msc`               | Group Policy Editor          | Edit the local Group Policy Objects stored on a computer                                |
| `ncpa.cpl`                 | Network Connections          | Control panel network adapters / connections                                 |
| `services.msc`             | Services                     | Start, stop, and configure Windows services                                             |
| `taskschd.exe`             | Task Scheduler               | Schedule computer tasks to run automatically                                            |
| `lusrmgr.msc`              | Local user manager           | Manage local users and groups                                                           |
| `systempropertiesadvanced` | System properties advanced   | Manage hostname, domain, workgroup                                                      |


## CLI

Command-line tools which can be run from Command Prompt or PowerShell. Launch Command Prompt via Run (`Win`+`R` then type `cmd`).

| Command                                                         | Purpose                                                                                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `dism /Online /Cleanup-image /Restorehealth`                    | Scan the image for component store corruption and perform repair operations automatically                                   |
| `sfc /scannow`                                                  | Scans integrity of all protected system files and repairs files with problems when possible                                 |
| `shutdown -t 0 -r -o`                                           | Boot into Windows Recovery                                                                                                  |
| `shutdown -t 0 -r -fw`                                          | Boot into UEFI/BIOS                                                                                                         |
| `netsh wlan show profiles name='SSID' key=clear`                | View saved WiFi password                                                                                                    |
| `netsh interface ipv4 set address`                              | Set adapter IP address                                                                                                      |
| `netsh interface ipv4 show interfaces`                          | List interface status                                                                                                       |
| `oobe\bypassnro`                                                | Press `Shift + F10` within Windows 11 installer to launch terminal and skip Microsoft account requirement with this command |
| `wmic path SoftwareLicensingService get OA3xOriginalProductKey` | View Windows 10/11 product key / license key                                                                                |

## PowerShell

Command-line tools which are only supported by PowerShell. Launch PowerShell via Run (`Win`+`R` then type `powershell`).


| Command                                                              | Purpose                                                  |
| -------------------------------------------------------------------- | -------------------------------------------------------- |
| `Get-SmbConnection`                                                  | List SMB network shares more reliably than via `net use` |
| `(New-Object -com "WMPlayer.OCX.7").cdromcollection.item(0).eject()` | Eject optical disc tray. Easily locate a computer in a server room                                  |
| `Set-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem' -Name LongPathsEnabled -Type DWord -Value 1` | Enable long paths on Windows 10/11 |

> For more Windows command line utilities, see [Windows & POSIX CLI Reference](/posts/windows-posix-cli/)
{:.prompt-info}