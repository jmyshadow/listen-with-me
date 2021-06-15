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

//////////////////////////////////////////////////////////////////////
io.on("connection", (socket) => {
  socket.on("setUser", (user) => {
    socket.user = user;
  });

  socket.on("joinRoom", (room) => {
    // leave old room if already in a room
    if (socket.room) {
      const oldRoom = socket.room;
      socket.leave(oldRoom);
      socket.to(oldRoom).emit("otherUserLeft", socket.user);
    }
    // then join new room
    socket.room = room;
    socket.join(room);
    socket.to(room).emit("otherUserJoined", socket.id, socket.user);

    const clients = io.sockets.adapter.rooms.get(room);

    const isOnlyUser = clients.size < 2;
    io.in(room).emit("isOnlyUser", isOnlyUser);
    if (!isOnlyUser) {
      const firstUser = clients.entries().next().value[0];
      io.to(firstUser).emit("getPlaylist", socket.id);
    }
  });

  socket.on("imHereToo", (id) => {
    socket.to(id).emit("currentUsers", socket.user);
  });

  // // spotify functions

  socket.on("returnPlaylist", (reqUser, playlist, position, offset) => {
    io.to(reqUser).emit("updatePlaylist", playlist, position, offset);
  });

  socket.on("next", () => {
    socket.to(socket.room).emit("allNext");
  });

  socket.on("prev", () => {
    socket.to(socket.room).emit("allPrev");
  });

  socket.on("seek", (seek) => {
    socket.to(socket.room).emit("allSeek", seek);
  });

  socket.on("playItem", (newQueue, uris) => {
    socket.to(socket.room).emit("otherPlayItem", newQueue, uris);
  });

  socket.on("removedItem", (newQueue) => {
    socket.to(socket.room).emit("otherRemovedItem", newQueue);
  });

  socket.on("needsUpdate", (uris, index) => {
    socket.to(socket.room).emit("update", uris, index);
  });

  socket.on("addToQueue", (queue) => {
    socket.to(socket.room).emit("addToQueueRoom", queue);
  });
  socket.on("addToImmediateQueue", (queue, uris) => {
    socket.to(socket.room).emit("addToImmediateQueueRoom", queue, uris);
  });

  //chat functions
  socket.on("newMsg", (msg) => {
    io.to(socket.room).emit("getNewMsg", socket.user, msg);
  });

  socket.on("disconnect", () => {
    if (socket.room) {
      socket.leave(socket.room);
      socket.to(socket.room).emit("otherUserLeft", socket.user);
    }
  });
});

/////////////////////////////////////////////////

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
