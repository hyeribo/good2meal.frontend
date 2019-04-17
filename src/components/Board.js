import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Spin } from 'antd';
import Masonry from 'react-masonry-component';

import Card from '@components/Card';
import imageModel from '@models/imageModel';

const masonryOptions = {
  transitionDuration: 0
};

const getRandomHeight = () => {
  // 0 ~ 9
  const randomDiff = Math.floor((Math.random() * 10));
  // 120 ~ 320
  const randomHeight = 320 + ( randomDiff % 2 ? randomDiff : randomDiff * -1 ) * 10;
  return randomHeight;
}

const Cards = ({ images }) => {
  const cards = images.map(({summary}, i) => (
    <Card key={i} name={summary.name} url={summary.thumbnailURL || ''} id={summary.id || ''} to={`/detail/${summary.id}`} />
  ));
  return cards;
}

const Board = withRouter(({ match }) => {
  const { search } = match.params;
  const [ state, setState ] = useState({
    images: [],
    lastEvaluatedKey: null,
  });
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    loadMoreImages();
  }, []);

  // infinite scroll 구현
  window.onscroll = () => {
    const documentHeight = document.body.scrollHeight;  // 문서 전체의 높이
    const innerHeight = window.innerHeight;             // 보여지는 문서의 높이
    const scrollY = window.scrollY;                     // 스크롤의 위치
    const scrollStartHeight = innerHeight * 0.25         // 문서의 3/4 위치에서 스크롤 시작
    
    // 스크롤 지점에 도달했을때
    if(documentHeight - scrollStartHeight < innerHeight + scrollY) {
      // 추가 데이터가 있고, 로딩중이 아닐때만
      if(state.lastEvaluatedKey && !loading) {
        console.log('lastEvaluatedKey', state.lastEvaluatedKey);
        setLoading(true);
        loadMoreImages();
      }
    }
  }
  
  const loadMoreImages = async () => {
    try {
      // 이미지 리스트 request
      const response = await imageModel.getImages({ location: '구로디지털단지', last: state.lastEvaluatedKey });
      const { result, lastEvaluatedKey } = response;
      setLoading(false);
      
      // 각 데이터에 thumbnailURL 추가
      result.forEach(re => {
        if(re.summary.imageURL) {
          const size = `200x${getRandomHeight()}`;
          re.summary.thumbnailURL = `https://search.pstatic.net/common/?src=${re.summary.imageURL}&type=f&size=${size}`;
        }
      });

      // state 업데이트
      setState({
        images: [...state.images, ...result],
        lastEvaluatedKey: lastEvaluatedKey.id,
      });

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Container>
      <Row>
        <Col xl={1} lg={1} md={1} sm={1} xs={0}></Col>
        <Col xl={22} lg={22} md={22} sm={22} xs={24}>
          <StyledMasonry
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          >
            <Cards images={state.images} />
          </StyledMasonry>
        </Col>
        <Col xl={1} lg={1} md={1} sm={1} xs={0}></Col>
      </Row>
      { loading ? <Loading><Spin tip="Loading..."/></Loading> : null }
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
const Loading = styled.div`
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
`;

export default Board;