import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSpring, animated, config } from 'react-spring'
import { rgba } from 'polished'
import Img from 'gatsby-image'
import { Link } from 'gatsby'


const Card = ({ path, cover, date, title, delay }) => {
  return (
    <Link to={ path }>
      <Img fluid={cover} />
      {title}
    </Link>
  )
}

export default Card

Card.propTypes = {
  path: PropTypes.string.isRequired,
  cover: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
}
