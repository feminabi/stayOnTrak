import 'wicg-focus-ring'

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import '../stylesheets/_fonts.scss'
import '../stylesheets/_animations.scss'
import '../stylesheets/base.scss'

import PageHeader from '../components/PageHeader'
import PageFooter from '../components/PageFooter'

class TransitionHandler extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.location.pathname === window.location.pathname
  }

  render() {
    const { children } = this.props
    return <div className="transition-container">{children}</div>
  }
}

const TemplateWrapper = ({ location, children }) => (
  <div className="template-wrapper">
    <Helmet
      title="OnTrak - Start Here"
      meta={[
        {
          name: 'description',
          content:
            'OnTrak’s mission is to improve your health and help you live better. And it’s all covered by your insurance.',
        },
      ]}
    />

    {location.pathname.match(/^\/assessment/) === null &&
      location.pathname.match(/^\/feelbetter/) === null && 
      location.pathname.match(/^\/welcome/) === null && (
        <PageHeader isHomepage={location.pathname === '/' ? true : false} />
      )}

    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames="pageNavigation"
        timeout={{ enter: 300, exit: 200 }}
      >
        <TransitionHandler location={location}>
          <main>{children()}</main>
        </TransitionHandler>
      </CSSTransition>
    </TransitionGroup>

    {location.pathname.match(/^\/assessment/) === null && <PageFooter />}
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
