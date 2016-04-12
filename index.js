#!/usr/bin/env node
'use strict';

const config = require('./config.json');

process.stdout.write(require('./commands/lxc-status.js')(config));
