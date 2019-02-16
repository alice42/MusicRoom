export const user = {
  username: "John Doe",
  email: "JohnDoe@mail.com",
  avatarUri: "",
  tags: ["test"],
  friends: [
    { name: "toto", email: "toto@mail.com" },
    { name: "titi", email: "titi@mail.com" }
  ],
  playlists: [
    {
      name: "Playlist1",
      privacy: "public",
      tracks: [
        { name: "tracks1.mp3", artist: "Toto" },
        { name: "tracks2.mp3", artist: "Toto" },
        { name: "tracks3.mp3", artist: "Toto" }
      ],
      allowed: [{}]
    },
    {
      name: "Playlist2",
      privacy: "private",
      tracks: [
        { name: "tracks1.mp3", artist: "Titi" },
        { name: "tracks2.mp3", artist: "Titi" },
        { name: "tracks3.mp3", artist: "Titi" }
      ],
      allowed: [{ name: "titi", email: "titi@mail.com", editRight: false }]
    }
  ],
  events: [
    {
      name: "Event1",
      privacy: "public",
      date: " 2/12/2019, 5:02:45 PM"
      // tracks: ["tracks1.mp3", "tracks2.mp3", "tracks3.mp3"]
    },
    {
      name: "Event2",
      privacy: "private",
      date: " 2/12/2019, 5:02:45 PM"
      // tracks: ["tracks1.mp3", "tracks2.mp3", "tracks3.mp3"]
    }
  ]
};
