---
title: Requirements
description: What you need before installing Fabricator.
---

## Operating system

Fabricator runs on Linux. The installer supports:

| Distro family | Package manager |
|---------------|----------------|
| Debian / Ubuntu | apt |
| Arch Linux | pacman |
| Fedora / RHEL | dnf |

Other distros may work but are untested.

## System requirements

| | Minimum |
|-|---------|
| RAM | 1 GB (plus whatever your Minecraft server needs) |
| Disk | 2 GB free (more depending on mods and world saves) |
| CPU | Any 64-bit x86 |

Fabricator itself is lightweight. The limiting factor is the Minecraft server process it manages.

## Access

- Root or `sudo` access — required by the installer
- A user account with SSH access to the server

## Network

Fabricator listens on `localhost:5000` by default. To access it remotely you'll need one of:

- A reverse proxy (nginx, Caddy, Traefik) — recommended
- Changing the bind address in config — not recommended for public-facing servers

Outbound internet access is required for:

- Downloading Node.js during install
- Downloading Java from Adoptium
- Modrinth API calls for mod search and install

## Java

You don't need Java installed beforehand. Fabricator downloads the appropriate JDK from [Adoptium](https://adoptium.net) and manages it internally under `/var/lib/fabricator/java/{major}/`. The correct version is selected based on the Minecraft version you're running.

## Software installed by the installer

The install script handles these automatically:

- Node.js 20.x (via NodeSource)
- Python 3 and pip packages (via virtualenv)
- System packages: `curl`, `git`, `rsync`, and others depending on distro

You don't need to install any of these manually before running the installer.