import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSpring, animated, config } from 'react-spring'
import { rgba } from 'polished'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import './flick.sass'


class Flick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      current: 1,
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
    setInterval(() =>{
      let next = this.state.current >= this.props.covers.length ? 1 : this.state.current + 1;
      this.setState({ current: next });
    }, 5000);
  }

  render() {
    let index = 0;
    let slides = this.props.covers.map( (cover) =>  {
      index++;
      return ( 
        <picture className={ 'flick__image' + (this.state.mounted == true && index != this.state.current ? ' flick__image--hidden' : '') }>
          <source srcSet={ cover.childImageSharp.fluid.srcSetWebp } format="image/webp" />
          <source srcSet={ cover.childImageSharp.fluid.srcSet } format="image/jpg" />
          <img src={ cover.childImageSharp.fluid.srcSetWebp.split(' ')[0] } />
        </picture>
      );
    });
    return (
      <Link className={ 'flick' + (this.state.mounted ? ' flick--flickering' : '') } to={ this.props.path }>
        { slides }
      </Link>
    )
  }
}

export default Flick

Flick.propTypes = {
  path: PropTypes.string.isRequired,
  covers: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
}
