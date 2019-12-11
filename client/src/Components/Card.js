import React, { Component, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";

import addIcon from "../Assets/Images/addCompany.svg";

class Card extends Component {
  state = {
    editing: false,
    editingText: "Edit",

    // Общая информация
    companyID: this.props.companyID,
    createdAt: this.props.createdAt,

    // Информация представителя
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    representativeID: this.props.representativeID,

    // Информация о компании
    name: this.props.name
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
        .then(_ => console.log("Updating the representative [Success]"));
    }
  };

  handleAddCompany = e => {
    const { name } = this.state;
    axios.post(
      "http://localhost:5000/api/companies",
      { name },
      { headers: { "Content-Type": "application/json" } }
    );

    window.location.reload(false);
    this.exitEdit();
  };

  handleAddRepresentative = e => {
    e.preventDefault();

    const { firstName, lastName, companyID } = this.state;
    const allEntered = firstName && lastName && companyID;
    if (allEntered) {
      axios
        .post("http://localhost:5000/api/representatives", {
          firstName,
          lastName,
          companyId: companyID
        })
        .then(_ => {
          console.log(`Adding a new representative [Success]`);
          window.location.reload(false);
        })
        .catch(err =>
          console.error(`Adding a new representative [Error]: ${err}`)
        );

      this.exitEdit();
    }
  };

  render() {
    const { type, createdAt } = this.props;
    const {
      editing,
      editingText,
      firstName,
      lastName,
      companyID,
      name
    } = this.state;

    switch (type) {
      case "representative":
      case "repr":
      case "Representative":
        return (
          <Wrapper onSubmit={this.handleSubmit}>
            <Name topBg="#3742fa">
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
      case "addRepresentative":
      case "addrepresentative":
      case "addrep":
      case "addRep":
        return (
          <Wrapper
            onSubmit={e => this.handleAddRepresentative(e)}
            action="http://localhost:5000/api/representatives"
            method="post"
            type="company"
            acceptCharset="UTF-8"
          >
            <Name topBg="#3742FA">
              {editing ? name : "Добавить Представителя"}
            </Name>
            <Body style={{ textAlign: "center" }}>
              {editing ? (
                <Fragment>
                  <NameInput
                    type="text"
                    name="firstName"
                    value={firstName}
                    placeholder="Имя"
                    onChange={this.handleEdit}
                  />
                  <NameInput
                    type="text"
                    name="lastName"
                    value={lastName}
                    placeholder="Фамилия"
                    onChange={this.handleEdit}
                  />
                  <NameInput
                    type="number"
                    name="companyID"
                    value={companyID}
                    placeholder="ID компании"
                    onChange={this.handleEdit}
                  />

                  <SaveButton
                    type="submit"
                    onClick={e => this.handleAddRepresentative(e)}
                  >
                    Добавить Представителя
                  </SaveButton>
                </Fragment>
              ) : (
                <AddIcon
                  height={50}
                  src={addIcon}
                  alt="Add Company Icon"
                  onClick={this.toggleEdit}
                />
              )}
            </Body>
          </Wrapper>
        );

      case "Company":
      case "company":
      case "comp":
        return (
          <Wrapper onSubmit={this.handleSubmit} type="company">
            <Name topBg="#ff6348">
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
                name
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
            </Body>
          </Wrapper>
        );

      case "addCompany":
      case "addcompany":
      case "add":
      case "newCompany":
      case "newcompany":
        return (
          <Wrapper
            onSubmit={e => this.handleAddCompany(e)}
            action="http://localhost:5000/api/companies"
            method="post"
            type="company"
          >
            <Name topBg="#ff6b81">{editing ? name : "Добавить Компанию"}</Name>
            <Body style={{ textAlign: "center" }}>
              {editing ? (
                <Fragment>
                  <NameInput
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleEdit}
                  />

                  <SaveButton
                    type="submit"
                    onClick={e => this.handleAddCompany(e)}
                  >
                    Добавить Компанию
                  </SaveButton>
                </Fragment>
              ) : (
                <AddIcon
                  height={50}
                  src={addIcon}
                  alt="Add Company Icon"
                  onClick={this.toggleEdit}
                />
              )}
            </Body>
          </Wrapper>
        );

      default:
        return null;
    }
  }
}

// Styled components
const Wrapper = styled.form`
  width: auto;
  min-height: ${({ type }) => (type === "company" ? "150px" : "250px")};
  border-radius: 3px;
  margin-top: 50px;
  margin-right: auto;
  margin-left: 30px;
  border: 1px solid #3742fa;
  display: inline-block;
`;

const Name = styled.h1`
  width: 100%;
  background: ${({ topBg }) => topBg};
  padding: 30px 15px;
  color: #ffffff;
`;
const NameInput = styled.input`
  display: block;
  width: 100%;
  margin-top: 5px;
  border: none;
  border-bottom: 1px solid #3742fa;
  background: #eccc68;
  height: 40px;
  padding-left: 5px;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
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

const AddIcon = styled.img`
  cursor: pointer;
  transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    transform: scale(1.1);
  }
`;

const SaveButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background: #2ed573;
  border: none;
  border-radius: 3px;
  color: #000000;
  transition: all 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;

  &:hover {
    background: #7bed9f;
  }
`;

export default Card;
