/** @format */

import React from "react"
import { withPrefix } from "gatsby"

import Navbar from "../components/navbar"

import "../styles/components/header.scss"

import headerImage from "../images/main_image_star-forming_region_carina_nircam_final-5mb.jpg"

const MainHeader = () => {
  return (
    <header>
      <Navbar />
      <div id="header-image-wrapper">
        <img src={withPrefix(headerImage)} alt="" />
        <div className="centered">
          <h1>James Webb News API</h1>
        </div>
        <div id="slanted-edge"></div>
      </div>
    </header>
  )
}

export default MainHeader
