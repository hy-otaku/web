import React, { Component } from 'react'

import { find } from 'lodash'

import enumeratedData from './enumeratedData.js'
import { animeJson } from '../../constants.js'

import Video from './Video.js'
import View from '../View.js'

class CustomList extends Component {
  constructor (props) {
    super(props)

    const { anime } = this.props

    this.jsonData = animeJson.find(item => item.path === anime)
    const { title, list } = this.jsonData

    const parsedEnumeratedData = list ? enumeratedData.shorts : enumeratedData.feature;
    const values = list ? Object.values(list) : [{ title }]

    this.data = []
    for (const { title } of values) {
      const { url } = find(parsedEnumeratedData, item => item.name.includes(title))
      this.data.push({
        text: `«${title}»`,
        name: 'video-listing',
        callback: () => this.setState({ url, on: true }),
      });
    }

    this.state = {
      on: false,
      url: null,
    }
  }

  render () {
    const { title } = this.jsonData
    const { url, on } = this.state

    return (
      <>
        <h2> {title} </h2>
        <View data={this.data} />
        <Video url={url} on={on} onClose={() => this.setState({on: false})}/>
      </>
    )
  }
}

export default CustomList
