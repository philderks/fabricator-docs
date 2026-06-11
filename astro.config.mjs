// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.fabricator.site',
	integrations: [
		starlight({
			title: 'Fabricator',
			description: 'Self-hosted Minecraft server management dashboard',
			logo: { src: './src/assets/fabricator-favicon.svg' },
			head: [
				{
					// Default to dark mode for first-time visitors who have no saved preference
					tag: 'script',
					content: `
						if (!localStorage.getItem('starlight-theme')) {
							document.documentElement.dataset.theme = 'dark';
						}
					`,
				},
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/philderks/Fabricator' },
			],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'System Requirements', slug: 'getting-started/requirements' },
						{ label: 'Reverse Proxy', slug: 'getting-started/reverse-proxy' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Dashboard Overview', slug: 'guides/dashboard-overview' },
						{ label: 'Console', slug: 'guides/console' },
						{ label: 'Players', slug: 'guides/players' },
						{ label: 'Managing Mods and Modpacks', slug: 'guides/managing-mods' },
						{ label: 'File Manager', slug: 'guides/files' },
						{ label: 'Backups and Restore', slug: 'guides/backups' },
						{ label: 'playit.gg Tunnels', slug: 'guides/playit' },
						{ label: 'Server Settings', slug: 'guides/server-settings' },
						{ label: 'Updating', slug: 'guides/updating' },
					],
				},
				{
					label: 'Configuration',
					items: [
						{ label: 'Environment', slug: 'reference/configuration' },
						{ label: 'Java Management', slug: 'config/java' },
						{ label: 'Multi-Server Setup', slug: 'config/multi-server' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'CLI Reference', slug: 'reference/cli' },
						{ label: 'HTTP API Overview', slug: 'reference/http-api' },
					],
				},
				{
					label: 'Troubleshooting',
					items: [
						{ label: 'Common Errors', slug: 'troubleshooting/common-errors' },
						{ label: 'Log Locations', slug: 'troubleshooting/logs' },
						{ label: 'Reporting Bugs', slug: 'troubleshooting/reporting-bugs' },
					],
				},
				{
					label: 'Contributing',
					items: [
						{ label: 'Architecture', slug: 'contributing/architecture' },
						{ label: 'Development Setup', slug: 'contributing/dev-setup' },
						{ label: 'Contributing Guide', slug: 'contributors' },
					],
				},
			],
		}),
	],
});
