const express = require('express')
const nodemailer = require('nodemailer')
const transport = require('../config/mail')
const pug = require('pug')
const path = require('path')

function contactHandler(req, res, next) {
  let db = req.app.locals.db
  let collection = db ? db.get('contact') : null
  let results = req.body
  let templateFn = pug.compileFile(path.resolve(__dirname, '../templates/contact.pug'))
  let html = templateFn({ title: 'Contact Us', contactInfo: results })
  let options = {
    to: 'kdunnington@madpow.net',
    subject: 'Catasys OnTrak Contact Us',
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

module.exports = contactHandler
