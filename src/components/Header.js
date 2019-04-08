import React, { useState, useEffect, useMemo } from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import { Row, Col, Input } from 'antd';
import styled from 'styled-components';

const Search = Input.Search;

const HeaderLayout = withRouter(({ location, history }) => {
  console.log('========== Header ==========')

  // MEMO
  // useEffect에서 state를 초기화하는것보다 (렌더링 2번됨)
  // useState에 함수를 전달해서 초기화시킨다. (렌더링 1번됨)
  const [value, setValue] = useState(() => {
    const { pathname } = location;
    const searchParams = matchPath(pathname, {
      path: `/search/:search`,
    })?.params?.search; // optional chaining
    return searchParams || '';
  });


  // const searchParams = useMemo(() => )
  // useMemo(() => {
  //   computeExpensiveValue(a, b)
  // }, [a, b]);


  const handleSearch = (value) => {
    history.push('/search/'+value);
  }
  const goHome = () => {
    setValue('')
    history.push('/');
  }
  

  return (
    <Row style={{ textAlign: 'center' }}>
      <Col lg={3} xs={6}>
        <Logo
          src={require(`../assets/logo.png`)}
          onClick={() => goHome()}
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