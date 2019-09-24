import useFetchAll from "./useFetchAll";

export default function usePlaylistTracks(playlist, token) {
    return useFetchAll(playlist ? playlist.tracks.href : "", token, []);
}
