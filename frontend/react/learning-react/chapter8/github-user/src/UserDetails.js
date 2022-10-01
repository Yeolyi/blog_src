import React, { useEffect } from 'react';
import { useIterator } from './useIterator';
import Fetch from './Fetch';
import RepositoryReadme from './RepositoryReadme';

export default function UserDetails({ data }) {
  return (
    <div className="githubUser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
      <UserRepos login={data.login} onSelect={(repoName) => console.log(`${repoName} selected`)} />
    </div>
  );
}

export function UserRepos({ login, onSelect = (f) => f }) {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}/repos`}
      renderSuccess={({ data }) => (
        <RepoMenu repositories={data} login={login} onSelect={onSelect} />
      )}
    ></Fetch>
  );
}

export function RepoMenu({ repositories, login, onSelect = (f) => f }) {
  const [{ name }, previous, next] = useIterator(repositories);

  useEffect(() => {
    if (!name) return;
    onSelect(name);
  }, [name]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <button onClick={previous}>&lt;</button>
        <p>{name}</p>
        <button onClick={next}>&gt;</button>
      </div>
      <RepositoryReadme login={login} repo={name} />
    </>
  );
}
