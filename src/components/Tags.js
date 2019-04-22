import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import TagButton from './TagButton';

import tagModel from '@models/tagModel';



const Tags = (props) => {
  const [ state, setState ] = useState({
    tags: []
  });
  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      const response = await tagModel.getTags({ location: '구로디지털단지',});
      const { result, lastEvaluatedKey } = response;
      setState({
        tags: [...state.tags, ...result]
      })
    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <Container>
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        {
          state.tags.map((tag, i) => <TagButton key={i} text={tag.id} />)
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