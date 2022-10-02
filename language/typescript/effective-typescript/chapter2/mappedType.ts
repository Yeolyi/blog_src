// display 관련에는 리렌더링이 필요하지만 onClick이 달라졌을때는 필요하지 않다.
// 이러한 최적화는 React component에서는 흔함
interface ScatterProps {
  xs: number[];
  ys: number[];
  onClick: (x: number, y: number) => void;
}

// fail closed, 보수적 접근
// 추가된 프로퍼티에 대해서는 무조건 업데이트 필요
function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k]) {
      if (k !== 'onClick') return true;
    }
  }
  return false;
}

// fail open
// 'do no harm' 원칙에 어긋남.
function shouldUpdate2(oldProps: ScatterProps, newProps: ScatterProps) {
  return (
    oldProps.xs !== newProps.xs || oldProps.ys !== newProps.ys
    // (no check for onClick)
  );
}

// mapped type
const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
  xs: true,
  ys: true,
  onClick: false,
};

function shouldUpdate3(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
      return true;
    }
  }
  return false;
}
