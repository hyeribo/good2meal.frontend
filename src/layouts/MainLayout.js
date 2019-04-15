import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import Board from '../components/Board';
import Detail from '../components/Detail';

const MainLayout = () => {
  
  return (
    <Container>
      {/* 헤더 - 검색어 입력. 모든 페이지에 포함됨 */}
      <Header />

      {/* 바디 - 검색 결과 화면 */}
      <BodyContainer>
        <Route path='/' component={Board} exact></Route>
        <Route path='/search/' component={Board} exact></Route>
        <Route path='/search/:search' component={Board}></Route>
        <Route path='/detail/:id' component={Detail}></Route>
      </BodyContainer>
    </Container>
  )
}



// ---------- styled-components----------

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const BodyContainer = styled.div`
  width: 100%;
  flex: 1;
`

export default MainLayout;