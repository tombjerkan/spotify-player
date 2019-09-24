import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import placeholderImage from "../Player/TrackDetails/placeholder-image.jpeg";

import SelectedPlaylist from ".";

export const actions = {
    onPlayTrack: action("onPlayTrack")
};

storiesOf("SelectedPlaylist", module).add("default", () => (
    <SelectedPlaylist
        imageUri={placeholderImage}
        name="Disco Classics"
        tracks={[
            {
                id: 1,
                title: "Night Fever",
                artist: "Bee Gees",
                album: "Saturday Night Fever",
                length: "4:05"
            },
            {
                id: 2,
                title: "Upside Down",
                artist: "Diana Ross",
                album: "The Best of Diana Ross",
                length: "3:45"
            },
            {
                id: 3,
                title: "Disco Inferno",
                artist: "The Tramps",
                album: "Shrek II Soundtrack",
                length: "2:51"
            },
            {
                id: 4,
                title: "You Should Be Dancing",
                artist: "Bee Gees",
                album: "Saturday Night Fever",
                length: "3:05"
            }
        ]}
        playingTrack={3}
        {...actions}
    />
));
