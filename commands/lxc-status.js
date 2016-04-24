'use strict';

const sh     = require('shelljs');
const chalk  = require('chalk');
const exec   = require('child_process').execSync;
const Table  = require('cli-table2');

module.exports = config => {
  const containers = sh.ls(config.lxc_path);
  const table = new Table({
    head : [
      'Id',
      'Hostname',
      'Ip Addr',
      'State',
    ],
    colWidths : [5, 25, 20, 10],
  });
  containers.forEach((container, index) => {
    if (sh.test('-e', `${config.lxc_path}/${container}/config`)) {
      table.push([++index, hostname(container), ip(container), state(container)]);
    }
  });
  return Promise.resolve(table.toString());

  function ip(container) {
    let str = sh.cat(`${config.lxc_path}/${container}/config`);
    str = grep(str, 'ipv4');
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
    let str = sh.cat(`${config.lxc_path}/${container}/config`);
    str = grep(str, 'utsname');
    str = str.substring(0, str.length - 1);
    if (str.length) {
      return str.split(' ').pop();
    }
    return 'no-hostname';
  }

  // FIXME waiting for pipes in shelljs to land on npm
  function grep(str, pattern) {
    return str
      .split('\n')
      .filter(line => line.indexOf(pattern))
      .join('\n');
  }
};
