'use strict';

const sh    = require('shelljs');
const exec  = require('child_process').execSync;
const fs    = require('fs');
const chalk = require('chalk');

module.exports = config => ({
  getContainers        : ()          => getContainers(config),
  getHostname          : (container) => getHostname(container, config),
  getIp                : (container) => getIp(container, config),
  getRunningContainers : ()          => getRunningContainers(config),
  getState             : (container) => getState(container, config),
  getStateWithColor    : (container) => getState(container, config),
  getStoppedContainers : ()          => getStoppedContainers(config),
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

function getIp(container, config) {
  let str = sh.cat(`${config.lxc_path}/${container}/config`);
  str = grep(str, 'ipv4');
  if (str.length) {
    return str.split(' ').pop();
  }
  return '127.0.0.1';
}

function getHostname(container, config) {
  let str = sh.cat(`${config.lxc_path}/${container}/config`);
  str = grep(str, 'utsname');
  if (str.length) {
    return str.split(' ').pop();
  }
  return 'no-hostname';
}

function getState(container, config) {
  const stdout = exec(`${config.lxc_commands_path}/lxc-info -n ${container}`).toString('utf8');
  return stdout.split('\n')[1].split(' ').pop();
}

function getStateWithColor(container, config) {
  const state = getState(container, config);
  if (state === 'RUNNING') {
    return chalk.green(state);
  }
  return chalk.red(state);
}

// FIXME waiting for pipes in shelljs to land on npm
function grep(str, pattern) {
  return str
    .split('\n')
    .filter(line => line.indexOf(pattern) > -1)
    .join('\n');
}
