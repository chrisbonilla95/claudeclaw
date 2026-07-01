import { warmupWhisperAssets } from "./whisper";
import { loadSettings } from "./config";

async function main() {
  try {
    // This runs as a separate process from the daemon, so load settings here too
    // — otherwise a configured telegram.whisperBinPath is ignored and the bundled
    // prebuilt is downloaded anyway. Missing settings fall back to the default.
    await loadSettings().catch(() => {});
    await warmupWhisperAssets({ printOutput: true });
    console.log("whisper warmup: ready");
  } catch (err) {
    console.error(`whisper warmup: failed - ${err instanceof Error ? err.message : String(err)}`);
    process.exit(1);
  }
}

void main();
