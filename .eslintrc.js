module.exports = {
  "env": {
    "browser": true,
    "es6": true,
  },
  "extends" : [
    "standard",
    "plugin:prettier/recommended",
    "eslint:recommended",
  ],
  "plugins": [
    "jest",
    "prettier",
  ],
  "parser": "babel-eslint",
  "settings": {
    "import/parser": "babel-eslint",
  },
  "globals": {
    "React": true,
    "it": true,
    "expect": true,
  },
  "rules": {
    "prettier/prettier": "error"
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
    },
  }
};
