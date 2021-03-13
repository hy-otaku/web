import React, { Component } from 'react'

import './sass/CompletedIndication.scss'

class CompletedIndication extends Component {
  render () {
    // todo(tado-mi): return nothing when there is no need to indicate completeness.
    // for example, when it's a list of 'random' shorts
    const { complete } = this.props

    return (
      complete
        ? <span className='complete true'> ամբողջը </span>
        : <span className='complete false'> շարունակելի </span>
    )
  }
}

export default CompletedIndication
