import React from "react";
import Tracks from "./Tracks";
import styles from "./styles.module.css";

export default function SelectedPlaylist({
    imageUri,
    name,
    tracks,
    playingTrack,
    onPlayTrack
}) {
    return (
        <div className={styles.container}>
            <img src={imageUri} alt="" className={styles.image} />
            <h1 className={styles.name}>{name}</h1>
            <Tracks
                tracks={tracks}
                playingTrack={playingTrack}
                className={styles.tracks}
                onPlayTrack={onPlayTrack}
            />
        </div>
    );
}
