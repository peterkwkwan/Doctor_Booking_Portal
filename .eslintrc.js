module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: false,
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["vue"],
  rules: {
    "vue/multi-word-component-names": 0,
  },
};
