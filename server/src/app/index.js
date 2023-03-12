const Koa = require('koa');
const { koaBody } = require('koa-body');

const errorHandler = require('./errorHandler');

const roomRouter = require('../router/room');

const app = new Koa();

app.use(koaBody());
app.use(roomRouter.routes());

// 统一的错误处理
app.on('error', errorHandler);

module.exports = app;
