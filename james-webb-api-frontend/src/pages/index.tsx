import React, { useState, useEffect } from "react"
import axios from "axios"
import type { HeadFC } from "gatsby"

// Components
import Navbar from "../components/navbar"

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
      </header>
      <div id="articles">
        <h2>Data</h2>

        {data.map(({ id, title, url, source }) => {
          return (
            <div key={id}>
              <h3>{title}</h3>
              <p>{url}</p>
              <p>{source}</p>
            </div>
          )
        })}
      </div>

    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
