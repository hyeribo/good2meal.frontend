import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Icon } from 'antd';

const ImageMask = (props) => {
  const Contents = (
    <Container>
      <CloseIcon type="close" onClick={props.onClose} />
      { props.url ? <Img src={props.url} /> : null }
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
`;
const CloseIcon = styled(Icon)`
  position: absolute;
  top: 40px;
  right: 40px;
  font-size: 30px;
  color: white;
`;
const Img = styled.img`
  width: 60%;
`;

export default ImageMask;