import {i18nMark} from "@lingui/core";
import {I18n, Trans} from "@lingui/react";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import {LanguageContainer} from "src/containers/LanguageContainer";
import {LoginContatiner} from "src/containers/LoginContainer";
import {styledThemed} from "src/utils/styled";
import WithTheme from "../../containers/WithTheme";
import Container from "./Container";


interface IHeaderProps {
  title: string;
}

const themeMap = {
  light: i18nMark('light'),
  dark: i18nMark('dark'),
}

const Wrapper = styledThemed("header")`
  padding: 0.5rem 1.5rem;
  background-color: ${(props) => props.theme.colors.named.dark};
  a {
    color: ${(props) => props.theme.colors.named.cyan2};
  }
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.headings};
`;

const HeaderInner = styledThemed(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  a {
    color: ${(props) => props.theme.colors.named.cyan2};
    &:hover {
      color: ${(props) => props.theme.colors.named.cyan};
    }
  }
  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    flex-direction: row;
  }
`;

const HeaderLeft = styledThemed("div")`
  padding-right: 1rem;
`;

const HeaderNav = styledThemed("nav")`
  flex: 1 1 auto;
  margin: 1rem 0;
  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    margin: 0;
  }
`;

const HeaderNavLink = styledThemed(NavLink)`
  margin: 0 1rem;
  &.active {
    text-decoration: none;
  }
`;

// const HeaderLinkActive = css`text-decoration: none;`;

const HeaderRight = styledThemed("div")`
  padding-left: 1rem;
`;

const Title = styledThemed("h2")`
  margin: 0;
  font-weight: 500;
`;

const CurrentTheme = styledThemed("span")`
  margin-right: 1rem;
`;

const ThemeSwitcherButton = styledThemed("button")`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.named.cyan2};
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.named.dark2};
  color: ${(props) => props.theme.colors.named.cyan2};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.named.gray75};
    color: ${(props) => props.theme.colors.named.cyan2};
  }
`;

const Header: React.FC<IHeaderProps> = ({ title }) => (
  <I18n>
  {({ i18n }) => (
  <Wrapper>
    <HeaderInner>
      <HeaderLeft>
      <Title><Link to="/">{title}</Link></Title>
      </HeaderLeft>
      <HeaderNav>
        <HeaderNavLink exact to="/orders">{i18n.t`Orders`}</HeaderNavLink>
      </HeaderNav>
      <HeaderRight>
        <WithTheme>
          {({ theme, setTheme }) => (
            <React.Fragment>
            <CurrentTheme><Trans>Current theme</Trans>: {i18n._(themeMap[theme])}</CurrentTheme>
              <ThemeSwitcherButton
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <Trans>Toggle theme</Trans>
              </ThemeSwitcherButton>
            </React.Fragment>
          )}
        </WithTheme>
        <LanguageContainer />
        <LoginContatiner />
      </HeaderRight>
    </HeaderInner>
  </Wrapper>
  )}
  </I18n>
);

export default Header;

