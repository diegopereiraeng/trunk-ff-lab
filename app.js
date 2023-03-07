const http = require('http');
const { Client } = require('@harnessio/ff-nodejs-server-sdk');

const hostname = '127.0.0.1';
const port = 3000;

const client = new Client('c948ba62-a992-4efa-aacd-0aea7e845d6c', {  
  enableStream: true,  
  //pollInterval: 2 * 60 * 1000 // two min pollInterval  
});

async function handleRequest(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  const target = {  
    identifier: 'Guest',  
    name: 'Guest',  
    attributes: {  
        'email': 'demo@harness.io'  
    }  
  };
  
  res.end('Hello, Harness!\n');

  const value = await client.boolVariation('logging', target, false);
  console.log('Evaluation for flag test and target: ', value, target);
  if (value) {
    // Log request details
    const logMessage = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
    fs.appendFile('access.log', logMessage, (err) => {
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
