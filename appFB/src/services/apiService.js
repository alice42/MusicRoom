const apiUrl = "http://192.168.0.14:3001/api";
const user = "/user";
const login = "/log-in";
const signin = "/sign-in";

const basicFetch = async (method, url, config, data) => {
  if (method === "GET") {
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (err) {
      throw err;
    }
  } else if (method === "POST") {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      return result;
    } catch (err) {
      throw err;
    }
  }
};

export const loginClassic = async ({ email, password }) => {
  const url = `${apiUrl}${user}${login}?email=${email}&password=${password}`;
  try {
    const response = await basicFetch("GET", url);
    return response;
  } catch (err) {
    throw err;
  }
};

export const signinMethod = async ({ email, password }) => {
  const url = `${apiUrl}${user}${signin}`;
  try {
    const response = await basicFetch("POST", url, {}, { email, password });
    return response;
  } catch (err) {
    throw err;
  }
};
