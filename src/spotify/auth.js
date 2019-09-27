const clientId = "9831bc8550fa48b6b417840eb66434ab";
const redirectUri = "http://localhost:3000";
const scopes = ["playlist-read-private", "streaming"];

export function getApiToken() {
    const hashString = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(`?${hashString}`);
    const token = hashParams.get("access_token");

    if (!token) {
        const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: scopes.join(" "),
            response_type: "token",
            show_dialog: true
        });

        const loginBaseUri = "https://accounts.spotify.com/authorize";
        const loginUri = `${loginBaseUri}?${params.toString()}`;
        window.location.replace(loginUri);
    } else {
        return token;
    }
}
