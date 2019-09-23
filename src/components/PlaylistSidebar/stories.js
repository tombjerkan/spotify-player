import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import PlaylistSidebar from ".";

export const actions = {
    onSelectPlaylist: action("onSelectPlaylist")
};

storiesOf("PlaylistSidebar", module).add("multiple items", () => (
    <PlaylistSidebar
        playlists={[
            { id: 1, title: "Bossa Nova" },
            { id: 2, title: "Disco" },
            { id: 3, title: "Hermetic Funk Opera" }
        ]}
        selectedPlaylist={2}
        playingPlaylist={1}
        {...actions}
    />
));
