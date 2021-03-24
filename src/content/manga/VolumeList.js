import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { mangaData } from '../enumeratedData.js'

import { normalize } from '../../functions.js'

import View from '../util/view/View.js'
import CompletedIndication from '../util/CompletedIndication.js'

class VolumeList extends Component {
  render () {
    const { manga, volumes, title, superTitle, complete, match: { path } } = this.props

    let data = mangaData
    if (manga.includes('/')) {
      const path = manga.split('/')
      data = data[path[0]][path[1]]
    } else {
      data = data[manga]
    }

    const volumeList = Object.keys(volumes).map(item => {
      const _item = normalize(item)

      const { complete } = volumes[item]

      const { cover } = data.volumes[_item]
      const src = cover || Object.values(data.volumes[_item])[0][0]

      return {
        path: `${path}/${_item}`,
        complete,
        cover: src,
        text: `հատոր #${_item}`
      }
    })

    const header = superTitle
      ? (
        <>
          <h2> {superTitle} </h2>
          <h3> {title} <CompletedIndication complete={complete} /> </h3>
        </>
        )
      : <h2> {title} <CompletedIndication complete={complete} /> </h2>

    return (
      <>
        {header}
        <View data={volumeList} />

      </>
    )
  }
}

export default withRouter(VolumeList)
