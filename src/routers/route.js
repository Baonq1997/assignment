const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const jwt = require('jsonwebtoken')
const {
  user_account: User
} = require('../models/index');

const routeFiles = fs.readdirSync(path.join(__dirname + '/api'));

module.exports = () => {

    router.use('/api',async (req, res, next) => {
        try {
        const token = req.header('Authorization').replace('Bearer ', '')
        // const data = jwt.verify(token, process.env.JWT_KEY)
        const data = jwt.verify(token, "bezkoder-secret-key")
            const user = await User.findOne({ where: {email: data.id}})
            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token
            next()
        } catch (error) {
            res.status(401).send({ error: 'Not authorized to access this resource' })
        }
    });

    console.log('route.js')
    // All API imports go here.
    routeFiles.forEach(file => {
      require(`./api/${file}`)(router);
    });
    console.log('end route.js')
    return router;
}