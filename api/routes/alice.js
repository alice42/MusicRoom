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
const playlistTracksDeezer = query => {
  // const appToken = musicRoomFacebookAppToken;
  const url = `https://api.deezer.com/playlist/${query}`

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
const searchDeezer = query => {
  // const appToken = musicRoomFacebookAppToken;
  const url = `https://api.deezer.com/search?q=${query}&limit=100`
  return fetch(url)
    .then(response => {
      // console.log('SEARCH DEEZER RESPONSE', response)
      return response.json()
    })
    .then(json => {
      // console.log('SEARCH DEEZER RESPONSE', json)
      return json
    })
}

const addSongToPlaylist = (trackId, playlistId, token) => {
  console.log('TOKEN', token)
  const songs = trackId
  const url = `https://api.deezer.com/playlist/${playlistId}/tracks?access_token=${token}&request_method=post&songs=${songs}`
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      console.log('RESP DEEZER ADD SONG TO PLAYLIST', json)
      return false
      // return !json.data.error;
    })
}

// const createPlaylistDeezer = query => {
//   const { userId, title } = query
//   // const appToken = musicRoomFacebookAppToken;
//   const url = `https://api.deezer.com/user/${userId}`
//   return fetch(url)
//     .then(response => {
//       console.log('SEARCH DEEZER RESPONSE', response)
//       return response.json()
//     })
//     .then(json => {
//       console.log('SEARCH DEEZER RESPONSE', json)
//       return json
//     })
// }

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

router.post('/playlist', async (req, res) => {
  try {
    const { query } = req.body
    const results = await playlistTracksDeezer(query)
    return res.status(200).send({
      message: `Track ${query} received on /alice/playlist`,
      query,
      results
    })
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

router.post('/edit-playlist', async (req, res) => {
  try {
    const { query } = req.body
    const { token, trackId, playlistId } = query
    console.log('QUERY API', query)
    const results = await addSongToPlaylist(trackId, playlistId, token)
    return res.status(200).send({
      message: `Track ${trackId} received on ${playlistId}`,
      query,
      results
    })
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

const getCode = () => {
  // const appToken = musicRoomFacebookAppToken;
  const url = `http://musicroom.io/deezer`
  return fetch(url)
    .then(response => {
      console.log('CODE PERMISSION DEEZER RESPONSE', response)
      return response.json()
    })
    .then(json => {
      console.log('CODE PERMISSION DEEZER RESPONSE', json)
      return json
    })
}

router.get('/get-code', async (req, res) => {
  try {
    const results = await getCode()
    return res.status(200).send({
      message: `RETOUR GET CODE`,
      results
    })
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

module.exports = router
