import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { routes as allRoutes } from './routes.js'

import './sass/App.scss'

import { Layout } from 'antd'

import Header from './header/Header.js'

import Content from './content/Content.js'
import About from './content/About.js'
import Main from './content/Main.js'

import Disclaimer from './footer/Disclaimer.js'
import SocialNetworks from './footer/SocialNetworks.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: 'dark'
    }
  }

  credits () {
    return (
      <>
        <ul>
          <li>
            <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/agussumeong'>
              agussumeong
            </a>
            <ul>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/agussumeong/art/Kirito-Asuna-SAO-Minimalist-Wallpaper-523508558'>
                  kirito & asuna | sao
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/greenmapple17'>
              greenmapple17
            </a>
            <ul>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/greenmapple17/art/Yuko-Ichihara-xxxHolic-Minimalist-Wallpaper-532753728'>
                  yuko ichihara | xxxholc
                </a>
              </li>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/greenmapple17/art/Levi-Ackerman-2-Shingeki-no-Kyojin-589255266'>
                  levi ackerman | shingeki no kyoujin
                </a>
              </li>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/greenmapple17/art/Tsumugi-Kotobuki-K-On-Minimalist-Wallpaper-526157565'>
                  tsumugi kotobuki | k-on
                </a>
              </li>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/greenmapple17/art/Kenshin-Himura-Rurouni-Kenshin-483396856'>
                  kenshin himura | rurouni kenshin
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/nuralifsidoel'>
              nuralifsidoel
            </a>
            <ul>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/nuralifsidoel/art/Lawliet-Ryuzaki-Death-Note-Minimalist-704742942'>
                  lawliet ryuzaki | death note
                </a>
              </li>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/nuralifsidoel/art/Kuriyama-Mirai-Kyoukai-no-Kanata-Minimalist-702790521'>
                  kuriyama mirai | kyoukai no kanata
                </a>
              </li>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/nuralifsidoel/art/Uchiha-Sasuke-Naruto-Shippuden-Minimalist-694243678'>
                  uchiha sasuke | naruto shippuden
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/marurou'>
              marurou
            </a>
            <ul>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/marurou/art/Hina-Amano-from-Weathering-With-You-Tenki-no-ko-812302380'>
                  hina amano | tenki no ko
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/foxyantho'>
              foxyantho
            </a>
            <ul>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/foxyantho/art/The-Wind-Rises-Naoko-505794604'>
                  naoko | kaze tachinu
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/isinho'>
              isinho
            </a>
            <ul>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/isinho/art/SORA-NO-GAME-NO-LIFE-563651755'>
                  sora | no game - no life
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/elbillyy'>
              elbillyy
            </a>
            <ul>
              <li>
                <a target='_blank' rel='noreferrer' href='https://www.deviantart.com/elbillyy/art/Nelliel-Tu-Odelschwanck-Minimalist-611111843'>
                  nelliel tu odelschwanck
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </>
    )
  }

  render () {
    const { Footer } = Layout

    const { theme } = this.state
    const sections = {

      main: {
        path: '',
        title: 'գլխավոր',
        content: () => <Main />
      },

      anime: {
        path: 'anime',
        title: 'անիմե',
        content: () => <Content anime />
      },

      manga: {
        path: 'manga',
        title: 'մանգա',
        content: () => <Content manga />
      },

      archive: {
        path: 'archive',
        title: 'արխիվ',
        content: () => <Content archive />
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
    routes.push(
      <Route
        exact path='/art-credits' key='/art-credits'
        component={() => this.credits()}
      />
    )

    document.body.className = `${theme}-theme`

    return (
      <div className='app'>
        <Router>

          <Header
            sections={sections}
            themeSwitchFunction={theme => this.setState({ theme })}
          />

          <div className='app-content'>

            <div className='nested'>

              <Switch>
                {routes}
              </Switch>

            </div>

            <Footer>
              <Disclaimer />
              <br />
              <SocialNetworks />
            </Footer>

          </div>

        </Router>

      </div>
    )
  }
}

export default App
