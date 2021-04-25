import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { routes as allRoutes } from './routes.js'

import './sass/App.scss'

import { Layout } from 'antd'

import Header from './header/Header.js'

import Content from './content/Content.js'
import About from './content/About.js'

import Disclaimer from './footer/Disclaimer.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: '',
      theme: 'light'
    }
  }

  render () {
    const { Footer } = Layout

    const { query, genre, theme } = this.state
    const contentProps = {
      query,
      genre,
      genreFunc: genre => this.setState({ genre })
    }
    const sections = {

      anime: {
        path: 'anime',
        title: 'անիմե',
        content: () => <Content anime {...contentProps} />
      },

      manga: {
        path: 'manga',
        title: 'մանգա',
        content: () => <Content manga {...contentProps} />
      },

      archive: {
        path: 'archive',
        title: 'արխիվ',
        content: () => <Content archive {...contentProps} />
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

    routes.push(...allRoutes)

    document.body.className = `${theme}-theme`

    return (
      <div className='app'>
        <Router>

          <Header
            sections={sections}
            searchFunction={query => this.setState({ query })}
            themeSwitchFunction={theme => this.setState({ theme })}
          />

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
