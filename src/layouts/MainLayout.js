import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import Board from '../components/Board';

const MainLayout = () => {
  
  return (
    <Container>
      {/* 헤더 - 검색어 입력. 모든 페이지에 포함됨 */}
      <HeaderContainer>
        <Header />
      </HeaderContainer>

      {/* 바디 - 검색 결과 화면 */}
      <BodyContainer>
        <Route path='/' component={Board} exact></Route>
        <Route path='/search/:search' component={Board}></Route>
      </BodyContainer>
    </Container>
  )
}



// ---------- styled-components----------

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  line-height: 60px;
`;
const BodyContainer = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: scroll;
`

export default MainLayout;