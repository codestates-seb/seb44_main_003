import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import CloseBtn from '@/components/recommend/buttons/CloseBtn';
import MoveBtn from '@/components/recommend/buttons/MoveBtn';
import QuestionCard from '@/components/recommend/questions/QuestionCard';
import { questionList, category, moveNextBtn } from '@/constant/questionData';
import { recommendedContentsState } from '@/recoil/atoms/Atoms';
import { Question } from '@/types/types';

const SecondQuestion: React.FC<Question> = ({ closeModal, onNextClick }) => {
  const [recommendedContents, setRecommendedContents] = useRecoilState(
    recommendedContentsState
  );
  const [isAnySelected, setIsAnySelected] = useState(false);

  useEffect(() => {
    setIsAnySelected(recommendedContents.category !== '');
  }, [recommendedContents.category]);

  const handleIconClick = (clickedName: string) => {
    if (recommendedContents.category === clickedName) {
      setRecommendedContents({ ...recommendedContents, category: '' });
    } else {
      setRecommendedContents({ ...recommendedContents, category: clickedName });
    }
  };

  return (
    <S_Wrapper
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      <S_ModalBox>
        <CloseBtn onClick={closeModal} />
        <QuestionCard question={questionList[1]} />
        <S_SelectionBox>
          <S_CategoryList>
            {category.map((cate) => (
              <S_CategoryBox
                key={cate.name}
                onClick={() => handleIconClick(cate.categoryname)}
              >
                <S_CategoryIcon
                  src={cate.icon}
                  alt={cate.name}
                  className={
                    recommendedContents.category === cate.categoryname
                      ? 'select'
                      : ''
                  }
                />
                <div>{cate.name}</div>
              </S_CategoryBox>
            ))}
          </S_CategoryList>
          <MoveBtn
            bgColor={'#F67CB3'}
            bgShadow={'#C53C79'}
            btnText={moveNextBtn.text}
            btnAlt={moveNextBtn.name}
            onClick={onNextClick}
            disabled={!isAnySelected}
          />
        </S_SelectionBox>
        <S_ModalBackground />
      </S_ModalBox>
    </S_Wrapper>
  );
};

export default SecondQuestion;

const S_Wrapper = styled.div`
  display: 'flex';
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const S_ModalBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 820px;
  height: 100%;
`;

const S_ModalBackground = styled.div`
  position: absolute;
  width: 840px;
  height: 700px;
  background: #83395b;
  border-radius: 240px;
  filter: blur(50px);
  z-index: -1;
`;

const S_SelectionBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 90%;
  height: 350px;
  background: var(--color-white-100);
  border: 5px solid var(--color-bg-100);
  border-radius: 15px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.4);
  font-family: 'inter';
`;

const S_CategoryList = styled.div`
  display: flex;
  margin: 40px 0px;
  justify-content: center;
  align-items: center;
  gap: 80px;

  @media only screen and (max-width: 770px) {
    gap: 60px;
  }

  @media only screen and (max-width: 480px) {
    gap: 40px;
  }
`;

const S_CategoryBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--color-bg-100);
  font-size: 18px;
  font-weight: 700;

  @media only screen and (max-width: 770px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const S_CategoryIcon = styled.img`
  margin-bottom: 5px;
  width: 130px;
  height: 130px;
  background: var(--color-white-100);
  object-fit: cover;
  filter: saturate(0);
  opacity: 0.8;
  transition: filter 0.2s, opacity 0.2s;
  cursor: pointer;

  &.select {
    filter: none;
    opacity: 1;
  }

  @media (hover: hover) {
    &:hover {
      filter: brightness(100%);
    }
  }

  @media only screen and (max-width: 770px) {
    width: 120px;
    height: 120px;
  }

  @media only screen and (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;
