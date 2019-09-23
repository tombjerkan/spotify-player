import React from "react";
import Player from "./components/Player";
import useSpotifyPlayer from "./useSpotifyPlayer";

const apiToken = "enter token here";

export default function App() {
    const [player, state] = useSpotifyPlayer(apiToken);

    if (player === null || state === null) {
        return null;
    }

    return (
        <Player
            track={{
                title: state.track_window.current_track.name,
                artists: state.track_window.current_track.artists.map(
                    a => a.name
                ),
                imageUri: state.track_window.current_track.album.images[0].url
            }}
            isConnected={state !== null}
            isPlaying={!state.paused}
            canSkipToPrevious={!state.disallows.skipping_prev}
            canSkipToNext={!state.disallows.skipping_next}
            onPlay={() => player.resume()}
            onPause={() => player.pause()}
            onSkipToPrevious={() => player.previousTrack()}
            onSkipToNext={() => player.nextTrack()}
            positionMs={state.position}
            durationMs={state.duration}
            onSeek={ms => player.seek(ms)}
        />
    );
}
