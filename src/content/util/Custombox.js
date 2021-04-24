import React, { Component } from 'react'

import Lightbox from './Lightbox.js'

class Custombox extends Component {
  render () {
    const {
      read, stream, pdf,
      volume, chapter, doc,
      anime, channel, index,
      on, onClose
    } = this.props

    if (!on) {
      return null
    }

    if (pdf) {
      return (
        <Lightbox
          iframe item={doc}
          onClose={() => onClose()}
        />
      )
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
          iframe video item={url}
          onClose={() => onClose()}
        />
      )
    }

    console.error('<Viewer /> called with inappropriate parameters')
    return null
  }
}

export default Custombox
