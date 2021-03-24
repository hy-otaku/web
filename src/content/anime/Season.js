import React, { Component } from 'react'

import { animeJson } from '../../constants.js'
import { normalize } from '../../functions.js'

import View from '../util/view/View.js'
import CompletedIndication from '../util/CompletedIndication.js'
import Custombox from '../util/Custombox.js'

class Season extends Component {
  constructor (props) {
    super(props)

    this.state = {

      open: false

    }

    const { anime, num } = this.props
    this.jsonData = animeJson.find(item => item.path === anime)

    const { episodes, seasons } = this.jsonData

    let offset = 1
    let count = Object.values(episodes).length

    this.season = seasons && seasons[num]
    if (this.season) {
      offset = this.season.startingEpisode || offset
      count = this.season.episodeCount || count
    }

    this.Season = []

    for (let item = offset; item < offset + count; item = item + 1) {
      const { title } = episodes[item]
      this.Season.push({
        text: `սերիա #${normalize(item)} ${title && `«${title}»`}`,
        name: 'video-listing',
        callback: () => this.setState({ item, title, open: true })
      })
    }
  }

  render () {
    const { num, anime } = this.props
    const { item, open } = this.state
    const { title, channel } = this.jsonData

    return (
      <>
        {
          this.season
            ? <h2> {title} | եթերաշրջան #{normalize(num)} <CompletedIndication complete={this.season.complete} /> </h2>
            : null
        }
        <View data={this.Season} />
        <Custombox stream channel={channel} anime={anime} index={item - 1} on={open} onClose={() => this.setState({ open: false })} />
      </>
    )
  }
}

export default Season
