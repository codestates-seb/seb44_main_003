import { useState } from 'react';
import styled from 'styled-components';
import FirstQuestion from '../components/modal/questions/FirstQuestion';
import SecondQuestion from '../components/modal/questions/SecondQuestion';
import ThirdQuestion from '../components/modal/questions/ThirdQuestion';
import QuestionResult from '../components/modal/questions/QuestionResult'

const Recommend = () => {
  const [isModal, setIsModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const questionComponents = [
    FirstQuestion,
    SecondQuestion,
    ThirdQuestion,
    QuestionResult,
  ];

  const openModal = () => {
    setIsModal(true);
    setCurrentQuestion(1);
  };

  const closeModal = () => setIsModal(false);

  const handleNextClick = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <S_Wrapper>
      <Button onClick={openModal}>버튼</Button>
      {isModal &&
          questionComponents.map((Question, index) => (
            currentQuestion === index + 1 && (
              <Question
                key={index}
                isOpen={isModal}
                closeModal={closeModal}
                onNextClick={handleNextClick}
              />
            )
          ))}
  </S_Wrapper>
  )
}

export default Recommend

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
`;

const Button = styled.button`
  color: white;
`