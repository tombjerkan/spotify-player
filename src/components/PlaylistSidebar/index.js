import React from "react";
import classNames from "classnames";
import PlaylistItem from "./PlaylistItem";
import styles from "./styles.module.css";

export default function PlaylistSidebar({
    playlists,
    selectedPlaylist,
    playingPlaylistId,
    onSelectPlaylist,
    className
}) {
    return (
        <ul className={classNames(styles.container, className)}>
            {playlists.map(playlist => (
                <li key={playlist.id}>
                    <PlaylistItem
                        title={playlist.name}
                        isSelected={
                            selectedPlaylist &&
                            playlist.id === selectedPlaylist.id
                        }
                        isPlaying={playlist.id === playingPlaylistId}
                        onClick={() => onSelectPlaylist(playlist)}
                    />
                </li>
            ))}
        </ul>
    );
}
