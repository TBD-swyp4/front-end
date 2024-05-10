import TopNavigation from '@layout/TopNavigation';
import styled from 'styled-components';
import type { NavLayoutProps } from '../../types/navigationTypes';

import { useNavigate } from 'react-router-dom';

import TopBar from '@components/layout/TopBar';
import BottomNavigation from '@components/layout/BottomNavigation';
import { flexBetween } from '@styles/CommonStyles';
import { useAuthStore } from '@stores/authStore';
import { useState } from 'react';

type Gender = 'male' | 'female' | null;

type Mbti = 'E' | 'I' | 'N' | 'S' | 'T' | 'F' | 'J' | 'P';

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
      <BottomNavigation />
    </>
  );
};

// #20240429.syjang, 환경설정 테스트 페이지입니다. 추후 테마 변경 시 아래와 같이 가져다 쓰면 됩니다.
const SettingPage = () => {
  const navigate = useNavigate();
  const [genderColor, setGenderColor] = useState<Gender>(null);
  const [selections, setSelections] = useState({
    EI: '',
    NS: '',
    TF: '',
    JP: '',
  });

  const { setLogoutState } = useAuthStore((state) => {
    return { setLogoutState: state.setLogoutState };
  });

  const handleGenderColor = (gender: Gender) => {
    setGenderColor(gender);
  };

  // handleSelection 함수 수정
  const handleSelection = (type: Mbti) => {
    const category =
      type === 'E' || type === 'I'
        ? 'EI'
        : type === 'N' || type === 'S'
          ? 'NS'
          : type === 'T' || type === 'F'
            ? 'TF'
            : 'JP';

    setSelections((prevSelections) => ({
      ...prevSelections,
      [category]: prevSelections[category] === type ? '' : type,
    }));
  };

  const handleSubmit = () => {
    //저장 코드
  };

  const handleLogout = () => {
    setLogoutState();
    navigate('/login');
  };

  return (
    <NavigationLayout>
      <SettingContainer>
        <MyBudgetWrapper>
          <MyBudgetTitle>나의 예산</MyBudgetTitle>
          <MyBudget value={`${123123}원`} />
        </MyBudgetWrapper>
        <ProfileWrapper>
          <ProfileTitle>프로필</ProfileTitle>
          <Profile>
            <GenderWrapper>
              <GenderTitle>성별</GenderTitle>
              <GenderContainer>
                <Gender
                  isSelected={genderColor === 'male'}
                  onClick={() => handleGenderColor('male')}>
                  남
                </Gender>
                <Gender
                  isSelected={genderColor === 'female'}
                  onClick={() => handleGenderColor('female')}>
                  여
                </Gender>
              </GenderContainer>
            </GenderWrapper>
            <MbtiWrapper>
              <MbtiTitle>Mbti</MbtiTitle>
              <MbtiGrid>
                {(['E', 'I', 'N', 'S', 'T', 'F', 'J', 'P'] as const).map((type) => (
                  <Mbti
                    key={type}
                    isSelected={
                      selections.EI === type ||
                      selections.NS === type ||
                      selections.TF === type ||
                      selections.JP === type
                    }
                    onClick={() => handleSelection(type)}>
                    {type}
                  </Mbti>
                ))}
              </MbtiGrid>
            </MbtiWrapper>
          </Profile>
        </ProfileWrapper>
        <SaveBtn onClick={handleSubmit}>저장</SaveBtn>
        <Logout onClick={handleLogout}>로그아웃</Logout>
      </SettingContainer>
    </NavigationLayout>
  );
};

export default SettingPage;

const SettingContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
`;

const MyBudgetWrapper = styled.div`
  margin-bottom: 16.69px;
`;

const MyBudgetTitle = styled.div`
  color: ${(props) => props.theme.font};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const MyBudget = styled.input`
  width: 100%;
  height: 90px;
  padding: 27.5px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.main};
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
`;

const ProfileWrapper = styled.div`
  margin-bottom: 11.01px;
`;

const ProfileTitle = styled.div`
  margin-bottom: 11.31px;
  color: ${(props) => props.theme.font};
  font-size: 20px;
  font-weight: 700;
`;

const Profile = styled.div`
  width: 100%;
  height: 223px;
  padding: 30px 15px;
  border-radius: 6px;
  background-color: #ffffff;
`;

const GenderWrapper = styled.div`
  ${flexBetween}
  margin-bottom: 30px;
`;

const GenderTitle = styled.div`
  color: #575755;
  font-size: 14px;
  font-weight: 500;
`;

const GenderContainer = styled.div`
  ${flexBetween}
  width: 106px;
  height: 40px;
`;

const Gender = styled.button<{ isSelected: boolean }>`
  width: 50px;
  height: 40px;
  border-radius: 6px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.main : '#dddddd')};
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#9f9f9f')};
  font-size: 14px;
  font-weight: 700;
`;

const MbtiWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MbtiTitle = styled.div`
  color: #575755;
  font-size: 14px;
  font-weight: 500;
`;

const MbtiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
`;

const Mbti = styled.button<{ isSelected: boolean }>`
  width: 50px;
  height: 40px;
  border-radius: 6px;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.main : '#dddddd')};
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#9f9f9f')};
  font-size: 14px;
  font-weight: 700;
`;

const SaveBtn = styled.button`
  width: 100%;
  height: 60px;
  margin-bottom: 94.47px;
  border-radius: 6px;
  background-color: #ffffff;
  color: ${(props) => props.theme.font};
  font-size: 16px;
  font-weight: 600;
`;

const Logout = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 6px;
  background-color: #ffffff;
  color: ${(props) => props.theme.font};
  font-size: 16px;
  font-weight: 700;
`;
