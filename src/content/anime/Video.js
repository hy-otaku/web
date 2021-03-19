import React, { Component } from 'react'

import enumeratedData from './enumeratedData.js'

import GenericLightbox from './GenericLightbox.js'

class Video extends Component {
  render () {
    const { anime, channel, index, on, onClose } = this.props
    
    const data = enumeratedData[channel || anime]
    const url = this.props.url || data && data[index]

    return (
      on
      ? <GenericLightbox iframe item={url} 
          onClose={() => onClose()} 
      />
      : null
    )
  }
}

export default Video
