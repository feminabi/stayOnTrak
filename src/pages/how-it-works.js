import React from 'react'

import Link from 'gatsby-link'

import SmallArrow from '../elements/SmallArrowIcon'
import MemberQuote from '../components/MemberQuote'
import ContactBar from '../components/ContactBar'

import '../stylesheets/pages/how-it-works.scss'

import bannerImage from '../images/bg-banner-how-it-works.jpg'
import cardImage from '../images/photo-your-ontrak-team.jpg'
import memberQuoteKayN from '../images/photo-stories-kay-n.jpg'

const howItWorks = () => {
  return (
    <div>
      <section>
        <div className="page-intro-block how-it-works">
          <h1>How It Works</h1>
          <p>
            With OnTrak, your dedicated care team is there for you 24/7/365,
            helping you accomplish your goals.
          </p>
        </div>

        <div className="content-block banner">
          <img src={bannerImage} alt="" />
        </div>

        <div className="three-column-block program-attributes">
          <div className="attributes-block">
            <h3>
              OnTrak is <strong>Personalized</strong>
            </h3>
            <p>
              OnTrak is all about you. It’s based on what you want to accomplish
              and what will help you feel better.
            </p>
          </div>

          <div className="attributes-block">
            <h3>
              OnTrak is <strong>Supportive</strong>
            </h3>
            <p>
              OnTrak partners you with the best nurses, counselors and doctors.
              They are specially trained to bring you the best care available.
            </p>
          </div>

          <div className="attributes-block">
            <h3>
              OnTrak is <strong>Convenient</strong>
            </h3>
            <p>
              OnTrak is an outpatient program that you complete at your own
              pace, on your own time.
            </p>
          </div>
        </div>

        <div className="page-heading-block your-team-header">
          <h2>Your OnTrak Team</h2>
        </div>

        <div className="content-block">
          <div className="your-team">
            <div className="team-photo">
              <img src={cardImage} alt="" />
            </div>

            <div className="team-copy">
              <h4>Personal Nurse Care Coach</h4>
              <p>
              OnTrak matches you with a dedicated nurse Care Coach. 
              Your Care Coach will guide you through the program, listen to you and support you with compassion and without judgment. 
              Your Care Coach is always there to encourage you toward your goals.
              </p>

              <h4>Counselor</h4>
              <p>
                Counselors help strengthen your mind and expand your
                perspective. You may work with a licensed counselor to identify
                your unique goals. You may also develop skills to handle any
                challenges you face. The length of counseling depends on your
                unique needs but can last up to 12 weeks.
              </p>

              <h4>Medical Specialist</h4>
              <p>
                You may receive a medical assessment to check your general
                health, and help manage your medications. The assessment helps
                identify physical reasons that are holding your body back from
                reaching its potential. Your doctor will work with your Care
                Coach and your existing health team. Length of medical treatment
                depends on your individual needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-color-white">
        <div className="page-heading-block testimonials">
          <h2>What Our Members Say</h2>
        </div>

        <MemberQuote
          citation={'Kay N, Stephenville, TX'}
          image={memberQuoteKayN}
        >
          <p>
            I like most that y’all keep up with me so much. Call, ask questions,
            stay in touch, care about my life. OnTrak changed my life by giving
            me an outlet to talk about my issues health wise, mentally and a
            caring voice when you need it most.
          </p>
        </MemberQuote>

        <div className="centered-control">
          <Link to="stories/" className="arrow-link">
            Read more stories <SmallArrow />
          </Link>
          <div className="centered-button-works"> 
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

export default howItWorks
