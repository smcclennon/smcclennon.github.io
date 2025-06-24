---
title: Debian Static IP Configuration
description: >-
  Complete guide for configuring a static IP address on Debian by replacing DHCP configuration with manual network settings.
author: smcclennon
date: 2025-06-24 21:56:00 +0100
categories: [Guides, System Administration]
tags: [linux, networking, debian, command-line]
---

Setting up static IP addresses on Debian servers provides consistent network connectivity essential for server environments. This guide shows you how to replace DHCP with static IP configuration.

## Quick Configuration Steps

```bash
# 1. Check current network configuration
ip addr show

# 2. Edit network interfaces file
sudo nano /etc/network/interfaces

# 3. Replace DHCP with static configuration (see example below)

# 4. Apply changes
sudo systemctl restart networking.service
```

> **SSH Warning**: Your SSH session may disconnect when restarting networking. Note your new static IP for reconnection and ensure you have physical/console access as a contingency.
{: .prompt-warning }

## Configuration Change

**Before (DHCP):**
```bash
auto ens192
iface ens192 inet dhcp
```

**After (Static):**
```bash
auto ens192
iface ens192 inet static
    address 192.168.1.123
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 192.168.1.1
```

### Parameters Explained

- **`address`**: Your desired static IP address
- **`netmask`**: [Subnet mask](/posts/networking-cheat-sheet) (255.255.255.0 = /24 network)
- **`gateway`**: Default gateway (usually your router's IP)
- **`dns-nameservers`**: DNS servers for name resolution

## Modern CIDR Alternative

For cleaner configuration, use CIDR notation:

```bash
auto ens192
iface ens192 inet static
    address 192.168.1.123/24
    gateway 192.168.1.1
    dns-nameservers 192.168.1.1
```

## Verify Configuration

Test your new configuration:

```bash
# Check interface
ip addr show ens192

# Test connectivity
ping -c 3 192.168.1.1      # Gateway
ping -c 3 1.1.1.1          # Internet
nslookup google.com        # DNS
```

## Conclusion

Static IP configuration on Debian is straightforward: edit `/etc/network/interfaces`, replace DHCP settings with static parameters, and restart networking. Always have console access ready as your current SSH connection will drop if the IP changes, and if the new static IP is invalid, the server becomes unreachable via SSH.

## References

- [Debian Network Configuration Documentation](https://wiki.debian.org/NetworkConfiguration)
- [interfaces(5) Manual Page](https://manpages.debian.org/stable/ifupdown/interfaces.5.en.html)
- [Debian Administrator's Handbook: Network Configuration](https://debian-handbook.info/browse/stable/sect.network-config.html)
