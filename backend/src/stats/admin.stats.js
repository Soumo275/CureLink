const mongoose = require('mongoose');
const express = require('express');
const Order = require('../orders/order.model');
const item = require('../items/item.model');
const router = express.Router();


// Function to calculate admin stats
router.get("/", async (req, res) => {
    try {
        // 1. Total number of orders
        const totalOrders = await Order.countDocuments();

        // 2. Total sales (sum of all totalPrice from orders)
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        // 4. Trending items statistics: 
        const trendingitemsCount = await item.aggregate([
            { $match: { trending: true } },  // Match only trending items
            { $count: "trendingitemsCount" }  // Return the count of trending items
        ]);
        
        // If you want just the count as a number, you can extract it like this:
        const trendingitems = trendingitemsCount.length > 0 ? trendingitemsCount[0].trendingitemsCount : 0;

        // 5. Total number of items
        const totalitems = await item.countDocuments();

        // 6. Monthly sales (group by month and sum total sales for each month)
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },  // Group by year and month
                    totalSales: { $sum: "$totalPrice" },  // Sum totalPrice for each month
                    totalOrders: { $sum: 1 }  // Count total orders for each month
                }
            },
            { $sort: { _id: 1 } }  
        ]);

        // Result summary
        res.status(200).json({  totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            trendingitems,
            totalitems,
            monthlySales, });
      
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
})

module.exports = router;