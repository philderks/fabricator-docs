// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.fabricator.site',
	integrations: [
		starlight({
			title: 'Fabricator',
			description: 'Self-hosted Fabric server management dashboard',
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
						{ label: 'Quick Install', slug: 'getting-started/quick-install' },
						{ label: 'System Requirements', slug: 'getting-started/requirements' },
						{ label: 'Reverse Proxy Setup', slug: 'getting-started/reverse-proxy' },
					],
				},
				{
					label: 'Using Fabricator',
					items: [
						{ label: 'Dashboard Overview', slug: 'guide/overview' },
						{ label: 'Managing Mods', slug: 'guide/mods' },
						{ label: 'File Manager', slug: 'guide/files' },
						{ label: 'Console', slug: 'guide/console' },
						{ label: 'Backups', slug: 'guide/backups' },
					],
				},
				{
					label: 'CLI Reference',
					items: [
						{ label: 'Overview', slug: 'cli/index' },
						{ label: 'status / start / stop', slug: 'cli/server-commands' },
						{ label: 'mod install', slug: 'cli/mod-install' },
					],
				},
				{
					label: 'Configuration',
					items: [
						{ label: 'fabricator.env Reference', slug: 'config/env' },
						{ label: 'Java Management', slug: 'config/java' },
						{ label: 'Multi-Server Setup', slug: 'config/multi-server' },
					],
				},
				{
					label: 'Self-Hosting & Contributing',
					items: [
						{ label: 'Running from Source', slug: 'contributing/dev-setup' },
						{ label: 'Architecture', slug: 'contributing/architecture' },
						{ label: 'Contributing Guide', slug: 'contributing/contributing' },
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
			],
		}),
	],
});
