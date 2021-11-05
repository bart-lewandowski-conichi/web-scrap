const PORT = 8000;

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const url = 'https://www.theguardian.com/uk';
axios(url)
  .then((response) => {
    const html = response.data;
    const data = cheerio.load(html);
    const articles = [];
    data('.fc-item__title', html).each(function () {
      const title = data(this).text();
      const link = data(this).find('a').attr('href');

      articles.push({
        title,
        link,
      });
    });

    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
