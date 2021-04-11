import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../context/SpotifyContext";

export default function useSpotifyApi(endPoint, id) {
  const [episodeData, setEpisodeData] = useState([]);
  const [showName, setShowName] = useState("");
  const [showDesc, setShowDesc] = useState("");
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistTracks, setArtistTracks] = useState([]);
  const [trackNum, setTrackNum] = useState("");
  const [albumTracks, setAlbumTracks] = useState([]);
  const [albumData, setAlbumData] = useState({});
  const [albumUri, setAlbumUri] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistData, setPlaylistData] = useState({});

  const accessToken = useContext(TokenContext);

  console.log(id);

  // // returns information about shows/podcasts
  // useEffect(() => {
  //   if (!id) return;
  //   if (endPoint === "shows") {
  //     axios
  //       .get(`https://api.spotify.com/v1/shows/${id}`, {
  //         headers: {
  //           Authorization: "Bearer " + accessToken,
  //         },
  //       })
  //       .then((res) => {
  //         setEpisodeData(res.data.episodes.items);
  //         setShowName(res.data.name);
  //         setShowDesc(res.data.description);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  //   if (endPoint === "episodes") {
  //     axios
  //       .get(`https://api.spotify.com/v1/episodes/${id}`, {
  //         headers: {
  //           Authorization: "Bearer " + accessToken,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         setEpisodeData([res.data]);
  //         setShowName(res.data.show.name);
  //         setShowDesc(res.data.show.description);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  //   if (endPoint === "playlist") {
  //     axios
  //       .get(
  //         `https://api.spotify.com/v1/playlists/${id}/tracks?market=from_token`,
  //         {
  //           headers: {
  //             Authorization: "Bearer " + accessToken,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         setPlaylistTracks(res.data.items);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     axios
  //       .get(`https://api.spotify.com/v1/playlists/${id}`, {
  //         headers: {
  //           Authorization: "Bearer " + accessToken,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         setPlaylistData(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  //   if (endPoint === "artists") {
  //     axios
  //       .get(
  //         `https://api.spotify.com/v1/artists/${id}/top-tracks?market=from_token`,
  //         {
  //           headers: {
  //             Authorization: "Bearer " + accessToken,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         setArtistTracks(res.data.tracks);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     axios
  //       .get(`https://api.spotify.com/v1/artists/${id}/albums`, {
  //         headers: {
  //           Authorization: "Bearer " + accessToken,
  //         },
  //       })
  //       .then((res) => {
  //         setArtistAlbums(res.data.items);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  //   if (endPoint === "tracks") {
  //     axios
  //       .get(`https://api.spotify.com/v1/tracks/${id}`, {
  //         headers: {
  //           Authorization: "Bearer " + accessToken,
  //         },
  //       })
  //       .then((res) => {
  //         setTrackNum(res.data.track_number);
  //         setAlbumUri(res.data.album.uri);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  //   if (endPoint === "albums") {
  //     axios
  //       .get(`https://api.spotify.com/v1/albums/${id}`, {
  //         headers: {
  //           Authorization: "Bearer " + accessToken,
  //         },
  //       })
  //       .then((res) => {
  //         setAlbumData(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     axios
  //       .get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
  //         headers: {
  //           Authorization: "Bearer " + accessToken,
  //         },
  //       })
  //       .then((res) => {
  //         setAlbumTracks(res.data.items);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [accessToken, id, endPoint]);

  // returns information about shows/podcasts

  useEffect(() => {
    switch (endPoint) {
      case "shows":
        axios
          .get(`https://api.spotify.com/v1/shows/${id}`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((res) => {
            setEpisodeData(res.data.episodes.items);
            setShowName(res.data.name);
            setShowDesc(res.data.description);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "episodes":
        axios
          .get(`https://api.spotify.com/v1/episodes/${id}`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((res) => {
            setEpisodeData([res.data]);
            setShowName(res.data.show.name);
            setShowDesc(res.data.show.description);
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      // PLAYLIST INFORMATION
      case "playlist":
        axios
          .get(
            `https://api.spotify.com/v1/playlists/${id}/tracks?market=from_token`,
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          )
          .then((res) => {
            setPlaylistTracks(res.data.items);
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((res) => {
            console.log(res.data);
            setPlaylistData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "artists":
        axios
          .get(
            `https://api.spotify.com/v1/artists/${id}/top-tracks?market=from_token`,
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          )
          .then((res) => {
            setArtistTracks(res.data.tracks);
          })
          .catch((err) => {
            console.log(err);
          });

        axios
          .get(`https://api.spotify.com/v1/artists/${id}/albums`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((res) => {
            setArtistAlbums(res.data.items);
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "tracks":
        axios
          .get(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((res) => {
            setTrackNum(res.data.track_number);
            setAlbumUri(res.data.album.uri);
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "albums":
        axios
          .get(`https://api.spotify.com/v1/albums/${id}`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((res) => {
            setAlbumData(res.data);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          })
          .then((res) => {
            setAlbumTracks(res.data.items);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
        break;
    }
  }, [accessToken, id, endPoint]);

  return {
    episodeData,
    showName,
    showDesc,
    playlistTracks,
    playlistData,
    artistAlbums,
    artistTracks,
    trackNum,
    albumTracks,
    albumData,
    albumUri,
  };
}
