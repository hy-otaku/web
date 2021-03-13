import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'

import { sortBy } from 'lodash'

import { mangaJson } from '../../constants.js'

import { normalize } from '../../functions.js'

import './sass/Content.scss'

import Card from '../Card.js'
import Volume from './Volume.js'
import VolumeList from './VolumeList.js'
import Submanga from './Submanga.js'

export const getRoutes = () => {
  const self = '/manga'
  const generateRoutes = (mangaList, source = undefined, superTitle = undefined) => {
    if (!mangaList) {
      return []
    }

    source = source ? `${source}/` : ''
    const routes = []

    for (const { path: mangaPath, volumes, submanga, title, complete } of mangaList) {
      const manga = `${source}${mangaPath}`
      const path = `${self}/${manga}`
      const content = volumes
        ? () => <VolumeList volumes={volumes} manga={manga} title={title} superTitle={superTitle} complete={complete} />
        : () => <Submanga data={submanga} title={title} complete={complete} />

      routes.push(
        <Route
          exact path={path} key={path}
          component={content}
        />
      )

      if (!volumes) {
        continue
      }

      // individual volumes
      for (const item of Object.keys(volumes)) {
        const _item = normalize(item)
        const _path = `${path}/${_item}`
        const _content = () => <Volume num={_item} manga={manga} title={title} superTitle={superTitle} />
        routes.push(
          <Route
            exact path={_path} key={_path}
            component={_content}
          />
        )
      }
    }

    return routes
  }

  const routes = generateRoutes(mangaJson)
  for (const { submanga, path, title } of mangaJson) {
    routes.push(
      ...generateRoutes(submanga, path, title)
    )
  }

  // todo(tado-mi): individual chapters
  return routes
}

class Content extends Component {
  render () {
    const { path: self } = this.props.match

    const { searchValue } = this.props
    const data = sortBy(
      mangaJson.filter(manga => manga.title.includes(searchValue)),
      manga => manga.title
    )

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
