const express = require('express')
const router = express.Router()

// EXEMPLE

// this route can be reached with [POST] @ /api/alice/route-example
// router.post('/route-example', async (req, res) => {
//   try {
//     const { foo, bar, baz, qux, quux } = req.body
//     return res.status(200).send({
//       message: 'foo bar baz qux quux received on /alice/route-example',
//       foo,
//       bar,
//       baz,
//       qux,
//       quux
//     })
//   } catch (err) {
//     console.log('INTER ERROR', err)
//     return res.status(500).send({ error: 'internal server error' })
//   }
// })

const searchDeezer = query => {
  console.log('TEST')
  // const appToken = musicRoomFacebookAppToken;
  const url = `https://api.deezer.com/search?q=${query}`
  return fetch(url)
    .then(response => {
      console.log('SEARCH DEEZER RESPONSE', response)
      return response.json()
    })
    .then(json => {
      console.log('SEARCH DEEZER RESPONSE', json)
      return json
    })
}

router.post('/search', async (req, res) => {
  try {
    const { query } = req.body
    const results = await searchDeezer(query)
    return res.status(200).send({
      message: `Track ${query} received on /alice/search`,
      query,
      results
    })
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

module.exports = router
