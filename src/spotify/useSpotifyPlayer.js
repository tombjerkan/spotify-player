import { useState } from "react";
import axios from "axios";

export default function useSpotifyPlayer(token) {
    const [player, setPlayer] = useState(null);
    const [state, setState] = useState(null);

    if (player === null) {
        connectPlayer(
            "Tom's Spotify Player",
            token,
            (player, deviceId) => {
                setPlayer({
                    playTrack: track => {
                        axios.put(
                            `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                            { uris: [`spotify:track:${track.id}`] },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                    },
                    resume: player.resume,
                    pause: player.pause,
                    skipToPreviousTrack: player.previousTrack,
                    skipToNextTrack: player.nextTrack,
                    seek: player.seek
                });
            },
            setState
        );
    }

    return [player, state];
}

function connectPlayer(name, token, onReady, onStateUpdate) {
    waitForSpotify(() => {
        const player = new window.Spotify.Player({
            name,
            getOAuthToken: cb => {
                cb(token);
            }
        });

        player.resume = player.resume.bind(player);
        player.pause = player.pause.bind(player);
        player.previousTrack = player.previousTrack.bind(player);
        player.nextTrack = player.nextTrack.bind(player);
        player.seek = player.seek.bind(player);

        player.addListener("initialization_error", logError);
        player.addListener("authentication_error", logError);
        player.addListener("account_error", logError);
        player.addListener("playback_error", logError);

        player.addListener("ready", ({ device_id }) =>
            onReady(player, device_id)
        );

        player.addListener("not_ready", ({ device_id }) => {
            console.log("Device has gone offline", device_id);
        });

        player.connect();

        setInterval(() => {
            player.getCurrentState().then(onStateUpdate);
        }, 100);
    });
}

function waitForSpotify(callback) {
    const interval = setInterval(() => {
        if (window.Spotify !== undefined) {
            clearInterval(interval);
            callback();
        }
    }, 1000);
}

function logError(error) {
    console.error(error.message);
}
