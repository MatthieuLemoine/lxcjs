# lxcjs
[![npm](https://img.shields.io/npm/v/lxcjs.svg)]()
[![dependencies](https://david-dm.org/MatthieuLemoine/lxcjs.png)](https://david-dm.org/MatthieuLemoine/lxcjs.png)

A Node JS wrapper around lxc commands.

## Install

    npm i --save lxcjs

## Test

    ./test.js

## Usage

```javascript
const config = require('./config.json');
const lxc    = require('lxcjs')(config);

// Containers status
lxc
    .status
    .then(out => process.stdout.write(out));

// Container start
lxc
    .start(containerName)
    .then(out => process.stdout.write(out))
    .catch(err => process.stderr.write(err));

// Container stop
lxc
    .stop(containerName)
    .then(out => process.stdout.write(out))
    .catch(err => process.stderr.write(err));

// Get all containers
lxc
    .util
    .getContainers()
    .then(out => process.stdout.write(out))
    .catch(err => process.stderr.write(err));

// Get running containers
lxc
    .util
    .getRunningContainers()
    .then(out => process.stdout.write(out))
    .catch(err => process.stderr.write(err));

// Get stopped containers
lxc
    .util
    .getStoppedContainers()
    .then(out => process.stdout.write(out))
    .catch(err => process.stderr.write(err));
```

With config.json providing following informations :


    {
        "lxc_path" : "/path/to/containers/directory",
        "lxc_commands_path" : "/path/to/lxc/commands/directory"
    }
