import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CompletedIndication from '../util/CompletedIndication.js'
import View from '../util/view/View.js'

class Submanga extends Component {
  render () {
    const { path: self } = this.props.match
    const { data, title, complete } = this.props

    const list = []
    for (const { path, title, complete: _complete } of data) {
      list.push(
        {
          path: `${self}/${path}`,
          complete: _complete,
          text: `«${title}»`
        }
      )
    }

    return (
      <>
        <h2> {title} <CompletedIndication complete={complete} /></h2>
        <View data={list} />
      </>
    )
  }
}

export default withRouter(Submanga)
