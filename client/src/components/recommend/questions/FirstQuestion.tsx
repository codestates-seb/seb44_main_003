import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import CloseBtn from '@/components/recommend/buttons/CloseBtn';
import MoveBtn from '@/components/recommend/buttons/MoveBtn';
import QuestionCard from '@/components/recommend/questions/QuestionCard';
import {
  questionList,
  ottServices,
  moveNextBtn,
} from '@/constant/questionData';
import { recommendedContentsState } from '@/recoil/atoms/Atoms';
import { Question } from '@/types/types';

const FirstQuestion: React.FC<Question> = ({ closeModal, onNextClick }) => {
  const [recommendedContents, setRecommendedContents] = useRecoilState(
    recommendedContentsState
  );
  const [isAnySelected, setIsAnySelected] = useState(false);

  useEffect(() => {
    setIsAnySelected(recommendedContents.memberOtts.length > 0);
  }, [recommendedContents.memberOtts]);

  const handleIconClick = (clickedName: string) => {
    const isSelected = recommendedContents.memberOtts.indexOf(clickedName) > -1;

    setRecommendedContents({
      ...recommendedContents,
      memberOtts: isSelected
        ? recommendedContents.memberOtts.filter((name) => name !== clickedName)
        : [...recommendedContents.memberOtts, clickedName],
    });
  };

  return (
    <S_Wrapper
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      <S_ModalBox>
        <CloseBtn onClick={closeModal} />
        <QuestionCard question={questionList[0]} />
        <S_SelectionBox>
          <S_TextBox>
            <S_Text>* 중복 선택 가능</S_Text>
          </S_TextBox>
          <S_OttList>
            {Object.values(ottServices).map((ott) => {
              const isSelected = recommendedContents.memberOtts.includes(
                ott.ottname
              );
              return (
                <S_OttBox
                  key={ott.name}
                  onClick={() => handleIconClick(ott.ottname)}
                >
                  <S_OttIcon
                    src={ott.icon}
                    alt={ott.name}
                    className={isSelected ? 'select' : ''}
                  />
                  <S_OttName>{ott.name}</S_OttName>
                </S_OttBox>
              );
            })}
          </S_OttList>
          <MoveBtn
            bgColor={'#A59BDC'}
            bgShadow={'#6659B2'}
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

export default FirstQuestion;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  font-family: 'inter';
  font-size: 18px;
  font-weight: 700;

  @media only screen and (max-width: 770px) {
    width: 620px;
    font-size: 16px;
  }

  @media only screen and (max-width: 480px) {
    width: 330px;
    font-size: 12px;
  }
`;

const S_ModalBackground = styled.div`
  position: absolute;
  width: 840px;
  height: 700px;
  background: #362c6d;
  border-radius: 240px;
  filter: blur(50px);
  z-index: -1;
`;

const S_SelectionBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  height: 350px;
  background: var(--color-white-100);
  border: 5px solid var(--color-bg-100);
  border-radius: 15px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.4);

  @media only screen and (max-width: 770px) {
    height: 300px;
  }

  @media only screen and (max-width: 480px) {
    height: 380px;
  }
`;

const S_TextBox = styled.div`
  display: flex;
  justify-content: right;
`;

const S_Text = styled.p`
  color: var(--color-bg-100);
`;

const S_OttList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 50px 50px 30px;
  gap: 18px;

  @media only screen and (max-width: 770px) {
    margin: 40px 40px 20px;
  }

  @media only screen and (max-width: 480px) {
    margin: 30px 30px 10px;
  }
`;

const S_OttBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;
  width: calc(100% / 4 - 20px);
  color: var(--color-bg-100);

  @media only screen and (max-width: 480px) {
    width: calc(100% / 2 - 10px);
  }
`;

const S_OttIcon = styled.img`
  margin-bottom: 5px;
  background: var(--color-white-100);
  object-fit: cover;
  border: 2px solid var(--color-bg-100);
  border-radius: 10px;
  filter: saturate(0);
  opacity: 0.8;
  transition: filter 0.2s, opacity 0.2s;
  cursor: pointer;
  width: 90px;
  height: 90px;

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
    width: 70px;
    height: 70px;
  }

  @media only screen and (max-width: 480px) {
    width: 65px;
    height: 65px;
  }
`;

const S_OttName = styled.div``;
