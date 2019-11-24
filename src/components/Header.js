import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './course.sass';
import './logo.sass';
import './header.sass';



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
        <aside className="card__paper" itemScope="" itemType="http://schema.org/Person">
          <Link className="logo" to='/' onMouseUp={ (e) => this.closeMenu() }>
            <h1 className="logo__title" itemProp="name" translate="no">Anna Belial</h1>
            <h2 className="logo__byline" itemProp="jobTitle">Photographer</h2>
           </Link>
          <nav className="course">
            <header className="course__heading">Have a look at my</header>
            <ul className="course__items">
              <li className="course__item"><Link to="/portfolio" onMouseUp={ (e) => this.closeMenu() }>Portfolio</Link></li>
            </ul>
          </nav>
          <nav className="course">
            <header className="course__heading">Contact me</header>
            <ul className="course__items">
              <li className="course__item print-only"><a href="http://annabelial.com/" itemProp="sameAs">annabelial.com</a></li>
              <li className="course__item"><a href="mailto:annabelial@me.com" itemProp="email">annabelial@me.com</a></li>
              <li className="course__item"><a href="tel:+4915901807920" itemProp="telephone">+49&nbsp;159&nbsp;0180 7920</a></li>
            </ul>
          </nav>
          <nav className="course screen-only">
            <header className="course__heading">Find me</header>
            <ul className="course__items">
              <li className="course__item"><a href="https://www.instagram.com/annabelial/" itemProp="sameAs">Instagram</a></li>
              <li className="course__item"><a href="https://www.youtube.com/channel/UCmlaMXD6rzm_9Ux1BC1a3pA" itemProp="sameAs">Videos</a></li>
              <li className="course__item course__footer"><Link to="/imprint" onMouseUp={ (e) => this.closeMenu() }>Imprint</Link></li>
            </ul>
          </nav>
          <link itemProp="sameAs" href="https://www.openstreetmap.org/node/3992505820" />
          <link itemProp="sameAs" href="https://commons.wikimedia.org/wiki/User:Alorin" />
          <link itemProp="sameAs" href="https://www.vogue.it/photovogue/portfolio/?id=163362" />
        </aside>
      </div>
    )
  }
}

export default Header
