import React, { Component } from 'react'

import './sass/SocialNetworks.scss'

import { Button } from 'antd'

class SocialNetworks extends Component {
  render () {
    return (
      <div className='social-networks'>
        <Button href='https://www.facebook.com/armenianmanga' target='_blank' rel='noreferrer'>
          <img src='https://raw.githubusercontent.com/high-otaku/assets/master/fb-logo.png' alt='fb' title='մենք fb.com - ում ' />
        </Button>
        <Button href='https://vk.com/arumenianmanga' target='_blank' rel='noreferrer'>
          <img src='https://raw.githubusercontent.com/high-otaku/assets/master/vk-logo.png' alt='vk' title='մենք vk.com - ում' />
        </Button>
      </div>
    )
  }
}

export default SocialNetworks
