import React, { createContext, useContext, useState } from 'react';
import colorData from "./color-data";
import ReactDOM from 'react-dom/client';
import App from "./App.js";
import v4 from 'uuid';

// ColorContext.consumer을 사용해야하기에 export
// ...했지만 아래 useColor를 사용한는 방식이 더 깔끔. 
const ColorContext = createContext();
// Wrap all of the functionality necessary to render and work with stateful colors in a single JS module. 
// 함수로 표현한 것이 신기. 왜 상수가 아니지?
export const useColors = () => useContext(ColorContext);

// Context provider 자체로는 내부의 값을 수정할 수 없고, Context provider를 렌더하는 stateful component를 만들면 된다. 
function ColorProvider({ children }) {
    const [colors, setColors] = useState(colorData);
    // setColor는 context 내부의 모든 유저에게 수정의 권한을 주니 좋지 않다. 
    /*
    return (
        <ColorContext.Provider value={{ colors, setColors }}
        >
            {children}
        </ColorContext.Provider>
    )
    */

    // 필요한 동작과 관련된 함수들만을 전달한다. 
    const addColor = (title, color) =>
        setColors([
            ...colors,
            {
                id: v4(), rating: 0, title, color
            }
        ]);
    const rateColor = (id, rating) =>
        setColors(
            colors.map(color => (color.id === id ? { ...color, rating } : color))
        );
    const removeColor = id => setColors(colors.filter(color => color.id !== id));

    return (
        <ColorContext.Provider value={{ colors, addColor, removeColor, rateColor }}>
            {children}
        </ColorContext.Provider>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ColorProvider><App /></ColorProvider>
    </React.StrictMode>
);
