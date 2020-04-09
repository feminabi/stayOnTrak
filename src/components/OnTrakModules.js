import React from 'react'
import PropTypes from 'prop-types'

import iconAnxiety from '../images/icon-anxiety.svg'
import iconDepression from '../images/icon-depression.svg'
import iconStressManagement from '../images/icon-stress-management.svg'
import iconDrinkingDrugs from '../images/icon-drinking-drugs.svg'
import iconLivingHealthy from '../images/icon-living-healthy.svg'
import iconWeightManagement from '../images/icon-weight-management.svg'
import iconSmoking from '../images/icon-smoking.svg'
import iconChronicPain from '../images/icon-chronic-pain.svg'

import '../stylesheets/components/ontrak-modules-list.scss'

const modulesContent = [
  {
    name: 'anxiety',
    title: 'Anxiety',
    icon: iconAnxiety,
    content:
      'OnTrak offers personalized programs for a variety of conditions. Each program is customized to your specific needs and unique situation.',
  },
  {
    name: 'depression',
    title: 'Depression',
    icon: iconDepression,
    content:
      'Even those with the most severe depression can get better with treatment. If you are looking to gain control of your life, feel focused and overall happy again, OnTrak may be able to help.',
  },
  {
    name: 'stressManagement',
    title: 'Stress Management',
    icon: iconStressManagement,
    content:
      'If you are looking to feel calmer and have a sense of peace and being in control, OnTrak may be able to help.',
  },
  {
    name: 'drinkingDrugs',
    title: 'Drinking & Drug Use',
    icon: iconDrinkingDrugs,
    content:
      'The OnTrak program for drinking and drug use is for people who are just beginning treatment and also for people who have tried other recovery programs. The OnTrak program is different because it is personalized to address the unique needs of your whole health.',
  },
  {
    name: 'livingHealthy',
    title: 'Living Healthy',
    icon: iconLivingHealthy,
    content:
      'The OnTrak Live Healthy program may help you reach your wellness goals and improve your satisfaction with your quality of life.',
  },
  {
    name: 'weightManagement',
    title: 'Weight Management',
    icon: iconWeightManagement,
    content:
      'Many people who are looking to eat healthy or lose weight turn to OnTrak for help. OnTrak combines research, healthy eating and behavioral therapy to help you maintain a healthy weight.',
  },
  {
    name: 'smoking',
    title: 'Smoking',
    icon: iconSmoking,
    content:
      'The OnTrak program for smoking cessation is personalized to help you quit smoking. If you are looking to strengthen your mind and maintain your overall health and well-being, OnTrak may be able to help.',
  },
  {
    name: 'chronicPain',
    title: 'Chronic Pain',
    icon: iconChronicPain,
    content:
      'The OnTrak program may help you better manage your chronic pain. Learn new techniques like mindfulness, better sleep, and physical activity.',
  },
]

const OnTrakModules = ({ modulesToDisplay }) => {
  const moduleList = modulesToDisplay
    ? modulesToDisplay.map(
        name => modulesContent.filter(module => module.name === name)[0]
      )
    : modulesContent

  const createMarkup = content => {
    return { __html: content }
  }

  return (
    <ul className="ontrak-modules-list">
      {moduleList.map((module, i) => {
        return (
          <li key={i}>
            <img src={module.icon} className="circle-icon" alt="" />

            <h3>{module.title}</h3>

            <p dangerouslySetInnerHTML={createMarkup(module.content)} />
          </li>
        )
      })}
    </ul>
  )
}

OnTrakModules.propTypes = {
  modulesToDisplay: PropTypes.array,
}

export default OnTrakModules
