require('dotenv').config();

const config = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || 'development',
    dataPath: process.env.DATA_PATH || './data',
};

module.exports = config;
