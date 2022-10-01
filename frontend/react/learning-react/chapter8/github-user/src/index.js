import React from 'react';
import ReactDOM from 'react-dom/client';
import Fetch from './Fetch';
import UserDetails from './UserDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Fetch uri={`https://api.github.com/users/yeolyi`} renderSuccess={UserDetails} />
  </React.StrictMode>
);
