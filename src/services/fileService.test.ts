import { describe, expect, it, afterEach } from "bun:test";
import { saveSite } from "./fileService";
import { readFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

describe("fileService", () => {
  const testSlug = "test-site";
  const testHtml = "<html>test</html>";

  afterEach(async () => {
    // Clean up test files after each test
    const sitePath = join(process.env.SITES_PATH!, testSlug);
    if (existsSync(sitePath)) {
      await rm(sitePath, { recursive: true });
    }
  });

  it("should create directory and save file", async () => {
    await saveSite({
      slug: testSlug,
      html: testHtml,
    });

    const sitePath = join(process.env.SITES_PATH!, testSlug);
    const filePath = join(sitePath, "index.html");
    
    // Check if file exists
    expect(existsSync(filePath)).toBe(true);
    
    // Check file contents
    const content = await readFile(filePath, 'utf-8');
    expect(content).toBe(testHtml);
  });
});
