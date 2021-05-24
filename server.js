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
const path = require("path");

const port = process.env.PORT || 3000;

app.use(cors({ credentials: true }));
app.use(express.static(path.join(__dirname, "build")));

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

app.get("/login", (req, res) => {
  const authUrl = spotifyApi.createAuthorizeURL(scopes);
  res.json(authUrl);
});

app.get("/callback", function (req, res) {
  res.redirect("/?" + req.url.substr(10));
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
  // //  spotifyApi.setRefreshToken(refreshToken)
  // const spotifyApi = new SpotifyWebApi({
  //   redirectUri: process.env.REDIRECT_URI,
  //   clientId: process.env.CLIENT_ID,
  //   clientSecret: process.env.CLIENT_SECRET,
  //   refreshToken,
  // });
  spotifyApi.setRefreshToken(req.body.refreshToken);
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

app.get("/room/:room", (req, res) => {
  console.log("the room is", req.params.room);
  res.sendStatus(200);
});

//////////////////////////////////////////////////////////////////////
const users = {};
io.on("connection", (socket) => {
  socket.on("userJoined", (user) => {
    socket.broadcast.emit("otherUserJoined", user);
    users[socket.id] = user;

    const keys = Object.keys(users);
    socket.emit("isOnlyUser", keys.length < 2);
  });

  // // spotify functions

  socket.on("needPlaylist", () => {
    const keys = Object.keys(users);
    io.to(keys[0]).emit("getPlaylist");
  });

  socket.on("returnPlaylist", (playlist, position) => {
    const keys = Object.keys(users);
    io.to(keys[keys.length - 1]).emit("updatePlaylist", playlist, position);
  });

  socket.on("next", () => {
    socket.broadcast.emit("allNext");
  });

  socket.on("prev", () => {
    socket.broadcast.emit("allPrev");
  });

  socket.on("seek", (seek) => {
    socket.broadcast.emit("allSeek", seek);
  });

  socket.on("playItem", (newQueue, uris) => {
    socket.broadcast.emit("otherPlayItem", newQueue, uris);
  });

  socket.on("removedItem", (newQueue) => {
    socket.broadcast.emit("otherRemovedItem", newQueue);
  });

  //chat functions
  socket.on("newMsg", (user, msg) => {
    socket.broadcast.emit("getNewMsg", user, msg);
  });

  socket.on("songQueued", (song) => {
    socket.broadcast.emit("queueSong", song);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    const keys = Object.keys(users);
    socket.broadcast.emit("isOnlyUser", keys.length < 2);
  });
});

/////////////////////////////////////////////////

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
