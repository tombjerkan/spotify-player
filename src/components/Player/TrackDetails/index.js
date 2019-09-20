import React from "react";
import styles from "./styles.module.css";

export default function TrackDetails({ title, artists, imageUri }) {
    const artistString = artists.join(", ");

    return (
        <div className={styles.container}>
            <img src={imageUri} className={styles.image} />
            <div className={styles.title}>{title}</div>
            <div className={styles.artists}>{artistString}</div>
        </div>
    );
}
