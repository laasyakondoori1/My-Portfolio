import { useState, useEffect } from "react";

let isHideAndSeekActive = false;
const listeners = new Set<() => void>();

export const toggleHideAndSeek = () => {
  isHideAndSeekActive = !isHideAndSeekActive;
  listeners.forEach((listener) => listener());
};

export const useHideAndSeek = () => {
  const [active, setActive] = useState(isHideAndSeekActive);

  useEffect(() => {
    const listener = () => setActive(isHideAndSeekActive);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return active;
};
