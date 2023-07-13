import { useState } from 'react';
import styled from 'styled-components';
import RecommendBtn from '../../ui/RecommendBtn';
import QuestionCard from '../../ui/QuestionCard';
import CloseBtn from '../../ui/CloseBtn';
import { questionList } from '../QuestionData'
import { category } from '../QuestionData'
import { Question } from '../../../types/types'

const SecondQuestion: React.FC<Question> = ({ isOpen, closeModal, onNextClick }) => {
  const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(null);

  const handleIconClick = (index: number) => {
    if (selectedIconIndex === index) {
      setSelectedIconIndex(null);
    } else {
      setSelectedIconIndex(index);
    }
  };

  return (
    <S_Wrapper style={{display: isOpen ? 'flex' : 'none'}}>
      <S_ModalBox>
        <CloseBtn onClick={closeModal}/>
        <QuestionCard question={questionList[1]}/>
        <S_SelectionBox>
          <S_TextBox>
            <S_Text></S_Text>
          </S_TextBox>
          <S_CategoryList>
            {category.map((cate, index) => (
              <S_CategoryBox key={cate.name} onClick={() => handleIconClick(index)}>
                <S_CategoryIcon
                  src={cate.icon}
                  alt={cate.name}
                  className={selectedIconIndex === index ? 'select' : ''}
                />
                <div>{cate.name}</div>
              </S_CategoryBox>
            ))}
          </S_CategoryList>
          <RecommendBtn 
            bgColor={'#F67CB3'} 
            bgShadow={'#C53C79'} 
            onClick={onNextClick}
          />
        </S_SelectionBox>
        <S_ModalBackground/>
      </S_ModalBox>
    </S_Wrapper>
  )
}

export default SecondQuestion

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
  background: #83395B;
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
  width: 80%;
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

const S_CategoryList = styled.div`
  display: flex;
  margin: 40px 80px;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
  /* padding: 50px 100px 40px 100px; */
`

const S_CategoryBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--color-bg-100);
  font-size: 18px;
  font-weight: 700;
`

const S_CategoryIcon = styled.img`
  margin-bottom: 5px;
  width: 130px;
  height: 130px;
  background: var(--color-white-100);
  object-fit: cover;
  filter: saturate(0);
  opacity: 0.8;
  transition: filter 0.2s, opacity 0.2s; 

  &.select {
    filter: none;
    opacity: 1;
  }
`