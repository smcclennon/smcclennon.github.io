---
title: Windows & POSIX CLI Reference
description: >-
  Comprehensive command-line reference comparing Windows and Linux for system administration and daily tasks.
author: smcclennon
date: 2025-06-22 23:00:00 +0100
categories: [Reference, System Administration]
tags: [windows, linux, freebsd, posix, command-line]
---

A comprehensive command-line reference comparing equivalent utilities between Windows and POSIX-compliant systems (Linux, macOS, FreeBSD). Organised into logical sections covering the most commonly used system administration and file management tasks for desktop and server environments.

## File Operations

| Task                   | POSIX Systems               | Windows                         | Notes                                       |
| ---------------------- | --------------------------- | ------------------------------- | ------------------------------------------- |
| Display file contents  | `cat filename`              | `type filename`                 | Both systems support `more`                 |
| Copy file              | `cp source dest`            | `copy source dest`              | Both support recursive copying with options |
| Move/rename file       | `mv oldname newname`        | `move oldname newname`          | Windows also has `ren`, POSIX has `rename`  |
| Delete file            | `rm filename`               | `del filename`                  | Windows also supports `erase`               |
| Delete file forcefully | `rm -f filename`            | `del /f filename`               | Force deletion of read-only files           |
| Delete recursively     | `rm -rf directory`          | `rmdir /s directory`            | Windows also supports `rd /s`               |
| Create empty file      | `touch filename`            | `echo. > filename`              | Windows: `type nul > filename` also works   |
| Find files             | `find /path -name "*.txt"`  | `dir /s *.txt`                  | Windows: `forfiles` for advanced searches   |
| Compare files          | `diff file1 file2`          | `fc file1 file2`                | Windows: `comp` for binary comparison       |
| File permissions       | `chmod 755 filename`        | `icacls filename /grant user:F` | Different permission models entirely        |
| File ownership         | `chown user:group filename` | `takeown /f filename`           | Windows: `icacls` for detailed permissions  |

## Directory Operations

| Task                    | POSIX Systems     | Windows           | Notes                                    |
| ----------------------- | ----------------- | ----------------- | ---------------------------------------- |
| List directory contents | `ls`              | `dir`             | POSIX: `ls -la` for detailed view        |
| List with details       | `ls -l`           | `dir /q`          | Show ownership and permissions           |
| List hidden files       | `ls -a`           | `dir /a`          | Include hidden and system files          |
| Create directory        | `mkdir dirname`   | `mkdir dirname`   | Both support `-p` for parent directories |
| Remove empty directory  | `rmdir dirname`   | `rmdir dirname`   | Directory must be empty                  |
| Current directory       | `pwd`             | `cd`              | Windows: `echo %cd%` also works          |
| Change directory        | `cd /path/to/dir` | `cd \path\to\dir` | Use forward/back slashes respectively    |
| Directory size          | `du -sh dirname`  | `dir /s dirname`  | Windows: shows total size at end         |
| Directory tree          | `tree`            | `tree`            | Both systems have tree command           |

## Text Processing

| Task                 | POSIX Systems                | Windows                                              | Notes                                        |
| -------------------- | ---------------------------- | ---------------------------------------------------- | -------------------------------------------- |
| Search text in files | `grep "pattern" filename`    | `findstr "pattern" filename`                         | Windows: `/i` for case-insensitive           |
| Search recursively   | `grep -r "pattern" /path`    | `findstr /s "pattern" *`                             | Search in subdirectories                     |
| Count lines          | `wc -l filename`             | `find /c /v "" filename`                             | Windows counts non-empty lines               |
| Head of file         | `head -n 10 filename`        | `more +10 filename`                                  | Windows: limited built-in options            |
| Tail of file         | `tail -n 10 filename`        | `powershell Get-Content filename -Tail 10`           | Windows: PowerShell required for tail        |
| Sort file contents   | `sort filename`              | `sort filename`                                      | Both systems support sorting                 |
| Remove duplicates    | `sort filename \| uniq`      | `sort filename \| uniq`                              | Windows has limited uniq functionality       |
| Replace text         | `sed 's/old/new/g' filename` | `powershell (Get-Content file) -replace 'old','new'` | Windows: PowerShell for advanced replacement |

## Network Operations

| Task                  | POSIX Systems                             | Windows                            | Notes                                       |
| --------------------- | ----------------------------------------- | ---------------------------------- | ------------------------------------------- |
| Test connectivity     | `ping hostname`                           | `ping hostname`                    | Both support same basic options             |
| Trace route           | `traceroute hostname`                     | `tracert hostname`                 | Different command names                     |
| Network configuration | `ip addr show`                            | `ipconfig`                         | POSIX: `ifconfig` on older systems          |
| DNS lookup            | `nslookup hostname`                       | `nslookup hostname`                | Both systems identical                      |
| Network connections   | `netstat -an`                             | `netstat -an`                      | Both systems identical                      |
| Active connections    | `ss -tuln`                                | `netstat -an \| findstr LISTEN`    | POSIX `ss` is modern replacement            |
| Download file         | `wget url`                                | `powershell Invoke-WebRequest url` | Windows: `curl` available in newer versions |
| Show routing table    | `route -n`                                | `route print`                      | Different syntax                            |
| ARP table             | `arp -a`                                  | `arp -a`                           | Both systems identical                      |
| Flush DNS cache       | `sudo systemctl restart systemd-resolved` | `ipconfig /flushdns`               | POSIX varies by distribution                |

## System Information

| Task                  | POSIX Systems         | Windows                                                            | Notes                                 |
| --------------------- | --------------------- | ------------------------------------------------------------------ | ------------------------------------- |
| System information    | `uname -a`            | `systeminfo`                                                       | Windows provides more detailed output |
| OS version            | `cat /etc/os-release` | `ver`                                                              | POSIX location varies by distribution |
| Hostname              | `hostname`            | `hostname`                                                         | Both systems identical                |
| Uptime                | `uptime`              | `systeminfo \| findstr "System Boot Time"`                         | Windows: more verbose                 |
| Memory usage          | `free -h`             | `wmic OS get TotalVisibleMemorySize,FreePhysicalMemory /value`     | Windows: WMI query                    |
| Disk usage            | `df -h`               | `wmic logicaldisk get size,freespace,caption`                      | Windows: WMI query                    |
| CPU information       | `lscpu`               | `wmic cpu get name,numberofcores,numberoflogicalprocessors /value` | Windows: WMI query                    |
| Hardware info         | `lshw`                | `wmic computersystem get model,manufacturer /value`                | POSIX: may need installation          |
| Environment variables | `env`                 | `set`                                                              | List all environment variables        |
| Specific env variable | `echo $PATH`          | `echo %PATH%`                                                      | Different syntax for variables        |

## Process Management

| Task                 | POSIX Systems         | Windows                             | Notes                            |
| -------------------- | --------------------- | ----------------------------------- | -------------------------------- |
| List processes       | `ps aux`              | `tasklist`                          | POSIX: many options available    |
| Kill process by PID  | `kill 1234`           | `taskkill /pid 1234`                | Windows: `/f` to force           |
| Kill process by name | `killall processname` | `taskkill /im processname.exe`      | Windows: include .exe extension  |
| Process tree         | `pstree`              | `tasklist /v`                       | Windows: limited tree view       |
| Top processes        | `top`                 | `tasklist /fi "memusage gt 100000"` | Windows: filter by memory usage  |
| Background process   | `command &`           | `start /b command`                  | Run process in background        |
| Process priority     | `nice -n 10 command`  | `start /low command`                | Set process priority             |
| Process monitoring   | `htop`                | `tasklist /fi "status eq running"`  | POSIX htop may need installation |

## User Management

| Task            | POSIX Systems           | Windows                           | Notes                          |
| --------------- | ----------------------- | --------------------------------- | ------------------------------ |
| Current user    | `whoami`                | `whoami`                          | Both systems identical         |
| List users      | `cat /etc/passwd`       | `net user`                        | Different approaches           |
| Add user        | `sudo useradd username` | `net user username password /add` | Admin privileges required      |
| Delete user     | `sudo userdel username` | `net user username /delete`       | Admin privileges required      |
| Change password | `passwd`                | `net user username *`             | Interactive password change    |
| User groups     | `groups username`       | `net user username`               | Windows shows group membership |
| Switch user     | `su - username`         | `runas /user:username cmd`        | Different syntax               |
| Sudo equivalent | `sudo command`          | `runas /user:administrator cmd`   | Windows: Run as administrator  |

## File Permissions & Security

| Task                 | POSIX Systems               | Windows                          | Notes                               |
| -------------------- | --------------------------- | -------------------------------- | ----------------------------------- |
| View permissions     | `ls -l filename`            | `icacls filename`                | Windows shows ACLs                  |
| Change permissions   | `chmod 755 filename`        | `icacls filename /grant user:RX` | Different permission models         |
| Change ownership     | `chown user:group filename` | `takeown /f filename`            | Windows: separate ownership command |
| Set file attributes  | `chattr +i filename`        | `attrib +r filename`             | Different attribute systems         |
| View file attributes | `lsattr filename`           | `attrib filename`                | Different commands                  |

## Archive Operations

| Task                  | POSIX Systems                   | Windows                                         | Notes                              |
| --------------------- | ------------------------------- | ----------------------------------------------- | ---------------------------------- |
| Create tar archive    | `tar -czf archive.tar.gz files` | `powershell Compress-Archive files archive.zip` | Different formats                  |
| Extract tar archive   | `tar -xzf archive.tar.gz`       | `powershell Expand-Archive archive.zip`         | PowerShell for zip                 |
| List archive contents | `tar -tzf archive.tar.gz`       | `powershell Get-ChildItem archive.zip`          | PowerShell required                |
| Create zip archive    | `zip -r archive.zip files`      | `powershell Compress-Archive files archive.zip` | zip may need installation on POSIX |

## Environment & Variables

| Task                | POSIX Systems                          | Windows                       | Notes                                   |
| ------------------- | -------------------------------------- | ----------------------------- | --------------------------------------- |
| Set variable        | `export VAR=value`                     | `set VAR=value`               | POSIX: session-wide, Windows: temporary |
| Unset variable      | `unset VAR`                            | `set VAR=`                    | Windows: set to empty string            |
| Persistent variable | `echo 'export VAR=value' >> ~/.bashrc` | `setx VAR value`              | Different persistence methods           |
| Show PATH           | `echo $PATH`                           | `echo %PATH%`                 | Different variable syntax               |
| Add to PATH         | `export PATH=$PATH:/new/path`          | `set PATH=%PATH%;C:\new\path` | Different path separators (: vs ;)      |

### Common Environment Variables

| Purpose             | POSIX Systems             | Windows (CMD)           | Windows (PowerShell)  | Notes                                  |
| ------------------- | ------------------------- | ----------------------- | --------------------- | -------------------------------------- |
| Current user        | `$USER` or `$LOGNAME`     | `%USERNAME%`            | `$env:USERNAME`       | Username of logged-in user             |
| User home directory | `$HOME`                   | `%USERPROFILE%`         | `$env:USERPROFILE`    | User's home folder path                |
| Current directory   | `$PWD`                    | `%CD%`                  | `$PWD`                | Present working directory              |
| System PATH         | `$PATH`                   | `%PATH%`                | `$env:PATH`           | Executable search paths                |
| Hostname            | `$HOSTNAME`               | `%COMPUTERNAME%`        | `$env:COMPUTERNAME`   | Computer/machine name                  |
| Operating system    | `$OSTYPE`                 | `%OS%`                  | `$env:OS`             | Operating system identifier            |
| Temp directory      | `$TMPDIR` or `/tmp`       | `%TEMP%` or `%TMP%`     | `$env:TEMP`           | Temporary files location               |
| Shell/Command proc  | `$SHELL`                  | `%COMSPEC%`             | `$PSVersionTable`     | Default shell/command processor        |
| System root         | `/`                       | `%SYSTEMROOT%`          | `$env:SYSTEMROOT`     | System installation directory          |
| Program files       | `/usr` or `/opt`          | `%PROGRAMFILES%`        | `$env:PROGRAMFILES`   | Default program installation directory |
| System architecture | `$HOSTTYPE` or `uname -m` | `%PROCESSOR_ARCH%`      | `$env:PROCESSOR_ARCH` | CPU architecture (x86, x64, ARM)       |
| Number of CPUs      | `$NPROC` or `nproc`       | `%NUMBER_OF_PROC%`      | `$env:NUMBER_OF_PROC` | Available processor cores              |
| User profile path   | `$HOME`                   | `%USERPROFILE%`         | `$HOME`               | User's profile directory               |
| Application data    | `$HOME/.config`           | `%APPDATA%`             | `$env:APPDATA`        | User application data directory        |
| Local app data      | `$HOME/.local/share`      | `%LOCALAPPDATA%`        | `$env:LOCALAPPDATA`   | Local application data directory       |
| Desktop path        | `$HOME/Desktop`           | `%USERPROFILE%\Desktop` | `$HOME\Desktop`       | User's desktop folder                  |
| Documents path      | `$HOME/Documents`         | `%USERPROFILE%\Docs`    | `$HOME\Documents`     | User's documents folder                |
| System drive        | N/A (use `/`)             | `%SYSTEMDRIVE%`         | `$env:SYSTEMDRIVE`    | Drive containing Windows (usually C:)  |
| Random number       | `$RANDOM`                 | `%RANDOM%`              | `Get-Random`          | Generate random number                 |
| Date/Time           | `$DATE` or `date`         | `%DATE%` / `%TIME%`     | `Get-Date`            | Current date and time                  |
| Error level         | `$?`                      | `%ERRORLEVEL%`          | `$LASTEXITCODE`       | Exit code of last command              |
| Process ID          | `$$`                      | N/A                     | `$PID`                | Current process identifier             |
| Terminal type       | `$TERM`                   | N/A                     | `$Host.Name`          | Terminal/console type                  |
| Display (GUI)       | `$DISPLAY`                | N/A                     | N/A                   | X11 display for GUI applications       |
| Language/Locale     | `$LANG` or `$LC_ALL`      | N/A                     | `$PSCulture`          | System language and locale settings    |

### Accessing Environment Variables

| Task                | POSIX Systems       | Windows (CMD)    | Windows (PowerShell)         | Notes                       |
| ------------------- | ------------------- | ---------------- | ---------------------------- | --------------------------- |
| Display single var  | `echo $VAR`         | `echo %VAR%`     | `echo $env:VAR`              | Show specific variable      |
| Display all vars    | `env` or `printenv` | `set`            | `Get-ChildItem env:`         | List all environment vars   |
| Check if var exists | `[ -n "$VAR" ]`     | `if defined VAR` | `Test-Path env:VAR`          | Test variable existence     |
| Set temporary var   | `VAR=value`         | `set VAR=value`  | `$env:VAR = "value"`         | Session-only variable       |
| Set permanent var   | `export VAR=value`  | `setx VAR value` | `[Environment]::SetVariable` | Persistent across sessions  |
| Unset variable      | `unset VAR`         | `set VAR=`       | `Remove-Item env:VAR`        | Remove environment variable |

---

## Logic and Conditional Operators

### Command Chaining and Logic

| Operation           | Bash/POSIX Shell         | Windows CMD              | PowerShell                        | Notes                         |
| ------------------- | ------------------------ | ------------------------ | --------------------------------- | ----------------------------- |
| AND (success chain) | `command1 && command2`   | `command1 && command2`   | `command1; command2`              | Run second if first succeeds  |
| OR (failure chain)  | `command1 \|\| command2` | `command1 \|\| command2` | `command1; if (!$?) { command2 }` | Run second if first fails     |
| Sequential          | `command1; command2`     | `command1 & command2`    | `command1; command2`              | Run both regardless of result |
| Pipe output         | `command1 \| command2`   | `command1 \| command2`   | `command1 \| command2`            | Pass output to next command   |

### Comparison Operators

| Comparison       | Bash                | Windows CMD           | PowerShell  | Notes                     |
| ---------------- | ------------------- | --------------------- | ----------- | ------------------------- |
| Equal            | `[ "$a" -eq "$b" ]` | `if %a%==%b%`         | `$a -eq $b` | String/numeric equality   |
| Not equal        | `[ "$a" -ne "$b" ]` | `if not %a%==%b%`     | `$a -ne $b` | String/numeric inequality |
| Greater than     | `[ "$a" -gt "$b" ]` | `if %a% gtr %b%`      | `$a -gt $b` | Numeric comparison        |
| Less than        | `[ "$a" -lt "$b" ]` | `if %a% lss %b%`      | `$a -lt $b` | Numeric comparison        |
| Greater or equal | `[ "$a" -ge "$b" ]` | `if %a% geq %b%`      | `$a -ge $b` | Numeric comparison        |
| Less or equal    | `[ "$a" -le "$b" ]` | `if %a% leq %b%`      | `$a -le $b` | Numeric comparison        |
| String equal     | `[ "$a" = "$b" ]`   | `if "%a%"=="%b%"`     | `$a -eq $b` | Exact string match        |
| String not equal | `[ "$a" != "$b" ]`  | `if not "%a%"=="%b%"` | `$a -ne $b` | String inequality         |

### File and Directory Tests

| Test             | Bash               | Windows CMD         | PowerShell                                          | Notes                     |
| ---------------- | ------------------ | ------------------- | --------------------------------------------------- | ------------------------- |
| File exists      | `[ -f "$file" ]`   | `if exist "%file%"` | `Test-Path $file`                                   | Check if file exists      |
| Directory exists | `[ -d "$dir" ]`    | `if exist "%dir%\"` | `Test-Path $dir -PathType Container`                | Check if directory exists |
| File readable    | `[ -r "$file" ]`   | N/A                 | `(Get-Acl $file).Access`                            | Check read permissions    |
| File writable    | `[ -w "$file" ]`   | N/A                 | `(Get-Acl $file).Access`                            | Check write permissions   |
| File executable  | `[ -x "$file" ]`   | N/A                 | `(Get-Command $file -ErrorAction SilentlyContinue)` | Check execute permissions |
| File empty       | `[ ! -s "$file" ]` | `if %~z1==0`        | `(Get-Item $file).Length -eq 0`                     | Check if file is empty    |

### Exit Codes and Error Handling

| Operation        | Bash                  | Windows CMD         | PowerShell                              | Notes                          |
| ---------------- | --------------------- | ------------------- | --------------------------------------- | ------------------------------ |
| Last exit code   | `echo $?`             | `echo %errorlevel%` | `echo $LASTEXITCODE`                    | Show previous command result   |
| Exit with code   | `exit 1`              | `exit /b 1`         | `exit 1`                                | Exit script with specific code |
| Success (exit 0) | `exit 0`              | `exit /b 0`         | `exit 0`                                | Successful completion          |
| Suppress errors  | `command 2>/dev/null` | `command 2>nul`     | `command -ErrorAction SilentlyContinue` | Hide error output              |

---

## Tips for Cross-Platform Usage

1. **Path Separators**: POSIX uses `/` while Windows uses `\` (though Windows accepts `/` in many contexts)
1. **Case Sensitivity**: POSIX is case-sensitive, Windows is not
1. **Line Endings**: POSIX uses LF (`\n`), Windows uses CRLF (`\r\n`)
1. **Wildcards**: Both support `*` and `?`, but behavior may vary
1. **Permissions**: POSIX uses octal permissions (755), Windows uses Access Control Lists (ACLs)
1. **Environment Variables**: POSIX uses `$VAR`, Windows uses `%VAR%`
1. **Command Chaining**: Both support `&&` (AND) and `||` (OR), POSIX also supports `;`
1. **Redirection**: Both support `>` (redirect), `>>` (append), and `|` (pipe)

---

## POSIX Only

### Package Management Comparison

| Task                | Debian/Ubuntu (APT)        | Red Hat/Fedora (DNF/YUM)   | FreeBSD (pkg)              | Notes                       |
| ------------------- | -------------------------- | -------------------------- | -------------------------- | --------------------------- |
| Update package list | `sudo apt update`          | `sudo dnf check-update`    | `sudo pkg update`          | Refresh repository metadata |
| Upgrade packages    | `sudo apt upgrade`         | `sudo dnf upgrade`         | `sudo pkg upgrade`         | Install available updates   |
| Install package     | `sudo apt install package` | `sudo dnf install package` | `sudo pkg install package` | Install new software        |
| Remove package      | `sudo apt remove package`  | `sudo dnf remove package`  | `sudo pkg delete package`  | Remove software             |
| Search packages     | `apt search keyword`       | `dnf search keyword`       | `pkg search keyword`       | Find available packages     |
| Show package info   | `apt show package`         | `dnf info package`         | `pkg info package`         | Display package details     |
| List installed      | `apt list --installed`     | `dnf list installed`       | `pkg info`                 | Show installed packages     |
| Clean cache         | `sudo apt clean`           | `sudo dnf clean all`       | `sudo pkg clean`           | Clear package cache         |
| Autoremove unused   | `sudo apt autoremove`      | `sudo dnf autoremove`      | `sudo pkg autoremove`      | Remove orphaned packages    |

---

## Windows Only

### PowerShell

| Task             | Command                          | Notes                              |
| ---------------- | -------------------------------- | ---------------------------------- |
| List processes   | `Get-Process`                    | PowerShell alternative to tasklist |
| Stop process     | `Stop-Process -Name processname` | PowerShell process management      |
| Get system info  | `Get-ComputerInfo`               | Comprehensive system information   |
| Network adapters | `Get-NetAdapter`                 | Modern network configuration       |
| Event logs       | `Get-EventLog -LogName System`   | View system events                 |
| Services         | `Get-Service`                    | List Windows services              |
| Install software | `winget install package`         | Package manager (Windows 10+)      |

### Windows Subsystem for Linux (WSL)

| Task                | Command                    | Notes                              |
| ------------------- | -------------------------- | ---------------------------------- |
| List distributions  | `wsl --list`               | Show installed Linux distributions |
| Set default distro  | `wsl --set-default Ubuntu` | Change default Linux environment   |
| Run specific distro | `wsl -d Ubuntu`            | Launch specific distribution       |
| Shutdown WSL        | `wsl --shutdown`           | Stop all WSL instances             |

## Terminology Acronyms

| Acronym   | Full Form                           | Description                                                |
| --------- | ----------------------------------- | ---------------------------------------------------------- |
| **ACL**   | Access Control List                 | Windows file permission system                             |
| **APT**   | Advanced Package Tool               | Debian/Ubuntu package management system                    |
| **ARP**   | Address Resolution Protocol         | Network protocol for IP to MAC address mapping             |
| **BSD**   | Berkeley Software Distribution      | Unix-like operating system family                          |
| **DNF**   | Dandified YUM                       | Modern package manager for Red Hat-based distributions     |
| **DNS**   | Domain Name System                  | Internet naming system                                     |
| **PID**   | Process Identifier                  | Unique number assigned to running processes                |
| **POSIX** | Portable Operating System Interface | IEEE standard for Unix-like operating system compatibility |
| **SSH**   | Secure Shell                        | Encrypted network protocol for remote access               |
| **TTY**   | Teletypewriter                      | Terminal interface                                         |
| **WMI**   | Windows Management Instrumentation  | Windows system management interface                        |
| **WSL**   | Windows Subsystem for Linux         | Linux compatibility layer for Windows                      |
| **YUM**   | Yellowdog Updater Modified          | Legacy package manager for Red Hat-based distributions     |

## Command Acronyms

| Command  | Full Form                        | Description                                         |
| -------- | -------------------------------- | --------------------------------------------------- |
| **cat**  | Concatenate                      | Display and concatenate file contents               |
| **cd**   | Change Directory                 | Navigate between directories                        |
| **cp**   | Copy                             | Copy files and directories                          |
| **df**   | Disk Free                        | Display filesystem disk space usage                 |
| **du**   | Disk Usage                       | Display directory space usage                       |
| **grep** | Global Regular Expression Print  | Search text using patterns                          |
| **ls**   | List                             | List directory contents                             |
| **mv**   | Move                             | Move/rename files and directories                   |
| **ps**   | Process Status                   | Display running processes                           |
| **pwd**  | Print Working Directory          | Display current directory path                      |
| **rm**   | Remove                           | Delete files and directories                        |
| **sed**  | Stream Editor                    | Stream-oriented text editor for filtering/transform |
| **su**   | Switch User (or Substitute User) | Change user identity                                |
| **tar**  | Tape Archive                     | Archive files (originally for tape storage)         |
| **wc**   | Word Count                       | Count lines, words, and characters                  |
