'use strict';

const exec   = require('child_process').exec;

module.exports = function start(container, config) {
  return new Promise((resolve, reject) =>
    exec(`${config.lxc_commands_path}/lxc-start -d -n ${container}`, (error) => {
      if (!error) {
        console.log('Resolve start');
        return resolve(`Container ${container} started`);
      }
      console.log('reject start');
      return reject(error);
    })
  );
};
