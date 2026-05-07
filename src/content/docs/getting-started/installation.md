---
title: Installation
description: Install Fabricator on a Linux server using the one-line installer.
---

Fabricator installs via a single bash script. The installer handles dependencies, creates a system service, and sets up the directory structure.

## Requirements

- Linux (Debian/Ubuntu, Arch, Fedora/RHEL)
- `curl` or `wget`
- Root or sudo access

See [Requirements](/getting-started/requirements) for the full list including Java and port details.

## Install

```bash
curl -fsSL https://raw.githubusercontent.com/philderks/Fabricator/main/tools/install.sh | sudo bash
```

The installer will:

1. Detect your package manager and install system dependencies
2. Install Node.js 20.x via NodeSource
3. Create the `fabricator` service user
4. Deploy the app to `/opt/fabricator/app`
5. Write default config to `/etc/fabricator/fabricator.env`
6. Enable and start `fabricator.service`

When it's done, Fabricator is running at `http://localhost:5000`.

## Upgrading

Run the same install command again. The installer detects an existing installation and upgrades in place. It stops the service, syncs the new files, then restarts.

## Directory layout

| Path | Purpose |
|------|---------|
| `/opt/fabricator/app` | Application files (root:root, 755) |
| `/var/lib/fabricator` | Server data, Java runtimes, backups |
| `/etc/fabricator/fabricator.env` | Configuration (root:fabricator, 0640) |
| `/etc/systemd/system/fabricator.service` | Systemd unit |
| `/opt/fabricator/app/.fabricator_version` | Installed version marker |

## Service management

```bash
# Status
sudo systemctl status fabricator

# Stop / start / restart
sudo systemctl stop fabricator
sudo systemctl start fabricator
sudo systemctl restart fabricator

# Logs
sudo journalctl -u fabricator -f
```

## Accessing the UI

By default, Fabricator only listens on `localhost:5000`. It won't be reachable from outside the server without a reverse proxy.

If you're running Fabricator on a remote server, set up a reverse proxy. Example with nginx:

```nginx
server {
    listen 80;
    server_name fabricator.example.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Then add TLS with Certbot or Cloudflare. See the [reverse proxy guide](/guides/reverse-proxy) for more options.

## Uninstalling

There's no automated uninstaller yet. To remove Fabricator manually:

```bash
sudo systemctl stop fabricator
sudo systemctl disable fabricator
sudo rm -rf /opt/fabricator /etc/fabricator /etc/systemd/system/fabricator.service
sudo userdel fabricator
sudo systemctl daemon-reload
```

Server data lives in `/var/lib/fabricator`. Remove that directory too if you don't need it:

```bash
sudo rm -rf /var/lib/fabricator
```