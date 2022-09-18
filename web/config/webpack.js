const util = require('util');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

function supportSvg(config) {
  /** Support import svg as React component */
  config.module.rules.push({
    test: /\.svg$/,
    use: [ '@svgr/webpack?-svgo,+titleProp,+ref![path]', 'url-loader' ],
  });
}

function supportImages(config, { isServer }) {
  const customImageRule = {
    test: /\.(png|jpg|jpeg|gif|webp|ico|bmp)$/i,
    use: [
      {
        loader: require.resolve('url-loader'),
        options: {
          limit: 8192,
          name: '[name]-[contenthash].[ext]',
          publicPath: `/_next/static/images/`,
          outputPath: `${isServer ? '../' : ''}static/images/`,
        },
      },
    ],
  };

  /**
   * {@link https://github.com/vercel/next.js/blob/v11.1.0/packages/next/build/webpack-config.ts#L1114}
   */
  const nextImageRuleIndex = config.module.rules.findIndex(
    (rule) => rule.loader === 'next-image-loader'
  );

  config.module.rules.splice(nextImageRuleIndex, 1, customImageRule);
}

function supportPolyfills(config) {
  /**
   * How to add polyfills in Next.js
   * Source: https://github.com/zeit/next.js/tree/canary/examples/with-polyfills
   */
  if (process.env.NODE_ENV === 'production') {
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      const polyfillsRelativePath = './src/polyfills/index.js';

      if (
        entries['main.js'] &&
        !entries['main.js'].includes(polyfillsRelativePath)
      ) {
        entries['main.js'].unshift(polyfillsRelativePath);
      }

      return entries;
    };
  }
}

/**
 * Example with Sentry:
 * https://github.com/vercel/next.js/tree/canary/examples/with-sentry
 */

function supportCaseSensitivePathsCheck(config, { dev }) {
  if (dev) {
    config.plugins.push(new CaseSensitivePathsPlugin());
  }
}

/**
 * Issue: https://github.com/styled-components/styled-components/issues/2038
 * Solution - disabling "speedy" mode via global `SC_DISABLE_SPEEDY` variable
 * Reference: https://github.com/styled-components/styled-components/releases/tag/v4.1.0
 */
function supportDisableScSpeedy(config, { webpack }) {
  if (process.env.SC_DISABLE_SPEEDY === 'true') {
    config.plugins.push(
      new webpack.DefinePlugin({
        SC_DISABLE_SPEEDY: true,
      })
    );
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
};

module.exports = {
  supportSvg, nextConfig,
  supportImages,
  supportPolyfills,
  supportCaseSensitivePathsCheck,
  supportDisableScSpeedy,
};
