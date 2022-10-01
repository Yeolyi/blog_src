import React, { useRef } from 'react';
import { useInput } from './useInput';

// DOM 노드의 value 어트리뷰트를 ""로 직접 설정한다. 이는 선언적이지 않고 명령적이다. AddColorForm은 form값을 저장하기 위해 DOM을 사용하는 uncontrolled component라 한다.
function AddColorForm({ onNewColor = (f) => f }) {
  const txtTitle = useRef();
  const hexColor = useRef();
  const submit = (e) => {
    // HTML form을 submit할 때 기본 동작으로 POST request를 한다. 이를 방지.
    e.preventDefault();
    const title = txtTitle.current.value;
    const color = hexColor.current.value;
    onNewColor(title, color);
    txtTitle.current.value = '';
    hexColor.current.value = '';
  };
  return (
    <form onSubmit={submit}>
      // ref를 통해 설정한 object의 current 필드를 통해 DOM 요소에 직접 접근할 수 있다.
      <input ref={txtTitle} type="text" placeholder="color title..." required />
      <input ref={hexColor} type="color" required />
      <buttom>ADD</buttom>
    </form>
  );
}

// controlled component에서는 값/state가 DOM이 아니라 React에 의해 관리된다.
// refs들을 사용할 필요가 없다.
export default function BetterAddColorForm({ onNewColor = (f) => f }) {
  const [titleProps, resetTitle] = useInput('');
  const [colorProps, resetColor] = useInput('#000000');

  const submit = (e) => {
    // HTML form을 submit할 때 기본 동작으로 POST request를 한다. 이를 방지.
    e.preventDefault();
    onNewColor(titleProps.value, colorProps.value);
    resetTitle();
    resetColor();
  };
  return (
    <form onSubmit={submit}>
      <input
        /*
                    // value를 설정하면 form을 통한 변화가 불가능해진다. 
                    value={title}
                    // Component의 렌더가 빈번하지만 React는 이를 고려해 디자인되었다. 
                    onChange={event => setTitle(event.target.value)}
                */
        {...titleProps}
        type="text"
        placeholder="color title..."
        required
      />
      <input {...colorProps} type="color" required />
      <button>ADD</button>
    </form>
  );
}
