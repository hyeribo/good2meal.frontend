import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Detail = withRouter(({ match, history }) => {
  const { search } = match.params;

  const handleGoBack = () => {
    history.goBack();
  }

  return (
    <Container>
      { search ? (<TagField/>) : null}
      <BackButton onClick={handleGoBack}> &lt; </BackButton>
      {/* {match.params.picId} */}
    </Container>
  )
});

const Container = styled.div`
  height: 200%;
  background-color: #eeeeee;
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

export default Detail;