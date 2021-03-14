import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './sass/Navigator.scss'

import SearchBar from './SearchBar.js'
import Logo from './Logo.js'

class Navigator extends Component {
  constructor (props) {
    super(props)
    const { location: { pathname } } = this.props
    this.state = {
      selected: pathname.split('/')[1]
    }
  }

  render () {
    const val = []
    const { selected } = this.state
    const { sections, searchFunction } = this.props

    for (const { path, title } of Object.values(sections)) {
      val.push(
        <li key={`/${path}`}>
          <div className={path === selected ? 'selected' : ''}>
            <Link to={`/${path}`} onClick={() => this.setState({ selected: path })}> {title} </Link>
          </div>
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

        <div className='right-pane'>
          <div className='searchbar'>
            <SearchBar searchFunction={searchFunction} />
          </div>
          <div className='logo'>
            <Logo />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Navigator)
