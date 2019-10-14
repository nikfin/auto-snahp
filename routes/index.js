const path = require('path')
const express = require('express')
const router = express.Router()
const imdb = require('imdb-api')
const imdbClient = new imdb.Client({apiKey: 'cc8d6e'});

async function getImdbSearch (_id) {
  const name = unescape(_id)
  console.log(name)
  const { results } = await imdbClient.search({ name })
  return Promise.all(results.map(r => imdbClient.get({ id: r.imdbid })))
}

async function getImdb (_id) {
  const [id] = _id.match(/tt\d{7,8}/)
  return imdbClient.get({ id })
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'vue', 'dist', 'index.html'))
})

router.get('/api/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  const { id } = req.params
  if (id)
    if (/tt\d{7,8}/.test(id))
      getImdb(id)
        .then(data => res.json({results: [data]}))
    else
      getImdbSearch(id)
        .then(results => res.json({results}))
})

module.exports = router
