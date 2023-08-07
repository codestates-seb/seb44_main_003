import { ButtonHTMLAttributes } from 'react';
import { styled, css } from 'styled-components';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: 'default' | 'primary' | 'solid' | 'warn';
};

export default function Button({
  onClick,
  children,
  variant = 'default',
}: ButtonProps) {
  return (
    <S_Button onClick={onClick} variant={variant}>
      {children}
    </S_Button>
  );
}
const VARIANT = {
  default: css`
    color: var(--color-white-80);
    background-color: #d9d9d933;
    border: 1px solid var(--color-white-80);
    backdrop-filter: blur(3px);
    &:hover {
      background-color: var(--color-white-60);
      border: 1px solid white;
      color: white;
    }
  `,
  primary: css`
    color: var(--color-white-80);
    background-color: #ffff0033;
    border: 1px solid var(--color-white-60);
    backdrop-filter: blur(3px);
    &:hover {
      background-color: #ffff0060;
      border: 1px solid white;
      color: white;
    }
  `,
  solid: css`
    color: white;
    border: 1px solid #fff;
    background-color: var(--color-bg-100);
    &:hover {
      background-color: var(--color-bg-100);
    }
  `,
  warn: css`
    color: var(--color-white-80);
    background-color: #d9d9d933;
    backdrop-filter: blur(3px);
    &:hover {
      border: 1px solid rgba(255, 0, 0, 0.7);
      background-color: #ff00004d;
      color: white;
    }
  `,
};

const S_Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  min-width: max-content;
  transition: all 0.3s ease;
  ${(props) => props.variant && VARIANT[props.variant]}
`;
