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
const playlistTracksDeezer = (id, deezerToken) => {
  // const appToken = musicRoomFacebookAppToken;
  const url = `https://api.deezer.com/playlist/${id}?access_token=${deezerToken}`

  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json
    })
}
const searchDeezer = query => {
  // const appToken = musicRoomFacebookAppToken;
  const url = `https://api.deezer.com/search?q=${query}&limit=100`
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json
    })
}

const addSongToPlaylist = (trackId, playlistId, token) => {
  const songs = trackId
  const url = `https://api.deezer.com/playlist/${playlistId}/tracks?access_token=${token}&request_method=post&songs=${songs}`
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return false
      // return !json.data.error;
    })
}

const createNewPlaylist = (title, deezerToken, deezerId) => {
  // const appToken = musicRoomFacebookAppToken;
  const url = `https://api.deezer.com/user/${deezerId}/playlists?access_token=${deezerToken}&request_method=post&title=${title}`
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json
    })
}

const deletePlaylist = (playlistId, deezerToken) => {
  const url = `https://api.deezer.com/playlist/${playlistId}?access_token=${deezerToken}&request_method=delete`
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json
    })
}

const deleteTrack = (playlistId, trackId, deezerId, deezerToken) => {
  const url = `https://api.deezer.com/playlist/${playlistId}/tracks?access_token=${deezerToken}&request_method=delete&songs=${trackId}`
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json
    })
}

const updatePlaylist = (playlistId, deezerToken, deezerId, privacyOption, collabOption) => {
  const url = `https://api.deezer.com/playlist/${playlistId}?access_token=${deezerToken}&request_method=post&collaborative=${collabOption}&public=${privacyOption}`
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json
    })
}

const getDeezerFollowers = id => {
  const url = `https://api.deezer.com/user/2525235902/followers&request_method=get`
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(json => {
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

router.post('/playlist', async (req, res) => {
  try {
    const { query } = req.body
    const { id, deezerToken } = query
    const results = await playlistTracksDeezer(id, deezerToken)
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

router.post('/create-playlist', async (req, res) => {
  try {
    const { query } = req.body
    const { title, deezerToken, deezerId, collabOption, privacyOption } = query
    const results = await createNewPlaylist(title, deezerToken, deezerId)
    const playlistId = results.id
    const resultsT = await updatePlaylist(playlistId, deezerToken, deezerId, privacyOption, collabOption)
    return res.status(200).send({
      message: `OK`,
      query,
      results
    })
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

router.post('/delete-playlist', async (req, res) => {
  try {
    const { query } = req.body
    const { playlistId, deezerToken } = query
    const results = await deletePlaylist(playlistId, deezerToken)
    return res.status(200).send({
      message: `OK`,
      query,
      results
    })
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

router.post('/delete-track', async (req, res) => {
  try {
    const { query } = req.body
    const { playlistId, trackId, deezerId, deezerToken } = query
    const results = await deleteTrack(playlistId, trackId, deezerId, deezerToken)
    return res.status(200).send({
      message: `OK`,
      query,
      results
    })
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

router.post('/get-followers', async (req, res) => {
  try {
    const { query } = req.body
    const { id } = query
    const results = await getDeezerFollowers(id)
    return res.status(200).send({
      message: `OK`,
      query,
      results
    })
  } catch (err) {
    console.log('INTER ERROR', err)
    return res.status(500).send({ error: 'internal server error' })
  }
})

module.exports = router
