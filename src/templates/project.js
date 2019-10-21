import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { Layout, Header, SEO } from '../components'
import Panel from '../components/panel'
import config from '../../config/site'

const Project = ({ pageContext: { slug, prev, next }, data: { project: postNode, images } }) => {
  const project = postNode.frontmatter

  return (
    <Layout customSEO>
      <Header />
      <SEO postPath={slug} postNode={postNode} postSEO />
      <Panel images={images} />
    </Layout>
  )
}

export default Project

Project.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    prev: PropTypes.object,
  }),
  data: PropTypes.shape({
    project: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
  }).isRequired,
}

Project.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null,
  }),
}

export const pageQuery = graphql`
  query($slug: String!, $absolutePathRegex: String!) {
    images: allFile(
      filter: {
        absolutePath: { regex: $absolutePathRegex }
        extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
      }
      sort: { fields: name, order: ASC }
    ) {
      nodes {
        name
        colors {
          muted
        }
        childImageSharp {
          landscape: fluid(maxWidth: 1000, maxHeight: 480, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
          portrait: fluid(maxWidth: 480, maxHeight: 480, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
          full: fluid(maxHeight: 900, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
          original {
            height
            width
            src
          }
        }

      }
    }
    project: mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      parent {
        ... on File {
          mtime
          birthtime
        }
      }
      frontmatter {
        cover {
          childImageSharp {
            resize(width: 800) {
              src
            }
          }
        }
        date(formatString: "DD.MM.YYYY")
        title
      }
    }
  }
`
