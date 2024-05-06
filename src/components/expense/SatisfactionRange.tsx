import { absoluteCenter, flexCenter } from '@styles/CommonStyles';
import { useEffect, useRef, useState } from 'react';
import useWindowWidthResize from '@hooks/useWindowWidthResize';
import { SpeechBubbleBtn } from '@components/button';
import styled from 'styled-components';

const SatisfactionRange = () => {
  const max = 5;
  const min = 1;

  const rangeRadius = 6;
  const rangeThumb = 16;
  const rangeHeight = 10;
  const [rangeWidth, setRangeWidth] = useState<number>(212);
  const [value, setValue] = useState<number>(3.5); // props로 넘겨받게될듯
  const rangeRef = useRef<HTMLDivElement>(null);
  // const followSah
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target?.value));
  };

  const getNomalized = (val: number): number => (val - min) / (max - min);
  const calculateLeft = (val: number) => {
    return getNomalized(val) * (rangeWidth - rangeThumb) + rangeThumb / 2;
  };
  const handleResize = () => {
    if (rangeRef.current) {
      const width = rangeRef.current.getBoundingClientRect().width;
      setRangeWidth(width);
    }
  };

  // 렌더링 시, 윈도우 너비 리사이즈 시 현재 input width 계산을 다시 해준다.
  useEffect(() => {
    handleResize();
  }, []);
  useWindowWidthResize(handleResize);

  return (
    <Wrapper>
      <RangeBackgroundBar rangeRadius={rangeRadius} />
      <Left></Left>
      <Right>
        <RangeSection ref={rangeRef}>
          <FollowText style={{ left: calculateLeft(value) }}>{value}</FollowText>
          <FollowShape style={{ left: calculateLeft(value) }} />
          <RangeCustomRail
            rangeHeight={rangeHeight}
            rangeRadius={rangeRadius}
            fill={getNomalized(value) * 100}
          />
          <RangeInput
            type="range"
            value={value}
            min={min}
            max={max}
            step={0.1}
            onChange={handleChange}
            rangeHeight={rangeHeight}
            rangeThumb={rangeThumb}
          />
          <RangeButtonContainer>
            {[1, 2, 3, 4, 5].map((x, i) => (
              <RangeButton
                key={i}
                onClick={() => {
                  setValue(x);
                }}>
                {x}
              </RangeButton>
            ))}
          </RangeButtonContainer>
        </RangeSection>
      </Right>
    </Wrapper>
  );
};

export default SatisfactionRange;

const Wrapper = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100px;
  overflow: hidden;
  position: relative;
`;

const Left = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f3f3f3;
  flex-shrink: 0;
  border-radius: 50%;
  z-index: 2;
`;

const Right = styled.div`
  ${flexCenter}
  width: 100%;
  height: 50px;
  background-color: transparent;
`;

const RangeSection = styled.div`
  width: 80%;
  height: 50px;
  position: relative;
  background-color: transparent;
`;

const RangeCustomRail = styled.div<{ rangeHeight: number; rangeRadius: number; fill: number }>`
  ${absoluteCenter}
  width: 100%;
  height: ${(props) => props.rangeHeight}px;
  border-radius: ${(props) => props.rangeRadius}px;
  background: linear-gradient(
    90deg,
    #bcbcbc ${(props) => props.fill}%,
    #f2f2f2 ${(props) => props.fill}%
  );
`;
const RangeInput = styled.input<{ rangeHeight: number; rangeThumb: number }>`
  ${absoluteCenter}

  width: 100%;
  height: ${(props) => props.rangeHeight}px; //20px;

  background: transparent;

  margin: 0;
  appearance: none;
  z-index: 2;
  // 잡고 움직이는 원 크기
  &::-webkit-slider-thumb {
    appearance: none;
    background: white;
    width: ${(props) => props.rangeThumb}px; //16px;
    height: ${(props) => props.rangeThumb}px; //16px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 1px 3px 1px #5252521a;
  }

  &:active {
    cursor: grabbing;
  }
  &:focus {
    outline: none;
  }
`;

const FollowShape = styled(SpeechBubbleBtn)`
  position: absolute;
  top: -25px; // thumb 위에 위치하도록 조정
  left: 50%;
  transform: translateX(-50%);
`;

const FollowText = styled.div`
  position: absolute;
  top: -20px; // thumb 위에 위치하도록 조정
  left: 50%;
  transform: translateX(-50%);
  color: white;
  z-index: 2;
  font-size: 16px;
  font-weight: 600;
`;

const RangeBackgroundBar = styled.div<{ rangeRadius: number }>`
  ${absoluteCenter}
  width: 95%;
  height: 10px;

  border-radius: ${(props) => props.rangeRadius}px;

  background: linear-gradient(90deg, #bcbcbc 50%, #f2f2f2 50%);
`;

const RangeButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 20px;

  bottom: -3px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RangeButton = styled.div`
  cursor: pointer;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333331;
  font-size: 12px;
  font-weight: 400;
`;
