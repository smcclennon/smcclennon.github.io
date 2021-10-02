---
layout: default
title: API 1.0
subtitle: Internal API v1.0 (depricated)

b1: Home
b1_url: ../../

b2: Projects
b2_url: ../../projects

script1: rainbow-python
script2: LoadCSS
---
## About My API
I created a small API for internal use which consists of links to various GitHub API pages for my respective projects. Projects with update support will use this API to get the information they need to update (such as patch notes and a download link).

Information within the API pages may seem to be in a rather haphazard order, and that is because it is. I cannot adjust the order, as this would break the update code on projects using this API.

The API pages will appear to have all information on the same line, separated by spaces. This is because the HTML has no formatting (to make it easier to parse).

### API Format
This is the information that goes on the respective (numbered) line
```
1. Latest release details [URL, Json]
2. Project name [String]
3. Latest release direct download link [URL, Json]
4. 5 latest release details [URL, Json]
```

### Information Use
```
1. Display the latest version [e.g v1.2.3]
2. Update the current project name [backwards compatibility]
3. Download the latest release
4. Display up to 5 previous release patch notes
```

# API List
List of my API-supported projects

|ID|Project|Version|Abilities|
|:-|:-|:-|:-|
|[1](1)|[LTFO](https://github.com/smcclennon/LTFO)|Up to date|Get latest release information, update project name, download the latest release, get patch notes for up to previous 5 versions|
|[2](2)|[SMN](https://github.com/smcclennon/SMN)|Up to date|Get latest release information, update project name, download the latest release, get patch notes for up to previous 5 versions|
|[3](3)|[Primer](https://github.com/smcclennon/Primer)|Up to date|Get latest release information, update project name, download the latest release, get patch notes for up to previous 5 versions|
|[4](4)|[FFDB](https://github.com/smcclennon/FFDB)|Up to date|Get latest release information, update project name, download the latest release, get patch notes for up to previous 5 versions|
|[5](5)|[Updater](https://github.com/smcclennon/Updater)|Up to date|Get latest release information, update project name, download the latest release, get patch notes for up to previous 5 versions|

### [Update code using my API](https://github.com/smcclennon/Updater)
<script>LoadCSS('../../assets/css/all-hallows-eve.css');</script>
```python
ver = '1.0.2'

# -==========[ Update code ]==========-
# Updater: Used to check for new releases on GitHub
# github.com/smcclennon/Updater
import os  # detecting OS type (nt, posix, java), clearing console window, restart the script
from distutils.version import LooseVersion as semver  # as semver for readability
import urllib.request, json  # load and parse the GitHub API
import platform  # Consistantly detect MacOS

# Disable SSL certificate verification for MacOS (very bad practice, I know)
# https://stackoverflow.com/a/55320961
if platform.system() == 'Darwin':  # If MacOS
    import ssl
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        # Legacy Python that doesn't verify HTTPS certificates by default
        pass
    else:
        # Handle target environment that doesn't support HTTPS verification
        ssl._create_default_https_context = _create_unverified_https_context

if os.name == 'nt':
    import ctypes  # set Windows console window title
    ctypes.windll.kernel32.SetConsoleTitleW(f'   == {proj} v{ver} ==   Checking for updates...')

updateAttempt = 0  # Keep track of failed attempts
print('Checking for updates...', end='\r')
while updateAttempt < 3:  # Try to retry the update up to 3 times if an error occurs
    updateAttempt = updateAttempt+1
    try:
        with urllib.request.urlopen("https://smcclennon.github.io/update/api/5") as internalAPI:
            repo = []
            for line in internalAPI.readlines():
                repo.append(line.decode().strip())
            apiLatest = repo[0]  # Latest release details
            proj = repo[1]  # Project name
            ddl = repo[2]  # Direct download link
            apiReleases = repo[3]  # List of patch notes
        with urllib.request.urlopen(apiLatest) as githubAPILatest:
            data = json.loads(githubAPILatest.read().decode())
            latest = data['tag_name'][1:]  # remove 'v' from version number (v1.2.3 -> 1.2.3)
        del data  # Prevent overlapping variable data
        release = json.loads(urllib.request.urlopen(  # Get latest patch notes
            apiReleases).read().decode())
        releases = [  # Store latest patch notes in a list
            (data['tag_name'], data['body'])
            for data in release
            if semver(data['tag_name'][1:]) > semver(ver)]
        updateAttempt = 3
    except:  # If updating fails 3 times
        latest = '0'
if semver(latest) > semver(ver):
    if os.name == 'nt': ctypes.windll.kernel32.SetConsoleTitleW(f'   == {proj} v{ver} ==   Update available: {ver} -> {latest}')
    print('Update available!      ')
    print(f'Latest Version: v{latest}\n')
    for release in releases:
        print(f'{release[0]}:\n{release[1]}\n')
    confirm = input(str('Update now? [Y/n] ')).upper()
    if confirm != 'N':
        if os.name == 'nt': ctypes.windll.kernel32.SetConsoleTitleW(f'   == {proj} v{ver} ==   Installing updates...')
        print(f'Downloading {proj} v{latest}...')
        urllib.request.urlretrieve(ddl, os.path.basename(__file__))  # download the latest version to cwd
        import sys; sys.stdout.flush()  # flush any prints still in the buffer
        os.system('cls||clear')  # Clear console window
        os.system(f'"{__file__}"' if os.name == 'nt' else f'python3 "{__file__}"')
        import time; time.sleep(0.2)
        quit()
if os.name == 'nt': ctypes.windll.kernel32.SetConsoleTitleW(f'   == {proj} v{ver} ==')
# -==========[ Update code ]==========-
```