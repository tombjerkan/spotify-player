import React from "react";
import classNames from "classnames";
import { ReactComponent as Speaker } from "../../speaker.svg";
import styles from "./styles.module.css";

export default function Tracks({
    tracks,
    playingTrack,
    onPlayTrack,
    className
}) {
    if (tracks.length === 0) {
        return (
            <div className={styles.empty}>
                There are no tracks in this playlist.
            </div>
        );
    }

    return (
        <table className={classNames(styles.table, className)}>
            <thead>
                <tr className={styles.headerRow}>
                    <th />
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Length</th>
                </tr>
            </thead>

            <tbody>
                {tracks.map(track => (
                    <tr
                        className={styles.trackRow}
                        onDoubleClick={() => onPlayTrack(track)}
                        key={track.id}
                    >
                        <td className={styles.isPlayingCell}>
                            {track.id === playingTrack && (
                                <Speaker className={styles.speaker} />
                            )}
                        </td>
                        <td>{track.title}</td>
                        <td>{track.artist}</td>
                        <td>{track.album}</td>
                        <td>{track.length}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
