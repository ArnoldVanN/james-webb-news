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
        url: `http://localhost:8080`,
        headers: {
          "Content-Type": "application/json"
        },
  
        // Request body
        data: {},
  
        // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
        // using this name. i.e. posts.json
        name: `articles`,
  

        // entitiesArray: [
        //   {
        //     url: `http://localhost:8080/`,
        //     method: "get",
        //     headers: {
        //       "Content-Type": "application/json"
        //     },
        //     name: `articles`,
        //     // optional paging
        //     // calculateNextPage: (curUrl, response, context) => {
        //     //   let page = 2
        //     //   if (context.page) {
        //     //     page = context.page + 1
        //     //   }
        //     //   context.page = page
        //     //   const url = `http://yourapi.com/api/v1/posts?page=${page}`
        //     //   const hasNext = response.data.length >= 100
        //     //   return { url, hasNext }
        //     // }   
        //   }
        // ]
  
      }
    }]
};

export default config;
