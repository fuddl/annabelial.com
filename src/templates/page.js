import React from "react"
import { graphql } from "gatsby"
export default function Template(context) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: context.pageContext.body }}
    />
  )
}