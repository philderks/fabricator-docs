---
title: Requirements
description: What you need before installing Fabricator.
---

## Operating system

Fabricator is Linux-first and the installer requires **systemd**. The supported installer families are:

| Distro family | Package manager | Examples |
| --- | --- | --- |
| Debian / Ubuntu | `apt` | Debian, Ubuntu, Raspbian, Pop!_OS, Linux Mint |
| Arch | `pacman` | Arch, EndeavourOS, Garuda, Manjaro |
| Fedora / RHEL | `dnf` | Fedora, RHEL, CentOS, Rocky, AlmaLinux |

Other distros may work manually, but the official installer exits on unknown families.

## Host access

You need:

- Root or `sudo` access.
- `curl` and `systemctl` available before running the installer.
- Outbound HTTPS access to GitHub Releases, PyPI, Modrinth, and Adoptium.

The installer creates a system user named `fabricator`, a systemd unit, `/etc/fabricator/fabricator.env`, and `/var/lib/fabricator`.

## Runtime requirements

| Component | Requirement |
| --- | --- |
| Python | Python 3.10+ at minimum; the package metadata targets Python 3.11+. |
| Node.js | Not required at runtime for release tarballs; required for frontend builds from source. |
| Java | Managed per server by Fabricator. A global Java install is optional. |
| RAM | Fabricator itself is lightweight; size the host for your Minecraft servers. |
| Disk | Plan for worlds, mods, backups, and managed Java runtimes under `/var/lib/fabricator`. |

## Java compatibility rules

Fabricator maps Minecraft versions to Java requirements before install/start:

| Minecraft version | Java |
| --- | --- |
| `<= 1.16.5` | 8 |
| `1.17.x` | 16 |
| `1.18.x` through `1.20.4` | 17 |
| `1.20.5` through `1.21.x` | 21 |
| year-based `24.x+` and configured future `1.26+` | 25 |
| unmapped `1.22.x` through `1.25.x` | not enforced; Fabricator shows a warning |

Set `FABRICATOR_SKIP_JAVA_CHECK=1` only for local development/testing. Do not use it in production: servers may fail at runtime with the wrong JVM.

## Network ports

- Fabricator dashboard/API: `PORT` from `/etc/fabricator/fabricator.env` (default `5000`).
- Minecraft server: per-server `server-port` (default `25565`).
- Optional Minecraft query/RCON: per-server settings when enabled.
- Optional playit.gg tunnels: outbound HTTPS to playit.gg/API endpoints. No inbound Minecraft port-forward is required for servers exposed through playit.gg.

The packaged installer writes `HOST=0.0.0.0` by default so the dashboard binds all interfaces. If the host is reachable from untrusted networks, put Fabricator behind a firewall and reverse proxy. playit.gg can expose Minecraft server ports, but it does not protect the Fabricator dashboard itself.
