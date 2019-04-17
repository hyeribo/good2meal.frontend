import React from 'react';
import styled from 'styled-components';


const defaultColorSet = {
  default: {
    backgroundColor: '#fff',
    color: '#333',
    borderColor: '#ccc'
  },
  red: {
    backgroundColor: '#f00',
    color: '#fff',
    borderColor: '#f00'
  },
  blue: {
    backgroundColor: '#00f',
    color: '#fff',
    borderColor: '#00f'
  },
  green: {
    backgroundColor: '#52c41a',
    color: '#fff',
    borderColor: '#52c41a'
  }
}

const outlinedColorSet = {
  default: {
    backgroundColor: 'unset',
    color: '#fff',
    borderColor: '#ccc'
  },
  red: {
    backgroundColor: 'unset',
    color: '#000',
    borderColor: '#f00'
  },
  blue: {
    backgroundColor: 'unset',
    color: '#00f',
    borderColor: '#00f'
  },
  green: {
    backgroundColor: 'unset',
    color: '#52c41a',
    borderColor: '#52c41a'
  }
}

const Button = (props) => {
  const { size = 'default', color = 'default', outlined = false } = props;
  const colors = outlined ? outlinedColorSet[color] : defaultColorSet[color];
  if(size === 'default') return (<ColorButton as={DefaultButton} {...props} colors={colors}>{ props.children }</ColorButton>);
  if(size === 'small') return (<ColorButton as={SmallButton} {...props} colors={colors}>{ props.children }</ColorButton>);
  if(size === 'large') return (<ColorButton as={LargeButton} {...props} colors={colors}>{ props.children }</ColorButton>);
}


const SmallButton = styled.button`
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  border-radius: 5px;
  font-size: 13px;
  i:not(:only-child) {
    margin-right: 6px;
  }
`;
const DefaultButton = styled.button`
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 13px;
  i:not(:only-child) {
    margin-right: 8px;
  }
`;
const LargeButton = styled.button`
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
  border-radius: 5px;
  font-size: 14px;
  i:not(:only-child) {
    margin-right: 10px;
  }
`;
const ColorButton = styled.button`
  background-color: ${props => props.colors.backgroundColor};
  color: ${props => props.colors.color};
  border-color: ${props => props.colors.borderColor};
  outline: none;
  :hover {
    opacity: 0.8;
  }
`;

export default Button;