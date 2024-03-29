/** @format */

import React from "react"
import type { HeadFC } from "gatsby"

const pageStyles = {
	color: "#232129",
	padding: 96,
	fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const linkStyle = {
	color: "#8954A8",
	fontWeight: "bold",
	fontSize: 16,
	verticalAlign: "5%",
}
const AboutPage = () => {
	return <main style={pageStyles}></main>
}

export default AboutPage

export const Head: HeadFC = () => <title>About Page</title>
