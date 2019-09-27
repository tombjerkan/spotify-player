import React, { useState, useEffect } from "react";
import PlaylistSidebar from "./components/PlaylistSidebar";
import SelectedPlaylist from "./components/SelectedPlaylist";
import Player from "./components/Player";
import getApiToken from "./spotify/getApiToken";
import useSpotifyPlayer from "./spotify/useSpotifyPlayer";
import fetchPlaylists from "./spotify/fetchPlaylists";
import fetchPlaylistTracks from "./spotify/fetchPlaylistTracks";
import styles from "./App.module.css";

export default function App() {
    const apiToken = getApiToken();

    const [player, state] = useSpotifyPlayer(apiToken);
    const playlists = usePlaylists(apiToken);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const selectedPlaylistTracks = usePlaylistTracks(
        selectedPlaylist,
        apiToken
    );

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
                    playingTrack={state.currentTrack.id}
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

function usePlaylists(token) {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetchPlaylists(token).then(setPlaylists);
    }, [token]);

    return playlists;
}

function usePlaylistTracks(playlist, token) {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetchPlaylistTracks(playlist, token).then(setTracks);
    }, [playlist, token]);

    return tracks;
}
