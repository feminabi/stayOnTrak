const express = require('express')
const assessment = require('./assessment')
const contact = require('./contact')
const router = express.Router()

router.post('/assessment', assessment.submit)
router.post('/assessment/answer', assessment.answer)
router.post('/contact', contact)

module.exports = router
