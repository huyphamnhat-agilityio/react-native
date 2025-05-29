import {renderHook} from 'test-utils';
import {useDebounce} from '../useDebounce';
import {act} from 'react';

jest.useFakeTimers(); // Enable fake timers for controlling setTimeout

describe('useDebounce', () => {
  it('should initialize with the initial value', () => {
    const {result} = renderHook(() => useDebounce('initial', 500));

    expect(result.current.value).toBe('initial');
    expect(result.current.debouncedValue).toBe('initial');
  });

  it('should update the immediate value immediately', () => {
    const {result} = renderHook(() => useDebounce('initial', 500));

    act(() => {
      result.current.setValue('updated');
    });

    expect(result.current.value).toBe('updated');
    expect(result.current.debouncedValue).toBe('initial'); // Debounced value should not change immediately
  });

  it('should update the debounced value after the specified delay', () => {
    const {result} = renderHook(() => useDebounce('initial', 500));

    act(() => {
      result.current.setValue('updated');
    });

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.value).toBe('updated');
    expect(result.current.debouncedValue).toBe('updated');
  });

  it('should reset the timer if the value changes before the delay ends', () => {
    const {result} = renderHook(() => useDebounce('initial', 500));

    act(() => {
      result.current.setValue('updated1');
    });

    act(() => {
      jest.advanceTimersByTime(300); // Advance by less than the delay
      result.current.setValue('updated2');
    });

    // Fast-forward time to simulate the delay
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.value).toBe('updated2');
    expect(result.current.debouncedValue).toBe('updated2'); // Only the latest value should debounce
  });

  it('should clear the timeout on unmount', () => {
    const {result, unmount} = renderHook(() => useDebounce('initial', 500));

    act(() => {
      result.current.setValue('updated');
    });

    unmount();

    // Fast-forward time to check if the timeout runs after unmounting
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Since the component is unmounted, the debounced value should not update
    expect(result.current.debouncedValue).toBe('initial');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
