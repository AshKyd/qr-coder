#!/usr/bin/env bash
# Generate PWA manifest icons from favicon.svg using vips

cd "$(dirname "$0")/../public" || exit 1

if ! command -v vips &> /dev/null; then
  echo "vips not found. Please install it first (e.g. 'brew install vips')."
  exit 1
fi

echo "Generating 192x192 icon (scale=12 since original is 16x16)..."
vips copy "favicon.svg[scale=12]" icon-192.png

echo "Generating 512x512 icon (scale=32 since original is 16x16)..."
vips copy "favicon.svg[scale=32]" icon-512.png

echo "Done! Icons generated in public/"
