import { useRecoilState } from 'recoil';
// import { selectedCategoryState } from '../../../recoil/atoms/Atoms';
import { recommendedContentsState } from '../../../recoil/atoms/Atoms';
import styled from 'styled-components';
import RecommendBtn from '../../ui/RecommendBtn';
import QuestionCard from '../../ui/QuestionCard';
import CloseBtn from '../../ui/CloseBtn';
import { questionList, category } from '../QuestionData'
import { Question } from '../../../types/types'
import btnText from '../../../assets/recommendimage/next.png';

const SecondQuestion: React.FC<Question> = ({ isOpen, closeModal, onNextClick }) => {
  const [recommendedContents, setRecommendedContents] = useRecoilState(recommendedContentsState);

  const handleIconClick = (clickedName: string) => {
    if (recommendedContents.category === clickedName) {
      setRecommendedContents({ ...recommendedContents, category: "" });
    } else {
      setRecommendedContents({ ...recommendedContents, category: clickedName });
    }
  };

  return (
    <S_Wrapper isOpen={isOpen}>
      <S_ModalBox>
        <CloseBtn onClick={closeModal}/>
        <QuestionCard question={questionList[1]}/>
        <S_SelectionBox>
          <S_CategoryList>
            {category.map((cate) => (
              <S_CategoryBox key={cate.name} onClick={() => handleIconClick(cate.categoryname)}>
                <S_CategoryIcon
                  src={cate.icon}
                  alt={cate.name}
                  className={recommendedContents.category === cate.categoryname ? 'select' : ''}
                />
                <div>{cate.name}</div>
              </S_CategoryBox>
            ))}
          </S_CategoryList>
          <RecommendBtn 
            bgColor={'#F67CB3'}
            bgShadow={'#C53C79'}
            btnText={btnText}
            onClick={onNextClick}
          />
        </S_SelectionBox>
        <S_ModalBackground/>
      </S_ModalBox>
    </S_Wrapper>
  )
}

export default SecondQuestion

const S_Wrapper = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const S_ModalBackground = styled.div`
  position: absolute;
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
`

const S_SelectionBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 80%;
  background: var(--color-white-100);
  border: 5px solid var(--color-bg-100);
  border-radius: 15px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.40);
  font-family: 'inter';
`

const S_CategoryList = styled.div`
  display: flex;
  margin: 40px 80px;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
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