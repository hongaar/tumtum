#!/usr/bin/env node

require('../lib/cli')
  .default.runOrRepl()
  .catch(console.error)
