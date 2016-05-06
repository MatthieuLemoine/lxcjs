#!/usr/bin/env node
'use strict';

const config = require('./config.json');
const lxc    = require('./index.js')(config);
const chalk  = require('chalk');

lxc.util
  .getContainers()
  .then(print)
  .then(lxc.util.getRunningContainers)
  .then((out) => print(out, chalk.green))
  .then(lxc.util.getStoppedContainers)
  .then((out) => print(out, chalk.red))
  .then(lxc.status)
  .then(print)
  .then(() => lxc.start('container'))
  .then(print)
  .then(lxc.status)
  .then(print)
  .then(() => lxc.stop('container'))
  .then((out) => print(out, chalk.green))
  .then(lxc.status)
  .then(print)
  .catch((out) => print(out, chalk.red));

function print(out, color) {
  if (!color) {
    return process.stdout.write(`${out}\n`);
  }
  return process.stdout.write(color(`${out}\n`));
}
