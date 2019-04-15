import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import RandomButton from './RandomButton';


const Tags = (props) => {
  const tags = ['this', 'is', 'test', 'tag'];
  return (
    <Container>
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        {
          tags.map((tag, i) => <RandomButton key={i} text={tag} />)
        }
      </Col>
    </Container>
  )
}

const Container = styled(Row)`
  width: 100%;
  height: 60px;
  line-height: 60px;
`;

export default Tags;