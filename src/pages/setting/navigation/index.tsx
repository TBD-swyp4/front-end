import { useNavigate, useSearchParams } from 'react-router-dom';

import TopBar from '@components/layout/TopBar';
import TopNavigation from '@layout/TopNavigation';

import MetaThemeColor from '@components/background/MetaThemeColor';
import { PagePath } from '@models/navigation';

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

export default NavigationLayout;
