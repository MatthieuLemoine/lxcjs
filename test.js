#!/usr/bin/env node
'use strict';

const config = require('./config.json');

require('./commands/lxc-status')(config)
  .then(out => process.stdout.write(out));
