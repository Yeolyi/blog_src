import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client'

function App() {
    const [val, set] = useState('');
    const [phrase, setPhrase] = useState('example phrase');

    const createPhrase = () => {
        setPhrase(val);
        set('');
    }

    // The dependency array can be used to control when an effect is invoked.
    useEffect(() => {
        console.log(`typing ${val}`);
    }, [val]);

    useEffect(() => {
        console.log(`saved phrase: ${phrase}`);
    }, [phrase]);

    // 빈 배열은 초기 렌더에서만 useEffect가 실행되도록 한다. 의존성이 없는 것은 변화가 없음을 의미하기 때문이다. 초기 설정에 매우 유용하게 사용된다. 
    useEffect(() => {
        console.log('initial');
        return () => console.log('end');
    }, []);

    return (
        <>
            <label>Favorite phrase: </label>
            <input
                value={val}
                placeholder={phrase}
                onChange={e => set(e.target.value)}
            />
            <button onClick={createPhrase}>send</button>
        </>
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
