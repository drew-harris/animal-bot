import { describe, expect, it, mock } from "bun:test";
import { saveSite } from "./fileService";
import { mkdir, write } from "node:fs/promises";

mock.module("node:fs/promises", () => ({
  mkdir: mock(() => Promise.resolve()),
  write: mock(() => Promise.resolve()),
}));

describe("fileService", () => {
  it("should create directory and save file", async () => {
    process.env.SITES_PATH = "/test/path";
    
    await saveSite({
      slug: "test-site",
      html: "<html>test</html>",
    });

    expect(mkdir).toHaveBeenCalledWith("/test/path/test-site", { recursive: true });
    expect(write).toHaveBeenCalledWith("/test/path/test-site/index.html", "<html>test</html>");
  });
});
