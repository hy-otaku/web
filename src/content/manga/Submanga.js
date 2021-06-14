import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { get } from 'lodash'

import { BASE_URL } from '../../constants.js'

import { mangaData } from '../enumeratedData.js'

import CompletedIndication from '../util/CompletedIndication.js'
import View from '../util/view/View.js'

class Submanga extends Component {
  render () {
    const { path: self } = this.props.match
    const { data, title, complete, progress } = this.props

    const list = []
    for (const { path, title, complete: _complete, progress: _progress } of data) {
      const { cover } = get(mangaData,
        `${self.split('/')[2]}.${path}` // constructing a string for lodash
      )

      const obj = {
        path: `${self}/${path}`,
        complete: _complete,
        progress: _progress,
        text: `«${title}»`
      }

      if (cover) {
        obj.cover = cover
      }

      list.push(obj)
    }

    return (
      <>
        <h2> {title} <CompletedIndication complete={complete} progress={progress} /></h2>
        <View
          data={list}
          defaultCover={`${BASE_URL}/assets/master/manga/submanga/default.png`}
        />
      </>
    )
  }
}

export default withRouter(Submanga)
