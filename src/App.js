import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { routes as allRoutes } from './routes.js'

import './sass/App.scss'

import { Layout } from 'antd'

import Header from './header/Header.js'

import About from './content/About.js'
import Content from './content/Content.js'

import Disclaimer from './footer/Disclaimer.js'

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
        content: () => <Content anime query={query} />
      },

      manga: {
        path: 'manga',
        title: 'մանգա',
        content: () => <Content manga query={query} />
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

    return (
      <div className='app'>
        <Router>

          <Header
            sections={sections}
            searchFunction={query => this.setState({ query })}
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
