import React, { useState, useEffect } from "react"
import axios from "axios"
import type { HeadFC } from "gatsby"

// Components
import Navbar from "../components/navbar"
import Articles from "../components/articles"

// Images
import headerImage from "../images/james-webb-stars-header-image.jpg"

//Styles
import "../styles/global/base.scss"

const IndexPage = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:8080/`)
      .then(response => {
        setData(response.data)
      })
  }, [])

  return (
    <main>
      <header>
        <Navbar />
        <div id="header-image-wrapper">
          <img id="header-image" src={headerImage} alt="" />
          <div className="centered">
            <h1>James Webb News API</h1>
          </div>
        </div>
      </header>
      <section id="newsSection">
        <Articles />
      </section>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
