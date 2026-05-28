---
title: Configuration
description: Reference for Fabricator configuration files and environment variables.
---

Fabricator reads environment configuration at runtime. In a packaged install, systemd loads `/etc/fabricator/fabricator.env` through `EnvironmentFile=`.

## Main config file

Default production file created by the installer:

```ini
# Fabricator environment configuration
HOST=0.0.0.0
PORT=5000
FLASK_ENV=production
SERVER_ROOT=/var/lib/fabricator/servers
SERVER_INDEX_FILE=/var/lib/fabricator/servers.json
```

Restart the service after editing:

```bash
sudo systemctl restart fabricator
```

## Environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `HOST` | development: `127.0.0.1`; packaged install: `0.0.0.0` | Bind address for the Flask server. |
| `PORT` | `5000` | HTTP port for the dashboard and API. |
| `FLASK_ENV` | `development` | Use `production` for packaged installs. Controls production defaults. |
| `SERVER_ROOT` | production: `/var/lib/fabricator/servers`; development: app data `servers/` | Root directory for managed server instances. |
| `SERVER_INDEX_FILE` | production: `/var/lib/fabricator/servers.json`; development: app data `servers.json` | JSON index of configured servers. |
| `JAVA_ROOT` | production: `/var/lib/fabricator/java`; development: app data `java/` | Directory for managed Java runtimes. |
| `BACKUPS_DIR` | production: `/var/lib/fabricator/backups`; development: app data `backups/` | Default backup directory. |
| `CORS_ORIGINS` | `http://localhost:3000` | Comma-separated list of allowed browser origins for separate frontends. Wildcard `*` is rejected. |
| `FABRICATOR_SKIP_JAVA_CHECK` | unset / false | Development escape hatch to bypass Java version enforcement. Do not enable in production. |
| `FABRICATOR_VERSION` | `latest` in installer | Installer target release tag. |
| `FABRICATOR_REPO` | `philderks/Fabricator` | Installer repository override. |
| `FABRICATOR_SKIP_OS_PACKAGES` | `0` | Internal update optimization used by `tools/update.sh`; valid only in update mode. |

## CORS allowlist

`CORS_ORIGINS` must contain concrete HTTP(S) origins:

```ini
CORS_ORIGINS=http://localhost:3000,https://dashboard.example.com
```

`CORS_ORIGINS=*` is rejected because Fabricator exposes destructive endpoints such as start/stop, file writes, mod deletes, backups, and uninstall/update workflows.

## Server root safety

Server install paths are resolved inside `SERVER_ROOT`. Relative install paths are interpreted below the root. Attempts to escape the root are rejected by the backend.

## Per-server settings

Most game options are persisted in Fabricator's server index and written into the instance's `server.properties`. Settings are editable only while the server is stopped. See [Server settings](/guides/server-settings/) for the UI behavior and field groups.
