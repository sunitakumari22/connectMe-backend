// const mongoose= require('mongoose');
// mongoose.connect("mongodb://localhost:27017/easyfind-backend")

require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error("MongoDB URI is missing! Check your environment variables.");
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));