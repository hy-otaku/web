import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { animeJson } from '../../constants.js'

import { normalize } from '../../functions.js'

import CompletedIndication from '../CompletedIndication.js'
import EpisodeList from './EpisodeList'

class SeasonList extends Component {
  constructor (props) {
    super(props)

    const { anime } = this.props
    this.jsonData = animeJson.find(item => item.path === anime)
  }

  getSeasonList () {
    const { path: animePath, seasons } = this.jsonData
    const seasonList = []

    for (const index in seasons) {
      const { complete } = seasons[index]

      const _index = normalize(index)
      const path = `${animePath}/${_index}`

      seasonList.push(
        <li key={path}>
          <Link to={path}> եթերաշրջան #{_index} </Link> <CompletedIndication complete={complete} />
        </li>
      )
    }

    return <ul> {seasonList} </ul>
  }

  render () {
    const { title, complete, feature, seasons } = this.jsonData

    const content = seasons
      ? this.getSeasonList()
      : <EpisodeList anime={this.props.anime} />

    return (
      <>

        <h2> {title} <CompletedIndication complete={complete || feature} /> </h2>
        {content}

      </>
    )
  }
}

export default withRouter(SeasonList)
