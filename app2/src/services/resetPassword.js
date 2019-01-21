const loginData = {
  token: "token",
  email: "user@gmail.com"
};

export const ResetPasswordCall = email => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email) {
        reject({ status: "Required field" });
      } else if (email !== "User@gmail.com") {
        reject({ status: "Wrong email" });
      } else if (email === "User@gmail.com") {
        resolve(loginData);
      }
    }, 1000);
  });
};
