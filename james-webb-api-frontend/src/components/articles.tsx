import React, { useState, useEffect } from "react"
import axios from "axios"

import "../styles/components/articles.scss"

const Articles = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/`)
            .then(response => {
                setData(response.data)
            })
    }, [])

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div id="newsFeed">
                <h1>Latest News</h1>
                <ul>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem modi fugit, aspernatur necessitatibus eligendi veritatis quas fuga quasi dicta doloremque odit molestias omnis. Libero, amet quos? Nisi nobis architecto sed.</p>
                    {data.map(({ id, title, url, source }) => {
                        return (
                            <li key={id}>
                                <h3>
                                    <span className="article-info">{source}</span>
                                    <a className="article-title" href={url}>{title}</a>
                                </h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Articles
