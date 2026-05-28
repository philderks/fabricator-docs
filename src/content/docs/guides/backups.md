---
title: Backups and restore
description: Create manual and scheduled backups, download snapshots, and restore servers.
---

Fabricator supports quick backups, scheduled backup configurations, snapshot downloads, and restore jobs.

## Quick backups

Use a quick backup when you want an immediate snapshot before risky work such as installing mods, changing settings, or updating Fabricator.

Quick backup options include:

- Custom storage path.
- Compression on/off.
- Flush before backup.
- Shutdown during backup.

The backend starts a background backup job and returns a job id. The UI polls that job until it completes.

## Backup configurations

A backup configuration defines reusable settings such as name, storage path, maximum snapshots, and optional schedule. When a schedule is present, Fabricator registers it with the background scheduler and reports the next run time in the UI.

Deleting a backup configuration does not silently orphan files. The delete response reports retained and deleted archive paths. If `purge=1` is used, Fabricator only deletes archives that both belong to that config's snapshot records and live inside the config's storage path.

## Snapshots

Snapshots can be listed, deleted, downloaded, or restored. Downloads support the original tar archive and a browser-friendly ZIP conversion.

ZIP conversion handles Fabricator's hybrid archives by unpacking nested data/world tar files into a flat ZIP tree. Region files are stored without recompression because Minecraft region files are already compressed.

## Restore modes

Restore is a background job. The UI asks for a restore mode before starting it. Use the most conservative mode available when you are unsure, and keep a fresh backup before replacing files.

## Job polling

Backup and restore jobs are globally identified by UUID. Poll progress with:

```text
GET /api/backup-jobs/<job_id>
```

The response includes `active` plus the current progress payload.
