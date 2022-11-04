const express = require('express');
const cluster = require('cluster');
const app = express();

function startServer(port) {
  app.listen(port, () => {
    console.log(
      `Express started in ${app.get('env')} ` +
        `mode on http://localhost:${port}` +
        `; press Ctrl-C to terminate.`
    );
  });
}

app.use((req, res, next) => {
  if (cluster.isWorker) {
    console.log(`Worker ${cluster.worker.id} received request`);
  }
  next();
});

if (require.main === module) {
  // application run directly; start app server
  startServer(process.env.PORT || 3000);
} else {
  // application imported as a module via "require": export
  // function to create server
  module.exports = startServer;
}
