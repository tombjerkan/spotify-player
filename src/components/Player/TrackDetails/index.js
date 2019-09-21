import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

export default function TrackDetails({ title, artists, imageUri, className }) {
    const artistString = artists.join(", ");

    return (
        <div className={classNames(styles.container, className)}>
            <img src={imageUri} className={styles.image} />
            <div className={styles.title}>{title}</div>
            <div className={styles.artists}>{artistString}</div>
        </div>
    );
}
