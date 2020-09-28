module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ["prettier"],
  rules: {
    /*eslint no-unused-vars: [2, {"args": "after-used", "argsIgnorePattern": "^_"}]*/
    /*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
    quotes: "off",
    "no-unused-vars": ["warn", { "varsIgnorePattern": "^_", "ignoreRestSiblings": true }],
    "react/display-name": "off",
    "prettier/prettier": [
      "off",
      {
        singleQuote: false,
      },
    ],
    "react/prop-types": [1, { ignore: ["context", "tracking"] }],
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ['warn', { "varsIgnorePattern": "^_", "ignoreRestSiblings": true }],
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. '@typescript-eslint/explicit-function-return-type': 'off',
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "react/prop-types": "off",
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": ['warn', { "varsIgnorePattern": "^_", "ignoreRestSiblings": true }],
      },
    },
  ],
};
