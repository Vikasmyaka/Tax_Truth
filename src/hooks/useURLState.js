import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useURLState(defaultState) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from searchParams or localStorage fallback
  const [state, setState] = useState(() => {
    const initialState = { ...defaultState };
    let hasParams = false;
    for (const key of Object.keys(defaultState)) {
      if (searchParams.has(key)) {
        hasParams = true;
        break;
      }
    }

    if (hasParams) {
      for (const [key, defaultVal] of Object.entries(defaultState)) {
        if (searchParams.has(key)) {
          const val = searchParams.get(key);
          if (typeof defaultVal === 'boolean') {
            initialState[key] = val === 'true';
          } else if (typeof defaultVal === 'number') {
            initialState[key] = Number(val);
          } else {
            try {
              initialState[key] = val.startsWith('{') || val.startsWith('[') ? JSON.parse(val) : val;
            } catch {
              initialState[key] = val;
            }
          }
        }
      }
    } else {
      // Fallback to localStorage
      try {
        const stored = localStorage.getItem('taxTruth_inputs');
        if (stored) {
          const parsed = JSON.parse(stored);
          for (const [key, val] of Object.entries(parsed)) {
            if (key in defaultState) {
              initialState[key] = val;
            }
          }
        }
      } catch (e) {
        // Ignore
      }
    }
    return initialState;
  });

  const setURLState = useCallback((newState) => {
    setState((prev) => {
      const nextState = typeof newState === 'function' ? newState(prev) : newState;
      
      // Save to localStorage
      try {
        localStorage.setItem('taxTruth_inputs', JSON.stringify(nextState));
      } catch (e) {
        // Ignore
      }

      // Update URL search params using functional updater to avoid stale closure
      setSearchParams(prevParams => {
        const newParams = new URLSearchParams(prevParams);
        for (const [key, value] of Object.entries(nextState)) {
          if (value !== undefined && value !== null && value !== '') {
            newParams.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
          } else {
            newParams.delete(key);
          }
        }
        return newParams;
      }, { replace: true });
      
      return nextState;
    });
  }, [setSearchParams]);

  return [state, setURLState];
}
