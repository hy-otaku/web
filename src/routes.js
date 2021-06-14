import { Route } from 'react-router-dom'

import { mangaJson, animeJson } from './constants.js'

import { normalize } from './functions.js'

import Volume from './content/manga/Volume.js'
import VolumeList from './content/manga/VolumeList.js'
import Submanga from './content/manga/Submanga.js'

import SeasonList from './content/anime/SeasonList.js'
import CustomList from './content/anime/CustomList.js'
import Season from './content/anime/Season.js'

const mangaRoutes = () => {
  const self = '/manga'
  const generateRoutes = (mangaList, source = undefined, superTitle = undefined) => {
    if (!mangaList) {
      return []
    }

    source = source ? `${source}/` : ''
    const routes = []

    for (const { path: mangaPath, volumes, submanga, title, complete, progress } of mangaList) {
      const manga = `${source}${mangaPath}`
      const path = `${self}/${manga}`
      const content = volumes
        ? () => <VolumeList volumes={volumes} manga={manga} title={title} superTitle={superTitle} complete={complete} progress={progress} />
        : () => <Submanga data={submanga} title={title} complete={complete} progress={progress} />

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

const animeRoutes = () => {
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
      const _content = () => <Season anime={animePath} num={index} />
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

export const routes = [
  ...mangaRoutes(),
  ...animeRoutes()
]
