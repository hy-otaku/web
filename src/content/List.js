import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import CompletedIndication from './CompletedIndication.js'

class List extends Component {
  render () {
    const { data } = this.props
    const list = []
    for (const { path, cover, complete, text, callback, name } of data) {
      const content = (
        <>
          <span> {text} </span> <CompletedIndication complete={complete} />
        </>
      )

      list.push(
        <li className={`clickable ${name}`} flex='20%' key={path} onClick={callback}>
          {path
            ? (
              <Link to={path}>
                {content}
              </Link>
              )
            : content}
        </li>
      )
    }

    return (
      <ul> {list} </ul>
    )
  }
}

export default withRouter(List)
