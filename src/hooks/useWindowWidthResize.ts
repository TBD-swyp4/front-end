import { useEffect, useState } from 'react';

// 넘겨받은 요소 이외의 영역을 클릭했을 경우 callback을 실행한다.
const useWindowWidthResize = (callback: () => void) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      // 윈도우의 현재 너비를 가져옴
      const newWidth = window.innerWidth;
      // 이전 너비와 비교
      if (newWidth !== windowWidth) {
        setWindowWidth(newWidth);
        // 너비가 변했을 때 수행하고 싶은 작업을 추가
        callback();
      }
    };

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth, callback]); // 의존성 배열에 windowWidth 추가
};

export default useWindowWidthResize;
