import useFetchAll from "./useFetchAll";

export default function usePlaylistTracks(playlist, token) {
    const [tracks, isLoading, error] = useFetchAll(
        playlist ? playlist.tracksHref : "",
        token,
        []
    );

    if (!tracks) {
        return [[], false, null];
    }

    const transformedTracks = tracks.map(transformTrack);
    return [transformedTracks, isLoading, error];
}

function transformTrack(apiTrack) {
    return {
        id: apiTrack.track.id,
        name: apiTrack.track.name,
        artist: apiTrack.track.artists.map(artist => artist.name).join(", "),
        album: apiTrack.track.album.name,
        duration: apiTrack.track.duration_ms
    };
}
