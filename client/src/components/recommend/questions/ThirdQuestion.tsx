import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import CloseBtn from '@/components/recommend/buttons/CloseBtn';
import MoveBtn from '@/components/recommend/buttons/MoveBtn';
import QuestionCard from '@/components/recommend/questions/QuestionCard';
import { genres } from '@/constant/constantValue';
import {
  questionList,
  moveResultBtn,
  beehappy,
  beesad,
} from '@/constant/questionData';
import { recommendedContentsState } from '@/recoil/atoms/Atoms';
import { Question } from '@/types/types';

const ThirdQuestion: React.FC<Question> = ({ closeModal, onNextClick }) => {
  const [recommendedContents, setRecommendedContents] = useRecoilState(
    recommendedContentsState
  );
  const [isAnySelected, setIsAnySelected] = useState(false);

  useEffect(() => {
    setIsAnySelected(recommendedContents.interests.length > 0);
  }, [recommendedContents.interests]);

  const handleGenreCheckboxClick = (isChecked: boolean, genre: string) => {
    if (isChecked && recommendedContents.interests.length < 5) {
      setRecommendedContents({
        ...recommendedContents,
        interests: [...recommendedContents.interests, genre],
      });
    } else if (!isChecked) {
      setRecommendedContents({
        ...recommendedContents,
        interests: recommendedContents.interests.filter(
          (interest) => interest !== genre
        ),
      });
    }
  };

  return (
    <S_Wrapper
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      <S_ModalBox>
        <CloseBtn onClick={closeModal} />
        <QuestionCard question={questionList[2]} />
        <S_SelectionBox>
          <S_TextBox>
            <S_Text>* 최대 5개 선택 가능</S_Text>
          </S_TextBox>
          <S_GenreList>
            {genres.slice(0, 12).map((genre) => (
              <S_GenreBox key={genre}>
                <S_CheckBox
                  id={`check${genre}`}
                  checked={recommendedContents.interests.includes(genre)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleGenreCheckboxClick(e.target.checked, genre)
                  }
                />
                <S_CheckText htmlFor={`check${genre}`}>{genre}</S_CheckText>
              </S_GenreBox>
            ))}
          </S_GenreList>
          <MoveBtn
            bgColor={'#F7CD40'}
            bgShadow={'#C17932'}
            btnText={moveResultBtn.text}
            btnAlt={moveResultBtn.name}
            onClick={onNextClick}
            disabled={!isAnySelected}
          />
        </S_SelectionBox>
        <S_ModalBackground />
      </S_ModalBox>
    </S_Wrapper>
  );
};

export default ThirdQuestion;

const S_Wrapper = styled.div`
  display: flex;
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
  background: #775720;
  border-radius: 240px;
  filter: blur(50px);
  z-index: -1;
`;

const S_SelectionBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 90%;
  height: 380px;
  background: var(--color-white-100);
  border: 5px solid var(--color-bg-100);
  border-radius: 15px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.4);
  font-family: 'inter';
  font-size: 18px;
  font-weight: 700;
  color: var(--color-bg-100);
  overflow: auto;

  @media only screen and (max-width: 770px) {
    height: 395px;
    font-size: 16px;
  }

  @media only screen and (max-width: 480px) {
    height: 415px;
    font-size: 12px;
  }
`;

const S_TextBox = styled.div`
  display: flex;
  justify-content: right;
`;

const S_Text = styled.p``;

const S_GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 35px 5px;
  justify-content: space-between;
  align-items: center;
  margin: 30px 20px;

  @media only screen and (max-width: 770px) {
    gap: 20px 5px;
  }

  @media only screen and (max-width: 480px) {
    margin: 15px 10px;
  }
`;

const S_GenreBox = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% / 4 - 10px);

  @media only screen and (max-width: 770px) {
    width: calc(100% / 3 - 10px);
  }

  @media only screen and (max-width: 480px) {
    justify-content: center;
    flex-direction: column;
  }
`;

const S_CheckBox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  width: 35px;
  height: 35px;
  appearance: none;
  filter: saturate(0);
  background-image: url(${beesad.text});
  background-size: cover;
  background-position: center;
  opacity: 0.4;
  transition: filter 0.1s, opacity 0.1s;
  cursor: pointer;

  &:checked {
    background-image: url(${beehappy.text});
    filter: none;
    opacity: 1;
  }

  @media (hover: hover) {
    &:hover {
      background-image: url(${beehappy.text});
      filter: brightness(100%);
    }
  }

  @media only screen and (max-width: 480px) {
    margin-right: 0px;
  }
`;

const S_CheckText = styled.label`
  cursor: pointer;
`;
