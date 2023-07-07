import styled from 'styled-components';
import questionImage from '../../assets/recommendimage/recommend_kuroming.svg';
import question from '../../assets/recommendimage/question_1.png';
import netflix from '../../assets/recommendimage/netflix.svg';
import tving from '../../assets/recommendimage/tving.svg';
import disney from '../../assets/recommendimage/disney.svg';
import watcha from '../../assets/recommendimage/watcha.svg';
import wavve from '../../assets/recommendimage/wavve.svg';
import next from '../../assets/recommendimage/text_next.png';

const ottServices = [
  { name: '넷플릭스', icon: netflix },
  { name: '티빙', icon: tving },
  { name: '디즈니플러스', icon: disney },
  { name: '왓챠', icon: watcha },
  { name: '웨이브', icon: wavve },
]

const RecommendModal = () => {
  return (
    <S_Wrapper>
      <S_ModalBox>
        <S_QuestionImage src={questionImage} alt='kuroming'/>
        <S_Question src={question} alt='어떤 OTT 서비스를 이용하고 계신가요?'/>
        <S_SelectionBox>
          <S_TextBox>
            <S_Text>* 중복 선택 가능</S_Text>
          </S_TextBox>
          <S_OttList>
            {ottServices.map((ott) => (
              <S_OttBox>
                <S_OttIcon src={ott.icon} alt={ott.name}/>
                <div>{ott.name}</div>
              </S_OttBox>
            ))}
          </S_OttList>
          <S_ButtonBox>
            <S_Button>
              <S_ButtonText src={next} alt='next'></S_ButtonText>
            </S_Button>
          </S_ButtonBox>
        </S_SelectionBox>
        <S_ModalBackground/>
      </S_ModalBox>
    </S_Wrapper>
  )
}

export default RecommendModal

const S_Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 100px 0;
`

const S_ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #362C6D;
  border-radius: 250px;
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

const S_QuestionImage = styled.img`
`

const S_Question = styled.img`
`

const S_SelectionBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 820px;
  height: 360px;
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
  justify-content: space-between;
  align-items: center;
  padding: 50px 100px 40px 100px;
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
  filter: var(--shadow-modal-m-b);
`

const S_ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`

const S_Button = styled.button`
  border: 2px solid var(--color-bg-100);
  background-color: #A59BDC;
  box-shadow: 0 0 0 1px #aea5df inset,
        0 0 0 2px rgba(255,255,255,0.15) inset,
        0 8px 0 0 #6659B2,
        0 8px 0 2px var(--color-bg-100),
        0 8px 8px 2px var(--color-bg-60);
        
  position: relative;
  display: inline-block;
  padding: 8px 60px;
  border-radius: 50px;
  text-align: center;
  transition: top .01s linear;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);

  &:active {
    top: 9px;
    background-color: #796cc2;
    box-shadow: 0 0 0 1px #6659B2 inset,
        0 0 0 2px rgba(255,255,255,0.15) inset,
        0 0 0 1px rgba(0,0,0,0.4);
  }
`

const S_ButtonText = styled.img`
`