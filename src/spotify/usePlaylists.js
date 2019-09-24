import useFetchAll from "./useFetchAll";

export default function usePlaylists(token) {
    const [playlists, isLoading, error] = useFetchAll(
        "https://api.spotify.com/v1/me/playlists?limit=50",
        token,
        []
    );

    const transformedPlaylists = playlists.map(transformPlaylist);
    return [transformedPlaylists, isLoading, error];
}

function transformPlaylist(apiPlaylist) {
    return {
        id: apiPlaylist.id,
        name: apiPlaylist.name,
        imageUrl: apiPlaylist.images.length > 0 && apiPlaylist.images[0].url,
        tracksHref: apiPlaylist.tracks.href
    };
}
