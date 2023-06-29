import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import "../styles/components/articles.scss"

const Articles = () => {

    const data = useStaticQuery(graphql`
    query {
        allInternalArticles {
          edges {
            node {
              id
              source
              title
              url
            }
          }
        }
      }
    `)

    const articles = data.allInternalArticles.edges;

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div id="newsFeed">
                <h1>Latest News</h1>
                <ul>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem modi fugit, aspernatur necessitatibus eligendi veritatis quas fuga quasi dicta doloremque odit molestias omnis. Libero, amet quos? Nisi nobis architecto sed.</p>
                    {articles.filter(({ node }) => node.id !== "dummy") // Filter out the dummy object set by gatsby-source-apiserver plugin
                    .map((article: { id: string; node: { id: React.Key | null | undefined; source: string; url: string; title: string } }) => {
                        return (
                            <li key={article.node.id}>
                                <h3>
                                    <span className="article-info">{article.node.source}</span>
                                    <a className="article-title" href={article.node.url}>{article.node.title}</a>
                                </h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Articles
