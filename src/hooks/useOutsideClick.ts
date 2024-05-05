import { useEffect } from 'react';

// 넘겨받은 요소 이외의 영역을 클릭했을 경우 callback을 실행한다.
const useOutSideClick = (ref: React.RefObject<HTMLObjectElement>, callback: () => void) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
};

export default useOutSideClick;
