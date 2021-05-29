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
  const addToQueue = await axios
    .get(`https://api.spotify.com/v1/episodes/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      const episodeData = [res.data];
      // const showName = res.data.show.name;
      // const showDesc = res.data.show.description;
      const addToQueue = episodeData;
      addToQueue.forEach((episode, index) => {
        addToQueue[index].artists = [["", ""]];
        addToQueue[index].album = episode.show;
      });
      return episodeData;
    })
    .catch((err) => {
      console.log(err);
    });
  return addToQueue;
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
      const albumTracks = res.data.tracks.items;
      const albumName = res.data.name;
      const albumImage = res.data.images[0].url;
      albumTracks.forEach((track) => {
        track.album = [albumName];
        track.album.name = albumName;
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
      albumTracks.forEach((track) => {
        track.album = [albumName];
        track.album.name = albumName;
      });
      return { albumTracks, albumImage };
    })
    .catch((err) => {
      console.log(err);
    });
  // const albumTracks = await axios
  //   .get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
  //     headers: {
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   })
  //   .then((res) => {
  //     return res.data.items;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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

export function playNow(uris, accessToken, position = 0) {
  axios({
    method: "put",
    url: `https://api.spotify.com/v1/me/player/play`,
    data: {
      uris: uris,
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
  });
}
