import { useState } from 'react';
import { useResetRecoilState } from 'recoil';
import { recommendedContentsState } from '../../../recoil/atoms/Atoms';
import styled from 'styled-components';
import FirstQuestion from './FirstQuestion';
import SecondQuestion from './SecondQuestion';
import ThirdQuestion from './ThirdQuestion';
import QuestionResult from './QuestionResult';
import { useModal } from '../../../hooks/useModal';

const RecommendModal = () => {
  const resetRecommendedContents = useResetRecoilState(
    recommendedContentsState
  );
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const { closeModal } = useModal();

  const questionComponents = [
    FirstQuestion,
    SecondQuestion,
    ThirdQuestion,
    QuestionResult,
  ];

  const resetModal = () => {
    closeModal();
    setCurrentQuestion(1);
  };

  const handleNextClick = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleReset = () => {
    setCurrentQuestion(1);
    resetRecommendedContents();
  };

  return (
    <S_Wrapper onClick={() => closeModal()}>
      {questionComponents.map(
        (Question, index) =>
          currentQuestion === index + 1 && (
            <Question
              key={index}
              closeModal={resetModal}
              onNextClick={handleNextClick}
              onReset={handleReset}
            />
          )
      )}
    </S_Wrapper>
  );
};

export default RecommendModal;

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
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;
