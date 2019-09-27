import axios from "axios";

export function connect(name, token, onReady, onStateUpdate) {
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

        player.addListener("ready", ({ device_id }) => {
            onReady(transformPlayer(player, device_id, token));
        });

        player.addListener("not_ready", ({ device_id }) => {
            console.log("Device has gone offline", device_id);
        });

        player.connect();

        setInterval(() => {
            player
                .getCurrentState()
                .then(state => onStateUpdate(transformState(state)));
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

function transformPlayer(player, deviceId, token) {
    return {
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
    };
}

function transformState(state) {
    if (!state) {
        return {
            currentTrack: {}
        };
    }

    let currentPlaylistId = null;
    if (state.context.uri) {
        const contextUriParts = state.context.uri.split(":");
        if (contextUriParts[contextUriParts.length - 2] === "playlist") {
            currentPlaylistId = contextUriParts[contextUriParts.length - 1];
        }
    }

    return {
        currentPlaylistId,
        currentTrack: {
            id:
                state.track_window.current_track.linked_from.id ||
                state.track_window.current_track.id,
            name: state.track_window.current_track.name,
            artist: state.track_window.current_track.artists
                .map(a => a.name)
                .join(", "),
            album: state.track_window.current_track.album.name,
            imageUrl: state.track_window.current_track.album.images[0].url
        },
        isPlaying: !state.paused,
        canSkipToPrevious: state.disallows.skipping_prev,
        canSkipToNext: state.disallows.skipping_next,
        position: state.position,
        duration: state.duration
    };
}
