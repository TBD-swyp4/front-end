import styled from 'styled-components';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import ReactWordcloud from 'react-wordcloud';

import SwipeContainer from '../SwipeContainer';
import StatisticsContentLayout from '../StatisticsContentLayout';

import type { Register } from '@models/index';

type MemoProps = {
  contents: {
    user: string;
    topWord: string;
    words: { text: string; value: number }[];
  }[];
  registerType: Register;
};
const Memo = ({ contents, registerType }: MemoProps) => {
  return (
    <SwipeContainer>
      {contents.map(({ topWord, words, user }, index) => {
        return (
          <StatisticsContentLayout
            key={index}
            isEmpty={user === 'NONE'}
            message={
              <Message $index={index}>
                <span>{user}</span>는 {registerType === 'SPEND' ? '지출' : '절약'} 메모 중<br />
                <span>&apos;{topWord}&apos;</span> 단어를 많이 썼어요
              </Message>
            }>
            <div style={{ height: '200px' }}>
              <ReactWordcloud words={words} />
            </div>
          </StatisticsContentLayout>
        );
      })}
    </SwipeContainer>
  );
};

export default Memo;

const Message = styled.div<{ $index: number }>`
  & > span {
    color: ${(props) => (props.$index === 0 ? '#47CFB0' : '#FC4873')};
  }
`;
