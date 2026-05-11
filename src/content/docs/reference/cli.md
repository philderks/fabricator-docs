---
title: CLI
description: Command-line interface reference for Fabricator.
---

The Fabricator CLI is a small [Click](https://click.palletsprojects.com/) program for **system-level** service management on a typical Linux install: it drives `systemctl`, reads the installed version marker, talks to the local HTTP API, and runs the bundled update script.

Source code lives in the main repo: [`tools/cli.py` on the `dev` branch](https://github.com/philderks/Fabricator/blob/dev/tools/cli.py).

## Prerequisites

Commands assume a standard deployment where:

- Fabricator runs as the `fabricator` systemd service.
- The app lives under `/opt/fabricator/app` (see `INSTALL_DIR` and `APP_DIR` in the source).
- The local API is reachable at `http://localhost:5000` (`API_BASE`).
- Dependencies used by the script include **Click**, **requests**, and a working **`systemctl`**.

Invoke the CLI the way your install provides it—for example directly with Python against the deployed path (`/opt/fabricator/app/tools/cli.py`), or via a symlink or package entry point if your installer adds one.

## Global behavior

- Many subcommands print colored text to the terminal (green for success, red for failure, yellow for warnings).
- Non-zero exits are used when a required operation fails (for example `systemctl` errors or a failed update).

## Commands

### `start`

Starts the Fabricator service with `systemctl start fabricator`.

- **On success:** prints a success message and exits `0`.
- **On failure:** prints an error and exits with the `systemctl` return code.

### `stop`

Attempts a **graceful** API shutdown, then stops the service.

1. Sends `POST http://localhost:5000/api/stop` with a 10 second timeout. Network or HTTP errors are ignored so shutdown can still proceed.
2. Runs `systemctl stop fabricator`.

Exits `0` on successful stop, otherwise exits with `systemctl`’s return code.

### `update`

Updates Fabricator to the **latest GitHub release** tag.

1. Reads the current version from `/opt/fabricator/app/.fabricator_version` (if present).
2. Fetches `https://api.github.com/repos/philderks/Fabricator/releases/latest` and uses the `tag_name` as the target version.
3. If the version cannot be fetched, prints an error and exits `1`.
4. If the local version already equals the latest tag, prints that you are up to date and exits `0`.
5. Otherwise runs `bash /opt/fabricator/app/tools/install.sh --update` with `FABRICATOR_VERSION` set to the latest tag in the process environment.

Exits with the install script’s return code on failure.

### `status`

Shows **systemd** state and whether the **Flask** app responds on the local API.

**Options**

| Option | Description |
|--------|-------------|
| `--json` | Print a single JSON object instead of the human-readable summary. |

**Plain output**

- **Service:** `systemctl is-active fabricator` result (green if `active`, red otherwise).
- **Flask:** `up` or `down` based on whether `GET http://localhost:5000/api/status` succeeds within 5 seconds.
- If the JSON body of `/api/status` includes any of `players`, `tps`, or `uptime`, those keys are printed indented under Flask.
- If Flask is up but none of those keys are present, it prints the HTTP status code and notes that no Minecraft data was available.

**JSON shape** (approximate)

```json
{
  "systemd_state": "active",
  "flask_up": true,
  "api_status_code": 200,
  "api_body": { }
}
```

`api_body` may be `null` if the response was not valid JSON.

### `version`

Prints the installed Fabricator version from `/opt/fabricator/app/.fabricator_version`.

**Options**

| Option | Description |
|--------|-------------|
| `--json` | Print `{"version": "<tag or null>"}`. |

If the file is missing or unreadable, the human-readable mode prints a yellow warning with the expected path.

### `uninstall`

Removes Fabricator and related system state. This is **destructive**.

1. Prompts: `This will remove Fabricator and all its data. Type 'yes' to continue`
2. Only proceeds if the answer (trimmed, case-insensitive) is exactly `yes`.
3. In order, attempts: stop service, disable service, remove `/opt/fabricator`, remove `/var/lib/fabricator`, remove `/etc/fabricator`, remove user `fabricator`, remove `/etc/systemd/system/fabricator.service`, `systemctl daemon-reload`.

Individual steps use `subprocess.run` with failures reported as warnings (yellow) rather than aborting the whole sequence.

### `help`

Lists every registered subcommand name and its short description (from Click).

**Options**

| Option | Description |
|--------|-------------|
| `--json` | Print a JSON array of objects with `command` and `description` keys, sorted by command name. |

Note: Avoid confusion with `--help` on the top-level Click program (`<command> --help` shows Click’s built-in help for that command).

## Summary table

| Command | Purpose |
|---------|---------|
| `start` | Start the systemd service |
| `stop` | POST `/api/stop`, then stop the systemd service |
| `update` | Bump to latest release via `install.sh --update` |
| `status` | Systemd + local API health (optional `--json`) |
| `version` | Read version file (optional `--json`) |
| `uninstall` | Interactive full removal |
| `help` | List commands (optional `--json`) |

For implementation details and future changes, always refer to [`cli.py`](https://github.com/philderks/Fabricator/blob/dev/tools/cli.py) in the Fabricator repository.
