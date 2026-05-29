import React, { useEffect, useState } from 'react';

export default function NumberTicker({ value, prefix = '₹', duration = 1000 }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp = null;
    const startValue = displayValue;
    const targetValue = value;
    
    if (startValue === targetValue) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(startValue + (targetValue - startValue) * easeProgress);
      
      setDisplayValue(current);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(targetValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]); // Intentionally not including displayValue to avoid infinite loops

  return (
    <span>
      {prefix}{displayValue.toLocaleString('en-IN')}
    </span>
  );
}
