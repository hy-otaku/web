import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { mangaJson, animeJson, newJson } from '../constants.js'

import './sass/Ribbon.scss'

class Ribbon extends Component {
  render () {
    const val = []
    newJson.manga.forEach(index => {
      const { path, title } = mangaJson[index]
      val.push(
        <li key={path} className='ribbon-manga'>
          <Link to={`/manga/${path}`}>{title}</Link>
        </li>
      )
    })

    newJson.anime.forEach(index => {
      const { path, title } = animeJson[index]
      val.push(
        <li key={path} className='ribbon-anime'>
          <Link to={`/anime/${path}`}>{title}</Link>
        </li>
      )
    })

    return (
      <div className='ribbon'>

        <ul>
          {val}
        </ul>

      </div>
    )
  }
}

export default withRouter(Ribbon)
