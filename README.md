# boot
Bootstrap a JavaScript project without fatigue.

## Features
- Gentle [Webpack](https://webpack.js.org/) config
- [Babel](https://babeljs.io/) with [stage 1](https://babeljs.io/docs/plugins/preset-stage-1/) and [env](https://github.com/babel/babel-preset-env) presets
- [Yarn](https://yarnpkg.com/)
- [ESLint](http://eslint.org/) with [Airbnb base config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)
- [Pug](https://pugjs.org/)
- [Stylus](http://stylus-lang.com/)

## Installation
```sh
yarn global add boot-cli
# or
npm i -g boot-cli
```

## Usage
```sh
# initialize new project in current folder
boot # or boot .
# or specify a folder
boot /home/projects/my-awesome-project
```
