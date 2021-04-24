import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { animeJson } from '../../constants.js'

import { normalize } from '../../functions.js'

import CompletedIndication from '../util/CompletedIndication.js'
import View from '../util/view/View.js'
import Season from './Season'

class SeasonList extends Component {
  constructor (props) {
    super(props)

    const { anime } = this.props
    this.jsonData = animeJson.find(item => item.path === anime)

    const { path, seasons } = this.jsonData
    this.seasonList = []

    for (const index in seasons) {
      const { complete, cover: ext } = seasons[index]

      const _index = normalize(index)

      const obj = {
        path: `${path}/${_index}`,
        complete,
        text: `եթերաշրջան #${_index}`
      }

      if (ext) {
        obj.cover = `https://raw.githubusercontent.com/high-otaku/assets/master/anime/season/${path}-${_index}.${ext}`
      }

      this.seasonList.push(obj)
    }
  }

  render () {
    const { title, complete, feature, seasons } = this.jsonData

    const content = seasons
      ? (
        <View
          data={this.seasonList}
          defaultCover='https://raw.githubusercontent.com/high-otaku/assets/master/anime/season/default.png'
        />
        )
      : <Season anime={this.props.anime} />

    return (
      <>

        <h2> {title} <CompletedIndication complete={complete || feature} /> </h2>
        {content}

      </>
    )
  }
}

export default withRouter(SeasonList)
