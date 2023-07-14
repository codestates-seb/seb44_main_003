import styled from 'styled-components';

interface BtnColor {
  bgColor: string;
  bgShadow: string;
  btnText: string;
  onClick?: () => void;
}

const RecommendBtn: React.FC<BtnColor> = ({ bgColor, bgShadow, btnText, onClick = () => {} }) => {
  return (
    <S_ButtonBox> 
      <S_Button bgColor={bgColor} bgShadow={bgShadow} onClick={onClick}>
        <S_ButtonText src={btnText} alt='button'></S_ButtonText>
      </S_Button>
    </S_ButtonBox>
  )
}

export default RecommendBtn

const S_ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`

const S_Button = styled.button<{ bgColor: string, bgShadow: string;}>`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  padding: 8px 15px;
  border: 2px solid var(--color-bg-100);
  background-color: ${(props) => props.bgColor};
  box-shadow: 0 0 0 1px ${(props) => props.bgColor} inset,
        0 0 0 2px rgba(255,255,255,0.15) inset,
        0 8px 0 0 ${(props) => props.bgShadow},
        0 8px 0 2px var(--color-bg-100),
        0 8px 8px 2px var(--color-bg-60);
  border-radius: 50px;
  transition: top .01s linear;
  text-shadow: 0 1px 0 rgba(0,0,0,0.15);

  &:active {
    top: 9px;
    background-color: ${(props) => props.bgShadow};
    box-shadow: 0 0 0 1px ${(props) => props.bgShadow} inset,
        0 0 0 2px rgba(255,255,255,0.15) inset,
        0 0 0 1px rgba(0,0,0,0.4);
  }
`

const S_ButtonText = styled.img`
  margin: 0 10px;
`