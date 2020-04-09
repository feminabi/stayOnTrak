const nodemailer = require('nodemailer')
const debug = require('debug')('catasys:mail')
const fs = require('fs')
const path = require('path')

module.exports = new Promise((resolve, reject) => {
  const transportConfig = (process.env.NODE_ENV === 'production') ? require('./mail.json') : require('./mail.development.json')

  if (transportConfig && transportConfig.options) {
    debug('Transport found, creating mailer ...', transportConfig)
    let transport = nodemailer.createTransport(transportConfig.options, transportConfig.defaults || {})
    resolve(transport)
  } else {
    if (process.env.NODE_ENV === 'production') {
      console.error('No Mail configuration found, halting ...')
      process.exit(1)
    } else {
      debug('No transport found, creating new test account ...')
      nodemailer.createTestAccount((err, account) => {
        if (err) {
          console.error(err)
          return reject(err)
        }
        debug('Test account created', account)
        const config = {
          options: {
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
              user: account.user,
              pass: account.pass
            }
          },
          defaults: {
            from: 'kdunnington@madpow.net'
          }
        }
        fs.writeFile(path.resolve(__dirname, 'mail.json'), JSON.stringify(config, null, 4), (err) => {
          if (err) {
            console.error(err)
            return reject(err)
          }
          let transport = nodemailer.createTransport(config)
          debug('Transport created')
          resolve(transport)
        })
      })
    }
  }
})
