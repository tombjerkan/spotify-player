import { useState } from "react";

export default function useSpotifyPlayer(token) {
    const [player, setPlayer] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [state, setState] = useState(null);

    if (player === null) {
        const interval = setInterval(() => {
            if (window.Spotify === undefined) {
                return;
            }

            const player = new window.Spotify.Player({
                name: "Tom's Spotify Player",
                getOAuthToken: cb => {
                    cb(token);
                }
            });

            player.addListener("initialization_error", ({ message }) => {
                console.error(message);
            });
            player.addListener("authentication_error", ({ message }) => {
                console.error(message);
            });
            player.addListener("account_error", ({ message }) => {
                console.error(message);
            });
            player.addListener("playback_error", ({ message }) => {
                console.error(message);
            });

            player.addListener("ready", ({ device_id }) => {
                setDeviceId(device_id);
                console.log("Ready with Device ID", device_id);
            });

            player.addListener("not_ready", ({ device_id }) => {
                console.log("Device has gone offline", device_id);
            });

            player.connect();

            setPlayer(player);
            clearInterval(interval);

            setInterval(() => {
                player.getCurrentState().then(s => {
                    setState(s);
                });
            }, 100);
        }, 1000);
    }

    return [player, deviceId, state];
}
