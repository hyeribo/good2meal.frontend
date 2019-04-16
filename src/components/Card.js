import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Col } from 'antd';

const Card = (props) => {
  if(!props.url) return null;
  return (
    <Container lg={4} md={6} sm={8} xs={12}>
      <Wrapper>
        <Img src={props.url} onError={(e)=> { return; }} />
        <Link to={props.to}><Description><Name>{props.name}</Name></Description></Link>
      </Wrapper>
    </Container>
  )
}


const Description = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #0007;
  color: white;
  border-radius: 5px;
  text-align: center;
  visibility: hidden;
`;
const Container = styled(Col)`
  padding: 10px;
  border-radius: 5px;
  :hover {
    background: #cccccc;
  }
  :hover ${Description} {
    visibility: visible;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const Img = styled.img`
  width: 100%;
  border-radius: 5px;
`;
const Name = styled.span`
  position: relative;
  top: calc(50% - 10px);
  font-size: 20px;
  font-weight: bold;
`;
export default Card;