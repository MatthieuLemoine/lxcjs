'use strict';

const exec   = require('child_process').execSync;

module.exports = (container, config) =>
  new Promise((resolve, reject) => {
    exec(`${config.lxc_commands_path}/lxc-start -n ${container}`, (error) => {
      if (!error) {
        resolve(`Container ${container} started`);
      } else {
        reject(error);
      }
    });
  });
