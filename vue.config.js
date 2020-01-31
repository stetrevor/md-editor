const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/md-editor/" : "",

  configureWebpack: {
    plugins: [new GenerateSW()]
  },

  pwa: {
    themeColor: "#2c3e50",
    msTileColor: "#2c3e50"
  }
};
