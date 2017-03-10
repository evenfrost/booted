const _ = require('lodash');

const commonConfig = require('./common'); // eslint-disable-line
const currentConfig = require(`./${process.env.NODE_ENV || 'development'}`); // eslint-disable-line

module.exports = _.merge(commonConfig, currentConfig);
