---
title: Introduction
description: What Fabricator is, what it does, and when to use it.
---

Fabricator is a self-hosted web dashboard for managing Minecraft servers. Today it focuses on the Fabric loader; support for additional mod loaders is planned. It runs on your Linux server and gives you a browser-based interface for starting and stopping the server, watching the console, installing mods, and managing files.

## What it does

- **Server control** — start, stop, and restart your Minecraft server from the UI or CLI
- **Live console** — view logs in real time, run commands without SSH
- **Mod management** — search Modrinth and install mods with one click, no manual file transfers
- **File browser** — navigate and edit server files through the browser
- **Multi-server support** — manage multiple Minecraft servers from a single Fabricator instance

## What it doesn't do

Fabricator is self-hosted only. There's no cloud version.

## How it works

Fabricator runs as a systemd service on your server. The backend is Python/Flask. The frontend is Vue 3, served by Flask in production. The installer sets everything up: dependencies, service user, systemd unit, and config.

Java is managed by Fabricator itself — downloaded from Adoptium and stored under `/var/lib/fabricator/java/`. You don't need Java pre-installed.

Mod installs go through the [Modrinth API](https://docs.modrinth.com), which is free and requires no account or API key.

## When to use Fabricator

Fabricator is a good fit if you:

- Run a modded Minecraft server on a Linux VPS or home server
- Want a UI instead of managing everything over SSH
- Want one-click mod installs from Modrinth without uploading files manually

It's not a good fit if you:

- Need a loader Fabricator does not support yet (check docs and the project roadmap)
- Are on a shared hosting plan without root access (the installer requires sudo)
- Want a managed hosting service — Fabricator is infrastructure you run yourself

## Project status

Fabricator is open source under [github.com/philderks/Fabricator](https://github.com/philderks/Fabricator). It's pre-1.0 and under active development. The API and config format may change between minor versions.