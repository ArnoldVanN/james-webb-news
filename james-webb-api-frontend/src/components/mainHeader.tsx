import React from "react"

import Navbar from "../components/navbar"


import "../styles/components/header.scss"

import headerImage from "../images/james-webb-stars-header-image.jpg"

const MainHeader = () => {
  return (
    <header>
      <Navbar />
      <div id="header-image-wrapper">
        <img id="header-image" src={headerImage} alt="" />
        <div className="centered">
          <h1>James Webb News API</h1>
        </div>
      </div>
    </header>
  )
}

export default MainHeader
