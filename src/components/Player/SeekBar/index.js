import React, { useRef } from "react";
import classNames from "classnames";
import convertMillisecondsToString from "../../../convertMillisecondsToString";
import styles from "./styles.module.css";

export default function SeekBar({ positionMs, durationMs, onSeek, className }) {
    return (
        <div className={classNames(styles.container, className)}>
            <div className={styles.position}>
                {convertMillisecondsToString(positionMs)}
            </div>

            <Bar
                positionMs={positionMs}
                durationMs={durationMs}
                onSeek={onSeek}
            />

            <div className={styles.duration}>
                {convertMillisecondsToString(durationMs)}
            </div>
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
