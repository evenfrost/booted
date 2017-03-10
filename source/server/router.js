const router = require('koa-route');

const render = name => ctx => {
  ctx.render(name);
};

module.exports = app => {
  app.use(router.get('/', render('home')));
  app.use(router.get('/about', render('about')));
};
