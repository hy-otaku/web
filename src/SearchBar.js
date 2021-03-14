import React, { Component } from 'react'

import './sass/SearchBar.scss'

import { Input } from 'antd'

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.searchPlaceholder = 'ի՞նչ ես փնտրում․․․'
    this.searchFunction = this.props.searchFunction
  }

  onSearch (value) {
    this.searchFunction(value)
  }

  onChange ({ target: { value } }) {
    this.searchFunction(value)
  }

  render () {
    const { Search } = Input

    return (
      <Search
        enterButton allowClear
        placeholder={this.searchPlaceholder}
        onSearch={this.onSearch.bind(this)}
        onChange={this.onChange.bind(this)}
      />
    )
  }
}

export default SearchBar
