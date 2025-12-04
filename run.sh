#!/bin/bash
cd "$(dirname "$0")"
node ../node_modules/.bin/esbuild cli.ts --bundle --platform=node --target=node18 --format=cjs --outfile=cli.js && node cli.js "$@"

