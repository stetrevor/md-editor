const { GenerateSW } = require("workbox-webpack-plugin");

const DEV = process.env.NODE_ENV === "development";

const devSWPlugin = new GenerateSW({
  clientsClaim: true,
  skipWaiting: true
});

module.exports = {
  publicPath: DEV ? "/md-editor/" : "",

  configureWebpack: {
    plugins: [
      DEV
        ? devSWPlugin
        : new GenerateSW({
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/fonts\.googleapis\.com/,
                handler: "StaleWhileRevalidate",
                options: {
                  cacheName: "google-fonts-stylesheets"
                }
              },
              {
                urlPattern: /^https:\/\/fonts\.gstatic\.com/,
                handler: "CacheFirst",
                options: {
                  cacheName: "google-fonts-webfonts",
                  cacheableResponse: {
                    statuses: [0, 200]
                  },
                  expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 60 * 60 * 24 * 365
                  }
                }
              }
            ]
          })
    ]
  },

  pwa: {
    themeColor: "#2c3e50",
    msTileColor: "#2c3e50"
  }
};
