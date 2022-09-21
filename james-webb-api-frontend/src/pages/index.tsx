import React, { useState, useEffect } from "react"
import axios from "axios"
import type { HeadFC } from "gatsby"

import Navbar from "../components/navbar"

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
const IndexPage = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:8080/`)
      .then(response => {
        setData(response.data)
      })
  }, [])

  return (
    <main style={pageStyles}>
      <header><Navbar /></header>

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
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
