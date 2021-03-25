import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './sass/Card.scss'

import CompletedIndication from './CompletedIndication.js'

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
          {
            translators
              ? <><span> <i> թարգմանիչներ․ </i> <span className='translators'>{translators.sort().join(', ')}</span> </span><br /></>
              : null
          }
          {
            editors
              ? <span> <i> խմբագրողներ․ </i> <span className='editors'>{editors.sort().join(', ')}</span> </span>
              : null
          }
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
        <div className='nested'>
          <img src={`https://raw.githubusercontent.com/high-otaku/assets/master/${path}.png`} />

          <table>
            <tbody>

              {this.authors()}
              {this.genres()}
              {this.rating()}
              {this.team()}

              <tr />
            </tbody>

          </table>
        </div>
        <br />
        {this.description()}
        {this.notes()}
      </div>
    )
  }
}

export default Card
