import axios from "axios";

export default async function fetchPaged(url, token) {
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.next) {
        const nextPageItems = await fetchPaged(response.data.next, token);
        return [...response.data.items, ...nextPageItems];
    } else {
        return response.data.items;
    }
}
