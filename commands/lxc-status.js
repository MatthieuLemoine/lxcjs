'use strict';

const sh     = require('shelljs');
const Table  = require('cli-table2');

module.exports = config => {
  const util   = require('./lxc-util.js')(config);
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
      table.push(
        [++index, util.getHostname(container),
          util.getIp(container), util.getStateWithColor(container)]
      );
    }
  });
  return Promise.resolve(table.toString());
};
