#!/usr/bin/env bash
set -euo pipefail

echo "=== OMCODE Mac Bootstrap ==="

# Check Homebrew
if ! command -v brew &>/dev/null; then
  echo "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Check Node.js
if ! command -v node &>/dev/null || [[ "$(node -v | cut -d. -f1 | tr -d 'v')" -lt 20 ]]; then
  echo "Installing Node.js 20+..."
  brew install node@20
fi

# Check pnpm
if ! command -v pnpm &>/dev/null; then
  echo "Installing pnpm..."
  corepack enable && corepack prepare pnpm@latest --activate
fi

# Check Git
if ! command -v git &>/dev/null; then
  echo "Installing Git..."
  brew install git
fi

# Check Xcode Command Line Tools
if ! xcode-select -p &>/dev/null; then
  echo "Installing Xcode Command Line Tools..."
  xcode-select --install
fi

# Install dependencies
echo "Installing project dependencies..."
pnpm install

echo "=== Bootstrap complete ==="
echo "Run 'pnpm dev' to start all apps."
