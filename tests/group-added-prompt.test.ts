import { test, expect } from "bun:test";
import { buildGroupAddedPrompt } from "../src/commands/telegram";

// The auto-generated "I was added to a group" intro is written by the model.
// If the prompt doesn't tell it the bot's real @handle, it guesses — and can
// tell users the wrong mention. These tests pin the fix.

test("includes the bot's real handle so the intro can't invent the wrong one", () => {
  const prompt = buildGroupAddedPrompt("supergroup", "My Group", -100123, "alice", "tower_cc_bot");
  expect(prompt).toContain("@tower_cc_bot");
  expect(prompt).not.toContain("@undefined");
  expect(prompt).not.toContain("@null");
});

test("carries the group title and adder into the prompt", () => {
  const prompt = buildGroupAddedPrompt("supergroup", "Buffer Busters", -100, "bob", "b");
  expect(prompt).toContain("Buffer Busters");
  expect(prompt).toContain("bob");
});

test("degrades gracefully when the username isn't loaded yet (no bogus @mention)", () => {
  const prompt = buildGroupAddedPrompt("group", "My Group", -100123, "alice", null);
  expect(prompt).not.toContain("@");
  expect(prompt).toContain("explain how to trigger me");
});
