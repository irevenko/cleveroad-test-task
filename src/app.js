require('dotenv').config();
const express = require('express');
const userRouter = require('./api/user/user.router');
const itemRouter = require('./api/item/item.router');

const app = express();
app.use(express.json());

app.use('/api', userRouter);
app.use('/api/items', itemRouter);

module.exports = app;
