const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

const Monk = require('monk');
// 创建一个Koa对象表示web app本身:
const db=new Monk('localhost/articles');//链接到库


// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body:
app.use(bodyParser());

// add controller:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');