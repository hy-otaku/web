import React, { Component } from 'react'

import { animeData } from '../enumeratedData.js'
import { animeJson } from '../../constants.js'
import { normalize } from '../../functions.js'

// import View from '../util/view/View.js'
import CompletedIndication from '../util/CompletedIndication.js'
import Custombox from '../util/Custombox.js'

import Degoo from './Degoo'

class Season extends Component {
  constructor (props) {
    super(props)

    this.state = {

      open: false

    }

    const { anime, num } = this.props
    this.jsonData = animeJson.find(item => item.path === anime)

    const { episodes, seasons, channel } = this.jsonData
    const enumeratedData = animeData[channel || anime]

    let offset = 1
    let count = Object.values(episodes).length

    this.season = seasons && seasons[num]
    if (this.season) {
      offset = this.season.startingEpisode || offset
      count = this.season.episodeCount || count
    }

    this.season = []

    for (let item = offset; item < offset + count; item = item + 1) {
      const { title } = episodes[item]
      const _item = normalize(item)
      this.season.push({
        text: `սերիա #${_item} ${title ? `«${title}»` : ''}`,
        thumbnail: enumeratedData[_item - 1].thumbnail,
        name: 'video-listing',
        callback: () => this.setState({ item, title, open: true })
      })
    }
  }

  render () {
    const { num, anime } = this.props
    const { item, open } = this.state
    const { title, channel, degoo } = this.jsonData

    return (
      <>
        {
          num
            ? <h2> {title} | եթերաշրջան #{normalize(num)} <CompletedIndication complete={this.season.complete} /> </h2>
            : null
        }
        <Degoo hash={degoo} />
        <Custombox
          stream
          channel={channel} anime={anime}
          index={item - 1}
          on={open}
          onClose={() => this.setState({ open: false })}
        />
      </>
    )
  }
}

export default Season
