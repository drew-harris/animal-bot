import { mkdir, writeFile } from "node:fs/promises";

export interface SaveSiteOptions {
  slug: string;
  html: string;
}

export async function saveSite({ slug, html }: SaveSiteOptions) {
  const sitePath = `${process.env.SITES_PATH}/${slug}`;
  await mkdir(sitePath, { recursive: true });
  await writeFile(`${sitePath}/index.html`, html);
}
