import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import imageModel from '@models/imageModel';


const Detail = withRouter(({ match, history }) => {
  const { id } = match.params;
  const [ image, setImage ] = useState({
    id: null,
    recommendedPlace: [],
    summary: {}
  });

  console.log('image', image);


  useEffect(() => {
    getImageDetail();
  }, []);


  const getImageDetail = async () => {
    try {
      const result = await imageModel.getImage(id, { location: '구로디지털단지' });
      setImage(result.result);

    } catch (error) {
      console.log(error);
    }
  }

  const handleGoBack = () => {
    history.goBack();
  }

  return (
    <Container>
      <BackButton onClick={handleGoBack}> &lt; </BackButton>
      <ImgContainer>
        <Img src={image.summary.imageURL} />
      </ImgContainer>
      <InfoContainer>
        <Title>{image.summary.name}</Title>
        <div>{image.summary.fullRoadAddress}</div>
        <div>{image.summary.category}</div>
      </InfoContainer>
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
const InfoContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`

const Img = styled.img`
  /* width: 50%; */
  height: 400px;
  margin: auto;
`;

export default Detail;