import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Tag } from 'antd';
import axios from 'axios';

import RandomButton from './RandomButton';

const array = new Array(50);
array.fill(1)
const Images = () => {
  return (
    <div>

    </div>
  )
}

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
  
  useEffect(() => {

    
    axios.get('https://dummyimage.com/300', {
      mode: 'no-cors',
      // withCredentials: false,
      // headers: {
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-HEADER': '*',
        // 'Access-Control-Allow-Methods': 'GET',
      // },
      // withCredentials: true,
      // credentials: 'same-origin',
    })
      .then(result => console.log('result', result))
      .catch(error => console.log('error!!!', error));

  }, []);

  return (
    <Container>
      { search ? (<TagField/>) : null}
      <Row>
        <Col xl={2} lg={1} md={1} sm={1} xs={0}></Col>
        <Col xl={20} lg={22} md={22} sm={22} xs={24}>
          <Row>
            {
              array.map((a, i) => {
                return (
                  <Col style={{ padding: '10px'}} key={i} lg={4} md={6} sm={8} xs={12}>
                    <Link to={`/detail/${i}`}><Box>{i}</Box></Link>
                  </Col>
                )
              })
            }
          </Row>
        </Col>
        <Col xl={2} lg={1} md={1} sm={1} xs={0}></Col>
      </Row>
    </Container>
  )
});

const Box = styled.div`
  width: 100%;
  height: 200px;
  display: inline-block;
  border: 1px solid #dddddd;
  border-radius: 5px;
`;
const Container = styled.div`
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
const BigTag = styled(Tag)`
  height: 40px;
  margin: auto;
`
export default Board;