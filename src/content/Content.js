import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { sortBy } from 'lodash'

import { animeJson, mangaJson, archiveJson } from '../constants.js'

import './sass/style.scss'

import Card from './util/Card.js'
import Custombox from './util/Custombox.js'

class Content extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

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
        բոլոր <span className='highlighted button'>{genre}</span>ները |
        <span className='clickable button' onClick={() => genreFunc(undefined)}> մաքրե՞լ </span> ընտրությունը
      </div>
    )
  }

  render () {
    const { path: self } = this.props.match

    const { query, anime, manga, archive, genreFunc } = this.props
    const json = anime ? animeJson : manga ? mangaJson : archive ? archiveJson : null
    if (!json) {
      console.error('content called neither for manga, nor for anime, nor for archive.')
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
          narrow={archive}
          onClick={archive ? () => this.setState({ open: true, url: item.url }) : null}
        />
      )
    }

    const { open, url } = this.state

    return (
      <div className='main-content'>
        {
          this.genreBar()
        }
        {list.length > 0
          ? (
            <div className={`${archive ? 'archive-list' : ''}`}>
              {list}
            </div>
            )
          : <span className='inform-msg'> «<b>{query}</b>» հարցմամբ արդյունքներ չկան։ </span>}

        <Custombox
          pdf
          doc={`https://docs.google.com/document/d/${url}/preview`}
          on={open}
          onClose={() => this.setState({ open: false })}
        />
      </div>
    )
  }
}

export default withRouter(Content)
