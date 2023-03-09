const http = require('http');
const { Client } = require('@harnessio/ff-nodejs-server-sdk');

const hostname = '127.0.0.1';
const port = 3000;

const client = new Client('c948ba62-a992-4efa-aacd-0aea7e845d6c', {
  enableStream: true,
});

async function handleRequest(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  const target = {
    identifier: 'Guest',
    name: 'Guest',
    attribute: {
      'email': 'demo@harness.io'
    }
  };
  
  
  const value = await client.boolVariation('greeting', target, false);
  console.log('Evaluation for flag test and target: ', value, target);
  if (value) {
    // Add personalized greeting
    const name = req.url.split('/')[1];
    const greeting = name ? `Hello, ${name}!\n` : 'Hello, Harness!\n';
    res.end(greeting);
  } else {
    res.end('Hello, Harness!\n');
  }
  
  const logging = await client.boolVariation('logging', target, false);

  if (logging) {
    const logMessage = `${new Date.toISOString()} ${req.method} ${req.url}\n`;
    fs.appendFile('access.log',logMessage, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  
}

const server = http.createServer(handleRequest);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
