import React, { useState } from "react";
import PlaylistSidebar from "./components/PlaylistSidebar";
import SelectedPlaylist from "./components/SelectedPlaylist";
import Player from "./components/Player";
import getApiToken from "./spotify/getApiToken";
import useSpotifyPlayer from "./spotify/useSpotifyPlayer";
import usePlaylists from "./spotify/usePlaylists";
import usePlaylistTracks from "./spotify/usePlaylistTracks";
import convertMillisecondsToString from "./convertMillisecondsToString";
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

    let playingPlaylist = null;
    if (state.context.uri) {
        const contextUriParts = state.context.uri.split(":");
        const playingPlaylistId =
            contextUriParts[contextUriParts.length - 2] === "playlist"
                ? contextUriParts[contextUriParts.length - 1]
                : null;

        playingPlaylist = playlists.find(
            playlist => playlist.id === playingPlaylistId
        );
    }

    return (
        <div className={styles.container}>
            <PlaylistSidebar
                playlists={playlists}
                selectedPlaylist={selectedPlaylist}
                playingPlaylist={playingPlaylist}
                onSelectPlaylist={setSelectedPlaylist}
                className={styles.sidebar}
            />

            {selectedPlaylist && selectedPlaylistTracks && (
                <SelectedPlaylist
                    imageUri={selectedPlaylist.images[0].url}
                    name={selectedPlaylist.name}
                    tracks={selectedPlaylistTracks.map(track => ({
                        uri: track.track.uri,
                        id: track.track.id,
                        title: track.track.name,
                        artist: track.track.artists
                            .map(artist => artist.name)
                            .join(", "),
                        album: track.track.album.name,
                        length: convertMillisecondsToString(
                            track.track.duration_ms
                        )
                    }))}
                    playingTrack={
                        state.track_window.current_track.linked_from.id ||
                        state.track_window.current_track.id
                    }
                    onPlayTrack={player.playTrack}
                    className={styles.selectedPlaylist}
                />
            )}

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
