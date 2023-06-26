const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

// Set Access-Control-Allow-Origin header to *
app.use(cors());

const sources = [
    {
        name: 'NASA',
        url: 'https://webb.nasa.gov/content/webbLaunch/news.html',
        base: 'https://webb.nasa.gov'
    },
    {
        name: 'STScI',
        url: 'https://webbtelescope.org/news/news-releases?itemsPerPage=100&keyword=Webb&',
        base: 'https://webbtelescope.org'
    }
];

const NasaArticles = [];
const WebbArticles = [];

let articleId = 0;

app.listen('8080', () => {
    console.log('Server started on port 8080');
});

sources.forEach(source => {
    if (source.name == 'NASA') {
        getNasaArticles(source);
        // } else if (source.name == 'STScI') {
        //     getStsciArticles(source);
    }
});

// TODO: add way to get image url's for every article
async function getNasaArticles(source) {
    console.log(source.url)
    await axios.get(source.url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('a:contains("Webb")').each(function () {
                const title = $(this).text();
                if (title.includes("Engineering: Building Webb")) { return false; }
                let url = $(this).attr('href');
                if (!url.includes("http")) { url = source.base + url }
                const article = {
                    id: articleId += 1,
                    title,
                    url,
                    source: source.name
                }
                NasaArticles.push(article);
            })
        })
}
async function getStsciArticles(source) {
    console.log(source.url)
    await axios.get(source.url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            $('div .news-listing').find('a:contains("Webb")').each(function () {
                const title = $(this).text();
                let url = $(this).attr('href');
                if (!url.includes("http")) { url = source.base + url }
                const article = {
                    id: articleId += 1,
                    title,
                    url,
                    source: source.name
                }
                WebbArticles.push(article);
            })
        })
}


app.get('/', (req, res) => {
    res.send(NasaArticles.concat(WebbArticles));
});

app.get('/NasaArticles', (req, res) => {
    res.send(NasaArticles);
});
app.get('/WebbArticles', (req, res) => {
    res.send(WebbArticles);
});