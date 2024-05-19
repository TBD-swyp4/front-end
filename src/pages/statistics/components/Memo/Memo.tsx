import ReactWordcloud from 'react-wordcloud';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import styled from 'styled-components';
import SwipeContainer from '../SwipeContainer';

type MemoProps = {
  contents: {
    user: string;
    topWord: string;
    words: { text: string; value: number }[];
  }[];
};
const Memo = ({ contents }: MemoProps) => {
  return (
    <SwipeContainer>
      {contents.map(({ topWord, words, user }, index) => {
        return (
          <MemoContainer key={index}>
            <Message>{`최근 1개월 내 ${user}는 소비내역 중 내용 부분에 '${topWord}'라는 단어를 가장 많이 썼어요 `}</Message>
            <WordcloudContainer>
              <ReactWordcloud words={words} />
            </WordcloudContainer>
          </MemoContainer>
        );
      })}
    </SwipeContainer>
  );
};

export default Memo;

const MemoContainer = styled.div`
  background-color: #ffffff;
`;

const Message = styled.div`
  width: 230px;
  font-size: 16px;
  text-align: left;
  line-height: 23px;
  word-break: keep-all;
`;

const WordcloudContainer = styled.div`
  width: 100%;
  height: 400px;
  padding: 10px 20px;
`;
