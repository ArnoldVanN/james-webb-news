import React from "react";
import { graphql, StaticQuery } from "gatsby";

import "../styles/components/articles.scss";

const Articles = () => {
//   const data = useStaticQuery(graphql`
//     query {
//       allInternalArticles {
//         edges {
//           node {
//             id
//             title
//             link
//             description
//             thumbnail
//             pubDate
//             source
//           }
//         }
//       }
//     }
//   `);
  
  function formatDate(inputDate: string): string {
    const months: Record<string, string> = {
      Jan: "January",
      Feb: "February",
      Mar: "March",
      Apr: "April",
      May: "May",
      Jun: "June",
      Jul: "July",
      Aug: "August",
      Sep: "September",
      Oct: "October",
      Nov: "November",
      Dec: "December",
    };

    const parts = inputDate.split(" ");
    const day = parts[1];
    const monthAbbreviation = parts[2];
    const fullMonthName = months[monthAbbreviation];
    const year = parts[3];

    if (fullMonthName) {
      const formattedDate = `${fullMonthName} ${day}, ${year}`;
      return formattedDate;
    } else {
      return "Invalid month abbreviation.";
    }
  }

  return (
    <StaticQuery
    query={graphql`
    query {
        allInternalArticles {
          edges {
            node {
              id
              title
              link
              description
              thumbnail
              pubDate
              source
            }
          }
        }
      }
    `}
    render={(data) => (
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div id="newsFeed">
          <h1>Latest News</h1>
          <ul>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
              modi fugit, aspernatur necessitatibus eligendi veritatis quas fuga
              quasi dicta doloremque odit molestias omnis. Libero, amet quos? Nisi
              nobis architecto sed.
            </p>
            {data.allInternalArticles.edges
              .filter(({ node }) => node.id !== "dummy") // Filter out the dummy object set by gatsby-source-apiserver plugin
              .map(
                (article: {
                  node: {
                    id: React.Key | null | undefined;
                    title: string;
                    link: string;
                    description: string;
                    thumbnail: string;
                    pubDate: string;
                    source: string;
                    sourceUrl: string;
                  };
                }) => {
                  article.node.sourceUrl = article.node.source;
                  if (article.node.source.includes("nasa")) {
                    article.node.source = "NASA";
                    article.node.sourceUrl = "https://webb.nasa.gov/content/webbLaunch/news.html";
                    // Reformatting pubDate
                    article.node.pubDate = formatDate(article.node.pubDate);
                  } else {
                    article.node.source = "STScI";
                  }
                  return (
                    <li key={article.node.id}>
                      <div className="article-release-information">
                        <span className="article-release-source">
                          <a href={article.node.sourceUrl} target="_blank">
                            {article.node.source}
                          </a>
                        </span>
                        <span className="article-release-date">
                          {article.node.pubDate}
                        </span>
                      </div>
                      <h3>
                        <a className="article-title" href={article.node.link} target="_blank">
                          {article.node.title}
                        </a>
                      </h3>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                      </p>
                    </li>
                  );
                }
              )}
          </ul>
        </div>
      </div>
    )}
  />
  );
};

export default Articles;
