var config = {};

config.mongoURI = {
  "development": process.env.MONGO_URI,
  "test": process.env.MONGO_URI_TEST
};

module.exports = config;
