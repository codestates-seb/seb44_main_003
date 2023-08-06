import styled from 'styled-components';

interface BtnProps {
  bgColor: string;
  bgShadow: string;
  btnText: string;
  btnAlt: string;
  onClick?: () => void;
  disabled?: boolean;
}

const MoveBtn: React.FC<BtnProps> = ({
  bgColor,
  bgShadow,
  btnText,
  btnAlt,
  onClick = () => {},
  disabled,
}) => {
  return (
    <S_ButtonBox>
      <S_Button
        bgColor={bgColor}
        bgShadow={bgShadow}
        onClick={onClick}
        disabled={disabled}
      >
        <S_ButtonText src={btnText} alt={btnAlt}></S_ButtonText>
      </S_Button>
    </S_ButtonBox>
  );
};

export default MoveBtn;

const S_ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

const S_Button = styled.button<{
  bgColor: string;
  bgShadow: string;
  disabled?: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  padding: 8px 15px;
  border: 2px solid var(--color-bg-100);
  border-radius: 50px;
  transition: top 0.01s linear;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);

  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  top: ${(props) => (props.disabled ? '9px' : '0')};
  filter: ${(props) => (props.disabled ? 'saturate(0)' : 'none')};
  background-color: ${(props) =>
    props.disabled ? props.bgShadow : props.bgColor};
  box-shadow: ${(props) =>
    props.disabled
      ? 'none'
      : `0 0 0 1px ${props.bgColor} inset,
        0 0 0 2px rgba(255,255,255,0.15) inset,
        0 8px 0 0 ${props.bgShadow},
        0 8px 0 2px var(--color-bg-100),
        0 8px 8px 2px var(--color-bg-60)`};

  &:active {
    top: 9px;
    background-color: ${(props) => props.bgShadow};
    box-shadow: 0 0 0 1px ${(props) => props.bgShadow} inset,
      0 0 0 2px rgba(255, 255, 255, 0.15) inset, 0 0 0 1px rgba(0, 0, 0, 0.4);
  }
`;

const S_ButtonText = styled.img`
  margin: 0 15px;
  height: 30px;
  @media only screen and (max-width: 1200px) {
    height: 30px;
  }

  @media only screen and (max-width: 770px) {
    height: 25px;
  }

  @media only screen and (max-width: 480px) {
    height: 18px;
  }
`;
