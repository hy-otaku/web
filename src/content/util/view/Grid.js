import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './sass/Grid.scss'

import { Row, Col } from 'antd'

import CompletedIndication from '../CompletedIndication.js'

class Grid extends Component {
  render () {
    const { data, defaultCover } = this.props
    const cols = []
    for (const { path, thumbnail, cover, complete, progress, text, callback, name } of data) {
      const content = (
        <>
          {
          thumbnail
            ? (
              <div className='thumbnail'>
                <img
                  src={thumbnail}
                  title={text} alt=''
                />
              </div>
              )
            : (
              <img
                src={cover || defaultCover}
                title={text} alt=''
              />
              )
        }
          <span> {text} </span> <CompletedIndication complete={complete} progress={progress} />

        </>
      )

      cols.push(
        <Col className={`clickable ${name}`} flex='20%' key={path} onClick={callback}>
          {path
            ? (
              <Link to={path}>
                {content}
              </Link>
              )
            : content}
        </Col>
      )
    }

    cols.push(
      <Col flex='auto' key={cols.length}> </Col>
    )

    return (
      <Row gutter={[15, 20]}> {cols} </Row>
    )
  }
}

export default withRouter(Grid)
