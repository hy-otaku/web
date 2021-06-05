import React, { Component } from 'react'

import { BASE_URL, EMAIL } from '../constants'

import './sass/SocialNetworks.scss'

import { Button, Modal } from 'antd'

class Write extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  buttons () {
    const self = `${BASE_URL}/assets/master/social-networks`
    return (
      <div className='buttons'>
        <Button href={`mailto: ${EMAIL}`} target='_blank' rel='noreferrer'>
          <img src={`${self}/mail-logo.png`} alt='mail' title='մեր էլեկտրոնային փոստը' />
        </Button>
        <Button href='https://www.facebook.com/armenianmanga' target='_blank' rel='noreferrer'>
          <img src={`${self}/fb-logo.png`} alt='fb' title='մենք fb.com - ում' />
        </Button>
        <Button href='https://discord.gg/ydQjHACd' target='_blank' rel='noreferrer'>
          <img src={`${self}/discord-logo.png`} alt='discord' title='մեր discord սպասարկիչը' />
        </Button>
      </div>
    )
  }

  render () {
    const { popup } = this.props

    if (!popup) {
      return <div className='social-networks'> {this.buttons()} </div>
    }

    return (
      <>
        <Modal
          className='social-networks'
          centered
          maskClosable keyboard
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false })}
          footer={null}
        >
          {this.buttons()}
        </Modal>
        <a onClick={() => this.setState({ visible: true })}>գրի՛ր մեզ</a>
      </>
    )
  }
}

export default Write
