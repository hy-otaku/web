import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './sass/View.scss'

import { Switch } from 'antd'

import Grid from './Grid.js'
import List from './List.js'

class View extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isGrid: true
    }
  }

  render () {
    const { data, defaultCover } = this.props
    const { isGrid } = this.state

    return (
      <div className='view'>
        <Switch
          defaultChecked={isGrid} checkedChildren='ցանց'
          unCheckedChildren='ցանկ'
          onChange={(val) => this.setState({ isGrid: val })}
        />
        <div className='data'>
          {isGrid
            ? <Grid data={data} defaultCover={defaultCover} />
            : <List data={data} />}
        </div>
      </div>
    )
  }
}

export default withRouter(View)
