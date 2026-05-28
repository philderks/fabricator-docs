---
title: Introduction
description: What Fabricator is, what it does, and when to use it.
---

Fabricator is a self-hosted dashboard for Minecraft server operators. It runs as a Linux systemd service and provides a browser UI for creating, starting, stopping, configuring, backing up, and maintaining multiple Minecraft server instances.

The current codebase supports these loaders through a shared installer registry:

- Fabric
- Forge
- NeoForge
- Quilt
- Vanilla

Mod and modpack discovery uses the [Modrinth API](https://docs.modrinth.com/). Java can be installed and selected by Fabricator per server, so you do not need to install a global Java runtime before creating a server.

## Core features

- **Multi-server dashboard** — switch between any server stored in Fabricator's server index.
- **Server lifecycle** — install, start, stop, restart, and inspect runtime state.
- **Console** — read recent stdout/stderr and send commands to a running server.
- **Modrinth integration** — search mods and modpacks, resolve compatible versions, install dependencies, and remove installed JARs.
- **Players** — view known/online players and manage whitelist, ops, bans, IP bans, and kicks.
- **Files** — browse server files and edit UTF-8 text files while staying inside the configured server root.
- **Backups** — create quick backups, define scheduled backup configs, download snapshots, and restore them.
- **Settings** — edit common `server.properties` values from the UI; advanced settings are available in expert mode.
- **Self-update** — check GitHub Releases and trigger an in-dashboard update.
- **CLI** — system-level commands for status, start, stop, update, version, uninstall, and help.

## How it works

Fabricator has three main parts:

1. **Backend:** Python/Flask blueprints under `backend/` expose the HTTP API and coordinate installers, processes, backups, player files, and update checks.
2. **Frontend:** Vue 3 + Vite under `frontend/` renders the dashboard and calls the API.
3. **System integration:** `tools/install.sh`, `tools/update.sh`, the systemd unit, and the `fabricator` CLI manage deployment and service lifecycle.

A production install stores application files in `/opt/fabricator/app`, virtualenv files in `/opt/fabricator/venv`, mutable data under `/var/lib/fabricator`, and environment configuration in `/etc/fabricator/fabricator.env`.

## When Fabricator is a good fit

Use Fabricator if you:

- Run Minecraft servers on a VPS, dedicated Linux box, or home server.
- Prefer a web UI over routine SSH file edits.
- Want Modrinth search/install and server backups in one tool.
- Need to manage several server instances from one dashboard.

Fabricator is not a managed hosting service. You remain responsible for the host, firewall, reverse proxy, backups outside the machine, and Minecraft server resource sizing.
