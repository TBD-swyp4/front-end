import ReactWordcloud from 'react-wordcloud';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { useQuery } from 'react-query';
import { fetchWordFrequencyByMbti } from '@api/get';
import Spinner from '@components/information/Spinner';
import styled from 'styled-components';
import SwipeContainer from './SwipeContainer';

const Memo = () => {
  const { data, isLoading } = useQuery('fetchWordFrequencyByMbtiQueryKey', () =>
    fetchWordFrequencyByMbti('SPEND'),
  );

  let maxFrequencyWordOfAll = '';
  let maxFrequencyOfAll = 0;

  const allWordFrequencies = data
    ? data.allWordFrequencies.map((item: { word: string; frequency: number }) => {
        if (maxFrequencyOfAll < item.frequency) {
          maxFrequencyOfAll = item.frequency;
          maxFrequencyWordOfAll = item.word;
        }
        return {
          text: item.word,
          value: item.frequency,
        };
      })
    : [];

  let maxFrequencyWordOfMbti = '';
  let maxFrequencyOfMbti = 0;

  const userWordFrequencies = data
    ? data.userWordFrequencies.map((item: { word: string; frequency: number }) => {
        if (maxFrequencyOfMbti < item.frequency) {
          maxFrequencyOfMbti = item.frequency;
          maxFrequencyWordOfMbti = item.word;
        }
        return {
          text: item.word,
          value: item.frequency,
        };
      })
    : [];

  const contents = [
    {
      user: '모든 사용자',
      topWord: maxFrequencyWordOfAll,
      words: allWordFrequencies,
    },
    {
      user: data?.mbti || '',
      topWord: maxFrequencyWordOfMbti,
      words: userWordFrequencies,
    },
  ];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SwipeContainer>
      {contents.map(({ topWord, words, user }, index) => {
        return (
          <div key={index}>
            <Message>{`최근 1개월 내 ${user}는 소비내역 중 내용 부분에 '${topWord}'라는 단어를 가장 많이 썼어요 `}</Message>
            <WordcloudContainer>
              <ReactWordcloud words={words} />
            </WordcloudContainer>
          </div>
        );
      })}
    </SwipeContainer>
  );
};

export default Memo;

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
