// 레이아웃 라우팅
// - 로그인
// - 메인 (검색필드 포함한 페이지)
// - 기타

import ReactDOM from 'react-dom';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';

import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
    <Router>
      <MainLayout/>
    </Router>
  )
}


const render = Component => {
  const App = hot(Component);
  ReactDOM.render(<App/>, document.getElementById("root"));
}
render(App);
