import styled from 'styled-components';
import next from '../../assets/recommendimage/next.png';

interface BtnColor {
  bgColor: string;
  bgShadow: string;
}

const RecommendBtn = ({ bgColor, bgShadow }: BtnColor) => {
  return (
    <S_ButtonBox> 
      <S_Button bgColor={bgColor} bgShadow={bgShadow}>
        <S_ButtonText src={next} alt='next'></S_ButtonText>
      </S_Button>
    </S_ButtonBox>
  )
}

export default RecommendBtn

const S_ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`

const S_Button = styled.button<BtnColor>`
  border: 2px solid var(--color-bg-100);
  background-color: ${(props) => props.bgColor};
  box-shadow: 0 0 0 1px ${(props) => props.bgColor} inset,
        0 0 0 2px rgba(255,255,255,0.15) inset,
        0 8px 0 0 ${(props) => props.bgShadow},
        0 8px 0 2px var(--color-bg-100),
        0 8px 8px 2px var(--color-bg-60);
        
  position: relative;
  display: inline-block;
  padding: 8px 60px;
  border-radius: 50px;
  text-align: center;
  transition: top .01s linear;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);
  margin-bottom: 15px;

  &:active {
    top: 9px;
    background-color: ${(props) => props.bgShadow};
    box-shadow: 0 0 0 1px ${(props) => props.bgShadow} inset,
        0 0 0 2px rgba(255,255,255,0.15) inset,
        0 0 0 1px rgba(0,0,0,0.4);
  }
`

const S_ButtonText = styled.img`
`