import { useRef, useEffect, useState } from 'react';

function useIntersectionObserver(options) {
  const elementRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  function callback(entries) {
    const [entry] = entries;
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

  return { isIntersecting, elementRef };
}

export default useIntersectionObserver;
