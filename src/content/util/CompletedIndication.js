import React, { Component } from 'react'

import './sass/CompletedIndication.scss'

class CompletedIndication extends Component {
  render () {
    const { complete } = this.props
    if (complete === undefined) {
      return null
    }

    return (
      complete
        ? <span className='complete true'> ամբողջը </span>
        : <span className='complete false'> դադարեցված (թարգմանությունը) </span>
    )
  }
}

export default CompletedIndication
