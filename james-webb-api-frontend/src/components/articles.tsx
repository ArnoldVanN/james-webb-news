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
                <h2>Articles</h2>
                <ul>
                    {data.map(({ id, title, url, source }) => {
                        return (
                            <li key={id}>
                                <h3>{title}</h3>
                                <p>{url}</p>
                                <p>{source}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Articles
