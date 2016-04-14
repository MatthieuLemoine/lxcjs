#!/usr/bin/env node
'use strict';

const config = require('./config.json');
const lxc    = require('./index.js')(config);
const chalk  = require('chalk');

lxc
  .status()
  .then(out => process.stdout.write(`${out}\n`))
  .then(() => lxc.start('genius'))
  .then(out => process.stdout.write(chalk.green(`${out}\n`)))
  .then(lxc.status)
  .then(out => process.stdout.write(`${out}\n`))
  .then(() => lxc.stop('genius'))
  .then(out => process.stdout.write(chalk.green(`${out}\n`)))
  .then(lxc.status)
  .then(out => process.stdout.write(`${out}\n`))
  .catch(out => process.stdout.write(chalk.red(`${out}\n`)));
