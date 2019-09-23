import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import PlaylistItem from ".";

export const actions = {
    onClick: action("onClick")
};

storiesOf("PlaylistItem", module)
    .add("default", () => <PlaylistItem title="Bossa Nova" {...actions} />)
    .add("selected playlist", () => (
        <PlaylistItem title="Bossa Nova" isSelected={true} {...actions} />
    ))
    .add("playing", () => (
        <PlaylistItem title="Bossa Nova" isPlaying={true} {...actions} />
    ))
    .add("abbreviated name", () => (
        <div style={{ width: "200px" }}>
            <PlaylistItem
                title="This is a very long playlist name that would be too long to fit in the container"
                {...actions}
            />
        </div>
    ));
