import React, { Component } from 'react'

import { find } from 'lodash'

import { animeData } from '../enumeratedData.js'
import { animeJson } from '../../constants.js'

import Custombox from '../util/Custombox.js'
// import View from '../util/view/View.js'

import Degoo from './Degoo.js'

class CustomList extends Component {
  constructor (props) {
    super(props)

    const { anime } = this.props

    this.jsonData = animeJson.find(item => item.path === anime)
    const { title, list } = this.jsonData

    const parsedEnumeratedData = list ? animeData.shorts : animeData.feature
    const values = list ? Object.values(list) : [{ title }]

    this.data = []
    for (const { title } of values) {
      const { url, thumbnail } = find(parsedEnumeratedData, item => item.name.includes(title))
      this.data.push({
        text: `«${title}»`,
        name: 'video-listing',
        thumbnail,
        callback: () => this.setState({ url, on: true })
      })
    }

    this.state = {
      on: false,
      url: null
    }
  }

  render () {
    const { title, degoo } = this.jsonData
    const { url, on } = this.state

    return (
      <>
        <h2> {title} </h2>
        <Degoo hash={degoo} />
        <Custombox stream url={url} on={on} onClose={() => this.setState({ on: false })} />
      </>
    )
  }
}

export default CustomList
