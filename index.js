const PORT = 8000;

const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());

const url = 'https://www.theguardian.com/uk';

app.get('/', (req, res) => {
  res.json('This is webscraper');
});

app.get('/data', (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];
      $('.fc-item__title', html).each(function () {
        const title = $(this).text();
        const link = $(this).find('a').attr('href');

        articles.push({
          title,
          link,
        });
      });

      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
