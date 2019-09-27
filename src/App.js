import React, { useState, useEffect } from "react";
import PlaylistSidebar from "./components/PlaylistSidebar";
import SelectedPlaylist from "./components/SelectedPlaylist";
import Player from "./components/Player";
import { getApiToken } from "./spotify/auth";
import { connect } from "./spotify/player";
import { fetchPlaylists, fetchPlaylistTracks } from "./spotify/api";
import styles from "./App.module.css";

export default function App() {
    const apiToken = getApiToken();

    const [player, state] = usePlayer(apiToken);
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

function usePlayer(token) {
    const [player, setPlayer] = useState(null);
    const [state, setState] = useState(null);

    if (player === null) {
        connect(
            "Tom's Spotify Player",
            token,
            setPlayer,
            setState
        );
    }

    return [player, state];
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
