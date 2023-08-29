/** @format */

import React from "react"
import type { HeadFC } from "gatsby"

// Components
import MainHeader from "../components/mainHeader"
import Articles from "../components/articles"

// Images

//Styles
import "../styles/global/base.scss"

const IndexPage = () => {
	return (
		<main>
			<MainHeader />
			<section id="newsSection">
				<Articles />
			</section>
		</main>
	)
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
