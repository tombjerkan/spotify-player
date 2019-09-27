import axios from "axios";

export async function fetchPlaylists(token) {
    const playlists = await fetchPaged(
        "https://api.spotify.com/v1/me/playlists?limit=50",
        token
    );

    return playlists.map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        imageUrl: playlist.images.length > 0 && playlist.images[0].url,
        tracksHref: playlist.tracks.href
    }));
}

export async function fetchPlaylistTracks(playlist, token) {
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

async function fetchPaged(url, token) {
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.next) {
        const nextPageItems = await fetchPaged(response.data.next, token);
        return [...response.data.items, ...nextPageItems];
    } else {
        return response.data.items;
    }
}
