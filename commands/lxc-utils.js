'use strict';

const sh     = require('shelljs');
const exec   = require('child_process').execSync;

module.exports = config => ({
  getRunningContainers : () => {
    let containers = sh.ls(config.lxc_path);
    containers = containers.filter(container => {
      if (sh.test('-e', `${config.lxc_path}/${container}/config`)) {
        return isRunning(container);
      }
      return false;
    });
    
    return Promise.resolve(containers);

    function isRunning(container) {
      let stdout = exec(`${config.lxc_commands_path}/lxc-info -n ${container}`).toString('utf8');
      stdout = stdout.split('\n')[1].split(' ').pop();
      if (stdout === 'RUNNING') {
        return true;
      }
      return false;
    }
  },
});
