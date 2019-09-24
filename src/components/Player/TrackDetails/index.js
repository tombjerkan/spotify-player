import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

export default function TrackDetails({ track, className }) {
    return (
        <div className={classNames(styles.container, className)}>
            <img src={track.imageUrl} alt="" className={styles.image} />
            <div className={styles.title}>{track.name}</div>
            <div className={styles.artists}>{track.artist}</div>
        </div>
    );
}
