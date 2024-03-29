import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { BASE_URL } from '../../constants.js'

import './sass/Card.scss'

import CompletedIndication from './CompletedIndication.js'
import { CommentOutlined, CheckOutlined, FormatPainterOutlined } from '@ant-design/icons'

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
    const { genres, onGenreSelected } = this.props
    if (!genres) {
      return null
    }

    return genres
      .sort()
      .map(genre =>
        <span
          className='genre clickable button' key={genre}
          onClick={() => onGenreSelected(genre)}
        >
          {genre}
        </span>
      )
  }

  foreignLanguages () {
    const getList = (data, lang, title) => {
      if (!data) {
        return null
      }

      const url = `${BASE_URL}/assets/master/flags/${lang}.png`
      return (
        <div className='icon-container'>
          <img className='flag' src={url} title={title} alt={title} />
          {data.sort().join(', ')}
        </div>
      )
    }

    const { meta } = this.props
    if (!meta || !(meta.jp || meta.en || meta.ru)) {
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

    const { translators, editors, graphics } = team
    return (
      <tr>
        <td>հայաֆիկացրին`</td>
        <td>
          {translators
            ? (
              <div className='icon-container'>
                <CommentOutlined title='թարգմանություն' className='icon' />
                <span className='translators'> {translators.sort().join(', ')} </span>
              </div>
              )
            : null}
          {editors
            ? (
              <div className='icon-container'>
                <CheckOutlined title='խմբագրություն' className='icon' />
                <span className='editors'> {editors.sort().join(', ')} </span>
              </div>
              )
            : null}
          {graphics
            ? (
              <div className='icon-container'>
                <FormatPainterOutlined title='ֆոտոշոփ' className='icon' />
                <span className='graphics'> {graphics.sort().join(', ')} </span>
              </div>
              )
            : null}
        </td>
      </tr>
    )
  }

  releaseDate () {
    const { release } = this.props
    if (!release) {
      return null
    }

    return (
      <tr>
        <td>առաջին թողարկումը՝</td>
        <td>{release}</td>
      </tr>
    )
  }

  originalScans () {
    const { originalScans } = this.props
    if (!originalScans) {
      return null
    }

    return (
      <tr>
        <td>սքաները՝</td>
        <td>վերցված են <i>{originalScans}</i> կայքից</td>
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

  tags () {
    const { meta } = this.props
    if (!meta) {
      return null
    }

    const { tags } = meta
    if (!tags) {
      return null
    }

    const tagList = tags
      .sort()
      .map(tag => <span className='button tag' key={tag}> {tag} </span>)

    return (
      <p>
        {tagList}
      </p>
    )
  }

  render () {
    const { path, title, complete, progress, onClick, narrow } = this.props
    const linkProps = onClick
      ? {
          onClick: () => onClick()
        }
      : {
          to: path
        }

    return (
      <div className={`information-card${narrow ? ' narrow' : ''}`}>
        <Link {...linkProps}> «{title}» </Link> <CompletedIndication complete={complete} progress={progress} />
        <div className='content'>
          {
            narrow
              ? null
              : (

                <div className='img-container'>

                  <img src={`${BASE_URL}/assets/master/${path}.png`} alt='' />

                </div>

                )
          }

          <table>
            <tbody>

              {this.authors()}
              {this.foreignLanguages()}
              {this.team()}
              {this.rating()}
              {this.releaseDate()}
              {this.originalScans()}

              <tr />
            </tbody>

          </table>

          <div className='description'>

            {this.description()}

          </div>

        </div>

        <div className='secondary-content'>
          {this.notes()}
          {this.genres()}
          {this.tags()}
        </div>
      </div>
    )
  }
}

export default Card
