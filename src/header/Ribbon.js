import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './sass/Ribbon.scss'

import { Switch } from 'antd'

class Ribbon extends Component {
  render () {
    const { sections, themeSwitchFunction, location: { pathname } } = this.props
    const selected = pathname.split('/')[1]

    const val = []
    for (const { path, title } of Object.values(sections)) {
      val.push(
        <li key={`/${path}`} className={path === selected ? 'selected' : ''}>
          <Link to={`/${path}`}> {title} </Link>
        </li>
      )
    }

    return (
      <div className='ribbon'>

        <ul className='menu'>
          {val}
        </ul>

        <div className='theme-switch'>
          <Switch
            checkedChildren='մութ'
            unCheckedChildren='լույս'
            onChange={(isDark) => themeSwitchFunction(isDark ? 'dark' : 'light')}
            defaultChecked
          />
        </div>

      </div>
    )
  }
}

export default withRouter(Ribbon)
