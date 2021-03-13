import React, { Component } from 'react'

import { mangaJson } from '../constants.js'

import './sass/style.scss'

import { Input } from 'antd'

import Content, { getRoutes as contentRoutes } from './manga/Content.js'

export const getRoutes = () => {
  return contentRoutes()
}

class Manga extends Component {
  constructor (props) {
    super(props)
    this.data = mangaJson
    this.state = {
      manga: ''
    }
    this.searchPlaceholder = 'ո՞ր մանգան ես փնտրում․․․'
  }

  onSearch (value) {
    this.setState({ manga: value })
  }

  onChange ({ target: { value } }) {
    this.setState({ manga: value })
  }

  render () {
    const { Search } = Input
    const { manga } = this.state

    return (
      <div className='main-content'>

        <h1> մանգա
          <Search
            enterButton allowClear
            placeholder={this.searchPlaceholder}
            onSearch={this.onSearch.bind(this)}
            onChange={this.onChange.bind(this)}
          />
        </h1>

        <Content
          searchValue={manga}
        />

      </div>
    )
  }
}

export default Manga
