---
title: Installation
description: Install Fabricator on a Linux server using the release installer.
---

Fabricator installs from GitHub release tarballs. The installer creates the service user, data directories, Python virtualenv, CLI entry point, config file, systemd unit, and self-update sudoers drop-in.

## Install latest release

```bash
curl -fsSL https://fabricator.site/install.sh | bash
```

The script requires root privileges. If you run it as a non-root user, it uses `sudo`.

## Install a specific version

```bash
curl -fsSL https://fabricator.site/install.sh | FABRICATOR_VERSION=vX.Y.Z bash
```

`FABRICATOR_VERSION=main` is intentionally not supported by the installer. Use a release tag.

## What the installer does

1. Detects the Linux distro family.
2. Installs host packages such as Python, curl, tar, rsync, CA certificates, grep, and sed.
3. Ensures the `fabricator` system user exists.
4. Downloads `fabricator-<tag>.tar.gz` from GitHub Releases.
5. Syncs app files into `/opt/fabricator/app`.
6. Creates or updates `/opt/fabricator/venv` and installs Python requirements.
7. Installs the `fabricator` CLI entry point and symlinks it to `/usr/local/bin/fabricator`.
8. Creates `/etc/fabricator/fabricator.env` if it does not exist.
9. Writes `/etc/systemd/system/fabricator.service`.
10. Grants the service user passwordless sudo for the bundled update wrapper only.
11. Enables and starts `fabricator.service`.

## Update an existing install

Run the installer again or pass `--update` explicitly:

```bash
curl -fsSL https://fabricator.site/install.sh | bash -s -- --update
```

During update, Fabricator backs up important state under `/var/lib/fabricator/update-backups/<timestamp>/`, including `servers.json` and `fabricator.env` when present.

## Directory layout

| Path | Purpose |
| --- | --- |
| `/opt/fabricator/app` | Application code synced from the release archive. |
| `/opt/fabricator/venv` | Python virtualenv used by the service and CLI. |
| `/opt/fabricator/app/.fabricator_version` | Installed release marker. |
| `/var/lib/fabricator` | Mutable data root. |
| `/var/lib/fabricator/servers` | Default server install root in production. |
| `/var/lib/fabricator/servers.json` | Server index. |
| `/var/lib/fabricator/java` | Managed Java runtimes. |
| `/var/lib/fabricator/backups` | Default backup root. |
| `/etc/fabricator/fabricator.env` | Environment configuration loaded by systemd. |
| `/etc/systemd/system/fabricator.service` | Systemd unit. |
| `/etc/sudoers.d/fabricator-self-update` | Limited sudo rule for dashboard self-update. |

## Service management

```bash
sudo systemctl status fabricator
sudo systemctl restart fabricator
sudo journalctl -u fabricator -f
```

You can also use the CLI:

```bash
fabricator status
fabricator version
fabricator update
```

## Accessing the dashboard

After install, the script prints the URL it detected. The default packaged config is:

```ini
HOST=0.0.0.0
PORT=5000
FLASK_ENV=production
SERVER_ROOT=/var/lib/fabricator/servers
SERVER_INDEX_FILE=/var/lib/fabricator/servers.json
```

Open `http://<host-ip>:5000/`, then place Fabricator behind a reverse proxy before exposing it broadly.

## Uninstall

Use the installed CLI:

```bash
sudo fabricator uninstall
```

The command asks you to type `yes` and then removes the service, app files, data directory, config directory, service user, and systemd unit. It is destructive.
