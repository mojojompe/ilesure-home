import { useRef, useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypewriterText({ 
  text, 
  className = '',
  delay = 0,
  speed = 50 
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed]);

  return (
    <span ref={ref} className={className}>
      <span className="inline-block">
        {displayText}
        {!isComplete && (
          <span className="inline-block w-[3px] h-[1em] bg-mustard ml-1 animate-pulse" />
        )}
      </span>
    </span>
  );
}
