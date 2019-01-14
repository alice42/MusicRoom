const loginData = {
  token: "token",
  user: {
    name: "UserName",
    email: "user@gmail.com"
  }
};

export const loginAppCall = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email == "user@gmail.com") {
        resolve(loginData);
      } else {
        reject({ status: "wrong email or password" });
      }
    }, 1000);
  });
};
