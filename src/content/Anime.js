import React, { Component } from 'react'

import { animeJson } from '../constants.js'

import './sass/style.scss'

import { Input } from 'antd'

import Content, { getRoutes as contentRoutes } from './anime/Content.js'

export const getRoutes = () => {
  return contentRoutes()
}

class Anime extends Component {
  constructor (props) {
    super(props)
    this.data = animeJson
    this.state = {
      anime: ''
    }
    this.searchPlaceholder = 'ո՞ր անիմեն ես փնտրում․․․'
  }

  onSearch (value) {
    this.setState({ anime: value })
  }

  onChange ({ target: { value } }) {
    this.setState({ anime: value })
  }

  render () {
    const { Search } = Input
    const { anime } = this.state

    return (
      <div className='main-content'>

        <h1> անիմե
          <Search
            enterButton allowClear
            placeholder={this.searchPlaceholder}
            onSearch={this.onSearch.bind(this)}
            onChange={this.onChange.bind(this)}
          />
        </h1>

        <Content
          searchValue={anime}
        />

      </div>
    )
  }
}

export default Anime
