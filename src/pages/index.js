import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { Flick, Header, Layout } from '../components'
import config from '../../config/site'

const Index = ({
  data: {
    allMdx: { nodes },
  },
}) => (
  <Layout>
    <Header open={ true } avatar={config.avatar} name={config.name} location={config.location} socialMedia={config.socialMedia} />
    {nodes.map((project, index) => (
      <Flick
        delay={index}
        date={project.frontmatter.date}
        title={project.frontmatter.title}
        covers={project.frontmatter.covers}
        path={project.fields.slug}
        key={project.fields.slug}
      />
    ))}
  </Layout>
)

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query HomeQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, filter: {fileAbsolutePath: {regex: "/content/projects/"}}) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          covers {
            childImageSharp {
              fluid(maxWidth: 760, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          date(formatString: "DD.MM.YYYY")
          title
        }
      }
    }
  }
`
