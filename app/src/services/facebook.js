export const signInWithFacebookAsync = async () => {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions
    } = await Expo.Facebook.logInWithReadPermissionsAsync("990282421183049", {
      permissions: ["public_profile"]
    });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      const result = await response.json();
      console.log("5", result);
      alert(`Logged in!, Hi ${result.name}!`);
      return result;
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};
