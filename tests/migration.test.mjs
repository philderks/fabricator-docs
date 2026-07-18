import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const requiredFiles = [
  'next.config.mjs',
  'source.config.ts',
  'src/app/layout.tsx',
  'src/app/(docs)/layout.tsx',
  'src/app/(docs)/[[...slug]]/page.tsx',
  'src/app/api/search/route.ts',
  'src/components/mdx.tsx',
  'src/components/provider.tsx',
  'src/components/search.tsx',
  'src/lib/source.ts',
  'content/docs/meta.json',
];

for (const file of requiredFiles) {
  assert.ok(existsSync(file), `missing Fumadocs file: ${file}`);
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
assert.ok(packageJson.dependencies['fumadocs-core'], 'fumadocs-core must be installed');
assert.ok(packageJson.dependencies['fumadocs-mdx'], 'fumadocs-mdx must be installed');
assert.ok(packageJson.dependencies['fumadocs-ui'], 'fumadocs-ui must be installed');
assert.equal(packageJson.dependencies.astro, undefined, 'Astro must be removed');
assert.equal(packageJson.dependencies['@astrojs/starlight'], undefined, 'Starlight must be removed');
assert.equal(packageJson.scripts.build, 'next build');

assert.equal(existsSync('astro.config.mjs'), false, 'Astro config must be removed');
assert.equal(existsSync('src/content.config.ts'), false, 'Astro content config must be removed');

const oldDocs = globSync('src/content/docs/**/*.{md,mdx}');
const newDocs = globSync('content/docs/**/*.{md,mdx}');
assert.equal(oldDocs.length, 0, 'Astro content directory must be retired');
assert.equal(newDocs.length, 38, 'all 38 documentation pages must be preserved');

const content = newDocs.map((file) => readFileSync(file, 'utf8')).join('\n');
assert.doesNotMatch(content, /^template:\s+splash$/m, 'Starlight splash metadata must be removed');
assert.doesNotMatch(content, /^hero:$/m, 'Starlight hero metadata must be removed');
assert.doesNotMatch(content, /^:::(tip|note|caution)/m, 'Starlight directives must be migrated');

const layout = readFileSync('src/app/layout.tsx', 'utf8');
assert.match(layout, /umami\.fabricator\.site\/script\.js/, 'Umami analytics must be preserved');
assert.match(layout, /8ea04109-fc8d-4790-9de6-68985399fe79/, 'Umami site ID must be preserved');

const nextConfig = readFileSync('next.config.mjs', 'utf8');
assert.match(nextConfig, /output:\s*['"]export['"]/, 'static export must preserve the existing hosting model');
assert.match(nextConfig, /trailingSlash:\s*true/, 'existing trailing-slash URLs must be preserved');

console.log('Fumadocs migration structure is complete.');
