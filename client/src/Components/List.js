import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Container, Row, Col } from "react-grid-system";

import Card from "./Card";

class List extends Component {
  state = {
    representatives: [],
    companies: []
  };

  // Fetch всех клмпаний и представителей
  async componentDidMount() {
    const representatives = await axios.get(
      "http://localhost:5000/api/representatives"
    );
    const companies = await axios.get("http://localhost:5000/api/companies");

    this.setState(_ => ({
      representatives: representatives.data.representatives,
      companies: companies.data.companies
    }));
  }

  render() {
    const { type } = this.props;
    const { representatives, companies } = this.state;

    switch (type) {
      case "representatives":
      case "reps":
      case "Representatives":
        return (
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
                </Wrapper>
              </Col>
            </Row>
          </Container>
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
  }
}

// Styled components
const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export default List;
