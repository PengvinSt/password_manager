module.exports = {
    tabWidth: 2,
    singleQuote: false,
    trailingComma: "es5",
    printWidth: 120,
    endOfLine: "lf",
    plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
    importOrder: [
      "^react$",
      "^next$",
      "^@mui/(.*)$",
      "^@/hooks$",
      "^@/components/(.*)$",
      "^(@types|@tanstack/react-query$|@schemas|zod|zod-i18n-map)$",
      "^@/lib/(.*)$",
      "<THIRD_PARTY_MODULES>",
      "^[.]",
    ],
    importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
    importOrderTypeScriptVersion: "5.0.0",
    overrides: [
      {
        files: ["*.ts", "*.tsx"],
        options: {
          singleQuote: false,
          jsxSingleQuote: false,
        },
      },
    ],
  };