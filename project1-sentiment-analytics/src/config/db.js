const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        // Establish connection with optimized performance parameters
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10, // Maintain performance bottlenecks under heavy production loads
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log(`MongoDB Cluster Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database connection failure: ${error.message}`);
        process.exit(1); // Explicit termination for fail-fast architecture
    }
};

module.exports = connectDatabase;
