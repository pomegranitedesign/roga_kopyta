import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Navigation = _ => {
  return (
    <Wrapper>
      <Links>
        <Link activeStyle={{ color: "#1e90ff" }} exact to="/">
          Представители
        </Link>
        <Link activeStyle={{ color: "#1e90ff" }} to="/companies">
          Компании
        </Link>
      </Links>
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled.nav`
  text-align: center;
`;

const Links = styled.ul``;

const Link = styled(NavLink)`
  text-decoration: none;
  color: #2ed573;
  font-size: 14px;
  margin-right: 20px;

  &:hover {
    color: #7bed9f;
  }
`;

export default Navigation;
