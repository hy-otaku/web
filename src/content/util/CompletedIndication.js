import React, { Component } from 'react'

import './sass/CompletedIndication.scss'

class CompletedIndication extends Component {
  render () {
    const { complete, progress } = this.props
    if (complete === undefined) {
      return null
    }

    return (
      complete
        ? <span className='complete true'> ամբողջը </span>
        : (progress
            ? <span className='complete in-progress'> շարունակվող (թարգմանությունը) </span>
            : <span className='complete false'> դադարեցված (թարգմանությունը) </span>
          )
    )
  }
}

export default CompletedIndication
