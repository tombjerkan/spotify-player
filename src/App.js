import React, { useState } from "react";
import PlaylistSidebar from "./components/PlaylistSidebar";
import Player from "./components/Player";
import getApiToken from "./getApiToken";
import useSpotifyPlayer from "./useSpotifyPlayer";
import usePlaylists from "./usePlaylists";
import styles from "./App.module.css";

export default function App() {
    const apiToken = getApiToken();

    const [player, state] = useSpotifyPlayer(apiToken);
    const [playlists, ,] = usePlaylists(apiToken);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    if (player === null || state === null) {
        return null;
    }

    const contextUriParts = state.context.uri.split(":");
    const playingPlaylistId =
        contextUriParts[contextUriParts.length - 2] === "playlist"
            ? contextUriParts[contextUriParts.length - 1]
            : null;

    return (
        <div className={styles.container}>
            <PlaylistSidebar
                playlists={playlists}
                selectedPlaylist={selectedPlaylist}
                playingPlaylist={playingPlaylistId}
                onSelectPlaylist={setSelectedPlaylist}
                className={styles.sidebar}
            />

            <Player
                track={{
                    title: state.track_window.current_track.name,
                    artists: state.track_window.current_track.artists.map(
                        a => a.name
                    ),
                    imageUri:
                        state.track_window.current_track.album.images[0].url
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
                className={styles.player}
            />
        </div>
    );
}
