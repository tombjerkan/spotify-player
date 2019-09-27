import fetchPaged from "./fetchPaged";

export default async function fetchPlaylistTracks(playlist, token) {
    if (playlist === null) {
        return [];
    }

    const tracks = await fetchPaged(
        `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
        token
    );

    return tracks.map(track => ({
        id: track.track.id,
        name: track.track.name,
        artist: track.track.artists.map(artist => artist.name).join(", "),
        album: track.track.album.name,
        duration: track.track.duration_ms
    }));
}
