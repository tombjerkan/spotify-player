import { useState, useEffect } from "react";
import axios from "axios";

export default function usePlaylists(token) {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setData([]);
        setLoading(true);
        setError(null);
        recursiveFetch(
            "https://api.spotify.com/v1/me/playlists?limit=50",
            token
        )
            .then(setData)
            .catch(error => setError(error.response.status))
            .finally(() => setLoading(false));
    }, [token]);

    return [data, isLoading, error];
}

async function recursiveFetch(url, token) {
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.data.next) {
        return response.data.items;
    } else {
        const nextItems = await recursiveFetch(response.data.next, token);
        return [...response.data.items, ...nextItems];
    }
}
