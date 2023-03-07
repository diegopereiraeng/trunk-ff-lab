const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Harness!\n');
  
  // Log request details
  const logMessage = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  fs.appendFile('access.log', logMessage, (err) => {
    if (err) {
      console.error(err);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
