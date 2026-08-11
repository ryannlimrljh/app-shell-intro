#!/usr/bin/env bash
# Re-copy the servable files into the scratchpad mirror that the in-app preview
# browser reads from. The preview server cannot read ~/Desktop (macOS TCC denies
# the harness access), so it serves this copy on :8795 instead. Run after any
# edit to pages/ or collabrium-dls/ before re-checking in the browser.
set -euo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)"
DST="${MIRROR_DIR:?set MIRROR_DIR to the scratchpad serve/ path}"
rsync -a --delete "$SRC/pages/" "$DST/pages/"
rsync -a --delete "$SRC/collabrium-dls/" "$DST/collabrium-dls/"
echo "mirrored -> $DST"
