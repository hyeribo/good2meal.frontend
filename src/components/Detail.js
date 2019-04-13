import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Icon, Tag, Carousel } from 'antd';

import imageModel from '@models/imageModel';
import ImageMask from '@components/ImageMask';


const ImageCarousel = ({mainImageUrl, images}) => (
  <Carousel effect="fade" autoplay>
    <Img src={mainImageUrl} />
    {
      images.map((img, i) => {
        if(mainImageUrl !== img.url) return (<Img key={i} src={img.url} />)
      })
    }
  </Carousel>
)
const Time = ({times}) => (
  <Info>
    <InfoIcon><Icon type="clock-circle" /></InfoIcon>
    <InfoText>
      {
        times.map((time, i) => (
          <div key={i}>
            {time.type} {time.startTime} - {time.endTime} {time.description}
          </div>
        ))
      }
    </InfoText>
  </Info>
);
const Menu = ({menus, menuImages, setImageMask }) => (
  <Info>
    <InfoIcon><Icon type="profile" /></InfoIcon>
    <InfoText>
      {
        menus.map((menu, i) => (
          <div key={i}>
            <span>{menu.name}</span>
            { menu.isRecommended ? <Tag color="green">추천</Tag> : ''}
            <Price>· · · {menu.price}</Price>
          </div>
        ))
      }
      <a onClick={() => setImageMask({ visible: true, url: menuImages?.[0].imageUrl })}>
        메뉴판 사진 보기
      </a>
    </InfoText>
  </Info>
)


const Detail = withRouter(({ match, history }) => {
  const { id } = match.params;
  const [ image, setImage ] = useState({
    id: null,
    recommendedPlace: [],   // 주변 장소
    review: {},             // 리뷰
    summary: { images: [] },            // 장소 설명
    transit: {},            // 교통
  });
  const [ imageMask, setImageMask ] = useState({
    visible: false,
    url: '',
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
      <Row>
        <Col xl={3} lg={2} md={1} sm={0} xs={0}>
          <BackButton type="left" onClick={handleGoBack}/>
        </Col>
        <Col xl={18} lg={20} md={22} sm={24} xs={24}>
          <Card>
            <CardHeader>

            </CardHeader>
            <CardContent>
              <Row>
                <Col xl={13} lg={13} md={24} sm={24} xs={24}>
                  <ImageContainer>
                    <ImageCarousel mainImageUrl={image.summary.imageURL} images={image.summary.images} />  
                  </ImageContainer>
                </Col>
                <Col xl={11} lg={11} md={24} sm={24} xs={24}>
                  <InfoContainer>
                    <InfoTitle>
                      <span>{image.summary.name}</span>
                      <span>{image.summary.category}</span>
                    </InfoTitle>
                    <h3>{image.summary.fullRoadAddress} ({image.summary.addressAbbr}) </h3>
                    <InfoBox>
                      {/* 연락처 */}
                      <Info>
                        <InfoIcon><Icon type="phone" /></InfoIcon>
                        <InfoText>{image.summary.phone}</InfoText>
                      </Info>
                      {/* 영업 시간 */}
                      {
                        image.summary.bizHour?.length
                        ? <Time times={image.summary.bizHour} /> : null
                      }
                      {/* 메뉴 */}
                      {
                        image.summary.menus?.length
                        ? <Menu menus={image.summary.menus} menuImages={image.summary.menuImages} setImageMask={setImageMask} /> : null
                      }
                    </InfoBox>
                  </InfoContainer>
                </Col>
              </Row>
            </CardContent>
          </Card> 
        </Col>
        <Col xl={3} lg={2} md={1} sm={0} xs={0}></Col>
      </Row>
      <ImageMask visible={imageMask.visible} url={imageMask.url} onClose={() => setImageMask({visible: false, url: ''})} />
    </Container>
  )
});


const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  background-color: #eeeeee;
  padding: 30px 20px;
`;
const BackButton = styled(Icon)`
  font-size: 20px;
`;
const Card = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: white;
`;
const CardHeader = styled.div`
  width: 100%;
  height: 60px;
  padding: 16px;
`;
const CardContent = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  padding: 20px;
  padding-top: 0px;
`;
// 식당 사진
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  border-radius: 8px;
  text-align: center;
  /* background: #364d79; */
`;
const Img = styled.img`
  height: 400px;
  width: auto !important;
  border-radius: 8px;
`;
// 식당 정보
const InfoContainer = styled.div`
  width: 100%;
  padding: 20px;
`;
// 상단 타이틀 (식당 이름, 카테고리)
const InfoTitle = styled.div`
  margin-bottom: 10px;
  span:first-child {
    font-size: 28px;
    font-weight: bold;
  }
  span:last-child {
    font-weight: bold;
    color: #777;
    margin-left: 10px;
  }
`;
// 하단 상세정보
const InfoBox = styled.div`
  border-bottom: 1px solid #dddddd;
  padding: 16px 4px;
`;
const Info = styled.div`
  margin-bottom: 8px;
  i {
    margin-right: 10px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
const InfoIcon = styled.div`
  width: 25px;
  display: inline-block;
  vertical-align: top;
`;
const InfoText = styled.div`
  width: calc(100% - 25px);
  display: inline-block;
  div {
    margin-top: 1px;
  }
`;

const Price = styled.div`
  float: right;
`;

export default Detail;