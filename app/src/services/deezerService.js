import React from "react-native";

const {
  NativeModules: { DeezerManager: DeezerRNManager }
} = React;
class DeezerManager {
  getToken = cb => {
    DeezerRNManager.getToken(cb);
  };
  getUserId = cb => {
    DeezerRNManager.getUserId(cb);
  };
  getExpirationDate = cb => {
    DeezerRNManager.getExpirationDate(cb);
  };
  connect(dispatchToken) {
    return new Promise((resolve, reject) => {
      DeezerRNManager.connect(decision => {
        console.log("DECISION", decision);
        if (decision) {
          console.log("TOKEN INCOMING");
          this.getToken(dispatchToken);
          // this.getUserId(console.log);
          // this.getExpirationDate(console.log);
        }
        decision ? resolve(decision) : reject(decision);
      });
    });
  }

  checkSession(cb) {
    DeezerRNManager.isSessionValid(cb);
  }

  async playTrack(id) {
    return await DeezerRNManager.playTrack(id);
  }

  async getPlaylistTracks(id) {
    return await DeezerRNManager.getPlaylistTracks(id);
  }

  async getFavoritesTracks() {
    return await DeezerRNManager.getFavoritesTracks();
  }

  async getPlaylists() {
    return await DeezerRNManager.getPlaylists();
  }

  pause() {
    DeezerRNManager.pause();
  }

  play() {
    DeezerRNManager.play();
  }
}

export default new DeezerManager();
