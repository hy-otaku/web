import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './sass/Piccha.scss'

import Navigator from './Navigator.js'

class Piccha extends Component {
  render () {
    const { sections, searchFunction, location: { pathname } } = this.props
    const collapsed = pathname.startsWith('/anime') || pathname.startsWith('/manga')
    return (
      <div className={`piccha${collapsed? ' collapsed': ''}`}>

        <Navigator sections={sections} searchFunction={searchFunction} />

        {
          !collapsed && (
            <div className='info'>
              <h1> Lorem ipsum </h1>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
            </div>
          )
        }

      </div>
    )
  }
}

export default withRouter(Piccha)
