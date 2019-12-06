import React from "react";
import styled from "styled-components";

const Footer = props => {
  return (
    <Wrapper>
      Made by{" "}
      <Link href="http://github.com/pomegranitedesign" target="__blank">
        Dmitriy Shin
      </Link>
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled.footer`
  bottom: 0;
  width: 100%;
  background: #2f3542;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #57606f;
  font-weight: 400;
  font-size: 14px;
  left: 0;
  position: relative;
  margin-top: 40px;
`;

const Link = styled.a`
  text-decoration: none;
  color: #ff6b81;
  line-height: 1.5;
  font-weight: 800;
  margin-left: 5px;

  &:hover {
    color: #ff4757;
  }
`;

export default Footer;
