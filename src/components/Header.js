import React, { useState, useEffect } from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import { Row, Col, Input } from 'antd';
import styled from 'styled-components';

const Search = Input.Search;

const HeaderLayout = withRouter(({ location, history }) => {
  console.log('========== Header ==========')

  // 검색 값
  const [value, setValue] = useState('');

  // value 초기화
  useEffect(() => {
    // uri params 구하기
    const { pathname } = location;
    const searchParams = matchPath(pathname, {
      path: `/search/:search`,
    })?.params?.search; // optional chaining
        
    setValue(searchParams);

  }, [true]); // shouldComponentUpdate


  const handleSearch = (value) => {
    console.log('search: ', value)
    history.push('/search/'+value);
  }

  return (
    <Row style={{ textAlign: 'center' }}>
      <Col lg={3} xs={6}>
        <Logo
          src={require(`../assets/logo.png`)}
          onClick={() => history.push('/')}
        />
      </Col>
      <Col lg={18} xs={12}>
        <Search
          placeholder="input search text"
          onSearch={value => handleSearch(value)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ height: 40 }}
        />
      </Col>
      <Col lg={3} xs={6}>
        유저정보
      </Col>
    </Row>
  )
})

const Logo = styled.img`
  width: 100%;
  padding: 10px 20px;
`;
export default HeaderLayout;