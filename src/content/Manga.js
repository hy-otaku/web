import React, { Component } from 'react'

import './sass/style.scss'

import Content, { getRoutes as contentRoutes } from './manga/Content.js'

export const getRoutes = () => {
  return contentRoutes()
}

class Manga extends Component {
  render () {
    const { query } = this.props

    return (
      <div className='main-content'>

        <Content
          searchValue={query}
        />

      </div>
    )
  }
}

export default Manga
