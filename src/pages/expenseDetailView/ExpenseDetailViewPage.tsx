import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';

import { useNavigate } from 'react-router-dom';

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
              <TopNavigation.TopBar.PrevButton
                onClick={() => {
                  alert('Click Prev');
                }}
              />
            }
            centerContent={
              <TopNavigation.TopBar.CenterTitle>Details</TopNavigation.TopBar.CenterTitle>
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

const ExpenseDetailViewPage = () => {
  const { id } = useParams();
  return (
    <NavigationLayout>
      <ExpenseDetailContainer>
        <div>{`아이디 '${id}'의 디테일`}</div>
      </ExpenseDetailContainer>
    </NavigationLayout>
  );
};

export default ExpenseDetailViewPage;

const ExpenseDetailContainer = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  color: black;
  overflow: auto;
`;
