import fetchPaged from "./fetchPaged";

export default async function fetchPlaylists(token) {
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
