const { getSessions } = require('../../helpers/firebaseSession.helpers')
const { findUserBy, getAllUsers } = require('../../helpers/firebaseUsers.helpers')
const {
  isDeezerTokenValid,
  createNewPlaylist,
  getPlaylistTracks,
  addTrackToPlaylist,
  removeTrackToPlaylist,
  setPlaylistToCollaborative
} = require('../../helpers/deezer.helpers')
const {
  findPlaylists,
  insertPlaylist,
  updatePlaylist,
  findPlaylistBy,
  deletePlaylist
} = require('../../helpers/firebasePlaylists.helpers')
const { getPlaylistAvailable } = require('../../helpers/playlist.helpers')

const { findKey } = require('lodash')
const md5 = require('blueimp-md5')

const getTracksData = tracks => {
  const rt = tracks.map(track => ({
    id: track.id,
    albumCover: track.album.cover,
    artistName: track.artist.name,
    previewUrl: track.preview,
    title: track.title
  }))
  return rt
}

const getValuesFromParams = obj => {
  const copy = { ...obj }
  for (var key in copy) {
    copy[key] = copy[key].value
  }
  return copy
}

async function getPlaylists(req, res) {
  try {
    const database = res.database
    const { 'X-SessionID': token } = getValuesFromParams(req.swagger.params)
    const sessions = await getSessions(database)
    const id = findKey(sessions, sessionToken => sessionToken === token)
    if (!id) {
      return res.status(500).send({ error: 'token not valid' })
    }
    const tt = await findUserBy('_id', id, database)
    const { token: userTokens } = tt
    if (!userTokens.deezer) {
      return res.status(500).send({ error: 'you dont have link your account to deezer' })
    }
    const validToken = await isDeezerTokenValid(userTokens.deezer)
    if (!validToken) {
      return res.status(500).send({ error: 'your token deezer is invalid' })
    }
    const playlists = await findPlaylists(database)
    const idCorrespondance = await getAllUsers(database)
    return res.status(200).send(getPlaylistAvailable(playlists, id, idCorrespondance))
  } catch (err) {
    console.log('INTER ERROR', err.message)
    return res.status(500).send({ error: 'internal server error' })
  }
}

//   router.post("/create-playlist", async (req, res) => {
async function createPlaylist(req, res) {
  try {
    const database = res.database
    const { 'X-SessionID': token } = getValuesFromParams(req.swagger.params)
    const { name } = req.body
    const sessions = await getSessions(database)
    const id = findKey(sessions, sessionToken => sessionToken === token)
    if (!id) {
      return res.status(500).send({ error: 'token not valid' })
    }
    const { _id, token: userTokens } = await findUserBy('_id', id, database)
    const validToken = await isDeezerTokenValid(userTokens.deezer)
    if (!validToken) {
      return res.status(500).send({ error: 'your token deezer is invalid' })
    }
    playlist = await createNewPlaylist(
      'playlist_MPE_' + md5(name),
      userTokens.deezer,
      validToken.id
    )
    await setPlaylistToCollaborative(playlist.id, userTokens.deezer)
    await insertPlaylist(database, {
      name,
      owner: id,
      privacy: 'public',
      allowedUsers: [],
      playlistId: playlist.id,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    })
    const playlists = await findPlaylists(database)
    const idCorrespondance = await getAllUsers(database)
    return res.status(200).send(getPlaylistAvailable(playlists, id, idCorrespondance))
  } catch (err) {
    console.log('INTER ERROR', err.message)
    return res.status(500).send({ error: 'internal server error' })
  }
}

//   router.post("/update-data", async (req, res) => {
async function updateData(req, res) {
  try {
    const database = res.database
    const allowedKey = ['name', 'privacy', 'allowedUsers']
    const { 'X-SessionID': token } = getValuesFromParams(req.swagger.params)
    const { playlistId, toChange, newValue } = req.body
    const sessions = await getSessions(database)
    const id = findKey(sessions, sessionToken => sessionToken === token)
    if (!id) {
      return res.status(500).send({ error: 'token not valid' })
    }
    const { owner, restriction } = await findPlaylistBy(database, '_id', playlistId)
    if (owner !== id) {
      return res.status(500).send({ error: 'you are not authorized to edit this playlist' })
    }
    if (allowedKey.indexOf(toChange) === -1) {
      return res.status(500).send({ error: 'you cant change this information' })
    }
    if (toChange === 'allowedUsers') {
      let usersId
      try {
        usersIdPromises = (newValue === '' ? [] : newValue.split(',')).map(async userMail => {
          const { _id } = await findUserBy('email', userMail.toLowerCase(), database)
          if (_id === undefined) throw Error('user doesnt exist')
          return _id
        })
        usersId = await Promise.all(usersIdPromises)
        usersIdUniq = [...new Set(usersId)]
      } catch (userError) {
        return res.status(500).send({ error: 'a user given doesnt exist' })
      }
      await updatePlaylist(database, playlistId, { [toChange]: usersIdUniq })
    } else {
      await updatePlaylist(database, playlistId, { [toChange]: newValue })
    }
    const playlists = await findPlaylists(database)
    const idCorrespondance = await getAllUsers(database)
    return res.status(200).send(getPlaylistAvailable(playlists, id, idCorrespondance))
  } catch (err) {
    console.log('INTER ERROR', err.message)
    return res.status(500).send({ error: 'internal server error' })
  }
}

//   router.post("/delete-playlist", async (req, res) => {
async function deletePlaylistMPE(req, res) {
  try {
    const database = res.database
    const { 'X-SessionID': token } = getValuesFromParams(req.swagger.params)
    const { playlistId } = req.body
    const sessions = await getSessions(database)
    const id = findKey(sessions, sessionToken => sessionToken === token)
    if (!id) {
      return res.status(500).send({ error: 'token not valid' })
    }
    const { owner } = await findPlaylistBy(database, '_id', playlistId)
    if (owner !== id) {
      return res.status(500).send({ error: 'you are not authorized to delete this playlist' })
    }
    const { _id, token: userTokens } = await findUserBy('_id', id, database)
    const validToken = await isDeezerTokenValid(userTokens.deezer)
    if (!validToken) {
      return res.status(500).send({ error: 'your token deezer is invalid' })
    }
    await deletePlaylist(database, playlistId)
    const playlists = await findPlaylists(database)
    const idCorrespondance = await getAllUsers(database)
    return res.status(200).send(getPlaylistAvailable(playlists, id, idCorrespondance))
  } catch (err) {
    console.log('INTER ERROR', err.message)
    return res.status(500).send({ error: 'internal server error' })
  }
}

//   router.post("/get-tracks", async (req, res) => {
async function getTracks(req, res) {
  try {
    const database = res.database
    const { 'X-SessionID': token, playlistId } = getValuesFromParams(req.swagger.params)
    const sessions = await getSessions(database)
    const id = findKey(sessions, sessionToken => sessionToken === token)

    if (!id) {
      return res.status(500).send({ error: 'token not valid' })
    }
    const { token: userTokens } = await findUserBy('_id', id, database)

    if (!userTokens.deezer) {
      return res.status(500).send({ error: 'you dont have link your account to deezer' })
    }
    const validToken = await isDeezerTokenValid(userTokens.deezer)

    if (!validToken) {
      return res.status(500).send({ error: 'your token deezer is invalid' })
    }

    const tracks = await getPlaylistTracks(playlistId, userTokens.deezer)
    return res.status(200).send(getTracksData(tracks.tracks.data))
  } catch (err) {
    console.log('INTER ERROR', err.message)
    return res.status(500).send({ error: 'internal server error' })
  }
}

//   router.post("/add-track", async (req, res) => {
async function addTrack(req, res) {
  try {
    const database = res.database
    const { 'X-SessionID': token } = getValuesFromParams(req.swagger.params)
    const { playlistId, trackId } = req.body

    const sessions = await getSessions(database)
    const id = findKey(sessions, sessionToken => sessionToken === token)
    if (!id) {
      return res.status(500).send({ error: 'token not valid' })
    }
    const { token: userTokens } = await findUserBy('_id', id, database)
    if (!userTokens.deezer) {
      return res.status(500).send({ error: 'you dont have link your account to deezer' })
    }
    const validToken = await isDeezerTokenValid(userTokens.deezer)
    if (!validToken) {
      return res.status(500).send({ error: 'your token deezer is invalid' })
    }
    const { _id: InternalPlaylistId } = await findPlaylistBy(database, 'playlistId', playlistId)
    await addTrackToPlaylist(trackId, playlistId, userTokens.deezer)

    await updatePlaylist(database, InternalPlaylistId, {
      updatedAt: new Date().getTime()
    })

    const tracks = await getPlaylistTracks(playlistId, userTokens.deezer)
    return res.status(200).send(getTracksData(tracks.tracks.data))
  } catch (err) {
    console.log('INTER ERROR', err.message)
    return res.status(500).send({ error: 'internal server error' })
  }
}

//   router.post("/remove-track", async (req, res) => {

async function removeTrack(req, res) {
  try {
    const database = res.database
    const { 'X-SessionID': token } = getValuesFromParams(req.swagger.params)
    const { playlistId, trackId } = req.body

    const sessions = await getSessions(database)
    const id = findKey(sessions, sessionToken => sessionToken === token)
    if (!id) {
      return res.status(500).send({ error: 'token not valid' })
    }
    const { token: userTokens } = await findUserBy('_id', id, database)
    if (!userTokens.deezer) {
      return res.status(500).send({ error: 'you dont have link your account to deezer' })
    }
    const validToken = await isDeezerTokenValid(userTokens.deezer)
    if (!validToken) {
      return res.status(500).send({ error: 'your token deezer is invalid' })
    }
    const { _id: InternalPlaylistId } = await findPlaylistBy(database, 'playlistId', playlistId)
    await removeTrackToPlaylist(trackId, playlistId, userTokens.deezer)

    await updatePlaylist(database, InternalPlaylistId, {
      updatedAt: new Date().getTime()
    })

    const tracks = await getPlaylistTracks(playlistId, userTokens.deezer)
    return res.status(200).send(getTracksData(tracks.tracks.data))
  } catch (err) {
    console.log('INTER ERROR', err.message)
    return res.status(500).send({ error: 'internal server error' })
  }
}

const asyncWrapper = fct => (req, res) => {
  fct(req, res).then()
}

module.exports = {
  getPlaylists: asyncWrapper(getPlaylists),
  createPlaylist: asyncWrapper(createPlaylist),
  deletePlaylist: asyncWrapper(deletePlaylistMPE),
  updatePlaylistData: asyncWrapper(updateData),
  getPlaylistTracks: asyncWrapper(getTracks),
  addPlaylistTrack: asyncWrapper(addTrack),
  removePlaylistTrack: asyncWrapper(removeTrack)
}
