import React, { Component } from 'react'

import Lightbox from './Lightbox.js'

class Custombox extends Component {
  render () {
    const {
      read, stream,
      volume, chapter,
      anime, channel, index,
      on, onClose
    } = this.props

    if (!on) {
      return null
    }

    if (read) {
      const images = volume[chapter]

      return (
        <Lightbox
          data={images}
          onClose={() => onClose()}
        />
      )
    }

    if (stream) {
      const { animeData } = require('../enumeratedData.js')
      const data = animeData[channel || anime]
      const url = this.props.url || (data ? data[index].url : undefined)

      return (
        <Lightbox
          iframe item={url}
          onClose={() => onClose()}
        />
      )
    }

    console.error('<Viewer /> called with inappropriate parameters')
    return null
  }
}

export default Custombox
