const ipc = require('node-ipc');

var nameOfServer = 'index'

ipc.config.id = 'a-unique-process-name2';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.connectTo(nameOfServer, () => {
  ipc.of[nameOfServer].on('connect', () => {
    ipc.of[nameOfServer].emit('message', "Se ha detectado movimiento");
    ipc.disconnect(nameOfServer)
  });
});