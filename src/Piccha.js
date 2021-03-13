import React, { Component } from 'react'

import './sass/Piccha.scss'

import Navigator from './Navigator.js'

class Piccha extends Component {
  render () {
    return (
      <div className='piccha'>

        <Navigator sections={this.props.sections} />

        <div className='info'>
          <h1> Lorem ipsum </h1>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </div>

      </div>
    )
  }
}

export default Piccha
