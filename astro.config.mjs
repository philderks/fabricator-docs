// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.fabricator.site',
	integrations: [
		starlight({
			title: 'Fabricator',
			customCss: ['./src/styles/custom.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/philderks/Fabricator' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Requirements', slug: 'getting-started/requirements' },
						{ label: 'Installation', slug: 'getting-started/installation' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Managing mods', slug: 'guides/managing-mods' },
						{ label: 'Console', slug: 'guides/console' },
						{ label: 'Updating', slug: 'guides/updating' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Configuration', slug: 'reference/configuration' },
						{ label: 'CLI', slug: 'reference/cli' },
					],
				},
				{ label: 'Contributing', link: '/contributing/' },
			],
		}),
	],
});
