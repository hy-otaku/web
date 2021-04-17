import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './sass/Card.scss'

import CompletedIndication from './CompletedIndication.js'
import { CommentOutlined, CheckOutlined } from '@ant-design/icons'

class Card extends Component {
  authors () {
    const { authors } = this.props
    if (!authors) {
      return null
    }

    return (
      <tr>
        <td>հեղինակներ՝</td>
        <td>{authors.sort().join()}</td>
      </tr>
    )
  }

  genres () {
    const { genres } = this.props
    if (!genres) {
      return null
    }

    return (
      <tr>
        <td>ժանրեր՝</td>
        <td>{genres.sort().join(', ')}</td>
      </tr>
    )
  }

  foreignLanguages () {
    const getList = (data, lang, title) => {
      if (!data) {
        return null
      }

      const url = `https://raw.githubusercontent.com/high-otaku/assets/master/flags/${lang}.png`
      return (
        <div className='lang'>
          <img className='flag' src={url} title={title} alt={title} />
          {data.sort().join(', ')}
        </div>
      )
    }

    const { meta } = this.props
    if (!meta) {
      return null
    }

    return (
      <tr>
        <td>այլ լեզուներով՝</td>
        <td>
          {getList(meta.jp, 'jp', '日本語')}
          {getList(meta.en, 'en', 'english')}
          {getList(meta.ru, 'ru', 'русский')}
        </td>
      </tr>
    )
  }

  rating () {
    const { rating } = this.props
    if (!rating) {
      return null
    }

    return (
      <tr>
        <td>ռեյտինգ՝</td>
        <td>{rating}</td>
      </tr>
    )
  }

  team () {
    const { team } = this.props
    if (!team) {
      return null
    }

    const { translators, editors } = team
    return (
      <tr>
        <td>հայաֆիկացրին`</td>
        <td>
          {translators
            ? (
              <div className='lang'>
                <CommentOutlined title='թարգմանություն' className='icon' />
                <span className='translators'> {translators.sort().join(', ')} </span>
              </div>
              )
            : null}
          {editors
            ? (
              <div className='lang'>
                <CheckOutlined title='խմբագրություն' className='icon' />
                <span className='editors'> {editors.sort().join(', ')} </span>
              </div>
              )
            : null}
        </td>
      </tr>
    )
  }

  description () {
    const { description } = this.props
    if (!description) {
      return null
    }

    return (
      <>
        <p> <strong>նկարագրություն՝ </strong>
          {description}
        </p>
      </>
    )
  }

  notes () {
    const { notes } = this.props
    if (!notes) {
      return null
    }

    return (
      <>
        <p> <i>նշում. </i>
          {notes}
        </p>
      </>
    )
  }

  render () {
    const { path, title, complete } = this.props

    return (
      <div className='information-card'>
        <Link to={path}> «{title}» </Link> <CompletedIndication complete={complete} />
        <div className='content'>
          <div className='img-container'>

            <img src={`https://raw.githubusercontent.com/high-otaku/assets/master/${path}.png`} alt='' />

          </div>

          <table>
            <tbody>

              {this.authors()}
              {this.genres()}
              {this.foreignLanguages()}
              {this.rating()}
              {this.team()}

              <tr />
            </tbody>

          </table>

          {this.description()}
        </div>

        {this.notes()}
      </div>
    )
  }
}

export default Card
