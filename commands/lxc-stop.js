'use strict';

const exec   = require('child_process').exec;

module.exports = (container, config) =>
  new Promise((resolve, reject) =>
    exec(`${config.lxc_commands_path}/lxc-stop -n ${container}`, (error) => {
      if (!error) {
        console.log('Resolve stop');
        return resolve(`Container ${container} stopped`);
      }
      console.log('reject stop');
      return reject(error);
    })
  );
