import React from 'react'

import Link from 'gatsby-link'

import SmallArrow from '../elements/SmallArrowIcon'
import MemberQuote from '../components/MemberQuote'
import WelcomeContactBar from '../components/WelcomeContactBar'
import OnTrakLogo from '../elements/OnTrakLogo'

import '../stylesheets/pages/how-it-works.scss'

import bannerImage from '../images/bg-banner-welcome.jpg'
import cardImage from '../images/photo-welcome.jpg'
import memberQuoteKayN from '../images/photo-stories-kay-n.jpg'


const howItWorks = () => {
  return (
    <div>
      <div className="screen-heading logo" style={{ 'border-bottom': '2px solid rgba(99, 99, 99, 0.3)' }}>
          <OnTrakLogo />
          <div className="phone">
            Want to speak with someone now?{' '}
            <a href="tel:+01-866-321-6560">Call us at 1-866-321-6560</a>
          </div>
      </div>
      <section style={{ 'padding-top': '0rem' }}>
        <div className="page-intro-block how-it-works">
          <h1>Welcome to OnTrak!</h1>
          <p>
          We’re excited to be starting out on this journey with you. <br />We look forward to working together to achieve a happier, healthier you!
          </p>
        </div>

 <div className="content-block banner">
          <img src={bannerImage} alt="" />
        </div>

        <div className="page-intro-block">
          <h1>What’s Next?</h1>
        </div>
        
        <div className="three-column-block program-attributes">
          <div className="attributes-block">
            <h3>
              <strong>Welcome Packet</strong>
            </h3>
            <p>
            If you have not already, you will receive a Welcome Packet either through US Mail or via email. 
        The Welcome Packet includes information about OnTrak as well as a program workbook for your use.
            </p>
          </div>

          <div className="attributes-block">
            <h3>
             <strong>Appointments</strong>
            </h3>
            <p>
            Your OnTrak Clinical Operations Coordinator will reach out to you within the next week or two to 
            schedule your first appointment with your OnTrak provider(s). Your Care Coach also will contact you to 
            start helping you build a plan to achieve your health goals.
            </p>
          </div>

          <div className="attributes-block">
            <h3>
              <strong>Support</strong>
            </h3>
            <p>
            We believe that small steps turn into giant leaps over time. For 52 weeks, you will have support toward reaching 
            your goals from your team of providers, your Care Coach, and, if preferred, a Community Care Coordinator.
            </p>
          </div>
        </div>

       <section className="bg-color-orange full-width">
        <WelcomeContactBar />
      </section>

      

        <div className="page-heading-block your-team-header">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="content-block">
          <div className="your-team">
          <div className="team-photo">
              <img src={cardImage} alt="" />
            </div>


            <div className="team-copy">
              <h4>What is the OnTrak Program? What resources can I access through this program?</h4>
              <p>
             OnTrak is a personalized program that helps you get healthier and stay healthier. 
             As part of OnTrak, you have a team of people dedicated to helping you live your healthiest, most meaningful life. 
             Your team includes: An OnTrak Care Coach to support you by phone. An OnTrak Counselor to help you reach your goals. 
             A Community Care Coordinator to connect you to community resources. A Clinical Operations Coordinator to set your 
             first appointment with your counselor. You may also have access to other care providers.  
             They all are here to walk with you throughout your journey and to support you in reaching your health goals. 
              </p>

              <h4>What does my Care Coach do? What can't they do?</h4>
              <p>Your Care Coach helps you achieve your unique health goals. 
                  They will call you at least monthly to discuss your goals and plans for achieving them. 
                  Your Care Coach can locate digital or community resources for your use  throughout this 52-week program 
                  and beyond. Your Care Coach will work with the entire OnTrak team to ensure you are getting the care that 
                  you deserve. They can also help locate or schedule appointments with your current medical providers.
                Care Coaches rely on your health plan to help you locate other specialists that you may need or request. 

              </p>

              <h4>What does the Community Care Coordinator do? Do I have to have one? Can they take me to my dentist, PCP, or PT appointments?</h4>
              <p>Your Community Care Coordinator will support you within your local community to help overcome any barriers 
                  that stand in your way of reaching your health goals. They will provide telephonic and, in some cases, 
                  face-to-face support. They will partner with your Care Coach to assist you with your progress. 
                  Your Community Care Coordinator may be able to provide transportation to OnTrak provider appointments. 
                  They are unable to provide transportation to any non-OnTrak appointments, but may be able to locate 
                  alternative options for these needs.
              </p>

              <h4>How often will the OnTrak Program call me?</h4>
              <p>Your Clinical Operations Coordinator will call you to schedule your first provider appointments. 
                  Afterwards, you and your providers will decide together how frequently you might need to meet. 
                  Your Care Coach will call you about once a month, depending on your need. We understand that your 
                  time is valuable.  We work to make meaningful use of the time you spend on the phone with us. 
              </p>

              <h4>Who are my providers? What do you mean by provider?</h4>
              <p>You will have access to an OnTrak counselor who will provide you with additional support to achieve a 
                  healthier lifestyle. Our providers are specially trained to work with you on your individual goals. 
                  You may also have access to other care providers through the program. Your Care Coach will help you 
                  determine which providers may be able to best support your needs. 
              </p>

              <h4>What do we discuss in appointments with my providers?</h4>
              <p>All OnTrak providers are trained to support you with your health goals. Your OnTrak counselor will likely 
                  use the workbook you received in your Welcome Packet in your sessions with them. However, you are not 
                  limited to discussing only one topic with them. Appointments with your OnTrak Provider are a safe space 
                  to explore any areas of your life further with a licensed professional.  
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
          
        </div>
      </section>

      <section className="bg-color-orange full-width">
        <WelcomeContactBar />
      </section>
    </div>
  )
}

export default howItWorks
