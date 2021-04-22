import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { sortBy } from 'lodash'

import { animeJson, mangaJson } from '../constants.js'

import './sass/style.scss'

import Card from './util/Card.js'

class Content extends Component {
  byGenre (item) {
    const { genre } = this.props
    if (!genre) { // ignore genre when none is selected
      return true
    }

    const { genres } = item
    if (!genres) {
      return false
    }

    return genres.includes(genre)
  }

  byQuery (item) {
    const { query } = this.props

    const helper = (data) => {
      if (!data) {
        return false
      }

      for (item of data) {
        if (item.includes(query)) {
          return true
        }
      }

      return false
    }

    const { title, meta } = item

    return title.includes(query) || (
      meta &&
      (helper(meta.jp) || helper(meta.en) || helper(meta.ru) || helper(meta.keywords))
    )
  }

  genreBar () {
    const { genre, genreFunc } = this.props
    if (!genre) {
      return null
    }

    return (
      <div className='inform-msg'>
        բոլոր {genre}ները։ <span className='clickable highlight' onClick={() => genreFunc(undefined)}> մաքրե՞լ </span> ընտրությունը․․․
      </div>
    )
  }

  render () {
    const { path: self } = this.props.match

    const { query, anime, manga, genreFunc } = this.props
    const json = anime ? animeJson : manga ? mangaJson : null
    if (!json) {
      console.error('content called neither for manga, nor for anime.')
    }
    const data = sortBy(
      json
        .filter(item => this.byGenre(item))
        .filter(item => this.byQuery(item)),
      item => item.title
    )

    const list = []
    for (const item of data) {
      const path = `${self}/${item.path}`
      list.push(
        <Card
          {...item}
          path={path} key={path}
          onGenreSelected={genre => genreFunc(genre)}
        />
      )
    }

    return (
      <div className='main-content'>
        {
          this.genreBar()
        }
        {list.length > 0
          ? list
          : <span className='inform-msg'> «<b>{query}</b>» հարցմամբ արդյունքներ չկան։ </span>}
      </div>
    )
  }
}

export default withRouter(Content)
