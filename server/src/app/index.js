const Koa = require('koa');
const cors = require('koa2-cors');
const { koaBody } = require('koa-body');

const errorHandler = require('./errorHandler');

const roomRouter = require('../router/roomRouter');
const userRouter = require('../router/userRouter');

const app = new Koa();

app.use(cors());
app.use(koaBody());
app.use(roomRouter.routes());
app.use(userRouter.routes());

// 统一的错误处理
app.on('error', errorHandler);

module.exports = app;
