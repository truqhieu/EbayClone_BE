require("dotenv").config();

const config = {
  dev: {
    app: {
      port: process.env.DEV_APP_PORT || 3000,
      host: process.env.DEV_APP_HOST || "localhost",
    },
    db: {
      host: process.env.DEV_DB_HOST || "localhost",
      port: process.env.DEV_DB_PORT || 27017,
      name: process.env.DEV_DB_NAME || "EbayClone",
      uri: process.env.DEV_MONGODB_URI || `mongodb://localhost:27017/EbayClone`,
    },
  },
  pro: {
    app: {
      port: process.env.PRO_APP_PORT || 3000,
      host: process.env.PRO_APP_HOST || "localhost",
    },
    db: {
      host: process.env.PRO_DB_HOST || "localhost",
      port: process.env.PRO_DB_PORT || 27017,
      name: process.env.PRO_DB_NAME || "EbayClone",
      uri: process.env.PRO_MONGODB_URI || `mongodb://localhost:27017/EbayClone`,
    },
  },
};

const env = process.env.NODE_ENV === "production" ? "pro" : "dev";
module.exports = config[env];
