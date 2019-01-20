import { loginClassic } from "./apiService";
const loginData = {
  token: "token",
  user: {
    name: "UserName",
    email: "user@gmail.com"
  }
};

export const loginAppCall = ({ email, password }) => {
  return loginClassic(email, password);

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (email === "user@gmail.com" && password === "user") {
  //       resolve(loginData);
  //     } else {
  //       if (email !== "user@gmail.com") {
  //         reject({ status: { email: "wrong email" } });
  //       } else if (password !== "user") {
  //         reject({ status: { password: "wrong password" } });
  //       } else {
  //         reject({ status: { unknow: "something's went wrong" } });
  //       }
  //     }
  //   }, 1000);
  // });
};
