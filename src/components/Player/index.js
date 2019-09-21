import React from "react";
import TrackDetails from "./TrackDetails";
import PlaybackControls from "./PlaybackControls";
import SeekBar from "./SeekBar";
import styles from "./styles.module.css";

export default function Player({
    track,
    isConnected,
    isPlaying,
    canSkipToPrevious,
    canSkipToNext,
    onPlay,
    onPause,
    onSkipToPrevious,
    onSkipToNext,
    positionMs,
    durationMs,
    onSeek
}) {
    return (
        <div className={styles.container}>
            {track !== null && (
                <TrackDetails
                    title={track.title}
                    artists={track.artists}
                    imageUri={track.imageUri}
                    className={styles.trackDetails}
                />
            )}

            <PlaybackControls
                disabled={track === null}
                isPlaying={isPlaying}
                canSkipToPrevious={canSkipToPrevious}
                canSkipToNext={canSkipToNext}
                onPlay={onPlay}
                onPause={onPause}
                onSkipToPrevious={onSkipToPrevious}
                onSkipToNext={onSkipToNext}
                className={styles.playbackControls}
            />

            <SeekBar
                positionMs={positionMs}
                durationMs={durationMs}
                onSeek={onSeek}
                className={styles.seekBar}
            />
        </div>
    );
}
