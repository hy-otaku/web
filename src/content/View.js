import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Switch } from 'antd'

import Grid from './util/Grid.js'
import List from './util/List.js'

class View extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isGrid: true
    }
  }

  render () {
    const defaultCover = 'https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80'
    const { data } = this.props
    const { isGrid } = this.state

    return (
      <div>
        <Switch
          defaultChecked={isGrid} checkedChildren='ցանց'
          unCheckedChildren='ցանկ'
          onChange={(val) => this.setState({ isGrid: val })}
        />
        {isGrid
          ? <Grid data={data} defaultCover={defaultCover} />
          : <List data={data} />}

      </div>
    )
  }
}

export default withRouter(View)
