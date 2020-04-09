import React from 'react'

import Link from 'gatsby-link'

import SmallArrow from '../elements/SmallArrowIcon'
import OnTrakModules from '../components/OnTrakModules'
import MemberQuote from '../components/MemberQuote'
import ContactBar from '../components/ContactBar'

import '../stylesheets/pages/how-we-can-help.scss'

import bannerImage from '../images/bg-banner-how-we-can-help.jpg'
import memberQuoteJamesD from '../images/photo-stories-james-d.jpg'

const howWeCanHelp = () => {
  return (
    <div className="how-we-can-help">
      <section>
        <div className="page-intro-block">
          <h1>Programs with OnTrak</h1>
          <p>
            OnTrak offers personalized programs for a variety of conditions.
            Each program is customized to your specific needs and unique
            situation.
          </p>
        </div>

        <div className="content-block banner">
          <img src={bannerImage} alt="banner" />
        </div>

        <div className="page-heading-block">
          <h2>OnTrak may be able to help you with your...</h2>
        </div>

        <OnTrakModules />
      </section>

      <section className="bg-color-white">
        <div className="page-heading-block testimonials">
          <h2>What Our Members Say</h2>
        </div>

        <MemberQuote
          citation={'James D, Springfield, IL'}
          image={memberQuoteJamesD}
        >
          <p>
            OnTrak encouraged me to let go of issues I was having with my
            family. I’ve learned to be at peace with controlling my own
            reactions and to keep from retaliating.
          </p>
        </MemberQuote>

        <div className="centered-control">
          <Link to="stories/" className="arrow-link">
            Read more stories <SmallArrow />
          </Link> 
          <div className="centered-button-help"> 
            <a href="https://members.stayontrak.com/apply?utm_source=website&utm_medium=apply_button&utm_campaign=website_apply_now" target="_blank" className="arrow-link">
              <button className="button button-primary smaller applynow">
                  Apply Now
              </button>
            </a>
          </div>
        </div>
      </section> 
       
      <section className="bg-color-orange full-width">
        <ContactBar />
      </section>
    </div>
  )
}

export default howWeCanHelp
