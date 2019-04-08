import React, { useEffect } from 'react';
import styled from 'styled-components';

const randomRgb = () => {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ', 0.5)';
}

const RandomButton = (props) => {
  const backgroundColor = randomRgb();
  const { text } = props;
  return (
    <Button backgroundColor={backgroundColor}>{ text.charAt(0).toUpperCase() + text.slice(1) }</Button>
  )
}

const Button = styled.button`
  height: 50px;
  line-height: 46px;
  padding: 0 20px;
  font-size: 16px;
  color: white;
  background-color: ${props => props.backgroundColor};
  margin: auto 5px;
  border-radius: 8px;
  border: 0px solid black;
`;

export default RandomButton;