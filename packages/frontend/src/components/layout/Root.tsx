import React from "react";
import { styledThemed } from "../../utils/styled";

interface IRootProps {
  className?: string;
}

const Root: React.FC<IRootProps> = ({ children }) => (
  <Wrapper className="wrapper">{children}</Wrapper>
);

export default Root;

const Wrapper = styledThemed.div`
  display: flex;
  flex-direction: column;
  a {
    color: ${(props) => props.theme.colors.link};
    text-decoration: none;
  }
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.body};
  font-family: ${(props) => props.theme.fonts.body};
`;
