/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from './webpack.config.prod';

process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production...');

webpack(webpackConfig).run((error, stats) => {
  if (error) {
    console.log(error);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(err => console.log(err));
  }

  if (jsonStats.hasWarnings) {
    console.log('WARNINGS:');
    jsonStats.warnings.map(warning => console.log(warning));
  }

  console.log(`Webpack stats: ${stats}`);
  console.log('App successfully compiled');

  return 0;
});
