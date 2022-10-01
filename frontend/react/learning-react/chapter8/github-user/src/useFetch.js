import { useEffect, useState } from 'react';

export default function useFetch(uri) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(uri);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    })();
  }, [uri]);

  return { loading, data, error };
}
