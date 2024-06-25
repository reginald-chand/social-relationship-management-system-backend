import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,

  {
    rules: {
      "max-params": ["error", 5],
      "max-lines-per-function": ["error", 200],
      "sort-imports": "error",
    },
  },
];
