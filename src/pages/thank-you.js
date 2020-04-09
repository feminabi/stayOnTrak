import React from 'react'

import Link from 'gatsby-link'

import MemberQuote from '../components/MemberQuote'
import ChatPrompt from '../components/ChatPrompt'
import ContactBar from '../components/ContactBar'

import memberQuoteJamesD from '../images/photo-stories-james-d.jpg'
import memberQuoteShellieS from '../images/photo-stories-shellie-s.jpg'
import memberQuoteDelilahV from '../images/photo-stories-delilah-v.jpg'
import memberQuoteFredH from '../images/photo-stories-fred-h.jpg'
import memberQuoteJacqueline from '../images/photo-stories-jacqueline.jpg'
import memberQuoteKayN from '../images/photo-stories-kay-n.jpg'
import memberQuoteLauraM from '../images/photo-stories-laura-m.jpg'
import memberQuoteShannonT from '../images/photo-stories-shannon-t.jpg'

const Stories = () => {
  return (
    <div>
      <section className="stories">
        <div className="page-intro-block">

        <h1>Thank You!</h1>

        <p>
            Thank you for your interest in OnTrak. Your submission has been received.
          </p>
    
          <p>
            See what other people dealing with similar challenges have to say
            about their work with OnTrak.
          </p>
        </div>

        <MemberQuote
          citation={'Shannon T, Manitowoc, WI'}
          image={memberQuoteShannonT}
        >
          <p>
            The OnTrak program has helped me regain control of my life once
            again. I would recommend OnTrak to others without hesitation.
          </p>
        </MemberQuote>

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

        <MemberQuote
          citation={'Shellie S, Richland Hills, TX'}
          image={memberQuoteShellieS}
        >
          <p>
            The OnTrak program did exactly what its name says – it got me back
            on track. If you are wanting to improve your life, want to just find
            a different avenue or help with anything, OnTrak gives all the tools
            – you just have to take advantage.
          </p>
        </MemberQuote>

        <MemberQuote
          citation={'Jacqueline F, Philadelphia, PA'}
          image={memberQuoteJacqueline}
        >
          <p>
            I joined the OnTrak program because I was in a very dark place in my
            life and I was not coping well. In the past year, I have learned to
            be happy again. I found purpose in my life.
          </p>
        </MemberQuote>

        <MemberQuote citation={'Laura M, Galva, IL'} image={memberQuoteLauraM}>
          <p>
            Loved Care Coach phone calls… Care Coach genuinely cared about me
            and my progress. I’ve learned to deal with people better. Accept
            that there are things I can’t control. I can remove myself from
            situations that cause anxiety.
          </p>
        </MemberQuote>

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

        <MemberQuote
          citation={'Delilah V, Austin, TX'}
          image={memberQuoteDelilahV}
        >
          <p>
            It has helped me to get a better view on how I deal with my emotions
            and cope with different aspects of my life. The relationships I’ve
            built with my Care Coach, Community Care Coordinator and Counselor
            have helped me learn to trust others and are so important and
            valued.
          </p>
        </MemberQuote>


        <MemberQuote citation={'Fred H, Urbana, IL'} image={memberQuoteFredH}>
          <p>
            Having a therapist to talk to helps bring stuff out of you. I left
            sessions feeling like a burden was lifted off my shoulders.
          </p>
        </MemberQuote>
      </section>

      <section className="bg-color-orange full-width">
        <ContactBar />
      </section>
    </div>
  )
}

export default Stories
