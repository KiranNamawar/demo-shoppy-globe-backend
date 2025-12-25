import mongoose from "mongoose";
import Product from "./models/product.js";
import { getEnvVar } from "./utils/env.js";

const sampleProducts = [
    {
        title: "iPhone 15 Pro",
        description: "The latest flagship iPhone with titanium design and A17 Pro chip.",
        price: 999,
        category: "Smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    },
    {
        title: "Samsung Galaxy S24 Ultra",
        description: "Experience the ultimate in mobile technology with AI features.",
        price: 1199,
        category: "Smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    },
    {
        title: "MacBook Air M3",
        description: "The world's most popular laptop, now with even more performance.",
        price: 1099,
        category: "Laptops",
        thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
    },
    {
        title: "Sony WH-1000XM5",
        description: "Industry-leading noise cancellation and premium sound quality.",
        price: 399,
        category: "Audio",
        thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
    },
    {
        title: "iPad Pro M2",
        description: "The most powerful iPad with Liquid Retina XDR display.",
        price: 799,
        category: "Tablets",
        thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
    },
    {
        title: "Apple Watch Series 9",
        description: "The ultimate health and fitness companion.",
        price: 399,
        category: "Wearables",
        thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.jpg",
    },
    {
        title: "Bose QuietComfort Earbuds II",
        description: "Personalized noise cancellation for a tailored listening experience.",
        price: 299,
        category: "Audio",
        thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
    },
    {
        title: "Dell XPS 15",
        description: "Powerhouse performance meet stunning design.",
        price: 1499,
        category: "Laptops",
        thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
    },
    {
        title: "Google Pixel 8 Pro",
        description: "The most intelligent Pixel phone yet.",
        price: 899,
        category: "Smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
    },
    {
        title: "Logitech MX Master 3S",
        description: "The iconic mouse, reinvented for ultimate tactility and performance.",
        price: 99,
        category: "Accessories",
        thumbnail: "https://i.dummyjson.com/data/products/10/thumbnail.jpg",
    },
];

const seedDB = async () => {
    try {
        const DB_URL = getEnvVar("DB_URL");
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB...");

        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products.");

        // Insert sample products
        await Product.insertMany(sampleProducts);
        console.log("Successfully seeded 10 products!");

    } catch (error) {
        console.error("Error seeding database:", error.message);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
        process.exit();
    }
};

seedDB();
