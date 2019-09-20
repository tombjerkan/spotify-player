import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import SeekBar from ".";

export const actions = {
    onSeek: action("onSeek")
};

storiesOf("SeekBar", module).add("default", () => (
    <SeekBar positionMs={100000} durationMs={185000} {...actions} />
));
