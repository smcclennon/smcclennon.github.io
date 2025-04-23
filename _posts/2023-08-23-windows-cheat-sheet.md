---
title: Windows Cheat Sheet
description: >-
  A quick reference for Windows tools and commands used for troubleshooting and system management.
author: smcclennon
date: 2023-08-23 13:43:00 +0000
last_modified_at: 2024-06-08 13:22:00 +0000
categories: [Reference, System Administration]
tags: [windows, command-line]
---

## GUI

| Executable | Name | Purpose |
| --- | --- | --- |
| `mmc.exe` | Microsoft Management Console | Launch 'Device Manager', 'Group Policy Editor', 'Services', 'Task Scheduler' |
| `devmgmt.msc` | Device Manager | View and manage device hardware settings and driver software installed on your computer |
| `gpedit.msc` | Group Policy Editor | Edit the local Group Policy Objects stored on a computer |
| `services.msc` | Services | Start, stop, and configure Windows services |
| `taskschd.exe` | Task Scheduler | Schedule computer tasks to run automatically |
| `lusrmgr.msc` | Local user manager | Manage local users and groups |
| `systempropertiesadvanced` | System properties advanced | Manage hostname, domain, workgroup |

## CLI

| Command | Purpose |
| --- | --- |
| `dism /Online /Cleanup-image /Restorehealth` | Scan the image for component store corruption and perform repair operations automatically |
| `sfc /scannow` | Scans integrity of all protected system files and repairs files with problems when possible |
| `shutdown -t 0 -r -o` | Windows Recovery |
| `shutdown -t 0 -r -fw` | Windows UEFI/BIOS |
| `netsh wlan show profiles name='SSID' key=clear` | View saved WiFi password |
| `netsh interface ipv4 set address` | Set adapter IP address |
| `netsh interface ipv4 show interfaces` | List interface status |
| `oobe\bypassnro` | Press `Shift + F10` within Windows 11 installer to launch terminal and skip Microsoft account requirement with this command |

## Powershell

| Command | Purpose |
| --- | --- |
| `Get-SmbConnection` | List SMB network shares more reliably than via `net use` |

- Eject optical disc tray: `powershell (New-Object -com "WMPlayer.OCX.7").cdromcollection.item(0).eject()`

