import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((coords) => setPosition(coords));
  }, []);

  return position;
};

export default useGeolocation;
