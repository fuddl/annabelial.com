import React from 'react'
import Img from 'gatsby-image'
import './panel.sass'


class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightbox: this.props.lightbox ? this.props.lightbox : false,
      images: {},
      visibleImages: [],
      currentLBimage: null,
    };
    this.props.images.nodes.map( (image) =>  {
      this.state.images[image.childImageSharp.original.src] = React.createRef();
    });
  }
  isNorthOfBottom(image) {
    const rect = image.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    return (rect.top <= windowHeight)
  }
  detectLoadableLBImages(image) {
    const rect = image.getBoundingClientRect();
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    return (rect.left-1 <= windowWidth) && ((rect.left+1 + rect.width) >= 0);
  }
  isCurrentLBImage(image) {
    const rect = image.getBoundingClientRect();
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    return (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
  }
  openLightbox(ref) {
    this.setState({
      lightbox: true
    }, () => {
      ref.current.scrollIntoView();
    });
  }
  handleWindowScroll(e) {
    let visible = [];
    for (let image in this.state.images) {
      if (this.isNorthOfBottom(this.state.images[image].current)) {
        visible.push(image);
      }
    }
    this.setState({visibleImages: visible})
  }
  handleLBScroll() {
    let visible = [];
    let currentimage = null;
    for (let image in this.state.images) {
      let current = this.state.images[image].current;
      if (this.detectLoadableLBImages(current)) {
        visible.push(image);
      }
      if (this.isCurrentLBImage(current)) {
      //  currentimage = image;
      }
    }
    this.setState({
      currentLBimage: currentimage,
      visibleImages: visible,
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleWindowScroll.bind(this) );
    this.handleWindowScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll.bind(this) );
  }

  refCallback = element => {
    if (element) {
      this.props.getSize(element.getBoundingClientRect());
    }
  };


  render() {

    return (
      <div className="panel">
        <div
          className={ !this.state.lightbox ? "panel__sheet" : "panel__lighbox" }
          onScroll={ (e) => this.handleLBScroll() }
        >
          {this.props.images.nodes.map( (image) =>  {
            let id = image.childImageSharp.original.src;
            let h = image.childImageSharp.full.aspectRatio > 1;
            let preferred = this.state.lightbox ? image.childImageSharp.full : h ? image.childImageSharp.landscape : image.childImageSharp.portrait;
            let figureClass = this.state.lightbox ? 'panel__lighbox-image' : 'panel__sheet-image' + (h ? ' panel__sheet-image--horizontal' : ' panel__sheet-image--vertical');
            let placeholderStyle = { backgroundColor: image.colors.muted };
            let visible = this.state.visibleImages.includes(id);
            let sources = (
              <>
                <source srcSet={ preferred.srcSetWebp } format="image/webp" />
                <source srcSet={ preferred.srcSet } format="image/jpg" />
              </>
            );
            let ref = this.state.images[id];
            return (
              <figure
                ref={ ref }
                className={ figureClass }
                onClick={ (e) => this.openLightbox(ref) }
                key={ image.childImageSharp.original.src }
                style={ !this.state.lightbox ? placeholderStyle : {} }
               >
                  <picture>
                    { visible ? sources : (<noscript>{ sources }</noscript>)}
                    <img
                      alt={ image.name }
                      src={ preferred.srcSetWebp.split(' ')[0] }
                      className={ this.state.lightbox ? 'lightbox-canvas': '' }
                    />
                  </picture>
              </figure>
            )
            })
          }
        </div>
      </div>
    )
  }
}

export default Panel