import React from "react";
import { storiesOf } from "@storybook/react";
import placeholderImage from "./placeholder-image.jpeg";

import TrackDetails from ".";

storiesOf("TrackDetails", module)
    .add("default", () => (
        <TrackDetails
            title="Night Fever"
            artists={["Bee Gees"]}
            imageUri={placeholderImage}
        />
    ))
    .add("multiple artists", () => (
        <TrackDetails
            title="Night Fever"
            artists={["Bee Gees", "Some other guys"]}
            imageUri={placeholderImage}
        />
    ));
