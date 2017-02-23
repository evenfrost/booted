const { resolve } = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const error = require('koa-error');
const bodyParser = require('koa-bodyparser');
const methodOverride = require('koa-methodoverride');
const convert = require('koa-convert');
const helmet = require('koa-helmet');
const errorHandler = require('koa-better-error-handler');
const serve = require('koa-static');
const PrettyError = require('pretty-error');
const historyApiFallback = require('koa-connect-history-api-fallback');

const app = new Koa();
const pe = new PrettyError();

app.context.onerror = errorHandler;

app
  .use(helmet())
  .use(bodyParser())
  .use(methodOverride())
  .use(logger())
  .use(conditional())
  .use(etag())
  .use(convert(error()));

if (process.env.NODE_ENV === 'production') {
  app.use(convert(historyApiFallback({
    verbose: false,
  })));

  app.use(serve(resolve(__dirname, 'public')));
}

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.throw(err);
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', err => {
  if (!err.status || err.status >= 500) {
    console.log(pe.render(err)); // eslint-disable-line
  }
});

module.exports = app;

