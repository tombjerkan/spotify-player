import React, { useRef } from "react";
import styles from "./styles.module.css";

export default function SeekBar({ positionMs, durationMs, onSeek }) {
    return (
        <div className={styles.container}>
            <div className={styles.position}>{toString(positionMs)}</div>

            <Bar
                positionMs={positionMs}
                durationMs={durationMs}
                onSeek={onSeek}
            />

            <div className={styles.duration}>{toString(durationMs)}</div>
        </div>
    );
}

function Bar({ positionMs, durationMs, onSeek }) {
    const durationBarRef = useRef(null);

    function handleClick(event) {
        if (durationBarRef.current === null) {
            return;
        }

        const parentLeft = durationBarRef.current.offsetParent
            ? durationBarRef.current.offsetParent.offsetLeft
            : 0;

        const clickX =
            event.pageX - durationBarRef.current.offsetLeft - parentLeft;

        const millisecondsToSeek =
            (clickX / durationBarRef.current.offsetWidth) * durationMs;

        onSeek(millisecondsToSeek);
    }

    const positionAsPercentage = (positionMs / durationMs) * 100;

    return (
        <div
            className={styles.durationBar}
            onClick={handleClick}
            ref={durationBarRef}
        >
            <div
                style={{ width: `${positionAsPercentage}%` }}
                className={styles.positionBar}
            />
        </div>
    );
}

function toString(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutePart = Math.floor(totalSeconds / 60);
    const secondPart = totalSeconds % 60;

    return `${minutePart}:${secondPart.toString().padStart(2, "0")}`;
}
