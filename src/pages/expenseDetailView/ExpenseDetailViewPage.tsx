import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import TopNavigation from '@layout/TopNavigation';

import { useNavigate } from 'react-router-dom';
import {
  borderCheck,
  flexCenter,
  flexColumnCenter,
  mainSection,
  overflowWithoutScroll,
  radioButtonLabelStyle,
  summaryArea,
  textArea,
  textAreaWrapper,
  radioButtonStyle,
  flexBetween,
} from '@styles/CommonStyles';

import detailData from './../../../public/data/detail.json';
import { getSpendSumamryText } from '@utils/index';
import ExpenseSummary from '@components/expense/ExpenseSummary';
import { EmotionKey, EmotionKeys, Register } from '@models/index';
import MultiText from '@components/input/MultiText';
import { useForm, FormProvider } from 'react-hook-form';
import { ExpenseFormType } from '@models/expense';
import { useEffect, useState } from 'react';
import { VolumeBtn } from '@components/button';
import Emotion from '@components/emotion';

type NavLayoutProps = {
  children: React.ReactNode;
  isEdit: boolean;
  isValid: boolean;
  handleSubmit: () => void;
  toggleEdit: () => void;
};

const NavigationLayout = ({
  children,
  isEdit,
  isValid,
  handleSubmit,
  toggleEdit,
}: NavLayoutProps) => {
  const navigate = useNavigate();
  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            leftContent={
              <TopNavigation.TopBar.PrevButton
                onClick={() => {
                  navigate(-1);
                }}
              />
            }
            centerContent={
              <TopNavigation.TopBar.CenterTitle>작성완료 내역</TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <Toolbar>
                {isEdit ? (
                  <SaveButton onClick={handleSubmit} disabled={isValid}>
                    완료
                  </SaveButton>
                ) : (
                  <EditButton onClick={toggleEdit} />
                )}
                <DeleteButton />
              </Toolbar>
            }
          />
        }></TopNavigation>
      {children}
    </>
  );
};

const Toolbar = styled.div`
  ${flexCenter}
  gap: 16px;
`;

const toolbarStyle = css`
  width: 24px;
  height: 24px;
  color: #bcbcbc;

  &:hover {
    color: #47cfb0;
  }
`;

const EditButton = styled(TopNavigation.TopBar.EditButton)`
  ${toolbarStyle}
`;

const DeleteButton = styled(TopNavigation.TopBar.DeleteButton)`
  ${toolbarStyle}
`;

const SaveButton = styled.button`
  color: #47cfb0;
  font-size: 16px;
  font-weight: 700;
  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
    &:hover {
      filter: none;
    }
  }
`;

const ExpenseDetailViewPage = () => {
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [data, setData] = useState<ExpenseFormType>({
    content: '',
    amount: 0,
    spendDate: '',
    event: '',
    thought: '',
    emotion: 'EVADED',
    satisfaction: 1,
    reason: '',
    improvements: '',
    registerType: 'SPEND',
    aiComment: '',
  });

  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: data,
  });

  const handleSubmit = methods.handleSubmit((data: ExpenseFormType) => {
    alert(`수정 최종 : ${JSON.stringify(data)}`);
    toggleEditMode();
  });

  // articleId를 가지고 ai comment 요청.
  const handleAIComment = () => {
    // 수정모드일 경우 return
    // 이미 내용이 있거나(요청은 한번만 받을 수 있음), 메세지 창 띄워주는 사용성 개선 필요
    if (isEditMode) return;
    alert('한마디 듣기');
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const [
    registerTypeState,
    amountState,
    contentState,
    satisfactionState,
    emotionState,
    spendDateState,
  ] = methods.getValues([
    'registerType',
    'amount',
    'content',
    'satisfaction',
    'emotion',
    'spendDate',
  ]);

  // 감정 선택 시 렌더링 필요
  const [selectEmotion, setSelectEmotion] = useState<EmotionKey>(emotionState as EmotionKey);

  // ExpenseSummary Components Props
  const summaryProps = {
    articleId: Number(id),
    registerType: registerTypeState as Register,
    amount: amountState,
    content: contentState,
    satisfaction: satisfactionState,
    emotion: emotionState as EmotionKey,
  };

  // 상단 요약 텍스트
  const summaryText = getSpendSumamryText(
    spendDateState,
    contentState,
    amountState,
    registerTypeState,
  );

  const satisfactionLabels = [1, 2, 3, 4, 5];

  useEffect(() => {
    // id로 데이터 요청하여 받아온 후, data 세팅하고 hook form 을 초기화한다.
    setData(detailData.data as ExpenseFormType);
    methods.reset(detailData.data as ExpenseFormType);

    // 감정 state도 최신 데이터로 업데이트 필요
    setSelectEmotion(detailData.data.emotion as EmotionKey);
  }, [methods]);

  return (
    <NavigationLayout
      isValid={!methods.formState.isValid}
      isEdit={isEditMode}
      handleSubmit={handleSubmit}
      toggleEdit={toggleEditMode}>
      <ExpenseDetailContainer>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit}>
            {!isEditMode && (
              <>
                <SpendDateInput
                  type="datetime-local"
                  disabled={true}
                  {...methods.register('spendDate', { required: true })}
                />
                <ContentSumamry>{summaryText}</ContentSumamry>
                <SpendSummary>
                  {/* 만족도, 감정, 내용, 가격, 지출여부 담고있음 */}
                  <ExpenseBox>
                    <ExpenseSummary {...summaryProps} />
                  </ExpenseBox>
                </SpendSummary>
              </>
            )}

            <ContentContainer>
              <Title>{`${isEditMode ? '소비 내용 수정' : '소비 내용'}`}</Title>

              {/* 내용, 금액은 수정모드일 때만 Show */}
              {isEditMode && (
                <>
                  <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                    <GroupWrapper style={{ height: '80px' }}>
                      <span className="title">지출&nbsp;&nbsp;&nbsp;&nbsp;절약</span>
                      <span style={{ display: 'flex', gap: '10px', width: '100%' }}>
                        {/* 지출 */}
                        <HiddenRadio
                          id="spend"
                          value="SPEND"
                          {...methods.register('registerType', { required: true })}
                        />
                        <CheckLabel htmlFor="spend" />
                        {/* 절약 */}
                        <HiddenRadio
                          id="save"
                          value="SAVE"
                          {...methods.register('registerType', { required: true })}
                        />
                        <CheckLabel htmlFor="save" />
                      </span>
                    </GroupWrapper>
                    <GroupWrapper style={{ height: '80px' }}>
                      <span className="title">날짜</span>
                      <SpendDateInput
                        id="date"
                        className="edit"
                        type="datetime-local"
                        disabled={!isEditMode}
                        {...methods.register('spendDate', { required: true })}
                      />
                    </GroupWrapper>
                  </div>
                  <GroupWrapper>
                    <span className="title">만족도 내역</span>
                    <SatisfactionRadioContainer>
                      {satisfactionLabels.map((label, i) => (
                        <SatisfactionRadioWrapper key={i}>
                          <SatisfactionRadioButton
                            id={`satisfaction-${i + 1}`}
                            value={i + 1}
                            defaultChecked={i + 1 === satisfactionState}
                            {...methods.register('satisfaction', { required: true })}
                          />
                          <SatisfactionLabel htmlFor={`satisfaction-${i + 1}`}>
                            {label}
                          </SatisfactionLabel>
                        </SatisfactionRadioWrapper>
                      ))}
                    </SatisfactionRadioContainer>
                  </GroupWrapper>
                  <GroupWrapper style={{ height: '120px' }}>
                    <span className="title">감정</span>
                    <EmotionContainer>
                      {EmotionKeys.map((x) => (
                        <EmotionWrapper key={x}>
                          <Emotion
                            emotionKey={x}
                            isSelect={x === selectEmotion}
                            iconSize={50}
                            onClick={() => {
                              methods.setValue('emotion', x, { shouldValidate: true });
                              setSelectEmotion(x);
                            }}
                          />
                        </EmotionWrapper>
                      ))}
                    </EmotionContainer>
                  </GroupWrapper>
                  <Content>
                    <MultiText
                      hookFormFieldName="content"
                      title="내용"
                      placeholder="작성내역이 없어요"
                      isRequired={true}
                      isDisable={!isEditMode}></MultiText>
                  </Content>
                  <Content className="amount">
                    <AmountWrapper>
                      <span className="title">금액</span>
                      <AmountInput
                        placeholder="0"
                        disabled={!isEditMode}
                        {...methods.register('amount', { required: true })}
                      />
                    </AmountWrapper>
                    <AmountText>원</AmountText>
                  </Content>
                </>
              )}
              <Content>
                <MultiText
                  hookFormFieldName="event"
                  title="사건"
                  placeholder="작성내역이 없어요"
                  isDisable={!isEditMode}></MultiText>
              </Content>
              <Content>
                <MultiText
                  hookFormFieldName="thought"
                  title="생각"
                  placeholder="작성내역이 없어요"
                  isDisable={!isEditMode}></MultiText>
              </Content>
              <Content>
                <MultiText
                  hookFormFieldName="reason"
                  title="이유"
                  placeholder="작성내역이 없어요"
                  isDisable={!isEditMode}></MultiText>
              </Content>
              <Content>
                <MultiText
                  hookFormFieldName="improvements"
                  title="개선점"
                  placeholder="작성내역이 없어요"
                  isDisable={!isEditMode}></MultiText>
              </Content>
              {/* AI Comment는 수정 불가 */}
              <Content className="ai">
                <MultiText
                  hookFormFieldName="aiComment"
                  title="AI 한마디"
                  placeholder="작성내역이 없어요"
                  isDisable={true}></MultiText>
                <AICommentButton
                  onClick={handleAIComment}
                  className={`${isEditMode ? '' : 'able'}`}>
                  <VolumeBtn />
                </AICommentButton>
              </Content>
            </ContentContainer>
          </Form>
        </FormProvider>
      </ExpenseDetailContainer>
    </NavigationLayout>
  );
};

export default ExpenseDetailViewPage;

const Form = styled.form``;

const ExpenseDetailContainer = styled.div`
  ${overflowWithoutScroll}
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 16px;
`;

const ContentSumamry = styled.div`
  ${summaryArea}
  width: 100%;
  margin-top: 8px;
  margin-bottom: 12px;
`;

const SpendSummary = styled.section`
  width: 100%;
  margin-bottom: 24px;
`;

const ExpenseBox = styled.div`
  ${mainSection}
  width: 100%;
`;

const ContentContainer = styled.div`
  ${flexColumnCenter}
  width: 100%;
  gap: 12px;
`;

const Title = styled.div`
  width: 100%;
  color: #333331;
  font-size: 20px;
  font-weight: 700;
`;

const Content = styled.div`
  ${flexCenter}

  width: 100%;
  gap: 10px;

  &.amount {
    align-items: flex-end;
  }
  &.ai {
    align-items: flex-start;
  }
`;

const AmountWrapper = styled.div`
  ${textAreaWrapper}
  height: 70px;
`;

const AmountInput = styled.input.attrs({ type: 'number' })`
  ${textArea}
  background-color: transparent;
  // 화살표 숨기기
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  appearance: textfield;
`;

const AmountText = styled.div`
  ${flexCenter}
  width: 50px;
  height: 50px;
  flex-shrink: 0;

  color: #767676;
  font-size: 14px;
  font-weight: 400;
`;

const AICommentButton = styled.div`
  ${flexCenter}
  width: 50px;
  height: 50px;
  background-color: #dddddd;
  flex-shrink: 0;
  border-radius: 6px;
  color: #9f9f9f;
  transition:
    background-color,
    color 0.2s ease;
  cursor: not-allowed;

  &.able:hover {
    background-color: #47cfb0;
    color: #ffffff;
    cursor: pointer;
  }
`;

const SpendDateInput = styled.input`
  color: #9f9f9f;
  font-size: 14px;
  font-weight: 400;
  border-radius: 6px;

  &.edit {
    display: flex;
    justify-content: flex-start;
    outline: none;
    border: none;
    width: 220px;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
  }
`;

const CheckLabel = styled.label`
  position: relative;
  width: 24px;
  height: 24px;
  background-color: #dddddd;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 8px;
  &::after {
    ${borderCheck}
    left: 8px;
    top: 4px;
    cursor: pointer;
  }
`;

// 지출, 절약의 체크박스 라디오
const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  &:checked + label {
    background-color: #767676;
    &::after {
      border-color: #ffffff;
    }
  }
`;

const GroupWrapper = styled.div`
  ${textAreaWrapper}
`;

const SatisfactionRadioContainer = styled.div`
  ${flexBetween}
  width: 100%;
`;
const SatisfactionRadioWrapper = styled.div`
  ${flexColumnCenter}
  padding: 10px;
`;

// 만족도 1~5점의 동그란 원 라디오
const SatisfactionRadioButton = styled.input.attrs({ type: 'radio' })`
  ${radioButtonStyle}

  &:checked + label {
    color: #333331;
    font-weight: 700;
  }
`;

const SatisfactionLabel = styled.label`
  ${radioButtonLabelStyle}
`;

const EmotionContainer = styled.div`
  ${flexBetween}
  ${overflowWithoutScroll}
  height: 100%;
  width: 100%;
  gap: 15px;
`;

const EmotionWrapper = styled.div`
  ${flexCenter}
  height: 100%;
  width: 80px;
  flex-shrink: 0;
`;
