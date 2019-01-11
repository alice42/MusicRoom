export const signUpAppCall = payload => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload && payload.email !== "") {
        const signUpData = {
          token: "token",
          user: {
            email: payload.email
          }
        };
        if (signUpData.token == "token") {
          resolve(signUpData);
        }
      } else {
        reject({ status: "Error" });
      }
    }, 1000);
  });
};
