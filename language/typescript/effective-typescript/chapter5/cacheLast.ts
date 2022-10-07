// 함수가 마지막 호출을 캐싱하도록 함
// it doesn’t check that the values of this for successive calls are the same. And if the original function had properties defined on it, then the wrapped function would not have these, so it wouldn’t have the same type.

function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[] | null = null;
  let lastResult: any;
  return function (...args: any) {
    // @ts-ignore
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  } as unknown as T; // type assertion
}
