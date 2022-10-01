import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { About, Events, Products, Contact } from './pages';
import { Home } from './Home';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />{' '}
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </div>
  );
}

function Whoops404() {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <h1>{location.pathname}</h1>
    </div>
  );
}
