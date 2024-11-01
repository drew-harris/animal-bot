import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

export interface SaveSiteOptions {
  slug: string;
  html: string;
  js: string;
}

export async function saveSite({ slug, html, js }: SaveSiteOptions) {
  const sitePath = join(process.env.SITES_PATH!, slug);
  await mkdir(sitePath, { recursive: true });
  await writeFile(join(sitePath, "index.html"), html);
  await writeFile(join(sitePath, "script.js"), js);
}
