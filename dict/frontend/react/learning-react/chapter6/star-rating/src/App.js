import React, { useState } from "react";
import colorData from "./color-data.json";
import ColorList from "./ColorList";

// The App component will be the only component within out application that holds state.
export default function App() {
    const [colors] = useState(colorData);
    return <ColorList colors={colors} />;
}