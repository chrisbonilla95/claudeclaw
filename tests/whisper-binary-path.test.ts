import { test, expect } from "bun:test";
import { resolveWhisperBinaryPath } from "../src/whisper";

test("uses the configured custom binary when set", () => {
  expect(resolveWhisperBinaryPath("/opt/whisper-cli", "/bundled/bin", "linux")).toBe("/opt/whisper-cli");
});

test("falls back to the bundled binary when unset or blank", () => {
  expect(resolveWhisperBinaryPath(undefined, "/bundled/bin", "linux")).toBe("/bundled/bin/whisper-cli");
  expect(resolveWhisperBinaryPath("   ", "/bundled/bin", "linux")).toBe("/bundled/bin/whisper-cli");
});

test("adds .exe suffix on win32", () => {
  expect(resolveWhisperBinaryPath(undefined, "C:/bin", "win32")).toBe("C:/bin/whisper-cli.exe");
});
