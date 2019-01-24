const apiUrl = "http://192.168.0.14:3001/api";
const user = "/user";
const login = "/login";

const basicFetch = async (method, url, config, data) => {
  console.log("trying to call", url);
  if (method === "GET") {
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (err) {
      throw err;
    }
    // return fetch(url, { method }).then(response => {
    //   return response.json();
    // });
    //   .then(myJson => {
    //     return myJson;
    //   });
  }
};

export const loginClassic = async (userArg, passwordArg) => {
  const url = `${apiUrl}${user}${login}?user=${userArg}&password=${passwordArg}`;
  // const url = "https://randomuser.me/api/";
  console.log("trying to call", url);
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
  // console.log("url", url);
  // try {
  //   let response = await fetch(url);
  //   let responseJson = await response.json();
  //   return responseJson;
  // } catch (error) {
  //   console.error(error);
  // }
  //   return fetch(url);
  // return basicFetch("GET", url);
};
