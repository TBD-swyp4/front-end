import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsDemoMode from '@hooks/useIsDemo';

import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import MonthNavigatorBtn from '@components/date/MonthNavigatorBtn';

import Background from '@components/background';
import MetaThemeColor from '@components/background/MetaThemeColor';

import { PagePath } from '@models/navigation';

type MainNavProps = {
  currentDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  children: React.ReactNode;
};

const NavigationLayout = ({ children, currentDate, previousMonth, nextMonth }: MainNavProps) => {
  const navigate = useNavigate();
  const mainColor = { color: '#ffffff' };
  const monthNavProps = { currentDate, previousMonth, nextMonth, ...mainColor };
  const isDemoMode = useIsDemoMode();

  const [showBackground, setShowBackground] = useState<boolean>(false);

  useEffect(() => {
    setShowBackground(true);
    return () => {
      setShowBackground(false);
    };
  }, []);
  return (
    <>
      <MetaThemeColor color="#47CFB0" />
      <TopNavigation
        _TopBar={
          <TopNavigation.TopBar
            leftContent={<TopNavigation.TopBar.LogoWhiteButton />}
            centerContent={
              isDemoMode && (
                <TopNavigation.TopBar.CenterTitle style={{ color: '#ffffffb5' }}>
                  체험중
                </TopNavigation.TopBar.CenterTitle>
              )
            }
            rightContent={
              <TopNavigation.TopBar.SettingGreenButton
                style={mainColor}
                onClick={() => {
                  navigate(PagePath.Setting);
                }}
              />
            }
          />
        }
        _Extension={
          <MonthNavWrapper>
            <MonthNavigatorBtn {...monthNavProps} />
          </MonthNavWrapper>
        }
      />
      {children}
      <BottomNavigation location={PagePath.Main} />
      {showBackground && <Background height="36%" color="#47CFB0" />}
    </>
  );
};

export default NavigationLayout;

const MonthNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
`;
