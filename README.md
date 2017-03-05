# boot
Bootstrap a JavaScript project without fatigue.

## Features
- Gentle [Webpack 2](https://webpack.js.org/) config
- [Babel](https://babeljs.io/) with [stage 1](https://babeljs.io/docs/plugins/preset-stage-1/) and [env](https://github.com/babel/babel-preset-env) presets
- [Yarn](https://yarnpkg.com/)
- [ESLint](http://eslint.org/) with [Airbnb base config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)
- [Koa](https://github.com/koajs/koa) with common middleware
- [Pug](https://pugjs.org/)
- [Stylus](http://stylus-lang.com/)

## Requirements
- [Node.js](https://nodejs.org/) v7 or higher
- [Yarn](https://yarnpkg.com/)

## Installation
```sh
yarn global add boot-cli
# or
npm i -g boot-cli
```

## Usage
```sh
# initialize new project in current folder
boot
# or specify a folder
boot /home/projects/my-awesome-project
# then
yarn dev # http://localhost:3000
# or
PORT=1337 yarn dev # http://localhost:1337
# build and use in production
yarn prod # http://localhost:3000
```
