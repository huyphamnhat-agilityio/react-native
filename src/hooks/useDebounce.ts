import {useState, useCallback, useRef} from 'react';

interface UseDebouncedValueReturn<T> {
  value: T;
  debouncedValue: T;
  setValue: (newValue: T) => void;
}

export const useDebounce = <T>(
  initialValue: T,
  delay: number,
): UseDebouncedValueReturn<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const updateValue = useCallback(
    (newValue: T) => {
      setValue(newValue);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(newValue);
      }, delay);
    },
    [delay],
  );

  return {
    value, // Immediate value
    debouncedValue, // Debounced value
    setValue: updateValue, // Function to update both values
  };
};
