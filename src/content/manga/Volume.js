import React, { Component } from 'react'

import { find } from 'lodash'

import { mangaJson } from '../../constants.js'
import enumeratedData from './enumeratedData'

import './sass/Volume.scss'

import { Row, Col } from 'antd'

import Lightbox from 'react-awesome-lightbox'

import CompletedIndication from '../CompletedIndication.js'

class Volume extends Component {
  constructor (props) {
    super(props)

    this.state = {

      chapter: undefined,
      open: false

    }

    const { manga } = this.props
    if (manga.includes('/')) {
      const path = manga.split('/')

      this.jsonData = mangaJson
        .find(item => item.path === path[0])
        .submanga
        .find(item => item.path === path[1])

      this.data = enumeratedData[path[0]][path[1]]
    } else {
      this.jsonData = mangaJson
        .find(item => item.path === manga)

      this.data = enumeratedData[manga]
    }

    this.onChapterChoice = this.onChapterChoice.bind(this)
    this.handleClose = this.onClose.bind(this)
  }

  onClose () {
    this.setState({

      open: false

    })
  }

  onChapterChoice (chapter) {
    this.setState({

      chapter: chapter,
      open: true

    })
  }

  renderChapters () {
    const enumeratedChapters = this.data.volumes[this.props.num]
    const chapterList = Object.keys(enumeratedChapters).filter(item => item !== 'cover').sort()

    const { chapters } = this.jsonData
    const cols = chapterList.map(item => {
      const _item = parseInt(item)
      let src = enumeratedChapters[item][0]
      if (chapters && chapters[_item]) {
        const { cover } = chapters[_item]
        src = find(
          enumeratedChapters[item], url => url.includes(cover)
        ) || src
      }
      return (
        <Col flex='15%' key={item} className='clickable chapter'>
          <img
            src={src} title={item} alt=''
            onClick={() => this.onChapterChoice(item)}
          />
          <span> գլուխ #{item} </span>
        </Col>
      )
    })

    cols.push(
      <Col flex='auto' key={cols.length}> </Col>
    )

    return <Row gutter={[20, 20]}> {cols} </Row>
  }

  renderOpenChapter () {
    const { open, chapter } = this.state
    if (!open || !chapter) {
      return null
    }

    const { num } = this.props

    return (
      <Lightbox images={this.data.volumes[num][chapter]} onClose={this.handleClose} />
    )
  }

  render () {
    const { num, title: _title, superTitle } = this.props
    const { volumes } = this.jsonData
    const title = volumes[num] && volumes[num].title

    const header = superTitle
      ? (
        <>
          <h2> {superTitle} </h2>
          <h3> {_title} </h3>
        </>
        )
      : <h2> {_title} </h2>

    return (

      <>
        {header}
        <h4>
          հատոր #{num} {title && <span>. «{title}» </span>}
          <CompletedIndication complete={volumes[parseInt(num)].complete} />
        </h4>

        {this.renderChapters()}
        {this.renderOpenChapter()}

      </>

    )
  }
}

export default Volume
