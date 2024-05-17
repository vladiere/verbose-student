const clientId = '4871b59efd5449328229b5e6b51bc393';
const redirectUrl = "http://localhost:5173";

// need to modify the scope later
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private",
];

export const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
  "%20"
)}&response_type=code&show_dialog=true`;
