const express = require('express')
const nodemailer = require('nodemailer')
const transport = require('../config/mail')
const pug = require('pug')
const path = require('path')

const API = {}

/**
 * Record a single answer
 */
API.answer = function assessmentAnswer(req, res, next) {
  let db = req.app.locals.db
  let collection = db ? db.get('answers') : null
  let results = req.body
  let insert = {
    results,
    sessionID: req.sessionID,
    created: new Date()
  }
  if (collection) {
    collection.insert(insert).then(() => {
      res.sendStatus(200)
    }).catch(next)
  } else {
    res.sendStatus(200)
  }
}

/**
 * Record a full submission, including contact info
 */
API.submit = function assessmentHandler(req, res, next) {
  let db = req.app.locals.db
  let collection = db ? db.get('assessment') : null
  let results = req.body
  let templateFn = pug.compileFile(path.resolve(__dirname, '../templates/assessment.pug'))
  let html = templateFn(results)
  let options = {
    to: 'kdunnington@madpow.net',
    subject: 'Catasys OnTrak Assessment Results',
    html: html
  }

  transport.then(mailer => {
    mailer.sendMail(options).then(info => {
      const url = req.app.get('env') === 'development' ? nodemailer.getTestMessageUrl(info) : null
      const response = {
        results
      }
      const insert = {
        result: results,
        message: info,
        sessionID: req.sessionID,
        created: new Date()
      }
      if (url) {
        response.url = url
        insert.url = url
      }
      if (collection) {
        collection.insert(insert).then(() => {
          res.status(200).json(response)
        }).catch(next)
      } else {
        res.status(200).json(response)
      }
    }).catch(next)
  }).catch(next)
}

module.exports = API
