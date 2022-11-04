const cluster = require('cluster');

function startWorker() {
  const worker = cluster.fork();
  console.log(`CLUSTER: Worker ${worker.id} started`);
}

// script를 직접 실행했으면 master mode
if (cluster.isMaster) {
  require('os').cpus().forEach(startWorker);
  // log any workers that disconnect; if a worker disconnects, it
  // should then exit, so we'll wait for the exit event to spawn
  // a new worker to replace it
  cluster.on('disconnect', (worker) =>
    console.log(`CLUSTER: Worker ${worker.id} disconnected from the cluster.`)
  );

  // when a worker dies (exits), create a worker to replace it
  cluster.on('exit', (worker, code, signal) => {
    console.log(`CLUSTER: Worker ${worker.id} died with exit ` + `code ${code} (${signal})`);
    startWorker();
  });
} else {
  const port = process.env.PORT || 3000;
  // start our app on worker; see meadowlark.js
  require('./01-server.js')(port);
}
