import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { recommendedContentsState } from '../../../recoil/atoms/Atoms';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import RecommendBtn from '../../ui/RecommendBtn';
import QuestionCard from '../../ui/QuestionCard';
import CloseBtn from '../../ui/CloseBtn';
import { questionList, genres } from '../QuestionData';
import { Question } from '../../../types/types';
import btnNext from '../../../assets/recommendimage/nextBtnText.webp';

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
            {genres.map((genre) => (
              <S_GenreBox key={genre}>
                <S_CheckBox
                  checked={recommendedContents.interests.includes(genre)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleGenreCheckboxClick(e.target.checked, genre)
                  }
                />
                <div>{genre}</div>
              </S_GenreBox>
            ))}
          </S_GenreList>
          <RecommendBtn
            bgColor={'#F7CD40'}
            bgShadow={'#C17932'}
            btnText={btnNext}
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
  width: 100%;
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
  background: var(--color-white-100);
  border: 5px solid var(--color-bg-100);
  border-radius: 15px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.4);
  font-family: 'inter';
  overflow: auto;
`;

const S_TextBox = styled.div`
  display: flex;
  justify-content: right;
`;

const S_Text = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: var(--color-bg-100);
`;

const S_GenreList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 35px 5px;
  justify-content: center;
  align-items: center;
  margin: 30px 40px;
`;

const S_GenreBox = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-bg-100);
  font-size: 18px;
  font-weight: 700;
`;

const S_CheckBox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  width: 30px;
  height: 30px;
  appearance: none; // 기본 체크박스 스타일을 제거
  background: var(--color-white-100);
  object-fit: cover;
  border: 2px solid var(--color-bg-100);
  border-radius: 5px;
  &:checked {
    background-color: #f7cd40;
  }
`;
