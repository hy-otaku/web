import React, { Component } from 'react'

import { BASE_URL, DEGOO_SHARE_URL } from '../../constants.js'

import './sass/Degoo.scss'

import { Button } from 'antd'

class Degoo extends Component {
  render () {
    const self = `${BASE_URL}/assets/master/social-networks`
    const url = `${DEGOO_SHARE_URL}/${this.props.hash}`
    return (
      <div className='social-networks degoo-buttons'>
        <span>
          <p>
            Ներողություն ենք խնդրում. այս պահին անիմեն կայքում դիտելու համար հասանելի չի։
          </p>
          <p>
            Հրավիրում ենք դիտել այն մեր degoo պահեստում.
          </p>
          <Button href={url} target='_blank' rel='noreferrer'>
            <img src={`${self}/degoo.png`} alt='degoo' title='անիմեն degoo.com պահեստում' />
          </Button>

        </span>

      </div>
    )
  }
}

export default Degoo
