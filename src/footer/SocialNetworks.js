import React, { Component } from 'react'

import './sass/SocialNetworks.scss'

class SocialNetworks extends Component {
  render () {
    return (
      <div className='social-networks'>
        <a href='https://www.facebook.com/armenianmanga' target='_blank' rel='noreferrer'>
          <img src='https://raw.githubusercontent.com/high-otaku/assets/master/fb-logo.png' alt='fb' title='մենք fb.com ֊ ում ' />
        </a>
        <a href='https://vk.com/arumenianmanga' target='_blank' rel='noreferrer'>
          <img src='https://raw.githubusercontent.com/high-otaku/assets/master/vk-logo.png' alt='vk' title='մենք vk.com ֊ ում' />
        </a>
      </div>
    )
  }
}

export default SocialNetworks
