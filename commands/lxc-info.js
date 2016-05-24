'use strict';

const sh     = require('shelljs');

module.exports = (containerName, config) => {
  const util   = require('./lxc-util.js')(config);
  const containers = sh.ls(config.lxc_path);
  if (containers.indexOf(containerName) === -1) {
    return Promise.reject(`${containerName} container does not exist`);
  }
  const container = {
    name  : containerName,
    state : util.getState(containerName),
    host  : util.getHostname(containerName),
    ip    : util.getIp(containerName),
  };

  return Promise.resolve(container);
};
