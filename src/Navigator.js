import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './sass/Navigator.scss'

class Navigator extends Component {
  render () {
    const val = []
    const { sections } = this.props

    for (const { path, title } of Object.values(sections)) {
      val.push(
        <li key={`/${path}`}>
          <Link to={`/${path}`}> {title} </Link>
        </li>
      )
    }

    return (
      <div className='navigator'>

        <div className='menu'>
          <ul>
            {val}
          </ul>
        </div>

        <div className='logo'>
          LOGO?
        </div>

      </div>
    )
  }
}

export default withRouter(Navigator)
