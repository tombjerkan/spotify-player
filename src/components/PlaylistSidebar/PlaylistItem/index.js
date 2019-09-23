import React from "react";
import classNames from "classnames";
import { ReactComponent as Speaker } from "./speaker.svg";
import styles from "./styles.module.css";

export default function PlaylistItem({ title, isSelected, isPlaying }) {
    return (
        <div
            className={classNames(
                styles.container,
                isSelected && styles.selected
            )}
        >
            <span className={styles.title}>{title}</span>

            {isPlaying && <Speaker className={styles.speaker} />}
        </div>
    );
}
