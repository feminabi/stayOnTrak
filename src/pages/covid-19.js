import React from 'react'
import Link from 'gatsby-link'

import '../stylesheets/pages/coronavirus.scss'

const coronavirus = () => {
    return (
        <div className="corono-document">
            <section>
                <div className="corono-title">
                    <h3>Take Care of Yourself During COVID-19</h3>
                </div>
                <article>
                    <p>Every day brings more news about COVID-19 and more changes to our daily lives. There is a lot of information to take in and many people feel overwhelmed. It’s natural to feel more stress or anxiety during this time. Some of the changes in our lives are out of our control. But we do have the ability to protect the way we feel and the way we cope. This page contains some simple ways to help you feel more calm and in control.</p>
                    <ol>
                        <li><strong>Stay Informed:</strong> There is a lot of information available, but not all of it is accurate or easy to understand. Here are some websites the OnTrak team trusts. We encourage our members to check these for updates.<br />
                            <ul>
                                <li><a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">CDC website</a></li>
                                <li><a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">World Health Organization website</a></li>
                            </ul>
                        </li>
                        <li><strong>Reach Out to OnTrak to See How We Can Help:</strong> <a href="https://members.stayontrak.com/apply?utm_source=website&utm_medium=covid_apply_button&utm_campaign=website_apply_now" target="_blank">Apply Now online</a> or call us at (866) 517-1417. The OnTrak team is here for you 24/7/365 and we can help. Our program is<br />
                            <ul>
                                <li>Personalized: It’s all about you and based on what you want to accomplish and what will help you feel better.</li>
                                <li>Supportive: We listen to you and pair you with the best coaches, counselors, and doctors.</li>
                            </ul>
                        </li>
                        <li><strong>Allow Yourself a Break:</strong> It is easy to be overwhelmed by all the news. It’s important to stay up to date with what is going on, but it’s also important to take a break. Some ways to do that:
                            <ul>
                                <li>Listen to music, play a game, watch a show. These are healthy distractions.</li>
                                <li>Move! Even taking a walk can help lower the stress hormones in your body and help you feel calmer. Can’t take a walk? Move around your house.</li>
                                <li>Use some tips your care coach and other providers have offered. Deep breathing or writing in a journal can help fight negative thoughts.</li>
                                <li>Help someone else. Make a phone call or write a letter to someone who is isolated. Or check for safe ways to help out in your community.</li>
                                <li>Get some rest. It’s important to get enough sleep so you can feel refreshed.</li>
                            </ul>
                        </li>
                        <li><strong>Reach out to Your Support System:</strong> When we feel stressed we often want to be alone. But that can make us even more tense. Opening up to someone in your support system can help you reset.
                            <ul>
                                <li>Call a friend or family member.</li>
                                <li>If you work with a therapist, make an appointment.</li>
                            </ul>
                        </li>
                    </ol> 
                    <h3>More Information about Mental Health and Coping during This Outbreak</h3>
                    <ul>
                        <li><a href="https://www.cdc.gov/coronavirus/2019-ncov/daily-life-coping/managing-stress-anxiety.html?CDC_AA_refVal=https%3A%2F%2Fwww.cdc.gov%2Fcoronavirus%2F2019-ncov%2Fprepare%2Fmanaging-stress-anxiety.html">CDC: Mental Health & Coping during COVID-19</a> </li>
                        <li><a href="https://afsp.org/taking-care-of-your-mental-health-in-the-face-of-uncertainty/">American Foundation for Suicide Prevention: Taking Care of your mental health in the face of uncertainty </a> </li>
                        <li><a href="https://www.nctsn.org/resources/parent-caregiver-guide-to-helping-families-cope-with-the-coronavirus-disease-2019">NCTSN: helping families cope with the coronavirus</a>  </li>
                    </ul>
                    <h3>Crisis Resources</h3>
                    <p>If you are having a crisis, please call one of the numbers below:</p>
                    <p>National Suicide Prevention Lifeline: 1-800-273-8255</p>
                    <p>National Domestic Violence Hotline: 1-800-799-7233</p>
                    <p>Childhelp National Child Abuse Hotline: 1-800-422-4453</p>
                    <p>
                        If you have a medical emergency or need immediate support, please call 911.
                    </p>
                </article> 
            </section>
        </div>
    )
}

export default coronavirus 