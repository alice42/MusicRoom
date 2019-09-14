const searchDeezer = query => {
  // const appToken = musicRoomFacebookAppToken;
  const url = `https://api.deezer.com/search?q=${query}&limit=100`;
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};

const getValuesFromParams = obj => {
  const copy = { ...obj };
  for (var key in copy) {
    copy[key] = copy[key].value;
  }
  return copy;
};

async function search(req, res) {
  try {
    const { query } = getValuesFromParams(req.swagger.params);
    const results = await searchDeezer(query);
    return res.status(200).send({
      message: `Track ${query} received on /alice/search`,
      query,
      results
    });
  } catch (err) {
    console.log("INTER ERROR", err);
    return res.status(500).send({ error: "internal server error" });
  }
}

const asyncWrapper = fct => (req, res) => {
  fct(req, res).then();
};

module.exports = {
  search: asyncWrapper(search)
};
