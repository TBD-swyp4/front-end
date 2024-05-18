import { useState } from 'react';
import styled from 'styled-components';

type Category = { id: string; name: string; component: JSX.Element };

type CategoriesViewProps = {
  categories: Category[];
};
const CategoriesView = ({ categories }: CategoriesViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].id);

  const handleClick = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <>
      <ButtonContainer>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            onClick={() => handleClick(category.id)}
            $isSelected={category.id === selectedCategory}>
            {category.name}
          </CategoryButton>
        ))}
      </ButtonContainer>
      {categories.map((category) => selectedCategory === category.id && category.component)}
    </>
  );
};

export default CategoriesView;

const ButtonContainer = styled.div`
  display: flex;
  gap: 4px;
  border-radius: 6px;
  background-color: #ffffff;
  padding: 5px;
  justify-content: center;
  width: fit-content;
`;

const CategoryButton = styled.button<{ $isSelected: boolean }>`
  width: 80px;
  height: 30px;
  border-radius: 6px;
  background-color: ${(props) => (props.$isSelected ? '#47cfb0' : '#E3E3E3')};
  color: ${(props) => (props.$isSelected ? '#ffffff' : '#9F9F9F')};
`;
