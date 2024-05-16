import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';

import { useNavigate } from 'react-router-dom';

import TopBar from '@components/layout/TopBar';
import { fetchUserData } from '@api/get';
import { useMutation, useQuery } from 'react-query';
import { flexBetween, flexCenter, flexColumnCenter, mainSection } from '@styles/CommonStyles';

import { useForm } from 'react-hook-form';
import type { UserFormType } from '@models/user';
import Spinner from '@components/information/Spinner';
import { useEffect } from 'react';
import LoadingModal from '@components/modal/LoadingModal';
import { saveUserData } from '@api/post';

type NavLayoutProps = {
  children: React.ReactNode;
};

const NavigationLayout = ({ children }: NavLayoutProps) => {
  const navigate = useNavigate();

  return (
    <>
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            leftContent={
              <TopBar.PrevButton
                onClick={() => {
                  navigate(-1);
                }}
              />
            }
            centerContent={<div>내 정보</div>}
          />
        }
      />
      {children}
    </>
  );
};

const SettingPage = () => {
  // 조회 : query
  // 저장 : mutation
  const { data: userData, isLoading: isLoadingUserData } = useQuery(
    ['setting'],
    () => fetchUserData(),
    {
      refetchOnWindowFocus: false, // 윈도우 포커스 시, 자동 새로고침 방지
    },
  );

  const methods = useForm<UserFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      budget: 0,
      gender: 'MALE',
      EI: 'E',
      NS: 'N',
      TF: 'T',
      PJ: 'J',
    },
  });
  const saveMutation = useMutation(saveUserData, {
    onSuccess: (data) => {
      console.log(`유저 저장 성공 : ${JSON.stringify(data)}`);
    },
    onError: (error) => {
      console.log(`유저 저장 실패: ${error}`);
    },
  });
  const handleSubmit = methods.handleSubmit((data: UserFormType) => {
    saveMutation.mutate(data);
  });

  useEffect(() => {
    if (!isLoadingUserData && userData && userData.data) {
      const data = userData.data;

      methods.reset({
        budget: data.budget,
        gender: data.gender,
        EI: data.mbti[0],
        NS: data.mbti[1],
        TF: data.mbti[2],
        PJ: data.mbti[3],
      });
    }
  }, [userData, methods, isLoadingUserData]);

  return (
    <NavigationLayout>
      <SettingContainer>
        <Form onSubmit={handleSubmit}>
          <Title>나의 예산</Title>
          <BudgetContainer>
            {isLoadingUserData ? (
              <Spinner />
            ) : (
              <>
                <BudgetInput {...methods.register('budget', { required: true })} />
                <span>원</span>
              </>
            )}
          </BudgetContainer>
          <Title>프로필</Title>
          <ProfileContainer>
            {isLoadingUserData ? (
              <Spinner />
            ) : (
              <>
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
                    <MBTIWrapper>
                      <HiddenRadio
                        type="radio"
                        id="mbti-e"
                        value="E"
                        {...methods.register('EI', { required: true })}
                      />
                      <Label htmlFor="mbti-e">E</Label>
                      <HiddenRadio
                        type="radio"
                        id="mbti-i"
                        value="I"
                        {...methods.register('EI', { required: true })}
                      />
                      <Label htmlFor="mbti-i">I</Label>
                    </MBTIWrapper>
                    <MBTIWrapper>
                      <HiddenRadio
                        type="radio"
                        id="mbti-n"
                        value="N"
                        {...methods.register('NS', { required: true })}
                      />
                      <Label htmlFor="mbti-n">N</Label>
                      <HiddenRadio
                        type="radio"
                        id="mbti-s"
                        value="S"
                        {...methods.register('NS', { required: true })}
                      />
                      <Label htmlFor="mbti-s">S</Label>
                    </MBTIWrapper>
                    <MBTIWrapper>
                      <HiddenRadio
                        type="radio"
                        id="mbti-t"
                        value="T"
                        {...methods.register('TF', { required: true })}
                      />
                      <Label htmlFor="mbti-t">T</Label>
                      <HiddenRadio
                        type="radio"
                        id="mbti-f"
                        value="F"
                        {...methods.register('TF', { required: true })}
                      />
                      <Label htmlFor="mbti-f">F</Label>
                    </MBTIWrapper>
                    <MBTIWrapper>
                      <HiddenRadio
                        type="radio"
                        id="mbti-j"
                        value="J"
                        {...methods.register('PJ', { required: true })}
                      />
                      <Label htmlFor="mbti-j">J</Label>
                      <HiddenRadio
                        type="radio"
                        id="mbti-p"
                        value="P"
                        {...methods.register('PJ', { required: true })}
                      />
                      <Label htmlFor="mbti-p">P</Label>
                    </MBTIWrapper>
                  </MBTIContainer>
                </ProfileDiv>{' '}
              </>
            )}
          </ProfileContainer>
          <Button>저장</Button>
        </Form>
        <Button>로그아웃</Button>
      </SettingContainer>
      {saveMutation.isLoading && <LoadingModal />}
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
`;

const Form = styled.form`
  width: 100%;
  height: 90%;
`;

const BudgetContainer = styled.div`
  ${flexCenter}
  width: 100%;
  margin-bottom: 24px;
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
  height: 172px;
  margin-bottom: 15px;
  padding-top: 0;
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

  color: #9f9f9f;
  background-color: #ffffff;
  font-size: 16px;
  font-weight: 700;

  border-radius: 6px;
  box-shadow: ${(props) => props.theme.shadows.around};
`;

const BudgetInput = styled.input.attrs({ type: 'number' })`
  height: 80px;
  width: 100%;

  background-color: #767676;
  color: #ffffff;
  border-radius: 6px;

  font-size: 24px;
  font-weight: 700;

  padding: 22.5px 27.5px 22.5px 27.5px;

  // 화살표 숨기기
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  appearance: textfield;
`;

const ProfileDiv = styled.div`
  ${flexBetween}
  width: 100%;
  height: 50%;

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
