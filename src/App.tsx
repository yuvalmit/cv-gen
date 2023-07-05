import React from 'react';
import ItemsRequestProvider from "./utils/mock-client";
import TreeViewer from "./components/tree-viewer";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
`
const Header = styled.header`
  padding: 20px;
  font-size: 18px;
`
const Content = styled.div`
  overflow: scroll;
  padding-left: 20px;
`

function App() {
  return (
    <Wrapper>
      <Header>
        DB explorer
      </Header>
      <Content>
        <ItemsRequestProvider>
          <TreeViewer path='/'/>
        </ItemsRequestProvider>
      </Content>
    </Wrapper>
  );
}

export default App;
