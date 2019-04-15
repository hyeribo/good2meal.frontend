import React, { useState } from 'react';
import { withRouter, matchPath } from 'react-router-dom';
import { Row, Col, Input } from 'antd';
import styled from 'styled-components';
const Search = Input.Search;

import Tags from './Tags';


const HeaderLayout = withRouter(({ location, history }) => {
  console.log('========== Header ==========')

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
    if(!value) return;
    history.push('/search/'+value);
  }
  const goHome = () => {
    setValue('')
    history.push('/');
  }
  

  return (
    <Container>
      <SearchField>
        <Col lg={3} sm={6} xs={0}>
          <Logo
            src={require(`../assets/logo.png`)}
            onClick={() => goHome()}
          />
        </Col>
        <Col lg={0} sm={0} xs={3}>
          <Icon
            src={require(`../assets/favicon.png`)}
            onClick={() => goHome()}
          />
        </Col>
        <Col lg={18} sm={12} xs={15}>
          <Search
            placeholder='검색'
            onSearch={value => handleSearch(value)}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ height: 40 }}
          />
        </Col>
        <Col lg={3} sm={6} xs={6}>
          유저정보
        </Col>
      </SearchField>
      { value ? <Tags/> : null}
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
`;
const SearchField = styled(Row)`
  height: 60px;
  line-height: 60px;
  text-align: center;
`;
const Logo = styled.img`
  width: 100%;
  padding: 10px 20px;
`;
const Icon = styled.img`
  height: 20px;
`;
export default HeaderLayout;