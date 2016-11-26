var config = {};

config.mongoURI = {
  "production": process.env.MONGODB_URI,
  "development": process.env.MONGODB_URI,
  "test": process.env.MONGODB_URI_TEST
};

module.exports = config;
