export const playlists = [
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
  },
  {
    name: "Playlist3",
    privacy: "private",
    tracks: [
      { name: "tracks1.mp3", artist: "Tata" },
      { name: "tracks2.mp3", artist: "Tata" },
      { name: "tracks3.mp3", artist: "Tata" }
    ],
    allowed: [
      { name: "titi", email: "titi@mail.com", editRight: false },
      { name: "titi", email: "titi@mail.com", editRight: true }
    ]
  }
];
