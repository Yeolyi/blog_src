// 이런 식의 export는 어떻게 하는걸까?
// React state를 사용해 변화하는 값을 저장하고 수정한다.
// Hooks contain reusable code logic that is separate from the component tree.
// Hook the component with state.
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Star = ({ selected, onSelect }) => (
  // 책에서는 에러를 막기 위해 onSelect에 f => f를 할당했지만 딱히 없어도 터지지는 않는다,,,?
  // onClick에 console.log('asd')를 하면 맨 처음 한번 실행되고 끝난다.
  <FaStar color={selected ? "red" : "grey"} onClick={onSelect} />
);
const createArray = (length) => [...Array(length)];

export function StarRating({ totalStars = 5 }) {
  // The most important thing to remember about Hooks is that they can cause the component they're hooked into to rerender.
  // 어떤 원리로????
  // 개발자 모드로 봤을 때 바뀌어야하는 별의 색만 바뀌는 듯.
  // StarRating을 선택하면 hooks를 볼 수 있다.
  const [selectedStars, setSelectedStars] = useState(3);
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>
        {selectedStars}개 중 {totalStars}개 선택
      </p>
    </>
  );
}

// ColorList 예제에서 사용하기 위한 pure component
// A pure component is a function component that does not contain state and will render the same UI given the same props.
export function PureStarRating({
  totalStars,
  selectedStars,
  onRate = (f) => f,
}) {
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => onRate(i + 1)}
        />
      ))}
      <p>
        {selectedStars}개 중 {totalStars}개 선택
      </p>
    </>
  );
}
