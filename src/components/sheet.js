import React from 'react'
import { MDXRenderer } from "gatsby-plugin-mdx"
import './sheet.sass'

class Sheet extends React.Component {
  constructor(props) {
    super(props);
  }
	render() {
    return (
      <div class="sheet">
        <MDXRenderer>{ this.props.content }</MDXRenderer>
      </div>
    )
  }
}

export default Sheet