import React, { Component } from 'react'

import { BASE_URL } from '../constants'

import './sass/SocialNetworks.scss'

import { Button } from 'antd'

class SocialNetworks extends Component {
  render () {
    const self = `${BASE_URL}/assets/master/social-networks`
    return (
      <div className='social-networks'>
        <Button href='mailto: high_otaku@yahoo.com' target='_blank' rel='noreferrer'>
          <img src={`${self}/mail-logo.png`} alt='mail' title='մեր էլեկտրոնային փոստը' />
        </Button>
        <Button href='https://www.facebook.com/armenianmanga' target='_blank' rel='noreferrer'>
          <img src={`${self}/fb-logo.png`} alt='fb' title='մենք fb.com - ում ' />
        </Button>
        <Button href='https://vk.com/arumenianmanga' target='_blank' rel='noreferrer'>
          <img src={`${self}/vk-logo.png`} alt='vk' title='մենք vk.com - ում' />
        </Button>
      </div>
    )
  }
}

export default SocialNetworks
