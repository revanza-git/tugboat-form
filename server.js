const { createServer } = require("http");
const next = require("next");

const path = require("path");

// Log the directory to confirm the location of server.js
console.log("Current Directory:", __dirname);

// Configure the Next.js app with the option to disable dev mode
const app = next({ dev: process.env.NODE_ENV !== 'production'});
const handle = app.getRequestHandler();

// Use environment variables for host and port, with defaults as fallbacks
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

// Prepare the Next.js app and then start the server
app.prepare().then(() => {
  createServer((req, res) => {
    // Use the Next.js request handler to handle all incoming requests
    handle(req, res);
  }).listen(PORT, HOST, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${HOST}:${PORT}`);
  });
});

// This check ensures the script is only executed when run directly,
// not when required as a module in another script.
if (require.main === module) {
  app.prepare().then(() => {
    createServer((req, res) => handle(req, res)).listen(PORT, HOST, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://${HOST}:${PORT}`);
    });
  });
}