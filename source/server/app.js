import Koa from 'koa';
import logger from 'koa-logger';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import error from 'koa-error';
import bodyParser from 'koa-bodyparser';
import methodOverride from 'koa-methodoverride';
import convert from 'koa-convert';
import helmet from 'koa-helmet';
import errorHandler from 'koa-better-error-handler';
import serve from 'koa-static';
import PrettyError from 'pretty-error';
import historyApiFallback from 'koa-connect-history-api-fallback';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import webpack from 'webpack';

import { env, port, webpack as webpackConfig } from './../config';

const webpackCompiler = webpack(webpackConfig);
const app = new Koa();
const pe = new PrettyError();

app.context.onerror = errorHandler;

app
  .use(helmet())
  .use(bodyParser())
  .use(methodOverride())
  .use(logger())
  .use(conditional())
  .use(etag());

if (env === 'production') {
  app.use(convert(historyApiFallback({
    verbose: false,
  })));
} else {
  app.use(convert(webpackDevMiddleware(webpackCompiler, {
    contentBase: `http://localhost:${port}`,
    quiet: true,
    noInfo: true,
    inline: true,
    lazy: false,
    publicPath: webpackConfig.output.publicPath,
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // },
    stats: {
      colors: true,
    },
  })));

  app.use(convert(webpackHotMiddleware(webpackCompiler)));

  app.use(convert(historyApiFallback({
    verbose: true,
  })));
}

app.use(convert(error()));
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
