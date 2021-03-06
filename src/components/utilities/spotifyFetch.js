import axios from "axios";

// show info
export async function shows(id, accessToken) {
  const { episodes, showName, showDesc } = await axios
    .get(`https://api.spotify.com/v1/shows/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      const showName = res.data.name;
      const showDesc = res.data.description;
      const episodes = res.data.episodes.items;
      episodes.forEach((episode, index) => {
        episodes[index].artists = [["", ""]];
        episodes[index].album = [showName];
        episodes[index].album.name = showName;
      });
      return { episodes, showName, showDesc };
    })
    .catch((err) => {
      console.log(err);
    });
  return { episodes, showName, showDesc };
}

//episode info
export async function episodes(id, accessToken) {
  const episodeData = await axios
    .get(`https://api.spotify.com/v1/episodes/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      const episodeData = [res.data];
      episodeData.forEach((episode, index) => {
        episodeData[index].artists = [["", ""]];
        episodeData[index].album = episode.show;
      });
      return episodeData;
    })
    .catch((err) => {
      console.log(err);
    });
  return episodeData;
}

export async function expandedEpisodes(id, accessToken) {
  const showId = await axios
    .get(`https://api.spotify.com/v1/episodes/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      const showId = res.data.show.id;
      return showId;
    })
    .catch((err) => {
      console.log(err);
    });
  return showId;
}

// playlist info
export async function playlists(id, accessToken) {
  const playlistTracks = await axios
    .get(
      `https://api.spotify.com/v1/playlists/${id}/tracks?market=from_token`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
    .then((res) => {
      const addToQueue = res.data.items;
      addToQueue.forEach((item, index) => {
        addToQueue[index] = item.track;
      });
      return addToQueue;
    })
    .catch((err) => {
      console.log(err);
    });
  const playlistData = await axios
    .get(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return { playlistTracks, playlistData };
}

export async function artists(id, accessToken) {
  const artistTracks = await axios
    .get(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=from_token`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
    .then((res) => {
      return res.data.tracks;
    })
    .catch((err) => {
      console.log(err);
    });
  const artistAlbums = await axios
    .get(`https://api.spotify.com/v1/artists/${id}/albums?market=from_token`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      //sometimes spotify returns duplicate albums even with locale string
      const names = [];
      const albums = res.data.items.filter((item) => {
        if (names.includes(item.name)) return 0;
        else {
          names.push(item.name);
          return 1;
        }
      });

      return albums;
    })
    .catch((err) => {
      console.log(err);
    });
  const artistData = await axios
    .get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return { artistTracks, artistAlbums, artistData };
}

export async function track(id, accessToken) {
  const { image, track, album, artist } = await axios
    .get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      const image = res.data.album.images[0].url;
      const track = res.data.name;
      const album = res.data.album.name;
      const artist = res.data.artists[0].name;
      return { image, track, album, artist };
    })
    .catch((err) => {
      console.log(err);
    });
  return { image, track, album, artist };
}

export async function tracks(id, accessToken) {
  const { trackNum, albumId } = await axios
    .get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      const trackNum = res.data.track_number;
      const albumId = res.data.album.id;
      return { trackNum, albumId };
    })
    .catch((err) => {
      console.log(err);
    });

  const { albumTracks, albumImage } = await axios
    .get(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      console.log(res.data);
      const albumTracks = res.data.tracks.items;
      const albumName = res.data.name;
      const albumImage = res.data.images[0].url;
      const albumUri = res.data.uri;
      albumTracks.forEach((track) => {
        track.album = [albumName];
        track.album.name = albumName;
        track.album.uri = albumUri;
      });
      return { albumTracks, albumImage };
    })
    .catch((err) => {
      console.log(err);
    });
  return { trackNum, albumTracks, albumImage };
}

export async function albums(id, accessToken) {
  const { albumTracks, albumImage } = await axios
    .get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      const albumTracks = res.data.tracks.items;
      const albumName = res.data.name;
      const albumImage = res.data.images[0].url;
      const albumUri = res.data.uri;
      albumTracks.forEach((track) => {
        track.album = [albumName];
        track.album.name = albumName;
        track.album.uri = albumUri;
      });
      return { albumTracks, albumImage };
    })
    .catch((err) => {
      console.log(err);
    });
  return { albumTracks, albumImage };
}

export async function myPlaylists(accessToken) {
  const playlists = await axios
    .get("https://api.spotify.com/v1/me/playlists?limit=50", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => res.data.items)
    .catch((err) => console.log(err));

  return playlists;
}

// utility functions

export async function getMe(accessToken) {
  const id = await axios
    .get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      return res.data.id;
    })
    .catch((err) => {
      console.log(err);
    });
  return id;
}

export function playNow(uris, accessToken, position = 0, offset = 0) {
  axios({
    method: "put",
    url: `https://api.spotify.com/v1/me/player/play`,
    data: {
      uris: uris,
      offset: {
        position: offset,
      },
      position_ms: position,
    },
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
}

export function queueSong(uri, accessToken) {
  axios({
    method: "post",
    url: "https://api.spotify.com/v1/me/player/queue",
    params: {
      uri: uri,
    },
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((data) => {
      console.log(data);
      axios
        .get(
          `https://api.spotify.com/v1/me/player`,

          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((data) => {
          console.log(data);
        });
    })
    .catch((err) => console.log(err));
}

export async function devices(accessToken) {
  const devices = await axios
    .get("https://api.spotify.com/v1/me/player/devices", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      return res.data.devices;
    })
    .catch((err) => {
      console.log(err);
    });
  return devices;
}

export function setDevice(deviceId, accessToken) {
  axios({
    method: "put",
    url: `https://api.spotify.com/v1/me/player`,
    data: {
      device_ids: [deviceId],
    },
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  }).catch((err) => {
    console.log(err);
  });
}
