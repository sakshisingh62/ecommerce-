const mongoose = require("mongoose");

const connectDB = async () => {
    const primaryUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    const fallbackUri = process.env.MONGO_FALLBACK_URI || "mongodb://127.0.0.1:27017/ecommerce-api";

    if (!primaryUri) {
        throw new Error("Missing MongoDB connection string. Set MONGO_URI or MONGODB_URI in .env.");
    }

    try {
        await mongoose.connect(primaryUri);

        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Primary MongoDB connection failed:", error.message);

        if (primaryUri !== fallbackUri) {
            try {
                await mongoose.connect(fallbackUri);

                console.log("MongoDB Connected using fallback URI");
                return;
            } catch (fallbackError) {
                console.error("Fallback MongoDB connection failed:", fallbackError.message);
                throw new Error(
                    `Unable to connect to MongoDB. Primary failed: ${error.message}. Fallback failed: ${fallbackError.message}`
                );
            }
        }

        throw error;
    }
};

module.exports = connectDB;