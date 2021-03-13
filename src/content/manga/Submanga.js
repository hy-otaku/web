import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import CompletedIndication from '../CompletedIndication.js'

class Submanga extends Component {
  render () {
    const { path: self } = this.props.match
    const { data, title, complete } = this.props

    const list = []
    for (const { path: submangaPath, title, complete: _complete } of data) {
      const path = `${self}/${submangaPath}`
      list.push(
        <li key={path}>
          <Link to={path}> «{title}» </Link> <CompletedIndication complete={_complete} />
        </li>
      )
    }

    return (
      <>
        <h2> {title} <CompletedIndication complete={complete} /></h2>
        <ul>
          {list}
        </ul>
      </>
    )
  }
}

export default withRouter(Submanga)
