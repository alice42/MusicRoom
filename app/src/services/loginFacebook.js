import { Facebook } from "expo";

export const loginFacebookCall = async () => {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions
    } = await Facebook.logInWithReadPermissionsAsync("990282421183049", {
      permissions: ["public_profile"]
    });
    if (type === "success") {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      const result = await response.json();
      alert(`Logged in!, Hi ${result.name}!`);
      return result;
    } else {
      return { cancelled: true };
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};
