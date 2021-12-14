const express = require('express');

require('dotenv').config()
require('./src/models');
const router = require('./src/routers/route');
const app = express();

app.use(express.json());
app.use('/',router());

const config = {
  express: {
    port: process.env.PORT || 7001
  }
};

app.listen(config.express.port, () => {
  console.log(`Server running on port ${config.express.port}`)
})

module.exports = app;