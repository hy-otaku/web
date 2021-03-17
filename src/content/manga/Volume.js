import React, { Component } from 'react'

import { find } from 'lodash'

import { mangaJson } from '../../constants.js'
import enumeratedData from './enumeratedData'

import './sass/Volume.scss'

import Lightbox from 'react-awesome-lightbox'

import View from '../View.js'
import CompletedIndication from '../CompletedIndication.js'

class Volume extends Component {
  constructor (props) {
    super(props)

    this.state = {

      chapter: undefined,
      open: false

    }

    const { manga, num } = this.props
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

    const { data: { volumes }, jsonData: { chapters } } = this
    const enumeratedChapters = volumes[num]
    const chapterList = Object.keys(enumeratedChapters).filter(item => item !== 'cover').sort()

    this.chapters = chapterList.map(item => {
      const _item = parseInt(item)
      let src = enumeratedChapters[item][0]
      if (chapters && chapters[_item]) {
        const { cover } = chapters[_item]
        src = find(
          enumeratedChapters[item], url => url.includes(cover)
        ) || src
      }

      return {
        cover: src,
        text: `գլուխ #${_item}`,
        name: 'chapter',
        callback: () => this.onChapterChoice(item)
      }
    })

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

        <View data={this.chapters} />
        {this.renderOpenChapter()}

      </>

    )
  }
}

export default Volume
