import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import enumeratedData from './enumeratedData.js'

import { normalize } from '../../functions.js'

import './sass/VolumeList.scss'

import { Row, Col } from 'antd'

import CompletedIndication from '../CompletedIndication.js'

class VolumeList extends Component {
  render () {
    const { manga, volumes, title, superTitle, complete } = this.props
    const { path: self } = this.props.match

    let data = enumeratedData
    if (manga.includes('/')) {
      const path = manga.split('/')
      data = data[path[0]][path[1]]
    } else {
      data = data[manga]
    }

    const cols = Object.keys(volumes).map(item => {
      const _item = normalize(item)
      const path = `${self}/${_item}`

      const { complete } = volumes[item]

      const { cover } = data.volumes[_item]
      const src = cover || Object.values(data.volumes[_item])[0][0]

      return (
        <Col flex='20%' key={path}>
          <Link to={path}>
            <img
              src={src} title={_item} alt=''
            />
            <span className='clickable'> հատոր #{_item} </span> <CompletedIndication complete={complete} />
          </Link>
        </Col>
      )
    })

    cols.push(
      <Col flex='auto' key={cols.length}> </Col>
    )

    const header = superTitle
      ? (
        <>
          <h2> {superTitle} </h2>
          <h3> {title} <CompletedIndication complete={complete} /> </h3>
        </>
        )
      : <h2> {title} <CompletedIndication complete={complete} /> </h2>

    return (
      <>
        {header}
        <Row gutter={[15, 20]}> {cols} </Row>

      </>
    )
  }
}

export default withRouter(VolumeList)
