const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
	// workers can share any TCP connection
	// In this case it is an HTTP Server
	http.createServer(function(req, res) {
		res.writeHead(200);
		res.write(`I am worker #${cluster.worker.id}`);
		console.log(`I am worker #${cluster.worker.id}`);
		res.end("hello world\n");
	}).listen(8000);
}