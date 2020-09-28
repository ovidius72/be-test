import styled, { CreateStyled } from "@emotion/styled";
import brandColors from "src/styles/colors/brandColors";

export interface ITheme {
  colors: {
    named: Record<keyof typeof brandColors, string>,
    background: string;
    background_alt: string;
    body: string;
    headings: string;
    borders: string;
    tableOdd: string;
    brand: string;
    black: string;
    white: string;
    link: string;
    link_dark: string;
    attrs: {
      str: string;
      agi: string;
      int: string;
    };
  };
  fonts: {
    body: string;
    headings: string;
    monospace: string;
  };
  fontSizes: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
  };
  containerPadding: string;
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  widths: {
    md: string;
    lg: string;
    xl: string;
  };
  heights: {
    header: string;
  };
}

const styledThemed = styled as CreateStyled<ITheme>;

export {styledThemed}
