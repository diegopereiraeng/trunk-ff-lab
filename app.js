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
  
  const defaultMessage = "Hello, Harness!"
  
  const value = await client.boolVariation('greeting', target, false);
  console.log('Evaluation for flag test and target: ', value, target);
  if (value) {
    // Add personalized greeting
    const name = req.url.split('/')[1];
    const greeting = name ? `Hello, ${name}!\n` : `${defaultMessage}\n`;
    res.end(greeting);
  } else {
    res.end(`${defaultMessage}\n`);
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
  
  // Introduce a change that will create a merge conflict
  console.log('This is a change that will create a merge conflict.');
}

const server = http.createServer(handleRequest);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
