const express = require('express')
const router = express.Router()
const imdb = require('imdb-api')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/api/:id', (req, res) => {
  const { id } = req.params
  imdb.get({ id }, { apiKey: 'cc8d6e' }).then(data => {
    res.json(data)
  })
})

module.exports = router
