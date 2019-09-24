import React, { useState } from "react";
import PlaylistSidebar from "./components/PlaylistSidebar";
import SelectedPlaylist from "./components/SelectedPlaylist";
import Player from "./components/Player";
import getApiToken from "./spotify/getApiToken";
import useSpotifyPlayer from "./spotify/useSpotifyPlayer";
import usePlaylists from "./spotify/usePlaylists";
import usePlaylistTracks from "./spotify/usePlaylistTracks";
import styles from "./App.module.css";

export default function App() {
    const apiToken = getApiToken();

    const [player, state] = useSpotifyPlayer(apiToken);
    const [playlists, ,] = usePlaylists(apiToken);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [
        selectedPlaylistTracks,
        setSelectedPlaylistTracks
    ] = usePlaylistTracks(selectedPlaylist, apiToken);

    if (player === null || state === null) {
        return null;
    }

    return (
        <div className={styles.container}>
            <PlaylistSidebar
                playlists={playlists}
                selectedPlaylist={selectedPlaylist}
                playingPlaylistId={state.currentPlaylistId}
                onSelectPlaylist={setSelectedPlaylist}
                className={styles.sidebar}
            />

            {selectedPlaylist && selectedPlaylistTracks.length > 0 && (
                <SelectedPlaylist
                    imageUri={selectedPlaylist.imageUrl}
                    name={selectedPlaylist.name}
                    tracks={selectedPlaylistTracks}
                    playingTrack={
                        state.track_window.current_track.linked_from.id ||
                        state.track_window.current_track.id
                    }
                    onPlayTrack={player.playTrack}
                    className={styles.selectedPlaylist}
                />
            )}

            <Player
                track={state.currentTrack}
                isConnected={state !== null}
                isPlaying={state.isPlaying}
                canSkipToPrevious={state.canSkipToPrevious}
                canSkipToNext={state.canSkipToNext}
                onPlay={player.resume}
                onPause={player.pause}
                onSkipToPrevious={player.skipToPreviousTrack}
                onSkipToNext={player.skipToNextTrack}
                positionMs={state.position}
                durationMs={state.duration}
                onSeek={player.seek}
                className={styles.player}
            />
        </div>
    );
}
