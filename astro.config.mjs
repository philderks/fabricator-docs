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
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'System Requirements', slug: 'getting-started/requirements' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Managing Mods', slug: 'guides/managing-mods' },
						{ label: 'Console', slug: 'guides/console' },
						{ label: 'Updating', slug: 'guides/updating' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'CLI Reference', slug: 'reference/cli' },
						{ label: 'Configuration', slug: 'reference/configuration' },
					],
				},
				{
					label: 'Contributing',
					items: [
						{ label: 'Contributing Guide', slug: 'contributors' },
					],
				},
			],
		}),
	],
});
