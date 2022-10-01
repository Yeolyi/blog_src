import { useCallback, useState, useMemo } from "react";

export const useIterator = (items = [], initialIndex = 0) => {
  const [i, setIndex] = useState(initialIndex);

  /*
    Memoizing these values does not give us huge performance gains, or at least not enough to justify the code complexity. However, when a consumer uses the useIterator component, the memoized values will always point to the exact same object and function. This makes it easier on our consumers when they need to compare these values or use them in their own dependency arrays.
    */
  const prev = useCallback(() => {
    if (i === 0) return setIndex(items.length - 1);
    setIndex(i - 1);
  }, [i]);

  const next = useCallback(() => {
    if (i === items.length - 1) return setIndex(0);
    setIndex(i + 1);
  }, [i]);

  const item = useMemo(() => items[i], [i]);

  return [item || items[i], prev, next];
};
