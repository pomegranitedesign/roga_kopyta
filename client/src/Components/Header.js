import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-grid-system";

import Navigation from "./Navigation";

const Header = _ => {
  return (
    <Wrapper>
      <Container
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%"
          }}
        >
          <Col>
            <h1>Рога и Копыта</h1>
          </Col>

          <Col>
            <Navigation />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled.header`
  height: 80px;
  background: #2f3542;
  color: #ffffff;
`;

export default Header;
