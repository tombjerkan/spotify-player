import React from "react";
import classNames from "classnames";
import Tracks from "./Tracks";
import styles from "./styles.module.css";

export default function SelectedPlaylist({
    imageUri,
    name,
    tracks,
    playingTrack,
    onPlayTrack,
    className
}) {
    return (
        <div className={classNames(styles.container, className)}>
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
