import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchAll(url, token, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setData(initialData);
        setLoading(true);
        setError(null);
        recursiveFetch(url, token)
            .then(setData)
            .catch(error => setError(error.response.status))
            .finally(() => setLoading(false));
    }, [url, token]);

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
