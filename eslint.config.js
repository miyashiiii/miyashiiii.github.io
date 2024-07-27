import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { ignores: [".nuxt/", ".output/"] },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
      globals: {
        useRoute: true,
        useHead: true,
        definePageMeta: true,
        Ref: true,
        ref: true,
        watchEffect: true,
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
];
