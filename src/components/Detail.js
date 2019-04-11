import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Detail = withRouter(({ match, history, location }) => {

  const { picId } = match.params;

  // TODO: 임시코드
  const url = location.search ? location.search.split('url=')?.[1] : '';
  const decodedUrl = decodeURIComponent(url);

  const handleGoBack = () => {
    history.goBack();
  }

  return (
    <Container>
      <BackButton onClick={handleGoBack}> &lt; </BackButton>
      <ImgContainer>
        <Img src={decodedUrl} />
      </ImgContainer>
    </Container>
  )
});

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background-color: #eeeeee;
  padding: 20px;
  /* text-align: center; */
`;
const BackButton = styled.button`
  position: absolute;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #eeeeee;
  font-weight: bold;
  font-size: 20px;
  border: none;
  outline:none;
`;
const ImgContainer = styled.div`
  text-align: center;
`;
const Img = styled.img`
  width: 50%;
  margin: auto;
`;

export default Detail;