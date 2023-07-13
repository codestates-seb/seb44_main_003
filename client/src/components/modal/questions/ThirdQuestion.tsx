import styled from 'styled-components';
import RecommendBtn from '../../ui/RecommendBtn';
import QuestionCard from '../../ui/QuestionCard';
import CloseBtn from '../../ui/CloseBtn';
import { questionList } from '../QuestionData'
import { genres } from '../QuestionData'
import { Question } from '../../../types/types'

const ThirdQuestion: React.FC<Question> = ({ isOpen, closeModal, onNextClick }) => {
  return (
    <S_Wrapper style={{display: isOpen ? 'flex' : 'none'}}>
      <S_ModalBox>
        <CloseBtn onClick={closeModal}/>
        <QuestionCard question={questionList[2]}/>
        <S_SelectionBox>
          <S_TextBox>
            <S_Text>* 최대 3개 선택 가능</S_Text>
          </S_TextBox>
          <S_GenreList>
            {genres.map((genre) => (
              <S_GenreBox key={genre}>
                <S_CheckBox/>
                <div>{genre}</div>
              </S_GenreBox>
            ))}
          </S_GenreList>
          <RecommendBtn bgColor={'#F7CD40'} bgShadow={'#C17932'} onClick={onNextClick}/>
        </S_SelectionBox>
        <S_ModalBackground/>
      </S_ModalBox>
    </S_Wrapper>
  )
}

export default ThirdQuestion

const S_Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const S_ModalBackground = styled.div`
  position: absolute;
  /* width: 100%;
  height: 100%; */
  width: 840px;
  height: 700px;
  background: #775720;
  border-radius: 240px;
  filter: blur(50px);
  z-index: -1;
`

const S_ModalBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 840px;
  height: 700px;
  /* border: 1px solid red; */
`

const S_SelectionBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* width: 820px; */
  /* height: 360px; */
  background: var(--color-white-100);
  border: 5px solid var(--color-bg-100);
  border-radius: 15px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.40);
  font-family: 'inter';
`

const S_TextBox = styled.div`
  display: flex;
  justify-content: right;
`

const S_Text = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: var(--color-bg-100);
`

const S_GenreList = styled.div`
  display: flex;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 50px 80px;
  gap: 40px;
  justify-content: center;
  align-items: center;
  /* padding: 50px 100px 40px 100px; */
`

const S_GenreBox = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-bg-100);
  font-size: 18px;
  font-weight: 700;
`

const S_CheckBox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  width: 30px;
  height: 30px;
  appearance: none; // 기본 체크박스 스타일을 제거
  background: var(--color-white-100);
  object-fit: cover;
  border: 2px solid var(--color-bg-100);
  border-radius: 5px;
  /* filter: var(--shadow-modal-m-b); */
  &:checked {
    background-color: #F7CD40;
  }
`