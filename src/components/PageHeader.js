import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Icons from '../elements/Icons'
import OnTrakLogo from '../elements/OnTrakLogo'
import HamburgerButton from '../elements/HamburgerButton'

import '../stylesheets/components/page-header.scss'

class PageHeader extends React.Component {
  static propTypes = {
    isHomepage: PropTypes.bool,  
    }

  constructor(props) {
    super(props)

    this.state = {
      menuVisible: false,
      bannerVisible: false,
    } 
 
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState({ menuVisible: !this.state.menuVisible }) 
  } 
  
  showBanner() {
    this.setState({ bannerVisible: true }) 
  }

  render() {
    const isHomepage = this.props.isHomepage  

    return ( 
      <header className={isHomepage ? 'is-homepage' : ''}>
        <div className={this.state.bannerVisible || isHomepage ? 'topBanner' : 'hideBanner'}> 
            <div className="container_inner">
              <div className="left">
                Take care of yourself during COVID-19: <a href="/covid-19">Resources from your Care Team</a>
              </div> 
            </div>
        </div>
        <nav>
          <div className="header-logo-ontrak">
            <Link to="/">
              <OnTrakLogo textColor={isHomepage ? '#fff' : 'default'} />
            </Link>
          </div>

          <div className="header-toggle-menu">
            <HamburgerButton toggleMenu={this.toggleMenu} size={30} />
          </div>

          <ul className={this.state.menuVisible ? 'menu-visible' : ''}>
            <li className="menu-only">
              <button
                type="button"
                onClick={() => this.toggleMenu()}
                aria-label="exit menu"
              >
                <svg className="menu-close">
                  <Icons />

                  <use xlinkHref="#icon-assessment-exit-x" />
                </svg>
              </button>
            </li>

            <li>
              <a
                href="https://members.stayontrak.com/apply?utm_source=website&utm_medium=apply_button&utm_campaign=website_apply_now" target="_blank" 
                onClick={
                  ()=>{this.state.menuVisible ? () => this.toggleMenu() : null;this.showBanner()}
                }
              >
                Apply Now
              </a>
            </li>

            <li>
              <Link
                to="quiz/"
                activeClassName={'active'}
                onClick={
                  ()=>{this.state.menuVisible ? () => this.toggleMenu() : null;this.showBanner()}
                }
              >
                Take the Quiz
              </Link>
            </li>

            <li>
              <Link
                to="how-it-works/"
                activeClassName={'active'}
                onClick={
                  ()=>{this.state.menuVisible ? () => this.toggleMenu() : null;this.showBanner()}
                }
              >
                How It Works
              </Link>
            </li>

            <li>
              <Link
                to="how-we-can-help/"
                activeClassName={'active'}
                onClick={
                  ()=>{this.state.menuVisible ? () => this.toggleMenu() : null;this.showBanner()}
                }
              >
                How We Can Help
              </Link>
            </li>

            <li>
              <Link
                to="stories/"
                activeClassName={'active'}
                onClick={
                  ()=>{this.state.menuVisible ? () => this.toggleMenu() : null;this.showBanner()}
                }
              >
                Stories
              </Link>
            </li>

            <li>
              <Link
                to="contact-us/"
                activeClassName={'active'}
                onClick={
                  ()=>{this.state.menuVisible ? () => this.toggleMenu() : null;this.showBanner()}
                }
              >
                Contact Us
              </Link>
            </li>

            {/*<li>*/}
            {/*<Link to="#">*/}
            {/*<svg className="inline-icon">*/}
            {/*<Icons/>*/}

            {/*<use xlinkHref="#icon-padlock" aria-hidden="true"/>*/}
            {/*</svg>*/}
            {/*Sign In*/}
            {/*</Link>*/}
            {/*</li>*/}
          </ul>
        </nav>
      </header>
    )
  }
}

export default PageHeader
