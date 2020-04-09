const express = require('express')
const path = require('path')
const logger = require('morgan')
const debug = require('debug')('catasys:app')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const monk = require('monk')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const app = express()

const dbConnection = process.env.DB_CONN || 'mongodb://localhost:27017/catasys'
const db = monk(dbConnection).then(db => {
  debug('Got database connection')
  app.locals.db = db
}).catch(err => {
  console.error('Problem connecting to database')
  console.error(err)
})

const sessionStore = new MongoStore({
  uri: dbConnection,
  collection: 'session'
})

sessionStore.on('error', function (error) {
  console.error(error)
})

const sessionSettings = {
  secret: 'catasys-ontrak',
  name: 'ontrakId',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sessionSettings.cookie.secure = true
}

const api = require('./routes/api')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session(sessionSettings))

app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  if (req.xhr) {
    res.json(res.locals)
  } else {
    res.render('error')
  }
})

module.exports = app
