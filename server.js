require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 3001;

app.use(cors({ credentials: true }));
app.use(express.static("/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post("/getAuth", (req, res) => {
  const code = req.body.code;

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        expiresIn: data.body["expires_in"],
        accessToken: data.body["access_token"],
        refreshToken: data.body["refresh_token"],
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/refresh", (req, res) => {
  // const refreshToken = req.body.refreshToken;
  //  spotifyApi.setRefreshToken(refreshToken)
  /*  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });*/

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

//////////////////////////////////////////////////////////////////////

io.on("connection", (socket) => {
  socket.on("userJoined", (user) => {
    console.log(user + " joined");
    socket.broadcast.emit("otherUserJoined", user);
  });

  socket.on("newMsg", (user, msg) => {
    console.log(user, msg);
    socket.broadcast.emit("getNewMsg", user, msg);
  });
});

/////////////////////////////////////////////////

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
