import React, { Component } from 'react'

import Ribbon from './Ribbon.js'
import Piccha from './Piccha.js'

class Header extends Component {
  render () {
    const { sections, searchFunction } = this.props
    return (
      <>
        <Ribbon />
        <Piccha sections={sections} searchFunction={searchFunction} />
      </>
    )
  }
}

export default Header
