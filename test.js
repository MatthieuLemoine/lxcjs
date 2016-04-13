#!/usr/bin/env node
'use strict';

const config = require('./config.json');
const lxc    = require('./index.js')(config);

lxc
  .status()
  .then(console.log('After Status 1'))
  .then(lxc.start('genius'))
  .then(console.log('After start'))
  .then(() => lxc.status)
  .then(console.log('After status 2'))
  .then(lxc.stop('genius'))
  .then(console.log('After stop'))
  .then(() => lxc.status)
  .then(console.log('After status3'))
  .catch(console.log);
