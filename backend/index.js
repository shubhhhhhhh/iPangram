const env = require ('dotenv').config({path:".env"});
const server = require('./app')

const hostname = process.env.HOST;
const port = process.env.PORT;


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  })