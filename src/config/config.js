require('dotenv').config();

const config = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/apiserver',
};

module.exports = config;
