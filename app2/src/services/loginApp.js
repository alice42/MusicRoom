// import { loginClassic } from "./apiService";
const loginData = {
  token: "token",
  user: {
    name: "UserName",
    email: "User@gmail.com"
  }
};

export const loginAppCall = ({ email, password }) => {
  // return loginClassic(email, password);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "User@gmail.com" && password === "user") {
        resolve(loginData);
      } else {
        if (email !== "User@gmail.com") {
          reject({ status: { email: "wrong email" } });
        } else if (password !== "user") {
          reject({ status: { password: "wrong password" } });
        } else {
          reject({ status: { unknow: "something's went wrong" } });
        }
      }
    }, 1000);
  });
};
