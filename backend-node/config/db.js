const mongoose = require('mongoose');

// Connect MongoDB at default port 27017.
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
    });
    console.log(`MongoDB Connection Succeeded: ${conn.connection.host}`);
};

module.exports = connectDB;