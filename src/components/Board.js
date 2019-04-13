import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import Masonry from 'react-masonry-component';

import RandomButton from './RandomButton';

import imageModel from '@models/imageModel';

const masonryOptions = {
  transitionDuration: 0
};

const TagField = (props) => {
  const tags = ['this', 'is', 'test', 'tag'];

  return (
    <Sticky>
      <div>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          {
            tags.map((tag, i) => <RandomButton key={i} text={tag} />)
          }
        </Col>
      </div>
    </Sticky>
  )
}

const Board = withRouter(({ match }) => {
  const { search } = match.params;
  const [ images, setImages ] = useState([]);
  let lastEvaluatedKey = null;

  useEffect(() => {
    addImages();
  }, []);

  const addImages = async (lastEvaluatedKey) => {
    try {
      // 이미지 리스트 request
      const result = await imageModel.getImages({ location: '구로디지털단지' }, lastEvaluatedKey);
      lastEvaluatedKey = result.lastEvaluatedKey.id;
      // console.log('result', result);
      // 데이터 가공해서 기존 리스트에 concat
      const additionalImageItems = getImageItems(result.result);
      setImages(images.concat(additionalImageItems)); 

    } catch (error) {
      console.log(error);
    }
  }

  const getImageItems = (images) => {
    const imageItems = images.map(({summary}, i) => {
      const size = `200x${getRandomHeight()}`;
      if(summary.imageURL) summary.thumbnailURL = `https://search.pstatic.net/common/?src=${summary.imageURL}&type=f&size=${size}`;
      return (
        <Card key={summary.id} lg={4} md={6} sm={8} xs={12}>
          {
            summary.imageURL
            ? <Link to={`/detail/${summary.id}`}><Thumb src={summary.thumbnailURL} onError={(e)=> { return; }} /></Link>
            : null
            // : <Link to={`/detail/${summary.id}`}><Thumb src={require('../assets/images/no_image.png')} /></Link>
          }
        </Card>
      );
    })
    return imageItems;
  }

  const getRandomHeight = () => {
    // 0 ~ 9
    const randomDiff = Math.floor((Math.random() * 10));
    // 120 ~ 320
    const randomHeight = 320 + ( randomDiff % 2 ? randomDiff : randomDiff * -1 ) * 10;
    return randomHeight;
  }



  return (
    <Container>
      { search ? (<TagField/>) : null}
      <Row>
        <Col xl={2} lg={1} md={1} sm={1} xs={0}></Col>
        <Col xl={20} lg={22} md={22} sm={22} xs={24}>
          <StyledMasonry
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          >
            {images}
          </StyledMasonry>
        </Col>
        <Col xl={2} lg={1} md={1} sm={1} xs={0}></Col>
      </Row>
    </Container>
  )
});

const StyledMasonry = styled(Masonry)`
  margin: 0;
  padding: 0;
`;
const Container = styled.div`
  width: 100%;
  padding: 0 20px;

`;
const Card = styled(Col)`
  padding: 10px;
`;
const Sticky = styled(Row)`
  height: 60px;
  line-height: 60px;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0 20px;
  background-color: white;
`
const Thumb = styled.img`
  width: 100%;
  border-radius: 5px;
`;

export default Board;