import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import './sass/App.scss'

import { Layout } from 'antd'

import Disclaimer from './Disclaimer.js'
import Ribbon from './Ribbon.js'
import Piccha from './Piccha.js'

import About from './content/About.js'
import Manga, { getRoutes as mangaRoutes } from './content/Manga.js'
import Anime, { getRoutes as animeRoutes } from './content/Anime.js'

class App extends Component {
  constructor (props) {
    super(props)

    this.sections = {

      anime: {
        path: 'anime',
        title: 'անիմե',
        content: () => <Anime />
      },

      manga: {
        path: 'manga',
        title: 'մանգա',
        content: () => <Manga />
      },

      about: {
        path: 'about',
        title: 'մեր մասին',
        content: () => <About />
      }

    }
  }

  render () {
    const { Footer } = Layout

    const routes = []
    for (const { path, content } of Object.values(this.sections)) {
      routes.push(
        <Route
          exact path={`/${path}`} key={`/${path}`}
          component={content}
        />
      )
    }

    routes.push(...mangaRoutes())
    routes.push(...animeRoutes())

    return (
      <div className='app'>
        <Router>
          <Ribbon />

          <Piccha sections={this.sections} />
          <div className='app-content'>

            <Switch>
              {routes}
            </Switch>

            <Footer>
              <Disclaimer />
            </Footer>
          </div>
        </Router>

      </div>
    )
  }
}

export default App
