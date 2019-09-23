import React from "react";
import PlaylistItem from "./PlaylistItem";
import styles from "./styles.module.css";

export default function PlaylistSidebar({
    playlists,
    selectedPlaylist,
    playingPlaylist,
    onSelectPlaylist
}) {
    return (
        <ul className={styles.container}>
            {playlists.map(playlist => (
                <li key={playlist.id}>
                    <PlaylistItem
                        title={playlist.title}
                        isSelected={playlist.id === selectedPlaylist}
                        isPlaying={playlist.id === playingPlaylist}
                        onClick={() => onSelectPlaylist(playlist.id)}
                    />
                </li>
            ))}
        </ul>
    );
}
