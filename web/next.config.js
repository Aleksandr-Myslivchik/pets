const withPlugins = require('next-compose-plugins');

const {
  supportSvg,
  nextConfig,
  supportImages,
  supportPolyfills,
  supportCaseSensitivePathsCheck,
  supportDisableScSpeedy,
} = require('./config/webpack');

module.exports = withPlugins(
  [],
  {
    swcMinify: true,
    poweredByHeader: false,
    webpack: (config, options) => {
      supportSvg(config, options);
      supportImages(config, options);
      supportPolyfills(config, options);
      supportCaseSensitivePathsCheck(config, options);
      supportDisableScSpeedy(config, options);

      config.resolve.fallback = {
        fs: false,
        path: false,
        net: false,
        tls: false,
        os: false,
        domain: false,
        http: false,
        https: false,
        crypto: false,
        stream: false
      };

      return config;
    },
    ...nextConfig
  }
);
