import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './sass/Piccha.scss'

import SearchBar from './SearchBar.js'

class Piccha extends Component {
  render () {
    const { searchFunction, location: { pathname } } = this.props

    return (
      <div className='piccha'>

        <div className='right-pane'>

          <div className='searchbar'>
            <SearchBar
              show={['/anime', '/manga', '/archive'].includes(pathname)}
              searchFunction={searchFunction}
            />
          </div>

        </div>

      </div>
    )
  }
}

export default withRouter(Piccha)
