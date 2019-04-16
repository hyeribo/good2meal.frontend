import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Icon } from 'antd';

const ImageMask = (props) => {
  const [ index, setIndex ] = useState(0);
  if(!props.urls?.length) return null;
  
  const isFirst = index === 0;
  const isLast = index === props.urls.length - 1;
  const url = props.urls[index];

  const Contents = (
    <Container>
      <ImageContainer>
        <Side>
          { isFirst ? null : <Icon type="left" onClick={() => setIndex(index-1)} /> }
        </Side>
        <Center>
          <img src={url} />
        </Center>
        <Side>
        <CloseIcon type="close" onClick={props.onClose}/>
        { isLast ? null : <Icon type="right" onClick={() => setIndex(index+1)} /> }
        </Side>
      </ImageContainer>
    </Container>
  )
  const el = document.getElementById('modal');
  if(props.visible) return ReactDOM.createPortal(Contents, el);
  else return null;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  overflow: scroll;
  padding-top: 130px;
  padding-bottom: 30px;
  color: white;
  z-index: 3;
`;
const CloseIcon = styled(Icon)`
  position: absolute;
  top: 130px;
  font-size: 30px;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
`;
const Side = styled.div`
  flex: 1;
  margin: auto;
  font-size: 30px;
`;
const Center = styled.div`
  flex: 3;
  margin: auto;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export default ImageMask;