---
title: CIFS fstab automount
description: >-
  Mount an SMB/CIFS share from /etc/fstab with a credentials file and systemd automount.
author: smcclennon
date: 2026-10-31 04:00:00 +0000
categories: [Reference, System Administration]
tags: [linux, networking]
---

## CIFS driver

```shell
sudo dnf install cifs-utils
```

## /etc/fstab entry

`//server/share /mnt/mountpoint cifs credentials=/path/to/credentials,uid=1000,gid=1000,file_mode=0777,dir_mode=0777,nofail,x-systemd.automount,x-systemd.requires=network-online.target,x-systemd.after=network-online.target 0 0
`

Options in that line:

- `credentials=/path/to/credentials`: path to a file with the SMB username and password (keeps secrets out of world-readable fstab).
- `uid=1000`: local Linux user ID that owns files on the mount. Removing this usually results in root ownership.
- `gid=1000`: local Linux group ID for files on the mount.
- `file_mode=0660`: Linux permission bits applied to files.
- `dir_mode=0770`: same idea for directories.
- `nofail`: boot continues even if the share is unreachable.
- `x-systemd.automount`: mount on first access rather than at boot.
- `x-systemd.requires=network-online.target` / `x-systemd.after=network-online.target`: wait until the network is up before attempting the mount.

### Finding uid and gid

`id` prints both for the current user (or pass a username):

```shell
id
id someuser
```

Example output: `uid=1000(someuser) gid=1000(someuser) ...`. Use those numbers in `uid=` / `gid=`.

Or read `/etc/passwd`. Each line is `name:x:uid:gid:gecos:home:shell`, so the third field is uid and the fourth is gid:

```shell
getent passwd someuser
# someuser:x:1000:1000:Some User:/home/someuser:/bin/bash
```

## Credentials file

For example, `/root/.mountpoint.credentials`:

```text
username=your_username
password=your_password
```

Protect it, then test:

```shell
sudo chmod 600 /root/.mountpoint.credentials
sudo mount -a
```
