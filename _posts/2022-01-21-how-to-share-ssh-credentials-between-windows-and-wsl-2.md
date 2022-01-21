---
layout: post
title: "How to share SSH credentials between Windows and a WSL 2 distro"
comments: true
---

The [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about) is a convenient solution for people who want to use Linux development tools on Windows machines. However, since it's implemented as an operating system running within a [lightweight virtual machine](https://docs.microsoft.com/en-us/windows/wsl/compare-versions) within another operating system, it's sometimes inconvenient to synchronize your tools and settings between Windows and Linux.

This article describes an elegant solution for keeping in sync your SSH keys and configuration files. It goes through and details some of the answers presented on the [corresponding question](https://superuser.com/q/1183176/585210) on the Super User Stack Exchange, before presenting the one I've come up with.

<!-- more -->

## Copying the files over

Let's first look at the "official" solution for sharing your SSH config/keys between Windows and your WSL distro. [This article](https://devblogs.microsoft.com/commandline/sharing-ssh-keys-between-windows-and-wsl-2/) on the Microsoft blog gives indications on how to copy the SSH config/keys directory over to Linux and then change the permissions appropriately. This is also [the accepted answer](https://superuser.com/a/1183228/585210) on the Super User question mentioned above.

To copy all of your SSH keys/config files from Windows to the WSL distro, you can use `cp`:

```sh
cp --recursive /mnt/c/Users/<your Windows username>/.ssh/ ~/
```

And don't forget to update the corresponding [file permissions](https://unix.stackexchange.com/a/257648):

```sh
chmod 700 ~/.ssh/
chmod 600 ~/.ssh/*
```

While this works and is a quick fix, the disadvantage is that **changes to your SSH config or to your keys will not be automatically reflected across OSes**. You'd have to remember to copy the files again or manually make changes in both places each time you need to modify them.

## Using mounts

Keeping in spirit with the programmer's basic tenet, [don't repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), a smarter solution is to use [directory mounts](https://en.wikipedia.org/wiki/Mount_(computing)) to allow Linux apps to access the corresponding Windows directory directly.

### Mounting the `C:` drive with Linux metadata support

All of your Windows drives are implicitly available in WSL under the `/mnt` directory, mounted using the [DrvFs driver](https://docs.microsoft.com/ro-ro/archive/blogs/wsl/wsl-file-system-support#drvfs). If you check out this directory, you will see entries such as `/mnt/c`, `/mnt/d` etc., which allow you to access the `C:`, `D:` drives.

You might think it's enough to create a [symbolic link](https://en.wikipedia.org/wiki/Symbolic_link) from `/mnt/c/Users/your-username/.ssh` to `~/.ssh`, but you'll run into issues with the permissions. Turns out that, by default, WSL mounts those Windows drives with all permissions given to all users, which is a security risk the SSH client will not accept. Furthermore, any `chmod` changes you perform on folders within the mounted drives will be ineffective.

The trick, as described by user @plwalsh88 in [this answer](https://superuser.com/a/1676775/585210), is to first enable [the `metadata` option](https://devblogs.microsoft.com/commandline/chmod-chown-wsl-improvements/) on the DrvFs mounts. This will make the file system able to track and remember the Linux-specific permissions, even though they are set on files from a Windows drive.

To do this, create or update the `/etc/wsl.conf` file and change the automounting options to the ones recommended in the answer:

```ini
[automount]
options = "metadata,umask=022,fmask=111"
```

After saving the modifications, exit the terminal and [restart your WSL distro](https://superuser.com/a/1347725/585210). Then proceed to creating a symlink:

```sh
ln --symbolic /mnt/c/Users/<your Windows username>/.ssh/ ~/.ssh/
```

And updating the file permissions, just like in the solution described above:

```sh
chmod 700 ~/.ssh/
chmod 600 ~/.ssh/*
```

Note, however, that this is a change in the default WSL 2 configuration and might incur some overhead or cause compatibility issues. There's also a risk that Windows programs editing your might remove the associated Linux permission metadata.

### Directly mounting the `.ssh` directory using `fstab`

It would be nice if we could make the minimal amount of changes to get the `.ssh` directory to be available directly in Linux. There's a way to do this using the DrvFs file system driver, combined with Linux's built-in `fstab` config file. [^1]

[`fstab`](https://www.redhat.com/sysadmin/etc-fstab), short for file system table, is a configuration file used by the startup process to determine which file systems need to be automatically mounted where. This is how Linux knows where to find your root file system, or the swap partition, and so on.

```
C:\Users\<your Windows username>\.ssh\ /home/<your Linux username>/.ssh drvfs rw,noatime,uid=1000,gid=1000,case=off,umask=0077,fmask=0177 0 0
```

The first argument must be the Windows-specific path to the folder you want to mount in WSL. The second argument indicates the target mount location.

The third argument is a bunch of flags, passed directly to DrvFs:
- `rw` indicates we want to be able to read and write the mounted directory. Change this to `ro` if you don't want to allow Linux tools to edit your SSH config files.
- [`noatime`](https://tldp.org/LDP/solrhe/Securing-Optimizing-Linux-RH-Edition-v1.3/chap6sec73.html) disables the updating/tracking of file access times, a feature which isn't so useful in modern times.
- The `uid` and `gid` flags indicate it should be mounted as being owned by your user's ID (change these if your user's ID aren't `1000`, the default on most distros. Find your IDs by running the `id` command).
- The `case` option indicates that newly created subdirectories inside the mounted directory [shouldn't be considered case sensitive](https://devblogs.microsoft.com/commandline/improved-per-directory-case-sensitivity-support-in-wsl/) (which isn't the case for Windows folders).
- The last two mount flags ensure the directory's permissions are as restricted as possible.

The remaining `fstab` parameters aren't relevant for our use case.

This will make Linux automatically mount the indicated folder at the target location whenever the distro is started. You just have to [restart your WSL distro](https://superuser.com/a/1347725/585210) and everything will work as expected.

## Conclusion

There are usually many ways to achieve the same desired outcome. This post shows that by investigating the problem, understanding how things work and thinking creatively, we can find the solution which best fits our needs.

[^1]: Shameless self promotion: this is based [my own answer](https://superuser.com/a/1700535/585210) to the Super User question above.
