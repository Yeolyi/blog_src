// sync하니 사용에 주의
export const loadJSON = (key) => key && JSON.parse(localStorage.getItem(key));
export const saveJSON = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));
