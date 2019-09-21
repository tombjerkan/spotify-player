import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import placeholderImage from "./TrackDetails/placeholder-image.jpeg";

import Player from ".";

export const actions = {
    onPlay: action("onPlay"),
    onPause: action("onPause"),
    onSkipToPrevious: action("onSkipToPrevious"),
    onSkipToNext: action("onSkipToNext"),
    onSeek: action("onSeek")
};

storiesOf("Player", module)
    .add("default", () => (
        <Player
            track={{
                title: "Night Fever",
                artists: ["Bee Gees"],
                imageUri: placeholderImage
            }}
            isPlaying={true}
            canSkipToPrevious={true}
            canSkipToNext={true}
            positionMs={100000}
            durationMs={185000}
            {...actions}
        />
    ))
    .add("no track", () => (
        <Player
            track={null}
            isPlaying={false}
            canSkipToPrevious={false}
            canSkipToNext={false}
            positionMs={100000}
            durationMs={185000}
            {...actions}
        />
    ));
