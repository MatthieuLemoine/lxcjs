'use strict';

const exec   = require('child_process').execSync;

module.exports = (container, config) =>
  new Promise((resolve, reject) => {
    exec(`${config.lxc_commands_path}/lxc-stop -n ${container}`, (error) => {
      if (!error) {
        resolve(`Container ${container} stopped`);
      } else {
        reject(error);
      }
    });
  });
