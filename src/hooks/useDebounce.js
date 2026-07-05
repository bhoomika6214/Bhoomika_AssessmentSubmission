import { useState, useEffect } from "react";

/**
 * Returns a debounced copy of `value` that only updates after `delay` ms
 * of no changes. Used for search input so we don't fire an API call on
 * every single keystroke.
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: if `value` changes again before `delay` elapses, cancel
    // the previous timer. This is what actually creates the "debounce"
    // effect — without this cleanup, you'd get a delayed update per
    // keystroke instead of one final update.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
