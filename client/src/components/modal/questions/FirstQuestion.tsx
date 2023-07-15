import { useRecoilState } from 'recoil';
import { recommendedContentsState } from '../../../recoil/atoms/Atoms';
import styled from 'styled-components';
import RecommendBtn from '../../ui/RecommendBtn';
import QuestionCard from '../../ui/QuestionCard';
import CloseBtn from '../../ui/CloseBtn';
import { questionList, ottServices } from '../QuestionData'
import { Question } from '../../../types/types'
import btnText from '../../../assets/recommendimage/next.png';

const FirstQuestion: React.FC<Question> = ({ isOpen, closeModal, onNextClick }) => {
  const [recommendedContents, setRecommendedContents] = useRecoilState(recommendedContentsState);

  const handleIconClick = (clickedName: string) => {
    const isSelected = recommendedContents.memberOtts.indexOf(clickedName) > -1;

    setRecommendedContents({
      ...recommendedContents,
      memberOtts: isSelected
        ? recommendedContents.memberOtts.filter(name => name !== clickedName)
        : [...recommendedContents.memberOtts, clickedName],
    });
  };

  return (
    <S_Wrapper
      isOpen={isOpen}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      <S_ModalBox>
        <CloseBtn onClick={closeModal}/>
        <QuestionCard question={questionList[0]}/>
        <S_SelectionBox>
          <S_TextBox>
            <S_Text>* 중복 선택 가능</S_Text>
          </S_TextBox>
          <S_OttList>
            {Object.values(ottServices).map((ott) => {
              const isSelected = recommendedContents.memberOtts.includes(ott.ottname);
              return (
                <S_OttBox key={ott.name} onClick={() => handleIconClick(ott.ottname)}>
                  <S_OttIcon
                    src={ott.icon}
                    alt={ott.name}
                    className={isSelected ? 'select' : ''}
                  />
                  <div>{ott.name}</div>
                </S_OttBox>
              );
            })}
          </S_OttList>
          <RecommendBtn
            bgColor={'#A59BDC'}
            bgShadow={'#6659B2'}
            btnText={btnText}
            onClick={onNextClick}
          />
        </S_SelectionBox>
        <S_ModalBackground/>
      </S_ModalBox>
    </S_Wrapper>
  )
}

export default FirstQuestion

const S_Wrapper = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const S_ModalBackground = styled.div`
  position: absolute;
  width: 840px;
  height: 700px;
  background: #362C6D;
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

const S_OttList = styled.div`
  display: flex;
  margin: 50px 80px;
  gap: 40px;
  justify-content: center;
  align-items: center;
`

const S_OttBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--color-bg-100);
  font-size: 18px;
  font-weight: 700;
`

const S_OttIcon = styled.img`
  margin-bottom: 5px;
  width: 90px;
  height: 90px;
  background: var(--color-white-100);
  object-fit: cover;
  border: 2px solid var(--color-bg-100);
  border-radius: 10px;
  filter: saturate(0);
  opacity: 0.8;
  transition: filter 0.2s, opacity 0.2s; 

  &.select {
    filter: none;
    opacity: 1;
  }
`