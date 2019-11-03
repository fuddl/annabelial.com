import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Sheet from '../components/sheet'
import { Layout, Header, SEO } from '../components'

export default function Template(context) {
  return (
     <Layout customSEO>
      <Header />
      <Sheet content={ context.pageContext.body } />
    </Layout>
  )
}