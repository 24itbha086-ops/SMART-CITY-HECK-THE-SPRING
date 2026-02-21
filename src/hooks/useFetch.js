import { useEffect, useState } from "react";

const useFetch = (fetcher) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;
    Promise.resolve(fetcher()).then((result) => {
      if (mounted) setData(result);
    });

    return () => {
      mounted = false;
    };
  }, [fetcher]);

  return data;
};

export default useFetch;
