import React, { useState, useEffect } from "react";

export default function GitHubUser({ login }) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            if (!login) return;
            setLoading(true);
            try {
                const response = await fetch(`https://api.github.com/users/${login}`);
                const json = await response.json();
                setData(json);
                setLoading(false);
            } catch (e) {
                setError(e);
            }
        })();
    }, [login]);

    if (loading) return <h1>loading...</h1>;
    if (error)
        return <pre>{JSON.stringify(error, null, 2)}</pre>;
    if (!data) return null;

    return (
        <div>
            <img
                src={data.avatar_url}
                alt={data.login}
                style={{ width: 200 }}
            />
            <div>
                <h1>{data.login}</h1>
                {data.name && <p>{data.name}</p>}
                {data.location && <p>{data.location}</p>}
            </div>
        </div>
    );
}
