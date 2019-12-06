import React, { Component, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";

class Card extends Component {
  state = {
    editing: false,
    editingText: "Edit",

    // Информация представителя
    companyID: this.props.companyID,
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    createdAt: this.props.createdAt,
    representativeID: this.props.representativeID
  };

  // Helpers
  toggleEdit = _ =>
    this.setState(_ => ({ editing: true, editingText: "Save" }));

  exitEdit = _ => this.setState(_ => ({ editing: false, editingText: "Edit" }));

  handleEdit = e =>
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.editing) {
      const { companyID, firstName, lastName, representativeID } = this.state;

      const newInfo = {
        companyID,
        firstName,
        lastName
      };

      axios
        .put(
          `http://localhost:5000/api/representatives/${representativeID}`,
          newInfo,
          { headers: { "Content-Type": "application/json" } }
        )
        .then(data => console.log(data));
    }
  };

  render() {
    const { type, createdAt } = this.props;
    const { editing, editingText, firstName, lastName, companyID } = this.state;

    switch (type) {
      case "representative":
      case "repr":
      case "Representative":
        return (
          <Wrapper onSubmit={this.handleSubmit}>
            <Name>
              {editing ? (
                <Fragment>
                  <NameInput
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={e => this.handleEdit(e)}
                  />

                  <NameInput
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={e => this.handleEdit(e)}
                  />
                </Fragment>
              ) : (
                firstName.concat(" ", lastName)
              )}
            </Name>
            <Body>
              <Info>
                Company ID:{" "}
                {editing ? (
                  <input
                    type="number"
                    name="companyID"
                    value={companyID}
                    onChange={e => this.handleEdit(e)}
                  />
                ) : (
                  <span>{companyID}</span>
                )}
              </Info>
              <Info>
                Created At:{" "}
                <span>{new Date(createdAt).toLocaleDateString()}</span>
              </Info>
              <Edit onClick={editing ? this.exitEdit : this.toggleEdit}>
                {editingText}
              </Edit>
            </Body>
          </Wrapper>
        );

      case "Company":
      case "company":
      case "comp":
        return (
          <div>
            <h1>Company</h1>
          </div>
        );

      default:
        return null;
    }
  }
}

// Styled components
const Wrapper = styled.form`
  width: 400px;
  height: 250px;
  border-radius: 3px;
  display: inline-block;
  margin-left: 20px;
  margin-top: 50px;
  border: 1px solid #3742fa;
`;

const Name = styled.h1`
  width: 100%;
  background: #3742fa;
  padding: 30px 15px;
  color: #ffffff;
`;
const NameInput = styled.input`
  display: block;
  width: 100%;
  margin-top: 5px;
`;

const Body = styled.div`
  padding: 20px 30px;
`;

const Info = styled.p`
  font-size: 20px;
`;

const Edit = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  background: #2f3542;
  color: #ffffff;
  border: none;
  border-radius: 3px;
  transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;

  &:hover {
    background: #57606f;
  }
`;

export default Card;
