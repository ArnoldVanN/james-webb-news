import React from "react"

import Navbar from "../components/navbar"


import "../styles/components/header.scss"

import headerImage from "../images/main_image_star-forming_region_carina_nircam_final-5mb.jpg"

const MainHeader = () => {
  return (
    <header>
      <Navbar />
      <div id="header-image-wrapper">
        <img src={headerImage} alt="" />
        <div className="centered">
          <h1>James Webb News API</h1>
        </div>
      </div>
    </header>
  )
}

export default MainHeader
