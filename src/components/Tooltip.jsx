import React, { useState } from 'react';
import styles from './Components.module.css';

export default function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={styles.tooltipWrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children}
      {isVisible && (
        <div className={styles.tooltipBubble}>
          {text}
        </div>
      )}
    </div>
  );
}
