import React, { useState } from 'react';
import colorData from './color-data.json';
import ColorList from './ColorList';
import BetterAddColorForm from './AddColorForm';
import { v4 } from 'uuid';

// The App component will be the only component within out application that holds state.
export default function App() {
  const [colors, setColors] = useState(colorData);
  return (
    <>
      <BetterAddColorForm
        onNewColor={(title, color) => {
          const newColors = [
            ...colors,
            {
              id: v4(),
              rating: 0,
              title,
              color,
            },
          ];
          setColors(newColors);
        }}
      />
      <ColorList
        colors={colors}
        onRateColor={(id, rating) => {
          const newColors = colors.map((color) => (color.id === id ? { ...color, rating } : color));
          setColors(newColors);
        }}
        onRemoveColor={(id) => {
          const newColors = colors.filter((color) => color.id !== id);
          setColors(newColors);
        }}
      />
    </>
  );
}
