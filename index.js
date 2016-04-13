'use strict';

module.exports = config => ({
  status : function status() {
    return require('./commands/lxc-status.js')(config);
  },
  start  : function start(container) {
    return require('./commands/lxc-start.js')(container, config);
  },
  stop   : function stop(container) {
    return require('./commands/lxc-stop.js')(container, config);
  },
});
