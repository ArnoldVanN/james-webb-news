/** @format */

const express = require("express")
const cors = require("cors")
const axios = require("axios")
const cheerio = require("cheerio")
const xml2js = require("xml2js")

const app = express()

// Set Access-Control-Allow-Origin header to *
app.use(cors())

const sources = [
	{
		name: "NASA",
		url: "https://www.nasa.gov/rss/dyn/webb_features.rss",
	},
	{
		name: "STScI",
		url: "https://webbtelescope.org/news/news-releases?itemsPerPage=100&keyword=Webb&",
		base: "https://webbtelescope.org",
	},
]

let NasaArticles = []
const WebbArticles = []

const userAgent =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 OPR/99.0.0.0"

app.listen("8080", () => {
	console.log("Server started on port 8080")
})

sources.forEach((source) => {
	if (source.name == "NASA") {
		getNasaArticles(source)
	} else if (source.name == "STScI") {
		getStsciArticles(source)
	}
})

async function getNasaArticles(source) {
	try {
		// Get articles through NASA's RSS feed
		const response = await axios.get(source.url, { headers: { "User-Agent": userAgent } })
		const xmlString = response.data
		const parser = new xml2js.Parser()
		// Parse XML to JS Obj
		parser.parseString(xmlString, (err, result) => {
			if (err) {
				console.error("Error parsing XML:", err)
				return
			}

			const articles = result.rss.channel[0].item.map((item) => ({
				title: item.title[0],
				link: item.link[0],
				description: item.description[0],
				thumbnail: item.enclosure[0].$.url,
				pubDate: item.pubDate[0],
				source: item.source[0].$.url,
			}))

			NasaArticles = articles
		})
	} catch (error) {
		console.log(error)
		throw error
	}
}

async function getStsciArticles(source) {
	await axios
		.get(source.url, { headers: { "User-Agent": userAgent } })
		.then((response) => {
			const html = response.data
			const $ = cheerio.load(html)

			$("div .news-listing").each(function () {
				const aElement = $(this).find(".card-link")

				let link = aElement.attr("href")
				if (!link.includes("http")) {
					link = source.base + link
				}

				const title = aElement.text()
				const description = $(this).find("p").text()
				const thumbnail = ('https:' + $(this).find("img").attr("src"))
				const pubDate = $(this).find(".news-release-date").text()

				const article = {
					title,
					link,
					description,
					thumbnail,
					pubDate,
					source: source.base,
				}

				WebbArticles.push(article)
			})

			// Get current page, and next pages
			let pages = $(".filter-pagination__page-links")
			let currentPage = pages.find(".currentPage").text()
			let nextPageElements = pages.find(".filter-pagination-link")
			// Iterate over list of pages and recursively call getStsciArticles() for each next page
			nextPageElements.each((index, nextPage) => {
				let nextPageNum = $(nextPage).text()
				if (currentPage < nextPageNum) {
					// Create new source obj with updated URL
					let newSource = {
						name: sources[1].name,
						url: sources[1].base + "/news/news-releases?" + $(nextPage).attr("data-form-data"),
						base: sources[1].base,
					}
					getStsciArticles(newSource)
				}
			})
		})
		.catch((err) => {
			console.log(err)
			throw err
		})
}

function getCurrentDateTime() {
	let date_ob = new Date()
	let date = ("0" + date_ob.getDate()).slice(-2)
	let year = date_ob.getFullYear()
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
	let hours = date_ob.getHours()
	let minutes = date_ob.getMinutes()
	let seconds = date_ob.getSeconds()

	return year + "-" + month + "-" + date + "-" + hours + "h-" + minutes + "m-" + seconds + "s"
}

app.get("/", async (req, res) => {
	console.log("GET ALL articles DATE: " + getCurrentDateTime())
	res.send(NasaArticles.concat(WebbArticles))
})

app.get("/NasaArticles", async (req, res) => {
	console.log("GET NASA articles DATE: " + getCurrentDateTime())
	res.send(NasaArticles)
})

app.get("/WebbArticles", async (req, res) => {
	console.log("GET STScI articles DATE: " + getCurrentDateTime())
	res.send(WebbArticles)
})
