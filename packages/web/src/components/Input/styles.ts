import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #ffffff;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${({ isErrored }) => isErrored
    && css`
      border-color: #e25335;
    `}

  ${({ isFocused }) => isFocused
    && css`
      color: #0083ca;
      border-color: #0083ca;
    `}

  ${({ isFilled }) => isFilled
    && css`
      color: #0083ca;
    `}



  input {
    flex: 1;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #e25335;
    color: #fff;
    &::before {
      border-color: #e25335 transparent;
    }
  }
`;
