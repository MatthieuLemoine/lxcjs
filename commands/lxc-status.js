#!/usr/bin/env node
'use strict';

const sh     = require('shelljs');
const chalk  = require('chalk');
const exec   = require('child_process').execSync;

module.exports = function lxcStatusCommand(config) {
  const containers = sh.ls(config.lxc_path);
  let out = 'Id\tIp Addr\t\tState\t\tHostname\n';
  containers.forEach((container, index) => {
    if (sh.test('-e', `${config.lxc_path}/${container}/config`)) {
      out +=
        `${++index}\t${ip(container)}\t${state(container)}\t\t${hostname(container)}\n`;
    }
  });
  return out;

  function ip(container) {
    let str = sh.cat(`${config.lxc_path}/${container}/config`).grep('ipv4');
    str = str.substring(0, str.length - 1);
    if (str.length) {
      return str.split(' ').pop();
    }
    return '127.0.0.1';
  }

  function state(container) {
    let stdout = exec(`${config.lxc_commands_path}/lxc-info -n ${container}`).toString('utf8');
    stdout = stdout.split('\n')[1].split(' ').pop();
    if (stdout === 'RUNNING') {
      return chalk.green(stdout);
    }
    return chalk.red(stdout);
  }

  function hostname(container) {
    let str = sh.cat(`${config.lxc_path}/${container}/config`).grep('utsname');
    str = str.substring(0, str.length - 1);
    if (str.length) {
      return str.split(' ').pop();
    }
    return 'no-hostname';
  }
};
