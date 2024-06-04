import { useNavigate } from 'react-router-dom';

import TopNavigation from '@layout/TopNavigation';
import MetaThemeColor from '@components/background/MetaThemeColor';

type AddNavProps = {
  children: React.ReactNode;
  title: string;
  isDemoMode: boolean;
  hasPrev: boolean;
  prevStep: () => void;
};

const NavigationLayout = ({ children, title, isDemoMode, hasPrev, prevStep }: AddNavProps) => {
  const navigate = useNavigate();
  return (
    <>
      <MetaThemeColor color="#F4F4F4" />
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
              <TopNavigation.TopBar.CenterTitle>
                {title}
                {isDemoMode && (
                  <span style={{ fontSize: '12px', color: '#47cfb0' }}> (체험중)</span>
                )}
              </TopNavigation.TopBar.CenterTitle>
            }
            rightContent={
              <TopNavigation.TopBar.CloseButton
                onClick={() => {
                  navigate(-1);
                }}
              />
            }
          />
        }
      />
      {children}
    </>
  );
};

export default NavigationLayout;
