# James Webb news API
This is a passion project consisting of an Express API and Gatsby Front-end.
It makes use of RSS feeds and web scraping to gather articles about the James Webb Space Telescope.

A WIP build of this project is currently live at https://arnoldvann.github.io/james-webb-news/

## How to run
After cloning the repo, install the dependencies for the back end project by running `npm install` in the base directory. Make sure to run `npm start` in the back end project first. This starts the API server which is required to build the Gatsby project.\
Then `cd` into the front end directory (james-webb-api-frontend) and run `npm install` followed by `npm start`.

## Project Features
### Back End
The back end is pretty simple. It used an Express API from which the front end can pull articles. Currently articles are gathered from NASA's RSS feed and scraped from STScI's JWST news site.
### Front End
I chose Gatsby as a front end framework because I found the use of GraphQL interesting and wanted to learn more about it. Currently the articles gathered from the API get stored in GraphQL through the use of a Gatsby plugin.
This project also makes use of the Gatsby Image plugin to take care of image lazy loading and loading time optimization.
### Project Code Formatting
Upon running `npm install`, npm also runs a few other scripts if available. In my case it will run the `prepare` script which contains `husky install`. This will enable Git Hooks and makes use of the pre-commit hook to run the Prettier code formatter.
### CI/CD
Currently this project is hosted on GitHub Pages. Every time main recieves a push the GitHub Action will be triggered which builds the project, configures the Page and deploys it.
### Bun
I decided to try out the newly released Bun runtime on this project. Unfortunately Bun is in my opinion not yet mature and compatible enough to migrate the entire project to Bun. But the back end has been successfully migrated to bun and with good results. Bun's hot reloading and starting the server in general is much faster than Node's. As well as installing packages.
Currently the main branch uses Bun for the backend, so if you want to run this project using Node you'll have to change the start script in `package.json` to use `npm` instead.
