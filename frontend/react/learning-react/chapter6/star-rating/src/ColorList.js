import React from "react";
import { FaTrash } from "react-icons/fa";
import { PureStarRating } from "./starRating";

export default function ColorList({
    colors = [],
    onRemoveColor = f => f,
    onRateColor = f => f
}) {
    if (!colors.length) return <div>No Colors Listed.</div>;
    return (
        <div>
            {
                colors.map(color => (
                    <Color
                        key={color.id} {...color}
                        onRemove={onRemoveColor}
                        onRate={onRateColor}
                    />)
                )
            }
        </div>
    )
}

function Color({
    id,
    title,
    color,
    rating,
    onRemove = f => f,
    onRate = f => f
}) {
    return (
        <section>
            <h1>{title}</h1>
            <button onClick={() => onRemove(id)}>
                <FaTrash />
            </button>
            <div style={{ height: 50, backgroundColor: color }} />
            <PureStarRating
                selectedStars={rating}
                totalStars={5}
                onRate={rating => onRate(id, rating)}
            />
        </section>
    );
}