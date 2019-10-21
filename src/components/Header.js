import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './header.sass';
import './course.sass';
import './logo.sass';



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open ? this.props.open : false,
    };
  }

  handleMenu(e) {
    this.setState({
      open: e.target.checked
    });
  }

  closeMenu() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div className="card">
        <input id="menu-open" type="checkbox" hidden checked={ this.state.open } onChange={ this.handleMenu.bind(this) } />
        <label className="card__mark" htmlFor="menu-open" aria-label="Toggle the menu" tabIndex="1" translate="no">A</label>
        <label className="card__overlay" htmlFor="menu-open"></label>
        <div className="card__paper" itemScope="" itemType="http://schema.org/Person">
          <link href="things/logo/logo.css" rel="stylesheet"/>
          <Link className="logo" to='/' onMouseUp={ (e) => this.closeMenu() }>
            <h1 className="logo__title" itemProp="name" translate="no">Anna Belial</h1>
            <h2 className="logo__byline" itemProp="jobTitle">Photographer</h2>
           </Link>
          <link itemProp="image" href="meta/me.jpg" />
          <link itemProp="sameAs" href="https://www.openstreetmap.org/node/3992505820" />
          <link itemProp="sameAs" href="https://www.flickr.com/photos/91460105@N07/" />
          <link itemProp="sameAs" href="https://plus.google.com/107299370270399125995" />
          <link itemProp="sameAs" href="http://annabelial.deviantart.com/" />
          <link itemProp="sameAs" href="https://commons.wikimedia.org/wiki/User:Alorin" />
          <link itemProp="sameAs" href="https://twitter.com/Al_Orin" />
          <link itemProp="sameAs" href="https://github.com/AnnaBelial" />
          <link itemProp="sameAs" href="https://www.patreon.com/annabelial/" />
          <link href="https://www.facebook.com/AnnaBelial/" itemProp="sameAs" />
          <link href="https://500px.com/annabelial1601" itemProp="sameAs" />
          <link href="http://annabelial.deviantart.com/" itemProp="sameAs" />
          <nav className="course">
            <header className="course__heading">Have a look at my</header>
            <ul className="course__items">
              <li><Link to="/portfolio" onMouseUp={ (e) => this.closeMenu() }>Portfolio</Link></li>
            </ul>
          </nav>
          <link href="things/course/course.css" rel="stylesheet" />
          <nav className="course">
            <header className="course__heading">Contact me</header>
            <ul className="course__items">
              <li className="print-only"><a href="http://annabelial.com/" itemProp="sameAs">annabelial.com</a></li>
              <li><a href="mailto:annabelial@me.com" itemProp="email">annabelial@me.com</a></li>
              <li><a href="tel:+4915901807920" itemProp="telephone">+49&nbsp;159&nbsp;0180 7920</a></li>
            </ul>
          </nav>
          <nav className="course screen-only">
            <header className="course__heading">Find me</header>
            <ul className="course__items">
              <li><a href="https://www.instagram.com/annabelial/" itemProp="sameAs">Instagram</a></li>
              <li><a href="https://www.youtube.com/channel/UCmlaMXD6rzm_9Ux1BC1a3pA" itemProp="sameAs">Videos</a></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default Header
