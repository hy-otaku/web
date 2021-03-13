import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'

import { sortBy } from 'lodash'

import { animeJson } from '../../constants.js'

import { normalize } from '../../functions.js'

import './sass/Content.scss'

import Card from '../Card.js'
import SeasonList from './SeasonList'
import CustomList from './CustomList'
import EpisodeList from './EpisodeList.js'

export const getRoutes = () => {
  const data = animeJson
  const self = '/anime'

  // anime lists
  const routes = []
  for (const { path: animePath, feature, shorts, seasons } of data) {
    const path = `${self}/${animePath}`
    const content = feature || shorts
      ? () => <CustomList anime={animePath} />
      : () => <SeasonList anime={animePath} />
    routes.push(
      <Route
        exact path={path} key={path}
        component={content}
      />
    )

    if (!seasons) {
      continue
    }

    for (const index in seasons) {
      const _index = normalize(index)
      const _path = `${path}/${_index}`
      const _content = () => <EpisodeList anime={animePath} num={index} />
      routes.push(
        <Route
          exact path={_path} key={_path}
          component={_content}
        />
      )
    }
  }

  // todo(tado-mi): individual episodes
  return routes
}

class Content extends Component {
  render () {
    const { searchValue } = this.props
    const data = sortBy(
      animeJson.filter(anime => anime.title.includes(searchValue)),
      anime => anime.title
    )

    const { path: self } = this.props.match

    const list = []
    for (const item of data) {
      const path = `${self}/${item.path}`
      list.push(
        <Card {...item} path={path} />
      )
    }

    return list
  }
}

export default withRouter(Content)
