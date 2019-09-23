import React from "react";
import classNames from "classnames";
import PlaylistItem from "./PlaylistItem";
import styles from "./styles.module.css";

export default function PlaylistSidebar({
    playlists,
    selectedPlaylist,
    playingPlaylist,
    onSelectPlaylist,
    className
}) {
    return (
        <ul className={classNames(styles.container, className)}>
            {playlists.map(playlist => (
                <li key={playlist.id}>
                    <PlaylistItem
                        title={playlist.name}
                        isSelected={playlist.id === selectedPlaylist}
                        isPlaying={playlist.id === playingPlaylist}
                        onClick={() => onSelectPlaylist(playlist.id)}
                    />
                </li>
            ))}
        </ul>
    );
}
