require("dotenv").config();
const express = require("express");
const querystring = require("querystring");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");

const port = process.env.PORT || 3001;

const app = express();
app.use(express.static("public"));
app.use(cors());

const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];

app.get("/", (req, res) => {
  console.log("connected");
});

app.get("/login", (req, res) => {
  const authUrl = spotifyApi.createAuthorizeURL(scopes);
  res.json(authUrl);
});

app.post("/login", (req, res) => {
  console.log("post");
});

app.get("/callback", (req, res) => {
  const code = req.query.code;
  console.log(code);
  console.log(req.query);
  res.send(req.query.code);
});

app.get("/home", (req, res) => {
  res.send(req.query.code);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
