'use strict';

const exec   = require('child_process').exec;

module.exports = (container, config) =>
  new Promise((resolve, reject) =>
    exec(`${config.lxc_commands_path}/lxc-start -d -n ${container}`, (error) => {
      if (!error) {
        return resolve(`Container ${container} started`);
      }
      return reject(error);
    })
  );
