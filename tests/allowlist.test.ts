import { test, expect } from "bun:test";
import { isAllowed, isDmAllowed } from "../src/allowlist";

test("empty allowlist denies everything", () => {
  expect(isAllowed(123, [])).toBe(false);
});
test("missing userId denied", () => {
  expect(isAllowed(undefined, [123])).toBe(false);
});
test("allowlisted user permitted", () => {
  expect(isAllowed(123, [123, 456])).toBe(true);
});

// isDmAllowed: empty list = unrestricted (default); non-empty = restrict DMs
test("empty dm-allowlist permits any DM (unrestricted default)", () => {
  expect(isDmAllowed(123, [])).toBe(true);
  expect(isDmAllowed(undefined, [])).toBe(true);
});
test("non-empty dm-allowlist permits only listed users", () => {
  expect(isDmAllowed(123, [123, 456])).toBe(true);
  expect(isDmAllowed(789, [123, 456])).toBe(false);
});
test("non-empty dm-allowlist denies missing userId", () => {
  expect(isDmAllowed(undefined, [123])).toBe(false);
});
