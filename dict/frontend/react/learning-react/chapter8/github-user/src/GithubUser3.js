import Fetch from "./fetch";

export default function GitHubUser3({ login }) {
    return (
        <Fetch
            uri={`https://api.github.com/users/${login}`}
            renderSuccess={UserDetails}
        />
    );
}

function UserDetails({ data }) {
    return (
        <div className="githubUser">
            <img
                src={data.avatar_url}
                alt={data.login}
                style={{ width: 200 }}
            /> <div>
                <h1>{data.login}</h1>
                {data.name && <p>{data.name}</p>}
                {data.location && <p>{data.location}</p>}
            </div>
        </div>
    );
}
