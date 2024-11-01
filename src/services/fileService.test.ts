import { describe, expect, it, afterEach } from "bun:test";
import { saveSite } from "./fileService";
import { readFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

describe("fileService", () => {
  const testSlug = "test-site";
  const testHtml = "<html>test</html>";
  const testJs = "console.log('test');";

  afterEach(async () => {
    // Clean up test files after each test
    const sitePath = join(process.env.SITES_PATH!, testSlug);
    if (existsSync(sitePath)) {
      await rm(sitePath, { recursive: true });
    }
  });

  it("should create directory and save both HTML and JS files", async () => {
    await saveSite({
      slug: testSlug,
      html: testHtml,
      js: testJs,
    });

    const sitePath = join(process.env.SITES_PATH!, testSlug);
    const htmlPath = join(sitePath, "index.html");
    const jsPath = join(sitePath, "script.js");
    
    // Check if files exist
    expect(existsSync(htmlPath)).toBe(true);
    expect(existsSync(jsPath)).toBe(true);
    
    // Check file contents
    const htmlContent = await readFile(htmlPath, 'utf-8');
    const jsContent = await readFile(jsPath, 'utf-8');
    expect(htmlContent).toBe(testHtml);
    expect(jsContent).toBe(testJs);
  });
});
