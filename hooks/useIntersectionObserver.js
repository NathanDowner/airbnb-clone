import { useRef, useEffect, useState } from 'react';

function useIntersectionObserver(elementRef, options) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  function callback(entries) {
    const [entry] = entries;
    console.log(entry.target);
    console.log(isIntersecting);
    setIsIntersecting(entry.isIntersecting);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [elementRef]);

  return { isIntersecting };
}

export default useIntersectionObserver;
