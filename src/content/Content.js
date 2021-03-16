import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { sortBy } from 'lodash'

import { animeJson, mangaJson } from '../constants.js'

import './sass/style.scss'

import Card from './Card.js'

class Content extends Component {
  render () {
    const { path: self } = this.props.match

    const { query, anime, manga } = this.props
    const json = anime ? animeJson : manga ? mangaJson : null
    if (!json) {
      console.error('content called neither for manga, nor for anime.')
    }
    const data = sortBy(
      json.filter(item => item.title.includes(query)),
      item => item.title
    )

    const list = []
    for (const item of data) {
      const path = `${self}/${item.path}`
      list.push(
        <Card {...item} path={path} key={path} />
      )
    }

    return (
      <div className='main-class'>
        {list}
      </div>
    )
  }
}

export default withRouter(Content)
