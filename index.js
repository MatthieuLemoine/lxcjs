'use strict';

module.exports = config => ({
  info   : container => require('./commands/lxc-info.js')(container, config),
  status : () => require('./commands/lxc-status.js')(config),
  start  : container => require('./commands/lxc-start.js')(container, config),
  stop   : container => require('./commands/lxc-stop.js')(container, config),
  util  : require('./commands/lxc-util.js')(config),
});
