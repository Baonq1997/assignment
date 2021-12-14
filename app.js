const express = require('express');
const router = require('./src/routers/route');
const port = process.env.PORT;
const db = require('./src/models');
const path = require('path');

// require('./src/db/')
const app = express();

app.use(express.json());
app.use('/secure/', router());

// db.sequelize.sync();
const config = {
  express: {
    port: process.env.PORT || 7001
  }
};

app.listen(config.express.port, () => {
  console.log(`Server running on port ${config.express.port}`)
})

// const server = app.listen(config.express.port, () => {
//   const host = server.address().address;
//   const port = server.address().port;
//   console.log(`Server Started at ${host}${port}`);
// });
module.exports = app;