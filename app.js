const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Add personalized greeting
  const name = req.url.split('/')[1];
  const greeting = name ? `Hello, ${name}!\n` : 'Hello, Harness!\n';
  res.end(greeting);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
