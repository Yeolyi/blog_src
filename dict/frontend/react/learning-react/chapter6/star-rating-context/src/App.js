import React from "react";
import ColorList from "./ColorList";
import BetterAddColorForm from "./AddColorForm";

// The App component will be the only component within out application that holds state.
export default function App() {
    return (
        <>
            <BetterAddColorForm />
            <ColorList />
        </>
    );
}