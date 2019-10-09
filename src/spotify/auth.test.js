import { getApiToken } from "./auth";

const { location } = window;

beforeEach(() => {
    delete window.location;
    window.location = {
        ...location,
        replace: jest.fn()
    };
});

test("redirects to Spotify authorization page when no hash", () => {
    const apiToken = getApiToken();

    expect(apiToken).toBeUndefined();
    expect(window.location.replace).toHaveBeenCalledWith(
        "https://accounts.spotify.com/authorize?client_id=9831bc8550fa48b6b417840eb66434ab&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=playlist-read-private+streaming&response_type=token&show_dialog=true"
    );
});

test("reads api token from hash when provided", () => {
    window.location.hash =
        "#access_token=BQDyFFqfngKm0s2Zef0HEVgf83FOMltW_PdjU3E5sQsKfjlF5O5ebauvAhIs1iSvDg0L1iF6N_p5KLQUmPXQZdFZkHKEkBAYQhnE6MqMUD5oN81Wy1KsgIP32PPEFk_utpzFBd42GEOPBrQFGZd4JTtqRbyigRiO0mlg7ynQCClNsi4&token_type=Bearer&expires_in=3600";

    const apiToken = getApiToken();

    expect(apiToken).toBe(
        "BQDyFFqfngKm0s2Zef0HEVgf83FOMltW_PdjU3E5sQsKfjlF5O5ebauvAhIs1iSvDg0L1iF6N_p5KLQUmPXQZdFZkHKEkBAYQhnE6MqMUD5oN81Wy1KsgIP32PPEFk_utpzFBd42GEOPBrQFGZd4JTtqRbyigRiO0mlg7ynQCClNsi4"
    );
    expect(window.location.replace).not.toHaveBeenCalled();
});
