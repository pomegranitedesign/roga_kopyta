import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Container, Row, Col } from "react-grid-system";

import Card from "./Card";
import { DataContext } from "../Misc/DataContext";

const List = ({ type, representatives = [], companies = [] }) => {
  switch (type) {
    case "representatives":
    case "reps":
    case "Representatives":
      return (
        <DataContext.Consumer>
          {({ representatives, companies }) => (
            <Container>
              <Row>
                <Col>
                  <Wrapper>
                    {representatives.map(
                      ({ id, companyID, createdAt, firstName, lastName }) => (
                        <Card
                          key={id}
                          type="repr"
                          companyID={companyID}
                          createdAt={createdAt}
                          firstName={firstName}
                          lastName={lastName}
                          representativeID={id}
                        />
                      )
                    )}

                    <Card type="addRepresentative" />
                  </Wrapper>
                </Col>
              </Row>
            </Container>
          )}
        </DataContext.Consumer>
      );

    case "Companies":
    case "companies":
    case "comps":
      return (
        <Container>
          <Row>
            <Col>
              <Wrapper>
                {companies.map(({ companyID, createdAt, name }) => (
                  <Card
                    key={companyID}
                    type="comp"
                    companyID={companyID}
                    createdAt={createdAt}
                    name={name}
                  />
                ))}

                <Card type="addCompany" />
              </Wrapper>
            </Col>
          </Row>
        </Container>
      );

    default:
      return null;
  }
};

// Styled components
const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export default List;
