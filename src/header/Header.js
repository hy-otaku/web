import React, { Component } from 'react'

import Ribbon from './Ribbon.js'

class Header extends Component {
  render () {
    return (
      <>
        <Ribbon {...this.props} />
      </>
    )
  }
}

export default Header
