module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }]],

    // plugins: [
    //   [
    //     "module:react-native-dotenv",
    //     {
    //       path: ".env",
    //       blocklist: null,
    //       allowlist: null,
    //       blacklist: null, // DEPRECATED
    //       whitelist: null, // DEPRECATED
    //       safe: false,
    //       allowUndefined: true,
    //       verbose: false,
    //     },
    //   ],
    // ],
  };
};
