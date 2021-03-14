import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import './sass/App.scss'

import { Layout } from 'antd'

import Disclaimer from './Disclaimer.js'
import Ribbon from './header/Ribbon.js'
import Piccha from './header/Piccha.js'

import About from './content/About.js'
import Manga, { getRoutes as mangaRoutes } from './content/Manga.js'
import Anime, { getRoutes as animeRoutes } from './content/Anime.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  render () {
    const { Footer } = Layout

    const { query } = this.state
    const sections = {

      anime: {
        path: 'anime',
        title: 'անիմե',
        content: () => <Anime query={query} />
      },

      manga: {
        path: 'manga',
        title: 'մանգա',
        content: () => <Manga query={query} />
      },

      about: {
        path: 'about',
        title: 'մեր մասին',
        content: () => <About />
      }

    }

    const routes = []
    for (const { path, content } of Object.values(sections)) {
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

          <Piccha sections={sections} searchFunction={query => this.setState({ query })} />
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
