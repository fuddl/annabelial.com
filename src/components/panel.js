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
      contextualVisible: false,
    };
    this.props.images.map( (image) =>  {
      this.state.images[image.file.childImageSharp.original.src] = React.createRef();
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
      lightbox: true,
      contextualVisible: false,
    }, () => {
      ref.current.scrollIntoView();
    });
  }
  closeLightbox() {
    this.setState({
      lightbox: false
    });
  }

  toggleContextual() {
    let lastState = this.state.contextualVisible;
    this.setState({
      contextualVisible: !lastState,
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

    let contextual = (
      <nav className={ 'panel__contextual' + (!this.state.contextualVisible ? ' panel__contextual--hidden' : '') }>
        <button onClick={ (e) => this.closeLightbox() }>‹</button>
      </nav>
    );

    return (
      <div className="panel">
        <div
          className={ !this.state.lightbox ? "panel__sheet" : "panel__lighbox" }
          onScroll={ (e) => this.handleLBScroll() }
        >
          { this.props.images.map( (image) =>  {
            let id = image.file.childImageSharp.original.src;
            let h = image.file.childImageSharp.full.aspectRatio > 1;
            if (image.layout != '') {
              h = image.layout === 'horizontal';
            }
            let preferred = this.state.lightbox ? image.file.childImageSharp.full : h ? image.file.childImageSharp.landscape : image.file.childImageSharp.portrait;
            let figureClass = this.state.lightbox ? 'panel__lighbox-image' : 'panel__sheet-image' + (h ? ' panel__sheet-image--horizontal' : ' panel__sheet-image--vertical');
            let placeholderStyle = { backgroundColor: image.file.colors.muted };
            let visible = this.state.visibleImages.includes(id);
            let sources = (
              <>
                <source srcSet={ preferred.srcSet } format="image/jpg" />
                <source srcSet={ preferred.srcSetWebp } format="image/webp" />
              </>
            );
            let ref = this.state.images[id];

            return (
              <figure
                ref={ ref }
                className={ figureClass }
                onClick={ this.state.lightbox ? (e) => this.toggleContextual() : (e) => this.openLightbox(ref) }
                key={ image.file.childImageSharp.original.src }
                style={ !this.state.lightbox ? placeholderStyle : {} }
               >
                  <picture>
                    { visible ? sources : (<noscript>{ sources }</noscript>)}
                    <img
                      alt={ image.desc }
                      title={ image.title }
                      src={ preferred.srcSetWebp.split(' ')[0] }
                      className={ this.state.lightbox ? 'lightbox-canvas': '' }
                    />
                   </picture>
              </figure>
            )
            })
          }
          { this.state.lightbox ? contextual : null }
        </div>
      </div>
    )
  }
}

export default Panel