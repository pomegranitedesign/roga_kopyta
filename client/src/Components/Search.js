import React from "react";
import styled from "styled-components";

const Search = ({ handleSearch, handleChange, search }) => {
  return (
    <Wrapper method="get" onSubmit={e => handleSearch(e)}>
      <Field
        onChange={handleChange}
        type="text"
        placeholder="Andrey Mock"
        value={search}
      />
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled.form``;

const Field = styled.input`
  width: 300px;
  margin: 0 auto;
  display: block;
  padding: 10px;
  border: none;
  border-radius: 100px;
  padding-left: 20px;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  outline: none;
  transition: width 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: #000000;

  &:focus {
    width: 350px;
  }

  &::placeholder {
    color: #ced6e0;
  }
`;

export default Search;
