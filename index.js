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
        url: 'https://webbtelescope.org/news/news-releases',
        base: 'https://webbtelescope.org'
    }
]

const articles = []
app.listen('8000', () => {
    console.log('Server started on port 8000');
});

sources.forEach(source => {
    console.log(source.url)
    axios.get(source.url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('a:contains("Webb")').each(function () {
                const title = $(this).text();
                if(title.includes("Engineering: Building Webb")){ return false; }
                let url = $(this).attr('href');
                if (!url.includes("http")) { url = source.base + url}
                const article = {
                    title,
                    url,
                    source: source.name
                }
                articles.push(article);
            })
        })
});

app.get('/'), (req, res) => {
    res.send('go to /articles')
}

app.get('/articles', (req, res) => {
    res.send(articles);
});