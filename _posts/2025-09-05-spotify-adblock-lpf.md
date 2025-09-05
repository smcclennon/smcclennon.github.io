---
title: Setting Up Spotify Adblock on Fedora 42 Workstation
description: >-
  How to install spotify-adblock on Fedora 42 using Local Package Factory (LPF) for an ad-free Spotify experience.
author: smcclennon
date: 2025-09-05 07:00:00 +0100
last_modified_at: 2025-09-05 07:00:00 +0100
categories: [Guides, System Administration]
tags: [fedora, linux]
media_subpath: '/posts/20250905'
image:
  path: 'spotify-adblock-client-log-config.png'
  alt: 'spotify-adblock log and config above the Spotify client'
---

Block Spotify ads on Linux with a simple library injection. This guide shows how to install [spotify-adblock][spotify-adblock] with the official Spotify client via RPM on Fedora 42.

> **Educational Use**: This guide is for educational purposes. Consider supporting artists through Spotify Premium.
{: .prompt-info }

## Quick Installation Steps

```bash
# 1. Install build dependencies
sudo dnf install git make rust cargo

# 2. Build spotify-adblock
git clone https://github.com/abba23/spotify-adblock.git
cd spotify-adblock
make
sudo make install

# 3. Set up RPM Fusion repositories
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

# 4. Install LPF and Spotify package
sudo dnf install lpf lpf-spotify-client

# 5. Build Spotify using LPF (opens GUI)
lpf update

# 6. Configure Spotify to preload adblock library at runtime
sudo sed -i 's|LD_LIBRARY_PATH=\$( dirname \$spotify ) LC_NUMERIC=en_US.utf8 \$spotify \$@|LD_LIBRARY_PATH=$( dirname $spotify ) LC_NUMERIC=en_US.utf8 LD_PRELOAD=/usr/local/lib/spotify-adblock.so $spotify $@|' /usr/bin/spotify

# 7. Test the installation
spotify
```

## Detailed Explanation

### Why LPF Over Alternative Methods

Most distributions now package Spotify as Flatpaks or Snaps, which sandbox the application and make library modifications difficult. Installing via RPM gives us easy to inject our ad-blocking library into Spotify at runtimeusing `LD_PRELOAD`.

[lpf-spotify-client][lpf-spotify-client] from RPM Fusion has superseded the [spotify-make][spotify-make] project (unmaintained since ~2015), providing:

- **Automated updates**[^lpf-automated-updates] through standard package management
- **Legal compliance** with Spotify's licensing requirements
- **System integration** with proper desktop files and dependencies
- **Active maintenance** allowing continued RPM builds for current Spotify releases

### The Core Components

**spotify-adblock**: Uses `LD_PRELOAD` to intercept audio streams and skip advertisements by hooking into system calls before they reach audio output.

**Local Package Factory (LPF)**: Fedora's solution for building packages from proprietary sources that cannot be redistributed directly due to licensing restrictions.

### Step 5 Breakdown

The LPF update process involves several GUI prompts:

1. **Select Package**: Choose spotify-client from the available updates
   ![](lpf-update-spotify-client-prompt.png)

2. **Accept EULA**: Review and accept the package's EULA
   ![](lpf-update-spotify-client-eula.png)

3. **Build Process**: LPF downloads sources and builds the RPM
   ![](lpf-update-spotify-client-build.png)

4. **Install Confirmation**: Approve the installation of the built package
   ![](lpf-update-spotify-client-install-prompt.png)
   ![](lpf-update-spotify-client-install.png)

5. **Completion**: Spotify is now installed and ready for patching
   ![](lpf-update-completed.png)

### Step 6 Breakdown

The sed command modifies `/usr/bin/spotify`[^spotify-bin] to preload the ad-blocking library:

```bash
# Before:
LD_LIBRARY_PATH=$( dirname $spotify ) LC_NUMERIC=en_US.utf8 $spotify $@

# After:
LD_LIBRARY_PATH=$( dirname $spotify ) LC_NUMERIC=en_US.utf8 LD_PRELOAD=/usr/local/lib/spotify-adblock.so $spotify $@
```

This tells the dynamic linker to load our custom library before Spotify's standard libraries, enabling ad interception.

## Verification

Test that everything works correctly:

```bash
# Verify Spotify installation
which spotify
# Should return: /usr/bin/spotify

# Check adblock library exists
ls -la /usr/local/lib/spotify-adblock.so

# Confirm LD_PRELOAD modification
cat /usr/bin/spotify | grep LD_PRELOAD
```

## Troubleshooting Common Issues

**Spotify Won't Launch**
```bash
# Launch via terminal and check for errors
which spotify
# Should return: /usr/bin/spotify

spotify
# Should return:
# [*] Config file: /etc/spotify-adblock/config.toml
# [+] cef_urlrequest_create: ...
```

**Ads Still Playing**
- Restart Spotify completely
- Verify the LD_PRELOAD modification was applied correctly

## Maintenance

### Updating Components

**Update spotify-adblock:**

```bash
cd spotify-adblock
git pull
make clean && make && sudo make install
```

**Update Spotify:**

```bash
# Update lpf and lpf-spotify-client
dnf update

# Rebuild Spotify. This will overwrite our LD_PRELOAD modification
lpf update

# Reapply LD_PRELOAD modification to Spotify launcher script
sudo sed -i 's|LD_LIBRARY_PATH=\$( dirname \$spotify ) LC_NUMERIC=en_US.utf8 \$spotify \$@|LD_LIBRARY_PATH=$( dirname $spotify ) LC_NUMERIC=en_US.utf8 LD_PRELOAD=/usr/local/lib/spotify-adblock.so $spotify $@|' /usr/bin/spotify
```


> **Important**: LPF updates may overwrite the `/usr/bin/spotify` script. Reapply the LD_PRELOAD modification after Spotify updates.
{: .prompt-warning }

### Configuration Options

Advanced users can customise filtering behaviour in `/etc/spotify-adblock/config.toml`:

```toml
allowlist = []

denylist = []
```

## Understanding the Legal Context

According to the [lpf-spotify-client EULA][lpf-eula], users must:
- Accept Spotify's Terms of Service during installation
- Understand that modifications may violate Spotify's ToS
- Consider supporting artists through legitimate means

The LPF approach ensures compliance with distribution restrictions whilst providing a clean installation method.

## Conclusion

This setup provides ad-free Spotify playback whilst maintaining proper system integration through Fedora's package management. The combination of LPF and spotify-adblock offers a maintainable solution that respects both licensing requirements and user preferences.

> Remember: Supporting artists through streaming royalties, merchandise, or concert attendance helps sustain the music ecosystem.
{: .prompt-info }

## References

- [spotify-adblock GitHub Repository][spotify-adblock]
- [RPM Fusion LPF Spotify Client][lpf-spotify-client]

[spotify-adblock]: https://github.com/abba23/spotify-adblock
[spotify-make]: https://github.com/leamas/spotify-make
[lpf-spotify-client]: https://github.com/rpmfusion/lpf-spotify-client
[lpf-eula]: https://github.com/rpmfusion/lpf-spotify-client/blob/master/eula.txt

## Footnotes

[^lpf-automated-updates]: Manual spotify-client rebuild is required via `lpf update` to apply updates.
[^spotify-bin]: `/usr/bin/spotify` is a launcher script that calls the actual Spotify binary.
