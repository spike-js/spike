import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const PKG_PATH = join(process.cwd(), "package.json");

if (existsSync(PKG_PATH)) {
  const pkg = JSON.parse(readFileSync(PKG_PATH, { encoding: 'utf-8' }));

  if (pkg['name'] !== "@spike/scripts") {
    console.log(`
Thanks for installing @spike/scripts!
---

This is a utility for building modules for spike,
without worrying about maintaining a complicated build
and test process. spike-scripts allows you to build
spike-ready modules that will build (almost) forever.

To complete setup, please add these package.json scripts:

{
  "build": "spike-scripts build",
  "develop: "spike-scripts develop --watch",
  "test": "spike-scripts test",
  "test-watch": "spike-scripts test --watch"
}

Also, add a jest.config.js to the root with:

const { createTestingConfig } = require('@spike/scripts');

module.exports = createTestingConfig();
    `);
  }
}