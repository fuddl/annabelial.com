/* eslint no-unused-expressions: off */
import React from 'react'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import { SEO, Footer } from './index'
import theme from '../../config/theme'

import '../../node_modules/normalize.css/normalize.css'
import './layout.sass'


const Layout = ({ children, customSEO }) => (
  <ThemeProvider theme={theme}>
    <>
      {!customSEO && <SEO />}
      {children}
    </>
  </ThemeProvider>
)

export default Layout

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  customSEO: PropTypes.bool,
}

Layout.defaultProps = {
  customSEO: false,
}
