import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { existsSync, readdirSync, watch } from 'node:fs';
import path, { extname, relative, resolve, sep } from 'node:path';
import type { Plugin } from 'vite';
import {defineConfig, loadEnv} from 'vite';

const galleryRoot = resolve(__dirname, 'public/gallery');
const publicRoot = resolve(__dirname, 'public');
const galleryModuleId = 'virtual:fourza-gallery';
const resolvedGalleryModuleId = `\0${galleryModuleId}`;
const galleryExtensions = new Set(['.avif', '.jpg', '.jpeg', '.png', '.webp']);
const galleryCategories: Record<string, string> = {
  'weddings': 'Weddings',
  'college-events': 'College Events',
  'school-events': 'School Events',
  'official-events': 'Official Events',
  'model-shoots': 'Model Shoots',
  'advertisements': 'Advertisements',
  'branding': 'Branding',
  'photography': 'Photography',
};

function discoverGalleryFiles() {
  const images: { src: string; alt: string; category: string }[] = [];

  const visit = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.name.startsWith('.')) continue;
      const filePath = resolve(directory, entry.name);
      if (entry.isDirectory()) {
        visit(filePath);
        continue;
      }
      if (!galleryExtensions.has(extname(entry.name).toLowerCase())) continue;

      const relativePath = relative(galleryRoot, filePath);
      const folder = relativePath.split(sep)[0].toLowerCase();
      const category = galleryCategories[folder] ?? folder.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
      const alt = entry.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
      const assetPath = relative(publicRoot, filePath).split(sep).map(encodeURIComponent).join('/');
      images.push({ src: `/${assetPath}`, alt, category });
    }
  };

  if (existsSync(galleryRoot)) visit(galleryRoot);
  return images;
}

function galleryPlugin(): Plugin {
  return {
    name: 'fourza-gallery-files',
    resolveId(id) {
      if (id === galleryModuleId) return resolvedGalleryModuleId;
    },
    load(id) {
      if (id === resolvedGalleryModuleId) {
        return `export const galleryFiles = ${JSON.stringify(discoverGalleryFiles())};`;
      }
    },
    configureServer(server) {
      if (!existsSync(galleryRoot)) return;
      const galleryWatcher = watch(galleryRoot, { recursive: true }, (_eventType, filename) => {
        if (filename && !galleryExtensions.has(extname(filename.toString()).toLowerCase())) return;
        const module = server.moduleGraph.getModuleById(resolvedGalleryModuleId);
        if (!module) return;
        server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: 'full-reload' });
      });
      server.httpServer?.once('close', () => galleryWatcher.close());
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), galleryPlugin()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
