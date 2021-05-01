import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './sass/Piccha.scss'

import Navigator from './Navigator.js'

class Piccha extends Component {
  render () {
    const { sections, searchFunction, themeSwitchFunction, location: { pathname } } = this.props
    const collapsed = pathname.startsWith('/anime') || pathname.startsWith('/manga') || pathname.startsWith('/archive')
    return (
      <div className={`piccha${collapsed ? ' collapsed' : ''}`}>

        <Navigator
          sections={sections}
          searchFunction={searchFunction}
          themeSwitchFunction={themeSwitchFunction}
        />

        {
          !collapsed && (
            <div className='info'>
              <h1> կարդալո՛ւ ու դիտելո՛ւ </h1>
              <span>
                կատակերգություն, արկածային, դրամա, սարսափ, գերբնական...<br />
                - տասնյակ սերիաներ ու հատորներ, բացառապես հայերե՛ն ու հայատա՛ռ
              </span>
            </div>
          )
        }

      </div>
    )
  }
}

export default withRouter(Piccha)
