const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

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
]

const NasaArticles = []
const WebbArticles = []

app.listen('8000', () => {
    console.log('Server started on port 8000');
});

sources.forEach(source => {
    if (source.name == 'NASA') {
        getNasaArticles(source);
    } else if (source.name == 'STScI') {
        getStsciArticles(source);
    }
});

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
                // $('a:contains("Webb")').each(function () {
                const title = $(this).text();
                if (title.includes("Engineering: Building Webb")) { return false; }
                let url = $(this).attr('href');
                if (!url.includes("http")) { url = source.base + url }
                const article = {
                    title,
                    url,
                    source: source.name
                }
                WebbArticles.push(article);
            })
        })
}

app.get('/', (req, res) => {
    res.send('go to /articles')
});

app.get('/NasaArticles', (req, res) => {
    res.send(NasaArticles);
});
app.get('/WebbArticles', (req, res) => {
    res.send(WebbArticles);
});