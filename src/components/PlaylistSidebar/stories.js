import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import PlaylistSidebar from ".";

export const actions = {
    onSelectPlaylist: action("onSelectPlaylist")
};

storiesOf("PlaylistSidebar", module)
    .add("default", () => (
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
    ))
    .add("with scrolling", () => (
        <PlaylistSidebar
            playlists={[
                { id: 1, title: "Bossa Nova" },
                { id: 2, title: "Disco" },
                { id: 3, title: "Hermetic Funk Opera" },
                { id: 4, title: "Bossa Nova" },
                { id: 5, title: "Disco" },
                { id: 6, title: "Hermetic Funk Opera" },
                { id: 7, title: "Bossa Nova" },
                { id: 8, title: "Disco" },
                { id: 9, title: "Hermetic Funk Opera" },
                { id: 10, title: "Bossa Nova" },
                { id: 11, title: "Disco" },
                { id: 12, title: "Hermetic Funk Opera" },
                { id: 13, title: "Bossa Nova" },
                { id: 14, title: "Disco" },
                { id: 15, title: "Hermetic Funk Opera" },
                { id: 16, title: "Bossa Nova" },
                { id: 17, title: "Disco" },
                { id: 18, title: "Hermetic Funk Opera" },
                { id: 19, title: "Bossa Nova" },
                { id: 20, title: "Disco" },
                { id: 21, title: "Hermetic Funk Opera" },
                { id: 22, title: "Bossa Nova" },
                { id: 23, title: "Disco" },
                { id: 24, title: "Hermetic Funk Opera" },
                { id: 25, title: "Bossa Nova" },
                { id: 26, title: "Disco" },
                { id: 27, title: "Hermetic Funk Opera" },
                { id: 28, title: "Bossa Nova" },
                { id: 29, title: "Disco" },
                { id: 30, title: "Hermetic Funk Opera" }
            ]}
            {...actions}
        />
    ));
