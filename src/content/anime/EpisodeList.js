import React, { Component } from 'react'

import { cloneDeep } from 'lodash'

import { animeJson } from '../../constants.js'

import { normalize } from '../../functions.js'

import CompletedIndication from '../CompletedIndication.js'
import Video from './Video'

class EpisodeList extends Component {
  constructor (props) {
    super(props)

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

    this.episodeList = []

    for (let item = offset; item < offset + count; item = item + 1) {
      const { title } = episodes[item]
      this.episodeList.push(
        <li>
          <span onClick={() => this.setState({ item, title })} className='clickable video-listing'>սերիա #{normalize(item)} {title ? `: «${title}»` : ''} </span>
        </li>
      )
    }

    this.state = { }
  }

  render () {
    const { num } = this.props

    const { title } = this.jsonData

    let episodeList = this.episodeList
    const { item, title: episodeTitle } = this.state

    if (item) {
      const { anime } = this.props
      const { channel } = this.jsonData
      episodeList = [
        ...cloneDeep(this.episodeList).slice(0, item - 1),
        (
          <li key={title}>
            <h3 onClick={() => this.setState({ item: undefined })} className='clickable'> սերիա #{normalize(item)} {episodeTitle ? `. «${episodeTitle}»` : ''}</h3>
            <Video channel={channel} anime={anime} index={item - 1} />
          </li>
        ),
        ...cloneDeep(this.episodeList).slice(item)
      ]
    }

    episodeList = <ul> {episodeList} </ul>

    return this.season
      ? (
        <>
          <h2> {title} | եթերաշրջան #{normalize(num)} <CompletedIndication complete={this.season.complete} /> </h2>
          {episodeList}
        </>
        )
      : episodeList
  }
}

export default EpisodeList
