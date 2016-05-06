'use strict';

const sh   = require('shelljs');
const exec = require('child_process').execSync;
const fs   = require('fs');

module.exports = config => ({
  getContainers        : () => getContainers(config),
  getRunningContainers : () => getRunningContainers(config),
  getStoppedContainers : () => getStoppedContainers(config),
});

function getContainers(config) {
  return new Promise((resolve, reject) => {
    // Has read access ?
    fs.access(config.lxc_path, fs.R_OK, err => {
      if (err) {
        return reject(err);
      }
      return resolve(
        sh.ls(config.lxc_path)
        .filter(container => sh.test('-e', `${config.lxc_path}/${container}/config`))
      );
    });
  });
}

function getRunningContainers(config) {
  return getContainers(config)
    .then(containers =>
      containers.filter(
        container => isRunning(container, config)
      )
    );
}

function getStoppedContainers(config) {
  return getContainers(config)
    .then(containers =>
      containers.filter(
        container => isStopped(container, config)
      )
    );
}


function isRunning(container, config) {
  let stdout = exec(`${config.lxc_commands_path}/lxc-info -n ${container}`).toString('utf8');
  stdout = stdout.split('\n')[1].split(' ').pop();
  if (stdout === 'RUNNING') {
    return true;
  }
  return false;
}

function isStopped(container, config) {
  let stdout = exec(`${config.lxc_commands_path}/lxc-info -n ${container}`).toString('utf8');
  stdout = stdout.split('\n')[1].split(' ').pop();
  if (stdout === 'STOPPED') {
    return true;
  }
  return false;
}
