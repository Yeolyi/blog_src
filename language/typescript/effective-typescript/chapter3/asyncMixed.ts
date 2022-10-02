declare const fetchURL: (url: string, callback: (text: string) => void) => void;
const _cache: { [url: string]: string } = {};

function fetchWithCache(url: string, callback: (text: string) => void) {
  if (url in _cache) {
    callback(_cache[url]); // url이 string인데 undefined가 나오지는 않네??
  } else {
    fetchURL(url, (text) => {
      _cache[url] = text;
      callback(text);
    });
  }
}

let requestStatus: 'loading' | 'success' | 'error'; // 할당 없이 이렇게도 되네?
// 캐싱 유무에 따라 결과가 달라짐. 캐싱안됐으면 success, 됐으면 success -> loading
function getUser(userId: string) {
  fetchWithCache(`/user${userId}`, (profile) => {
    requestStatus = 'success';
  });
  requestStatus = 'loading';
}
