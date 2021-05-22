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
    const { genre } = this.state
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

  informationBar (len) {
    const { query } = this.props
    const { genre } = this.state

    return (
      <div className='inform-msg'>
        {genre
          ? (
            <div className='genre'>
              բոլոր <span className='highlighted button'>{genre}</span>ները |
              <span className='clickable button' onClick={() => this.setState({ genre: undefined })}> մաքրե՞լ </span> ընտրությունը
            </div>
            )
          : null}
        {query && len === 0
          ? (
            <div className='query'>
              «<b>{query}</b>» հարցմամբ արդյունքներ չկան։
            </div>
            )
          : null}
      </div>
    )
  }

  render () {
    const { path: self } = this.props.match

    const { anime, manga, archive } = this.props
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
          onGenreSelected={genre => this.setState({ genre })}
          narrow={archive}
          onClick={archive ? () => this.setState({ open: true, url: item.url }) : null}
        />
      )
    }

    const { open, url } = this.state

    return (
      <div className='main-content'>
        {
          this.informationBar(list.length)
        }
        <div className={`${archive ? 'archive-list' : ''}`}>
          {list}
        </div>

        <Custombox
          pdf on={open}
          doc={`https://docs.google.com/document/d/${url}/preview`}
          onClose={() => this.setState({ open: false })}
        />
      </div>
    )
  }
}

export default withRouter(Content)
