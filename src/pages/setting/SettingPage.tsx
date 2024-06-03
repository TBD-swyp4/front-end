import styled from 'styled-components';
import { flexBetween, flexCenter, flexColumnCenter, mainSection } from '@styles/CommonStyles';

import TopBar from '@components/layout/TopBar';
import TopNavigation from '@layout/TopNavigation';

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import Spinner from '@components/information/Spinner';
import MetaThemeColor from '@components/background/MetaThemeColor';
import { PrevBtn } from '@components/button';

import { mbtiKeys, type UserFormType } from '@models/user';
import { PagePath } from '@models/navigation';

import useIsDemoMode from '@hooks/useIsDemo';
import useUpdateUser from './hooks/useUpdateUser';
import useUserData from './hooks/useUserData';
import useLogout from './hooks/useLogout';

import { formatAmountNumber } from '@utils/index';

type NavLayoutProps = {
  children: React.ReactNode;
  isDemoMode: boolean;
};

const NavigationLayout = ({ children, isDemoMode }: NavLayoutProps) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isFirstLogin = searchParams.get('isFirstLogin');
  const handlePrev = () => {
    if (isFirstLogin === 'true') navigate(PagePath.Main);
    else navigate(-1);
  };
  return (
    <>
      <MetaThemeColor color="#F4F4F4" />
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            leftContent={<TopBar.PrevButton onClick={handlePrev} />}
            centerContent={
              <TopNavigation.TopBar.CenterTitle>
                내 정보
                {isDemoMode && (
                  <span style={{ fontSize: '12px', color: '#47CFB0' }}> (체험중)</span>
                )}
              </TopNavigation.TopBar.CenterTitle>
            }
          />
        }
      />
      {children}
    </>
  );
};

const SettingPage = () => {
  const isDemoMode = useIsDemoMode();
  const { data: userData, isLoading: isLoadingUserData, error } = useUserData();
  const saveMutation = useUpdateUser();
  const { logoutMutation, handleLogout } = useLogout();

  const mbtiArray = mbtiKeys;

  const methods = useForm<UserFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      budget: '',
      gender: 'MALE',
      EI: 'E',
      NS: 'N',
      TF: 'T',
      PJ: 'J',
    },
  });

  const handleSubmit = methods.handleSubmit((data: UserFormType) => {
    const sendBudget = data.budget.replace(/,/g, '');
    if (isDemoMode) {
      alert(`데모데이터로 저장: ${sendBudget}`);
    } else {
      // budget : #,##0  => 다시 숫자만 남은 형태로 변경 필요
      saveMutation.mutate({ ...data, budget: sendBudget });
    }
  });

  const handleBudgetChange = (value: string, onChange: (value: string) => void) => {
    const formattedValue = formatAmountNumber(value, true);
    onChange(formattedValue);
  };

  const handleClickLogout = () => {
    if (isDemoMode) {
      handleLogout(true);
    } else {
      logoutMutation.mutate();
    }
  };

  useEffect(() => {
    if (!isLoadingUserData && userData && userData.data) {
      const data = userData.data;

      // 서버에서 받는 예산 데이터는 숫자 형태이므로, 다시 #,##0 형태로 변환하여 세팅 필요
      const formattedValue = formatAmountNumber(data.budget?.toString() || ''); // data.budget이 서버에서 null값으로 오는 경우 처리

      methods.reset({
        budget: formattedValue,
        gender: data.gender,
        EI: data.mbti[0],
        NS: data.mbti[1],
        TF: data.mbti[2],
        PJ: data.mbti[3],
      });
    }
  }, [userData, methods, isLoadingUserData]);

  return (
    <NavigationLayout isDemoMode={isDemoMode}>
      <SettingContainer>
        <Form onSubmit={handleSubmit}>
          <Title>나의 예산</Title>
          <BudgetContainer>
            {isLoadingUserData ? (
              <Spinner />
            ) : error ? (
              <div>An error occurred</div>
            ) : (
              <Controller
                name="budget"
                control={methods.control}
                defaultValue={''}
                rules={{ required: '예산을 입력해주세요.' }}
                render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
                  <>
                    <BudgetWrapper>
                      <BudgetInput
                        {...field}
                        value={value}
                        onChange={(event) => handleBudgetChange(event.target.value, onChange)}
                        placeholder="0"
                      />
                      <span>원</span>
                    </BudgetWrapper>
                    <ErrorMessage>{error?.message}</ErrorMessage>
                  </>
                )}
              />
            )}
          </BudgetContainer>
          <Title>프로필</Title>
          <ProfileContainer>
            {isDemoMode ? (
              '체험하기에서는 예산만 설정할 수 있어요.'
            ) : isLoadingUserData ? (
              <Spinner />
            ) : error ? (
              <div>An error occurred</div>
            ) : (
              <>
                <ProfileDiv>
                  <span>로그인 계정</span>
                  {userData?.data?.email}
                </ProfileDiv>
                <ProfileDiv>
                  <span>성별</span>
                  <GenderWrapper>
                    <HiddenRadio
                      type="radio"
                      id="profile-male"
                      value="MALE"
                      {...methods.register('gender', { required: true })}
                    />
                    <Label htmlFor="profile-male">남</Label>
                    <HiddenRadio
                      type="radio"
                      id="profile-female"
                      value="FEMALE"
                      {...methods.register('gender', { required: true })}
                    />
                    <Label htmlFor="profile-female">여</Label>
                  </GenderWrapper>
                </ProfileDiv>
                <ProfileDiv>
                  <span style={{ marginBottom: '30px' }}>MBTI</span>
                  <MBTIContainer>
                    {mbtiArray.map((union) => {
                      return (
                        <MBTIWrapper key={union}>
                          {[...union].map((factor) => {
                            return (
                              <div key={factor}>
                                <HiddenRadio
                                  type="radio"
                                  id={`mbti-${factor}`}
                                  value={factor}
                                  {...methods.register(union, { required: true })}
                                />
                                <Label htmlFor={`mbti-${factor}`}>{factor}</Label>
                              </div>
                            );
                          })}
                        </MBTIWrapper>
                      );
                    })}
                  </MBTIContainer>
                </ProfileDiv>{' '}
              </>
            )}
          </ProfileContainer>
          <Button disabled={!methods.formState.isValid || saveMutation.isLoading}>저장</Button>
          <InquiryButton
            onClick={() => {
              alert('문의하기 기능 준비중!');
            }}>
            <span>문의하기</span>
            <InquiryArrow />
          </InquiryButton>
        </Form>
        <Button onClick={handleClickLogout}>로그아웃</Button>
      </SettingContainer>
    </NavigationLayout>
  );
};

export default SettingPage;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 16px;
  margin-top: 15px;
`;

const Form = styled.form`
  width: 100%;
  height: 90%;
`;

const BudgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BudgetWrapper = styled.div`
  ${flexCenter}
  width: 100%;
  & > span {
    ${flexCenter}
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    font-size: 16px;
    font-weight: 600;
    color: #9f9f9f;
  }
`;

const ProfileContainer = styled.div`
  ${flexColumnCenter}
  ${mainSection}
  width: 100%;
  height: 200px;
  margin-bottom: 15px;
  gap: 20px;
`;

const Title = styled.div`
  color: #333331;
  font-size: 20px;
  font-weight: 700;

  margin-bottom: 10px;
`;

const Button = styled.button`
  ${flexCenter}
  width: 100%;
  height: 60px;
  margin-bottom: 15px;

  color: #9f9f9f;
  background-color: #ffffff;
  font-size: 16px;
  font-weight: 700;

  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadows.around};

  &:disabled {
    color: #fff;
    background-color: #dcdada;
    cursor: not-allowed;
    &:hover {
      filter: none;
    }
  }
`;

const BudgetInput = styled.input.attrs({ type: 'text', inputMode: 'numeric' })`
  height: 80px;
  width: 100%;

  text-align: right;

  background-color: #767676;
  color: #ffffff;
  border-radius: 6px;

  font-size: 24px;
  font-weight: 700;

  padding: 22.5px 27.5px;

  &::placeholder {
    font-weight: 500;
    color: #c6c6c6;
  }
`;

const ProfileDiv = styled.div`
  ${flexBetween}
  width: 100%;

  font-size: 14px;
  color: #575755;
  font-weight: 400;
`;

const Label = styled.label`
  ${flexCenter}
  width: 50px;
  height: 30px;

  color: #9f9f9f;
  background-color: #e3e3e3;

  border-radius: 6px;
  cursor: pointer;
`;

const GenderWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;

  &:checked + label {
    color: #ffffff;
    background-color: #47cfb0;
  }
`;

const MBTIContainer = styled.div`
  display: flex;
  gap: 6px;
`;

const MBTIWrapper = styled.div`
  ${flexColumnCenter}
  border: 1px solid #E3E3E3;
  border-radius: 6px;
  padding: 5px;
  gap: 6px;
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 14px;
  margin-bottom: 30px;
`;

const InquiryButton = styled.div`
  ${flexBetween}
  width: 100%;
  height: 44px;

  background-color: #fff;

  padding: 16px;

  font-size: 14px;
  color: #9f9f9f;
  font-weight: 300;

  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadows.around};
`;

const InquiryArrow = styled(PrevBtn)`
  width: 10px;
  height: 10px;
  color: #9f9f9f;
  stroke-width: 4;
  transform: rotate(180deg);

  &:hover {
    color: #4b4949;
    stroke-width: 3;
    transform: rotate(180deg);
  }
`;
