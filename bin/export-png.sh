#!/bin/bash
# Render a built diagram to PNG (3440 x 1800) with headless Chrome.
#   export-png.sh diagram.html [out.png] [query]
# query: "step=end" (default: whole flow drawn) | "step=3" | "step=3&u=0.5" | "view=<groupId>&dstep=end"
# Set CHROME=/path/to/chrome if it is not found automatically.
set -euo pipefail
[ $# -ge 1 ] || { sed -n '2,5p' "$0"; exit 1; }
html=$(cd "$(dirname "$1")" && pwd)/$(basename "$1")
out=${2:-${html%.html}.png}
query=${3:-step=end}
chrome=${CHROME:-}
for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "/Applications/Chromium.app/Contents/MacOS/Chromium" \
         google-chrome google-chrome-stable chromium chromium-browser; do
  [ -n "$chrome" ] && break
  if [ -x "$c" ] || command -v "$c" >/dev/null 2>&1; then chrome=$c; fi
done
[ -n "$chrome" ] || { echo "Chrome not found. Set CHROME=/path/to/chrome." >&2; exit 1; }
"$chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1720,900 \
  --force-device-scale-factor=2 --virtual-time-budget=3000 \
  --screenshot="$out" "file://$html?$query" 2>/dev/null
echo "$out"
