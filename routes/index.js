const path = require('path')
const express = require('express')
const router = express.Router()
const imdb = require('imdb-api')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'vue', 'dist', 'index.html'))
})

router.get('/api/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  const { id } = req.params
  imdb.get({ id }, { apiKey: 'cc8d6e' }).then(data => {
    res.json(data)
  })
})

module.exports = router
