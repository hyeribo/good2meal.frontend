import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Tag } from 'antd';
import axios from 'axios';
import Masonry from 'react-masonry-component';


import RandomButton from './RandomButton';
import dummy from '../../dummy.json';


const masonryOptions = {
  transitionDuration: 0
};
const imagesLoadedOptions = {
  background: '.my-bg-image-el',
}


console.log("dummy", dummy);

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
  
  // useEffect(() => {
    
  //   axios.get('https://dummyimage.com/300', {
  //     mode: 'no-cors',
  //     // withCredentials: false,
  //     // headers: {
  //       // 'Content-Type': 'application/json',
  //       // 'Access-Control-Allow-Origin': '*',
  //       // 'Access-Control-Allow-HEADER': '*',
  //       // 'Access-Control-Allow-Methods': 'GET',
  //     // },
  //     // withCredentials: true,
  //     // credentials: 'same-origin',
  //   })
  //     .then(result => console.log('result', result))
  //     .catch(error => console.log('error!!!', error));

  // }, []);

  const imageArray = [];
  dummy.result.forEach(image => {
    image.recommendPlace.forEach(place => {
      imageArray.push({
        id: place.id,
        name: place.name,
        thumUrl: place.thumUrl,
      })
    })
  });
  console.log('imageArray', imageArray)

  const images = imageArray.map((image, i) => {
    return (
      <Card key={i} lg={4} md={6} sm={8} xs={12}>
        {
          image.thumUrl
          ? <Link to={`/detail/${image.id}`}><Thumb src={image.thumUrl} onError={(e)=> { return; }} /></Link>
          : <Link to={`/detail/${image.id}`}><Thumb src={require('../assets/images/no_image.png')} /></Link>
        }
        
      </Card>
    )
  });

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