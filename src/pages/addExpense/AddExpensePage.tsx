// 소비 입력 페이지
import styled from 'styled-components';
import TopNavigation from '@layout/TopNavigation';
import type { NavLayoutProps } from '../../types/navigationTypes';

import { useNavigate } from 'react-router-dom';

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
            centerContent={<div>소비 입력</div>}
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
  return (
    <NavigationLayout>
      <AddExpenseContainer>입력페이지</AddExpenseContainer>
    </NavigationLayout>
  );
};

export default AddExpensePage;
const AddExpenseContainer = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  color: black;
  overflow: auto;
`;
