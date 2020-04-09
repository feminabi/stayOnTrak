require('dotenv').config()

module.exports = {
  proxy: {
    prefix: '/api',
    url: 'http://localhost:3000'
  },
  plugins: [
    'gatsby-plugin-react-next',
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GA_ID
      }
    }
  ],
}
