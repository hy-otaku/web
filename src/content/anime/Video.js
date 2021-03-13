import React, { Component } from 'react'

import enumeratedData from './enumeratedData.js'

import './sass/Video.scss'

class Video extends Component {
  render () {
    const { anime, channel, index } = this.props

    const data = enumeratedData[channel || anime]
    const url = this.props.url || data[index]

    return (
      <iframe
        src={url}
        title={`${anime}/${index}`}
        width='720px' height='405px'
        allowFullScreen
      />
    )
  }
}

export default Video
