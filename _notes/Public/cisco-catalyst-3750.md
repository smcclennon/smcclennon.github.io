---
title : Cisco Catalyst 3750 Series Switch Configuration
feed: show
date : 10-07-2023
---

### Official documentation

- [Cisco Catalyst 3750 Series Switches - Cisco](https://www.cisco.com/c/en/us/support/switches/catalyst-3750-series-switches/series.html)
- [Getting Started Guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3750/hardware/quick/guide/3750GSG3.html)
- [Software Configuration Guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3750/software/release/12-2_52_se/configuration/guide/3750scg.html)

### Command aliases

|Command|Alias|
|---|---|
|configure terminal|conf t|
|show|sho|
|show running-config|sho ru|

<br>

## Factory reset switch

Press and hold the 'MODE' button for ~10 seconds. 


Lights should start blinking after 3 seconds, and stop blinking 7 seconds later. Release button once they stop blinking.

---

## Create a maximum privilege user

```
! Turn on privileged commands if your shell is 'Host>' rather than 'Host#'.
Host> enable

! Enter configuration mode
Host# configure terminal

! Create user 'admin' and define privilege level '15' and plaintext secret 'insecure'
Host(config)# username admin privilege 15 secret 0 insecure
```

### Test running-config changes

Show running config. We use `do` to access the upper-menu command `show`. If you exit the 'config' mode/menu with `exit`, you no longer need to use `do`.

```
Host(config)# do show running-config
```

Try logging in on another session with your new user. You should go directly into privileged mode with `#`:

```
Host(config)# exit
Host# exit
$ ssh admin@10.20.200.1
Password: insecure
Host#
```

Changes currently won't persist upon a power-cycle or reload as they are not yet in the non-volatile 'startup-config':

```
Host(config)# do show startup-config
```

#### Undo any running-config mistakes

To disable a setting, use `no`. To reset a setting to factory defaults, use `default`. For example, to remove the admin user:

```
Host(config)# default username admin
```

Alternatively, to reset the running-config back to its startup by completely overwriting it with the contents of `config.txt`, which contains the 'startup-config'. List the directory with `dir`, and read the files present with `more`.

```
Host(config)# exit
Host# configure replace config.txt
```

Don't use `copy startup-config running-config` as this performs a merge, where running-config options will be overwritten only if they exist in startup-config. This is a copy paste, not a replace.

### Write changes to startup-config

Write 'running-config' to non-volatile memory:

```
Host(config)# do write
```

### Finalise your changes

The password for the 'admin' user will currently be in the config in plaintext. To hash the stored password in the config, power cycle the switch:

```
Host(config)# do reload
```

---

## Setup SSH

Source: [Configuring Switch-Based Authentication](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3750/software/release/12-2_52_se/configuration/guide/3750scg/swauthen.html#wp1227177)

```
hostname# configure terminal
hostname(config)# hostname Switch  ! Should already have a hostname by default
Switch(config)# ip domain name Cisco
Switch(config)# crypto key generate rsa general-keys modulus 2048
Switch(config)# line vty 0 4  ! select virtual terminal lines 0-4
Switch(config-line)# login local  ! Disable tacacs authentication so local passwords/secrets work
```

#### Hardening

Prevent telnet connections on vty 0-4. Only allow ssh:

```
Switch(config-line)# transport input ssh
```

Prevent telnet and ssh connections on vty 5-15

```
Switch(config-line)# exit  ! exit vty conf 0-4
Switch(config)# line vty 5 15
Switch(config-line)# transport input none
Switch(config-line)# end  ! return to privileged exec mode
```

#### Save changes to startup-config

```
Switch# write  ! save to startup-config
```

#### Deprecated cryptology

OpenSSH has deprecated the algorithms and ciphers which this switch tries to use. To resolve this without changing any OpenSSH configuration files, I use these command line arguments:

```
$ ssh -oKexAlgorithms=+diffie-hellman-group1-sha1 -oHostKeyAlgorithms=+ssh-rsa -oPubkeyAcceptedKeyTypes=+ssh-rsa -oCiphers=+aes256-cbc cisco@10.20.200.1
```

---

## Change switch IP

Source: [Assigning the Switch IP Address and Default Gateway](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3750/software/release/12-2_52_se/configuration/guide/3750scg/swipaddr.html)

```
Switch# configure terminal
Switch(config)# interface Vlan1

! Static
Switch(config-if)# ip address 10.20.30.40 255.255.255.0

! DHCP
Switch(config-if)# ip address dhcp
```