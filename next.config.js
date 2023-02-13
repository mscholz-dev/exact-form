const nextTranslate = require("next-translate");

const securityHeaders = [
  // prevent xss failure
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // prevent iframe
  {
    key: "X-Frame-Options",
    value: "deny",
  },
  // prevent mime sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
];

module.exports = nextTranslate({
  // disabled strict mode for render useEffect only once
  // reactStrictMode: true,
  // import svg in .js file
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  // init .env variables
  env: {
    BASE_URL_API: process.env.BASE_URL_API,
  },
  // disable trash header
  poweredByHeader: false,
  // custom next server headers
  async headers() {
    return [
      {
        // apply to all routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // redirect to translate routes
  async redirects() {
    return [
      // signup
      {
        source: "/fr/signup",
        destination: "/fr/inscription",
        permanent: true,
        locale: false,
      },
      {
        source: "/en/inscription",
        destination: "/en/signup",
        permanent: true,
        locale: false,
      },

      // signin
      {
        source: "/fr/signin",
        destination: "/fr/connexion",
        permanent: true,
        locale: false,
      },
      {
        source: "/en/connexion",
        destination: "/en/signin",
        permanent: true,
        locale: false,
      },

      // profile
      {
        source: "/fr/profile",
        destination: "/fr/profil",
        permanent: true,
        locale: false,
      },
      {
        source: "/en/profil",
        destination: "/en/profile",
        permanent: true,
        locale: false,
      },

      // change-email
      {
        source: "/fr/change-email/:token",
        destination: "/fr/modifier-email/:token",
        permanent: true,
        locale: false,
      },
      {
        source: "/en/modifier-email/:token",
        destination: "/en/change-email/:token",
        permanent: true,
        locale: false,
      },

      // form
      {
        source: "/fr/form",
        destination: "/fr/formulaire",
        permanent: true,
        locale: false,
      },
      {
        source: "/en/formulaire",
        destination: "/en/form",
        permanent: true,
        locale: false,
      },

      // form/:key
      {
        source: "/fr/form/:key",
        destination: "/fr/formulaire/:key",
        permanent: true,
        locale: false,
      },
      {
        source: "/en/formulaire/:key",
        destination: "/en/form/:key",
        permanent: true,
        locale: false,
      },

      // form/creation
      {
        source: "/fr/form-creation",
        destination: "/fr/formulaire-creation",
        permanent: true,
        locale: false,
      },
      {
        source: "/en/formulaire-creation",
        destination: "/en/form-creation",
        permanent: true,
        locale: false,
      },
    ];
  },

  // translate routes
  async rewrites() {
    return [
      // signup
      {
        source: "/fr/inscription",
        destination: "/fr/signup",
        locale: false,
      },

      // signin
      {
        source: "/fr/connexion",
        destination: "/fr/signin",
        locale: false,
      },

      // profile
      {
        source: "/fr/profil",
        destination: "/fr/profile",
        locale: false,
      },

      // change-email
      {
        source: "/fr/modifier-email/:token",
        destination: "/fr/change-email/:token",
        locale: false,
      },

      // form
      {
        source: "/fr/formulaire",
        destination: "/fr/form",
        locale: false,
      },

      // form/:key
      {
        source: "/fr/formulaire/:key",
        destination: "/fr/form/:key",
        locale: false,
      },

      // form-creation
      {
        source: "/fr/formulaire-creation",
        destination: "/fr/form-creation",
        locale: false,
      },
    ];
  },
});
