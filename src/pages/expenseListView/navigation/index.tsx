import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TopNavigation from '@layout/TopNavigation';
import BottomNavigation from '@layout/BottomNavigation';

import Background from '@components/background';
import MetaThemeColor from '@components/background/MetaThemeColor';

import { PagePath } from '@models/navigation';

type NavLayoutProps = {
  children: React.ReactNode;
  isDemoMode: boolean;
};

const NavigationLayout = ({ children, isDemoMode }: NavLayoutProps) => {
  const navigate = useNavigate();

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
            centerContent={
              <TopNavigation.TopBar.CenterTitle style={{ color: '#ffffff' }}>
                내역 조회
                {isDemoMode && (
                  <span style={{ fontSize: '12px', color: '#ffffff' }}> (체험중)</span>
                )}
              </TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <TopNavigation.TopBar.SettingGreenButton
                onClick={() => {
                  navigate(PagePath.Setting);
                }}
              />
            }
          />
        }
      />
      {children}
      <BottomNavigation location={PagePath.ExpenseListView} />
      {showBackground && <Background height="60px" color="#47CFB0" />}
    </>
  );
};

export default NavigationLayout;
