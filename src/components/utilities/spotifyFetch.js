import axios from "axios";

// show info
export async function shows(id, accessToken) {
  const addToQueue = await axios
    .get(`https://api.spotify.com/v1/shows/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      const showName = res.data.name;
      // const showDesc = res.data.description;
      const addToQueue = res.data.episodes.items;
      addToQueue.forEach((episode, index) => {
        addToQueue[index].artists = [["", ""]];
        addToQueue[index].album = [showName];
        addToQueue[index].album.name = showName;
      });
      return addToQueue;
    })
    .catch((err) => {
      console.log(err);
    });
  return addToQueue;
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
  // const playlistData = await axios
  //   .get(`https://api.spotify.com/v1/playlists/${id}`, {
  //     headers: {
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   })
  //   .then((res) => {
  //     return res.data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  return playlistTracks;
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
    .get(`https://api.spotify.com/v1/artists/${id}/albums`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      return res.data.items;
    })
    .catch((err) => {
      console.log(err);
    });
  return await { artistTracks, artistAlbums };
}

export async function tracks(id, accessToken) {
  const { trackNum, albumUri } = await axios
    .get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      const trackNum = res.data.track_number;
      const albumUri = res.data.album.uri;
      return { trackNum, albumUri };
    })
    .catch((err) => {
      console.log(err);
    });
  return { trackNum, albumUri };
}

export async function albums(id, accessToken) {
  const addToQueue = await axios
    .get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      const addToQueue = res.data.tracks.items;
      const albumName = res.data.name;
      addToQueue.forEach((track) => {
        track.album = [albumName];
        track.album.name = albumName;
      });
      return addToQueue;
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
  return addToQueue;
}

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
