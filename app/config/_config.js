var config = {};

config.mongoURI = {
  "production": process.env.MONGO_URI,
  "development": process.env.MONGO_URI,
  "test": process.env.MONGO_URI_TEST
};

module.exports = config;
