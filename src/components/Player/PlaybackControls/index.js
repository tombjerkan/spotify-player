import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";
import { ReactComponent as Play } from "./Play.svg";
import { ReactComponent as Pause } from "./Pause.svg";
import { ReactComponent as Previous } from "./Previous.svg";
import { ReactComponent as Next } from "./Next.svg";

export default function PlaybackControls({
    isPlaying,
    canSkipToPrevious,
    canSkipToNext,
    onPlay,
    onPause,
    onSkipToPrevious,
    onSkipToNext,
    disabled
}) {
    const isPreviousEnabled = !disabled && canSkipToPrevious;
    const isNextEnabled = !disabled && canSkipToNext;

    return (
        <div className={styles.container}>
            <Previous
                onClick={isPreviousEnabled && onSkipToPrevious}
                className={classNames(
                    styles.skip,
                    !isPreviousEnabled && styles.disabled
                )}
            />

            <TogglePlayButton
                isPlaying={isPlaying}
                disabled={disabled}
                onPlay={onPlay}
                onPause={onPause}
            />

            <Next
                onClick={isNextEnabled && onSkipToNext}
                className={classNames(
                    styles.skip,
                    !isNextEnabled && styles.disabled
                )}
            />
        </div>
    );
}

function TogglePlayButton({ isPlaying, disabled, onPlay, onPause }) {
    if (disabled) {
        return (
            <Play className={classNames(styles.playPause, styles.disabled)} />
        );
    }

    if (isPlaying) {
        return <Pause onClick={onPause} className={styles.playPause} />;
    } else {
        return <Play onClick={onPlay} className={styles.playPause} />;
    }
}
