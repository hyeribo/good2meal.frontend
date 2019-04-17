import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Col, Icon } from 'antd';

import Button from '@components/Button';

import Star from '@utils/star';


const Card = (props) => {
  const { url, id, name, to } = props;
  if(!url || !id) return null;
  const [ starred, setStarred ] = useState(() => Star.isStarred(id));

  const toggleStar = (e) => {
    e.preventDefault();
    if(starred) Star.removeStar(id);
    else Star.addStar(id);
    setStarred(!starred);
  }

  return (
    <Container lg={4} md={6} sm={8} xs={12}>
      <Wrapper>
        <Img src={url} onError={(e)=> { return; }} />
        <Link to={to}>
          <Description>
            <StarButton size='large' color='green' outlined onClick={toggleStar}><Icon type='star' theme={starred ? 'filled' : 'outlined'} /></StarButton>
            <Name>{name}</Name>
          </Description>
        </Link>
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
  top: calc(50% - 20px);
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;
const StarButton = styled(Button)`
  position: absolute;
  right: 10px;
  top: 10px;
`;
export default Card;