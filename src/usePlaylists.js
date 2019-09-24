import useFetchAll from "./useFetchAll";

export default function usePlaylists(token) {
    return useFetchAll(
        "https://api.spotify.com/v1/me/playlists?limit=50",
        token,
        []
    );
}
