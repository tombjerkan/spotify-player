import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import PlaybackControls from ".";

export const actions = {
    onPlay: action("onPlay"),
    onPause: action("onPause"),
    onSkipToPrevious: action("onSkipToPrevious"),
    onSkipToNext: action("onSkipToNext")
};

storiesOf("PlaybackControls", module)
    .add("playing", () => (
        <PlaybackControls
            isPlaying={true}
            canSkipToPrevious={true}
            canSkipToNext={true}
            {...actions}
        />
    ))
    .add("paused", () => (
        <PlaybackControls
            isPlaying={false}
            canSkipToPrevious={true}
            canSkipToNext={true}
            {...actions}
        />
    ))
    .add("no previous", () => (
        <PlaybackControls
            isPlaying={false}
            canSkipToPrevious={false}
            canSkipToNext={true}
            {...actions}
        />
    ))
    .add("no next", () => (
        <PlaybackControls
            isPlaying={false}
            canSkipToPrevious={true}
            canSkipToNext={false}
            {...actions}
        />
    ))
    .add("disabled", () => (
        <PlaybackControls
            disabled={true}
            isPlaying={false}
            canSkipToPrevious={true}
            canSkipToNext={true}
            {...actions}
        />
    ));
