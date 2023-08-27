import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `James Webb News`,
    siteUrl: `https://www.yourdomain.tld`,
    menuLinks: [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'About',
        link: '/about'
      }
    ]
  },
  // Set path prefix for GitHub Actions/Pages
  pathPrefix: "/james-webb-news", 
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }, {
      resolve: "gatsby-source-apiserver",
      options: {
        // Type prefix of entities from server
        typePrefix: "internal__",
        url: `http://localhost:8080`,
        headers: {
          "Content-Type": "application/json"
        },

        // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
        // using this name. i.e. posts.json
        name: `articles`
      }
    }, {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Orbitron`,
            file: `https://fonts.googleapis.com/css2?family=Orbitron&display=swap`,
          },
        ],
      },
    }]
};

export default config;
