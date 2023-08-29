/** @format */

import React from "react"
import { useStaticQuery, graphql, withPrefix } from "gatsby"

import "../styles/components/navbar.scss"

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
	const menuItems = data.site.siteMetadata

	return (
		<div id="navbar-wrapper">
			{menuItems.menuLinks.map(({ name, link }: { name: string; link: string }) => {
				return (
					<a key={name} href={withPrefix(link)}>
						{name}
					</a>
				)
			})}
		</div>
	)
}

export default Navbar
