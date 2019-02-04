const mailFromOptions = '"MusicRoom" <no-reply@musicroom.io>';

const mailAccountValid = user => {
  return {
    from: mailFromOptions,
    to: `${user.email}`,
    subject: "MusicRoom - welcome!",
    html: `Hello ${user.email}, your account is now active`
  };
};

const mailNewPassword = user => {
  return {
    from: mailFromOptions,
    to: `${user.email}`,
    subject: "MusicRoom - welcome back!",
    html: `Hello ${user.email}, this is your new passord: ${
      user.password
    }, dont forget to change it quickly`
  };
};

const mailRecover = user => {
  const validationUrl = `http://192.168.0.14:3001/api/user/new-password?token=${
    user.tokenPassword
  }`;
  return {
    from: mailFromOptions,
    to: `${user.email}`,
    subject: "MusicRoom - we missed you!",
    html: `Hello ${
      user.email
    }, if you asked a new passord, click on <a href="${validationUrl}">this link</a>, or copy this link in your browser: ${validationUrl}`
  };
};

const mailWelcome = user => {
  const validationUrl = `http://192.168.0.14:3001/api/user/account-validation?token=${
    user.tokenValidation
  }`;
  return {
    from: mailFromOptions,
    to: `${user.email}`,
    subject: `MusicRoom - hello!`,
    html: `Hello ${
      user.email
    }, to confirm you sign in click on <a href="${validationUrl}">this link</a>, or copy this link in your browser: ${validationUrl}`
  };
};

const sendEmail = (mailOptions, mail) =>
  new Promise((resolve, reject) => {
    // console.log("sending mail to", mailOptions.to, ".", mailOptions.subject);
    mail(mailOptions, (error, data) => {
      if (error) {
        reject(error);
      } else {
        // console.log("mail sent!");
        resolve(data);
      }
    });
  });

module.exports = {
  mailAccountValid,
  mailNewPassword,
  mailRecover,
  mailWelcome,
  sendEmail
};
