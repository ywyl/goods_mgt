const Koa = require('koa');

const { PORT } = require('./config/config'); 

const app = new Koa();

app.use((ctx, next) => {
  ctx.body = 'hello world';
})

app.listen(PORT, () => {});