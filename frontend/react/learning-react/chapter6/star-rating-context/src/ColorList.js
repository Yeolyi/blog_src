import React from "react";
import { useColors } from "./";
import { FaTrash } from "react-icons/fa";
import { PureStarRating } from "./starRating";

export default function ColorList() {
  // The Consumer is accessed within the useContext hook, which mean that we no longer have to work directly with the consumer component.
  const { colors } = useColors();
  if (!colors.length) return <div>No Colors Listed.</div>;
  return (
    <div>
      {colors.map((color) => (
        <Color key={color.id} {...color} />
      ))}
    </div>
  );
}

function Color({ id, title, color, rating }) {
  const { rateColor, removeColor } = useColors();
  return (
    <section>
      <h1>{title}</h1>
      <button onClick={() => removeColor(id)}>
        <FaTrash />
      </button>
      <div style={{ height: 50, backgroundColor: color }} />
      <PureStarRating
        selectedStars={rating}
        totalStars={5}
        onRate={(rating) => rateColor(id, rating)}
      />
    </section>
  );
}
