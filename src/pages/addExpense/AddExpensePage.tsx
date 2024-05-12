// 소비 입력 페이지
import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import type { ExpenseFormType } from '@models/expense';

import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import WriteExpense from './components/WriteExpense';
import WriteEmotion from './components/WriteEmotion';
import WriteSatisfaction from './components/WriteSatisfaction';
import { flexCenter, flexColumnCenter } from '@styles/CommonStyles';

type AddNavProps = {
  title: string;
  hasPrev: boolean;
  prevStep: () => void;
  children: React.ReactNode;
};

const NavigationLayout = ({ children, title, prevStep, hasPrev }: AddNavProps) => {
  const navigate = useNavigate();
  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            leftContent={
              hasPrev && (
                <TopNavigation.TopBar.PrevButton
                  onClick={() => {
                    prevStep();
                  }}
                />
              )
            }
            centerContent={
              <TopNavigation.TopBar.CenterTitle>{title}</TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <TopNavigation.TopBar.CloseButton
                onClick={() => {
                  navigate(-1);
                }}
              />
            }
          />
        }></TopNavigation>
      {children}
    </>
  );
};

const AddExpensePage = () => {
  const methods = useForm<ExpenseFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      registerType: 'SPEND', // 소비, 절약
      content: '', // 소비 내용 (원래 물건)
      date: '', // 소비 날짜, 시간 (저장 시간 아님) -> 추가 필요 필드
      event: '', // 사건
      thought: '', // 생각
      emotion: '', // 감정
      satisfaction: 3, // 만족도
      reason: '', // 만족 이유
      improvements: '', // 개선점
    },
  });

  // 페이지 별 타이틀
  const [title, setTitle] = useState<string>('지출/절약 입력');
  const titleArr = ['지출/절약 입력', '감정 입력', '만족도 입력'];

  // 입력 스탭
  const [currStep, setCurrStep] = useState<number>(0);

  // 다음 단계 (유효성 체크)
  const handleNextStep = async () => {
    // 현재 폼의 모든 입력 값에 대해 유효성 검사 수행
    const result = await methods.trigger();
    if (result) {
      // 유효성 검사를 통과하면 다음 스탭으로 이동
      setTitle(titleArr[currStep + 1]);
      setCurrStep(currStep + 1);
    }
  };

  // 이전 단계 (유효성 체크 x)
  const handlePrevStep = () => {
    // 이전 단계는 유효성 체크 안함
    setTitle(titleArr[currStep - 1]);
    setCurrStep(currStep - 1);
  };

  // 제출
  const handleSubmit = (data: ExpenseFormType) => {
    alert(`최종 값(메인)` + JSON.stringify(data));
  };

  return (
    <NavigationLayout hasPrev={currStep > 0} prevStep={handlePrevStep} title={title}>
      <AddExpenseContainer>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(handleSubmit)}>
            {/* 폼 영역 (멀티 스탭) */}
            {currStep === 0 && <WriteExpense />}
            {currStep === 1 && <WriteEmotion />}
            {currStep === 2 && <WriteSatisfaction />}

            {/* 버튼 영역 */}
            <NextButtonWrapper>
              {currStep < 2 && (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!methods.formState.isValid}>
                  다음
                </Button>
              )}
              {currStep === 2 && <Button type="submit">저장</Button>}
            </NextButtonWrapper>
          </Form>
        </FormProvider>
      </AddExpenseContainer>
    </NavigationLayout>
  );
};

export default AddExpensePage;
const AddExpenseContainer = styled.div`
  ${flexColumnCenter}
  width: 100%;
  height: 100%;
  color: black;
  overflow: hidden;
`;

const NextButtonWrapper = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100px;
  flex-shrink: 0;
`;

const Button = styled.button`
  width: 80%;
  min-width: 358px;
  height: 60px;
  background-color: #47cfb0;
  border-radius: 6px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;

  &:hover {
    background-color: #6ad5bc;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  ${flexColumnCenter}
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
