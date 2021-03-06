import { Global } from "@emotion/core";
import React from "react";

import globals from "./globals";
import normalize from "./normalize";

const GlobalStyles: React.FC = () => {
  return <Global styles={{ ...globals, ...normalize }} />;
};

export default GlobalStyles;
