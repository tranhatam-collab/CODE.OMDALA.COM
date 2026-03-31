import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const PROJECT_NAME = "nft-iai-one";
const ROOT = process.cwd();
const DEFAULT_ENV_FILES = [
  path.join(ROOT, ".mint.secrets.env"),
  path.join(ROOT, ".dev.vars"),
];

const SECRET_KEYS = [
  "MINT_RPC_URL",
  "MINT_CONTRACT_ADDRESS",
  "MINT_SIGNER_PRIVATE_KEY",
  "MINT_CONTRACT_ABI_JSON",
  "MINT_CONTRACT_ABI_BASE64",
  "MINT_CHAIN_ID",
  "MINT_FUNCTION_NAME",
  "MINT_ARG_OVERRIDES_JSON",
  "MINT_TX_VALUE_WEI",
  "MINT_GAS_LIMIT",
  "MINT_WAIT_FOR_CONFIRMATION",
  "MINT_CONFIRMATIONS",
];

function parseDotEnv(text) {
  const output = {};

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex < 0) continue;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    output[key] = value;
  }

  return output;
}

function loadSecretsFromFiles() {
  return DEFAULT_ENV_FILES
    .filter((filePath) => existsSync(filePath))
    .reduce((accumulator, filePath) => ({
      ...accumulator,
      ...parseDotEnv(readFileSync(filePath, "utf8")),
    }), {});
}

function resolveSecrets() {
  const fromFiles = loadSecretsFromFiles();
  const secrets = {};

  for (const key of SECRET_KEYS) {
    const value = process.env[key] ?? fromFiles[key];
    if (value !== undefined && value !== "") {
      secrets[key] = value;
    }
  }

  return secrets;
}

function putSecret(key, value) {
  execFileSync(
    "wrangler",
    ["pages", "secret", "put", key, "--project-name", PROJECT_NAME],
    {
      cwd: ROOT,
      stdio: ["pipe", "inherit", "inherit"],
      input: value,
    },
  );
}

function main() {
  const secrets = resolveSecrets();
  const keys = Object.keys(secrets);

  if (keys.length === 0) {
    console.error("No MINT_* secrets were found in the current environment, .mint.secrets.env, or .dev.vars.");
    process.exit(1);
  }

  for (const key of keys) {
    console.log(`Syncing Pages secret: ${key}`);
    putSecret(key, secrets[key]);
  }

  console.log(`Mint secrets synced to Cloudflare Pages project "${PROJECT_NAME}".`);
}

main();
