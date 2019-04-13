import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { size = 'default', color = '#eee' } = props;;

  if(size === 'default') return (<DefaultButton {...props}>{ props.children }</DefaultButton>);
  if(size === 'small') return (<SmallButton {...props}>{ props.children }</SmallButton>);
  if(size === 'large') return (<LargeButton {...props}>{ props.children }</LargeButton>);
}


const SmallButton = styled.button`
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  border-radius: 5px;
  font-size: 13px;
  i {
    margin-right: 6px;
  }
`;
const DefaultButton = styled.button`
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 13px;
  i {
    margin-right: 8px;
  }
`;
const LargeButton = styled.button`
  height: 36px;
  line-height: 36px;
  padding: 0 12px;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  i {
    margin-right: 10px;
  }
`;

export default Button;