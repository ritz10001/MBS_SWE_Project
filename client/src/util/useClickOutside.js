import { useEffect } from "react";

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handle = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  }, [ref, callback]);
}

export default useClickOutside;