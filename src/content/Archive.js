import React, { Component } from 'react'

import './sass/Archive.scss'

import { archiveJson } from '../constants.js'

import Custombox from './util/Custombox.js'
import Card from './util/Card.js'

class Archive extends Component {
  constructor (props) {
    super(props)

    this.state = {

      open: false

    }
  }

  render () {
    const { open, url } = this.state

    const list = []
    for (const item of archiveJson) {
      item.path = `/archive/${item.path}`
      list.push(
        <Card narrow onClick={() => this.setState({ open: true, url: item.url })} {...item} />
      )
    }

    return (
      <div className='main-content'>

        <div className='archive-list'>
          {list}
        </div>

        <Custombox
          pdf
          doc={`https://docs.google.com/document/d/${url}/preview`}
          on={open}
          onClose={() => this.setState({ open: false })}
        />

      </div>

    )
  }
}

export default Archive
