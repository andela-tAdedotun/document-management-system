/* eslint-disable no-console */

import fs from 'fs';
import cheerio from 'cheerio';

fs.readFile('client/index.html', 'utf8', (error, markup) => {
  if (error) {
    return console.log(error);
  }

  const $ = cheerio.load(markup);

  $('head').prepend('<link rel="stylesheet" href="index.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }

    console.log('index.html successfully written to /dist');
  });
});
