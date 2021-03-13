import React, { Component } from 'react'

import { cloneDeep, find } from 'lodash'

import enumeratedData from './enumeratedData.js'
import { animeJson } from '../../constants.js'

import Video from './Video.js'

class CustomList extends Component {
  constructor (props) {
    super(props)

    const { anime } = this.props

    this.jsonData = animeJson.find(item => item.path === anime)
    const { title, list } = this.jsonData

    this.component = []

    if (list) { // shorts
      for (const index in Object.values(list)) {
        const { title } = Object.values(list)[index]
        const { url } = find(enumeratedData.shorts, item => item.name.includes(title))
        this.component.push(
          <li key={title}>
            <span onClick={() => this.setState({ url, title, index })} className='clickable video-listing'> «{title}» </span>
          </li>
        )
      }
    } else { // feature
      const { url } = find(enumeratedData.feature, item => item.name.includes(title))
      this.component.push(
        <Video url={url} key='key' />
      )
    }

    this.state = {}
  }

  render () {
    const { title } = this.jsonData

    const { url, title: selectedTitle, index } = this.state
    let component = this.component

    if (url) {
      component = [
        ...cloneDeep(this.component).slice(0, index),
        (
          <li key={selectedTitle}>
            <h3 onClick={() => this.setState({ url: undefined })} className='clickable'> «{selectedTitle}» </h3>
            <Video url={url} />
          </li>
        ),
        ...cloneDeep(this.component).slice(index + 1)
      ]
    }

    component = <ul> {component} </ul>

    return (
      <>

        <h2> {title} </h2>
        {component}

      </>
    )
  }
}

export default CustomList
