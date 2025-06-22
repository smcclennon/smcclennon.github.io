---
title: LVM Disk Expansion
description: >-
  Step-by-step guide for expanding an LVM volume when you've increased the virtual disk size.
author: smcclennon
date: 2025-06-22 21:00:00 +0100
categories: [Guides, System Administration]
tags: [linux, command-line]
---

When working with virtual machines, you'll often need to expand disk space as your storage requirements grow. Whilst increasing the virtual disk size in your hypervisor is straightforward, getting your Linux system to recognise and utilise the additional space requires several steps when using Logical Volume Manager (LVM). This guide provides a complete walkthrough for expanding an LVM volume without requiring a system reboot.

## Step-by-Step Process

Complete step-by-step process for expanding an LVM volume when you've increased the virtual disk size:

```bash
# Complete LVM disk expansion process
# 1. Increase virtual disk size in hypervisor first

# 2. Trigger kernel to detect disk size changes (if not rebooting)
sudo bash -c 'echo 1 > /sys/block/sda/device/rescan'

# 3. Check current disk, partition, and LVM sizes
sudo lsblk

# 4. Grow partition to use new disk space
sudo growpart /dev/sda 3

# 5. Extend LVM logical volume to use new partition space
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv

# 6. Resize filesystem to use new LVM space
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv

# 7. Verify filesystem reflects new size
sudo df -h
```

**Example expansion output:**
```bash
# Before expansion
NAME                      MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda                         8:0    0  140G  0 disk 
├─sda3                      8:3    0  138G  0 part 
  └─ubuntu--vg-ubuntu--lv 252:0    0  138G  0 lvm  /

# After disk resize and rescan
sda                         8:0    0  250G  0 disk 
├─sda3                      8:3    0  138G  0 part 
  └─ubuntu--vg-ubuntu--lv 252:0    0  138G  0 lvm  /

# After growpart
sda                         8:0    0  250G  0 disk 
├─sda3                      8:3    0  248G  0 part 
  └─ubuntu--vg-ubuntu--lv 252:0    0  248G  0 lvm  /

# Final result: 138G → 248G expansion
Filesystem                         Size  Used Avail Use% Mounted on
/dev/mapper/ubuntu--vg-ubuntu--lv  244G  127G  107G  55% /
```

## Conclusion

By following these steps, you can successfully expand your LVM volume to utilise additional disk space without requiring a system reboot. The process involves refreshing the kernel's view of the disk size, expanding the partition, extending the LVM logical volume, and finally resizing the filesystem. Always ensure you have proper backups before performing disk operations, and verify each step completes successfully before proceeding to the next.

## References

- [ServerFault: How to get CentOS VM to re-read increased disk size without reboot](https://serverfault.com/questions/306737/how-do-i-get-centos-vm-to-re-read-its-increased-disk-size-without-a-reboot)
- [Ask Ubuntu: How to resize an ext root partition at runtime](https://askubuntu.com/questions/24027/how-can-i-resize-an-ext-root-partition-at-runtime)
- [Red Hat: Using growpart to extend partitions](https://access.redhat.com/solutions/5540131)
- [ServerFault: Using fdisk to show partition sizes in human-readable format](https://serverfault.com/questions/620508/using-fdisk-show-size-in-a-unit-such-as-mb-or-gb)
- [Root Users: LVM resize - How to increase an LVM partition](https://www.rootusers.com/lvm-resize-how-to-increase-an-lvm-partition/)
