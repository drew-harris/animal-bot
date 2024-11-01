import { expect, test, describe } from "bun:test";
import { slugify } from "./slugify";

describe("slugify", () => {
  test("converts to lowercase", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  test("replaces spaces with hyphens", () => {
    expect(slugify("my cool website")).toBe("my-cool-website");
  });

  test("removes special characters", () => {
    expect(slugify("Hello! @World#")).toBe("hello-world");
  });

  test("removes multiple hyphens", () => {
    expect(slugify("hello   world")).toBe("hello-world");
  });

  test("trims hyphens from ends", () => {
    expect(slugify("--hello world--")).toBe("hello-world");
  });
});
