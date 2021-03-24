import React, { Component } from 'react'

import { find } from 'lodash'

import { mangaJson } from '../../constants.js'
import { mangaData } from '../enumeratedData.js'

import './sass/Volume.scss'

import View from '../util/view/View.js'
import CompletedIndication from '../util/CompletedIndication.js'

import Custombox from '../util/Custombox.js'

class Volume extends Component {
  constructor (props) {
    super(props)

    this.state = {

      open: false

    }

    const { manga, num } = this.props
    if (manga.includes('/')) {
      const path = manga.split('/')

      this.jsonData = mangaJson
        .find(item => item.path === path[0])
        .submanga
        .find(item => item.path === path[1])

      this.data = mangaData[path[0]][path[1]].volumes[num]
    } else {
      this.jsonData = mangaJson
        .find(item => item.path === manga)

      this.data = mangaData[manga].volumes[num]
    }

    const { jsonData: { chapters }, data } = this

    this.chapters = Object.keys(data)
      .filter(item => item !== 'cover')
      .sort()
      .map(item => {
        const _item = parseInt(item)
        let src = data[item][0]
        if (chapters && chapters[_item]) {
          const { cover } = chapters[_item]
          src = find(
            data[item], url => url.includes(cover)
          ) || src
        }

        return {
          cover: src,
          text: `գլուխ #${_item}`,
          name: 'chapter',
          callback: () => this.setState({ item, open: true })
        }
      })
  }

  render () {
    const { open, item } = this.state
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
        <Custombox
          read
          on={open}
          chapter={item}
          volume={this.data}
          onClose={() => this.setState({ open: false })}
        />

      </>

    )
  }
}

export default Volume
