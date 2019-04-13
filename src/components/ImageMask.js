import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Icon } from 'antd';

const ImageController = ({urls, index, setIndex}) => {
  if(!urls?.length) return null;
  const isFirst = index === 0;
  const isLast = index === urls.length - 1;
  const url = urls[index];
  return (
    <ImageContainer>
      <Side>
        { isFirst ? null : <Icon type="left" onClick={() => setIndex(index-1)} /> }
      </Side>
      <Center>
        <img src={url} />
      </Center>
      <Side>
      { isLast ? null : <Icon type="right" onClick={() => setIndex(index+1)} /> }
      </Side>
    </ImageContainer>
  )
}

const ImageMask = (props) => {
  const [ index, setIndex ] = useState(0);

  const Contents = (
    <Container>
      <CloseIcon type="close" onClick={props.onClose} />
      <ImageController urls={props.urls} index={index} setIndex={setIndex} />
    </Container>
  )
  const el = document.getElementById('modal');
  if(props.visible) return ReactDOM.createPortal(Contents, el);
  else return null;
}

const Container = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: scroll;
`;
const CloseIcon = styled(Icon)`
  position: absolute;
  top: 40px;
  right: 40px;
  font-size: 30px;
  color: white;
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
  color: white;
  font-size: 30px;
`;
const Center = styled.div`
  flex: 3;
`;

export default ImageMask;