import styled from 'styled-components';

interface QuestionType {
  characterImage: string;
  characterName: string;
  questionImage: string;
  questionText: string;
}

const QuestionCard = ({ question }: { question: QuestionType }) => {
  return (
    <S_Wrapper>
      <S_Character src={question.characterImage} alt={question.characterName} />
      <S_Question src={question.questionImage} alt={question.questionText} />
    </S_Wrapper>
  );
};

export default QuestionCard;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const S_Character = styled.img`
  height: 150px;

  @media only screen and (max-width: 770px) {
    height: 130px;
  }

  @media only screen and (max-width: 480px) {
    height: 100px;
  }
`;

const S_Question = styled.img``;
