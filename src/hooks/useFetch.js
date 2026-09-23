import { useEffect, useState } from 'react';

// Fetches a URL and tracks { data, loading, error }. Pass a falsy url to skip fetching.
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return undefined;
    }

    const controller = new AbortController();
    let ignore = false;

    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((response) => response.json())
      .then((json) => {
        if (ignore) return;
        if (json.Response === 'False') {
          setError(json.Error || 'Something went wrong. Please check your internet connection and try again.');
          setData(null);
        } else {
          setData(json);
        }
      })
      .catch((err) => {
        if (ignore || err.name === 'AbortError') return;
        setError('Something went wrong. Please check your internet connection and try again.');
        setData(null);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}
