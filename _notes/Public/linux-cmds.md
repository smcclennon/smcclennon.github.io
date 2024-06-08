---
title : Handy Linux Commands
feed: show
date : 08-06-2024
---

# SSH

- Custom port: `ssh username@hostname.com -p 1234`
- Local port forwarding: `ssh -L client_port:localhost:server_port -L 9999:localhost:80`

> _Forwards specified server ports to client through ssh tunnel. Client port forwarded to can be customised. Multiple_ `-L` _arguments can be used._

* Dynamic port forwarding: `ssh -D 80`

> _Forwards all server ports to client through the ssh tunnel, does not work if port is already in use on the client_

# Screen

- List screens: `screen -list`
- Name a new screen with a sockname: `screen -S sockname`
- Resume detatched screen: `screen -r sockname`
- Scroll up and down in copy mode: `Ctrl+a, Esc`
- Detatch from screen: `Ctrl+a, d`

# Podman

- Download image: `podman pull image_repo`
- List images: `podman images`
- Run image: `podman run -dt image_repo/image_id`

> `-d` Detatch, `-t` Create TTY interface

- Attach: `podman attach container_id`
- Detatch: `Ctrl+p, Ctrl+q`

# Firewall

> Most of these commands require root

- Check for open ports: `ss -plnt | grep :80`
- List zones: `firewall-cmd --get-zones`
- List active zones: `firewall-cmd --get-active-zones`
- List all zone information: `firewall-cmd --list-all-zones`
- List zone information for current or specified zone: `firewall-cmd --list-all`
- List services: `firewall-cmd --list-services`
- List interfaces: `firewall-cmd --list-interfaces`
- List zone information: `firewall-cmd --zone=public --list-all`
- Add port to zone: `firewall-cmd --zone=internal --add-port 80/tcp`

> _This change will apply immediately, but will not persist once the firewall is reloaded_

- Make change permanently: `firewall-cmd --add-port 1234 --permanent`

> _Changes won’t be applied to the live firewall. Apply them by reloading the firewall with_ `firewall-cmd --reload`

- Add service to zone: `firewall-cmd --zone=public --add-service=syncthing`

# DNF

> Most of these commands require root

- Add repo: `dnf config-manager --add-repo repository_url`
- Enable repo: `dnf config-manager --set-enabled repository`
- Disable repo: `dnf config-manager --set-disabled repository`
- List enabled repos: `dnf repolist`

# Vim plug

- Install plugin: `:PlugInstall name`
- Update vimplug: `:PlugUpgrade`

# Linux file permissions

> Groups are used with file permissions: `chown user:group`

> These commands require root

- Create new group: `groupadd group_name`
- Add user to a group: `gpasswd -a user group_name`
- List groups: `getent group`
- List users of a group: `getent group group_name`
- List users: `getent passwd`
- List groups of a user: `groups user`
- chmod -R g+w /your/directory
- <https://www.guru99.com/file-permissions.html>

> 4 = Read, 2 = Write, 1 = Execute
>
> 5=rx, 6=rw, 7=rwx
>
> Execute permissions are used to traverse a directory

## Online users

- List online user PTS: `who`

> shiraz pts/0 2022-01-02 20:55 (192.168.1.11)

- Find user PID from PTS: `ps -dN|grep pts/1`

> 1885493 pts/1 00:00:00 zsh

- Logged in usernames: `users`

> shiraz shiraz

- Detailed list of login history: `last`

# File handling

- Backup config file: `rename .conf ".conf_backup" /etc/nginx/conf.d/ptero.conf`
- Unbackup config file: `rename _backup ““ /etc/nginx/conf.d/ptero.conf`
 Find an indexed file quickly: `locate filename` (Note: `locate` relies on a pre-built database, which can be updated using `updatedb` to include recent files)

# Grub on RedHat

- Edit grub options: `sudo vim /etc/default/grub`
- Find grub config directory: `sudo readlink -e /etc/grub2-efi.cfg`

> Return example: `/boot/efi/EFI/rocky/grub.cfg`

- Regenerate and replace grub config: `sudo grub2-mkconfig --output /boot/efi/EFI/rocky/grub.cfg`

> **_Never_** directly edit the grub configuration. Regenerate it automatically instead

# String manipulation

## Regex

- Any digit (\[0-9\]): `\d`
- Any NON digit: `\D`
- Any word character: `\w`
- Any NON word character: `\W`
- Any single character: `.`
- A single character of: `[abc]`
- A character except: `[^abc]`
- A character in range: `[a-z]`
- Zero or one of a: `a?`
- Zero or more of a: `a*`
- One or more of a: `a+`
- Exactly 3 of a: `a{3}`
- 3 or more of a: `a{3,}`
- Exactly 3 to 6 of a: `a{3,6}`
- Start of a string: `^`
- End of a string: `$`
- OR: `(sample1|sample2)`
- Match previous token one or more times: `+`
- Match previous token zero or more times: `*`

## Text search (grep)

- After context: `-A 5`
- Before context: `-B 5`
- After and before context: `-C 5`
- Exclude: `-v string_to_exclude`

> Usage: `dnf history | grep install | grep -v akmods`

- Compare command outputs: `diff <(command1) <(command2)`

# GPU

- List available GPU: `lspci -nn | egrep -i "3d|display|vga"`
- List available GPU details: `lshw -C display`

# Clear space

- Remove unused packages: `dnf autoremove`
- Clear cache etc: `dnf clean all`
- View system journal size: `journalctl --disk-usage`
- Trim system journal: `journalctl --vacuum-time=3d`
- View thumbnail cache size: `du -sh ~/.cache/thumbnails`
- Clear thumbnail cache: `rm -rf ~/.cache/thumbnails/*`
- Flatpak list largest: `flatpak --columns=name,size,application,version,description list`
- Remove unused flatpaks: `flatpak uninstall --unused --delete-data`
- List largest dnf packages: `rpm -qa --queryformat '%10{size} - %-25{name} \t %{version` \n `' | sort -n`

# Output

- Print all: `cat file`
- Print first 10 lines: `head -n 10 file`
- Print last 10 lines: `tail -n 10 file`
- Select 1st column: `cut -c1`
- Monitor command output: `watch -n1 lspci`

> Every 1 second, clear screen and print output of `lspci`

# Grubby

- Show info for specific kernel (index '0', which is usually the latest & default): `sudo grubby --info=0`
- Show logs during early boot on all installed kernels: `sudo grubby --update-kernel=ALL --remove-args=' rhgb quiet'
- Boot to a different kernel ('2') on the next boot only: `sudo grubby savedefault --default=2 --once`

# Networking

- Overview on connection activity: `sudo iftop`
- Network manager: `nmcli`

# Help

- Command description: `whatis systemd`
- Command manuals: `man systemd`
- Binary locations: `whereis systemd`
- Search man pages: `apropos wireless`
