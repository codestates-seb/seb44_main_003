import { useState } from 'react';
import { useRecoilState } from "recoil";
import { recommendModalState } from "../../recoil/atoms/Atoms";
import styled from 'styled-components';
import FirstQuestion from './questions/FirstQuestion';
import SecondQuestion from './questions/SecondQuestion';
import ThirdQuestion from './questions/ThirdQuestion';
import QuestionResult from './questions/QuestionResult'

const Recommend = () => {
  const [isRecommendModal, setIsRecommendModal] = useRecoilState(recommendModalState);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const questionComponents = [
    FirstQuestion,
    SecondQuestion,
    ThirdQuestion,
    QuestionResult,
  ];

  const closeModal = () => {
    setIsRecommendModal(false);
    setCurrentQuestion(1);
  };

  const closeModalOnOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleNextClick = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    isRecommendModal && (
      <S_Wrapper onClick={closeModalOnOutsideClick}>
        {questionComponents.map((Question, index) => (
          currentQuestion === index + 1 && (
            <Question
              key={index}
              isOpen={isRecommendModal}
              closeModal={closeModal}
              onNextClick={handleNextClick}
            />
          )
        ))}
      </S_Wrapper>
    )
  );
}

export default Recommend

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5); // 연한 검정색 반투명 배경
  width: 100%;
  height: 100%;
`;