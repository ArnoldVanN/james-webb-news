import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Navbar = () => {
    const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }
    }
    `)
    const menuItems = data.site.siteMetadata;

    return (
        <React.Fragment>
            <h1>{menuItems.title}</h1>
            {menuItems.menuLinks.map(({ name, link }: { name: string, link: string }) => {
                return (
                    <a key={name} href={link}>{name}</a>
                )
            })}
        </React.Fragment>
    )
}

export default Navbar
// site(siteMetadata: {menuLinks: {elemMatch: {}}}) {
//     siteMetadata {
//       title
//       menuLinks {
//         name
//         link
//       }
//     }
//   }
// }
