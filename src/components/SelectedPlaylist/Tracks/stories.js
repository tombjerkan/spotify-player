import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Tracks from ".";

export const actions = {
    onPlayTrack: action("onPlayTrack")
};

storiesOf("Tracks", module)
    .add("default", () => (
        <Tracks
            tracks={[
                {
                    id: 1,
                    title: "Sad Song",
                    artist: "Velvet Underground",
                    album: "Fully Loaded",
                    length: "3:36"
                },
                {
                    id: 2,
                    title: "No Fun",
                    artist: "The Stooges",
                    album: "That Album",
                    length: "2:10"
                },
                {
                    id: 3,
                    title: "Gimme Some Sugar",
                    artist: "Slippin' Joe",
                    album: "Slidin' Down To Directory Town",
                    length: "8:11"
                },
                {
                    id: 4,
                    title: "Armageddon",
                    artist: "No Legged Randy",
                    album: "Far Out Man",
                    length: "5:44"
                }
            ]}
            playingTrack={1}
            {...actions}
        />
    ))
    .add("no tracks", () => (
        <Tracks tracks={[]} playingTrack={null} {...actions} />
    ));
