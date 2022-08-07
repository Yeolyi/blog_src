import React, { useState, useEffect } from "react";
import { loadJSON, saveJSON } from "./storage";

export default function GitHubUser({ login }) {
    // Save the data to the browser
    const [data, setData] = useState(loadJSON(`user:${login}`));
    useEffect(() => {
        if (!data) return;
        if (data.login === login) return;
        const { name, avatar_url, location } = data;
        saveJSON(`user:${login}`, {
            name, login, avatar_url, location
        });
    }, [data, login]);
    // React Hook useEffect has a missing dependency 때문에 책과 다르게 login을 추가

    // Request more data from GitHub.
    useEffect(() => {
        if (!login) return;
        if (data && data.login === login) return;
        fetch(`https://api.github.com/users/${login}`)
            .then(response => response.json())
            .then(setData)
            .catch(console.error);
    }, [data, login]);

    if (data)
        return <pre>{JSON.stringify(data, null, 2)}</pre>
    return null;

    // localStorage.clear() 전까지 4개의 요소만 있는 작은 객체가 뜬다. 
}
