const express = require('express');
const router = require('./src/routers/route');
const port = process.env.PORT;
const db = require('./src/models');
const path = require('path');

// require('./src/db/')
const app = express();

app.use(express.json());
app.use('/',router());

// db.sequelize.sync();
const config = {
  express: {
    port: process.env.PORT || 7001
  }
};

app.listen(config.express.port, () => {
  console.log(`Server running on port ${config.express.port}`)
})

module.exports = app;